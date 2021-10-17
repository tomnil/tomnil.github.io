// *****************************************************
// * Run info, see at the bottom
// *****************************************************

import fs from 'fs';
import path from 'path';

enum eMode {
    NormalConvert,
    KeepComments,
}

enum eExportType { DefaultExportSingleItem, DefaultExportObject, Other };


class ConvertTS {

    #AllExports: { Filename: string, type: eExportType }[] = [];
    #RunMode: eMode;
    #SortImports: boolean;
    #FileExtension: string;
    #LineEnding: string;
    #JustPrint: boolean;

    constructor(config: { RunMode: eMode, JustPrint: boolean, SourcePath: string, SortImports: boolean, FileExtension: string, LineEnding: string }) {

        this.#RunMode = config.RunMode;
        this.#JustPrint = config.JustPrint;
        this.#SortImports = config.SortImports;
        this.#FileExtension = config.FileExtension ?? ".js";
        this.#LineEnding = config.LineEnding ?? "\r\n";

    }

    #RecursiveDir = (iPath) => {

        let result: string[] = [];
        const items = fs.readdirSync(iPath, { withFileTypes: true });
        for (const item of items) {
            const name = path.join(iPath, item.name);
            if (item.isDirectory())
                result = result.concat(this.#RecursiveDir(name));
            else
                result.push(name);
        }

        return result;
    }

    #FixExports = (iCurrentFilePath: string, iFilenameMatch: RegExp) => {

        const contents = fs.readFileSync(iCurrentFilePath, "utf8");
        const result = [];
        const importmodules: string[] = [];
        const importedVariables: string[] = [];
        let cannotConvert = false;
        let updatedLinesCount = 0;

        for (const line of contents.split(this.#LineEnding)) {

            let newLine = line;
            const oldLine = newLine;
            let exportType: eExportType;

            // module.exports
            if (newLine.startsWith("module.exports")) {

                // Does the line match "module.exports = ..."
                const findMatch1 = /^(module\.exports)([ =]+)(.*)$/.exec(newLine);
                if (findMatch1 !== null) {
                    newLine = `export default ${findMatch1[3]}`;

                    if (!findMatch1[3].includes("{"))    // It's an object
                        exportType = eExportType.DefaultExportObject;
                    else
                        exportType = eExportType.DefaultExportSingleItem;

                    this.#AllExports.push({ Filename: iCurrentFilePath.toLocaleLowerCase(), type: exportType });

                }
                else {
                    // Does the line match "module.exports.name = ..."
                    const findMatch2 = /^(module\.exports\.)(\w+)([ =]+)(\w+);{0,3}$/.exec(newLine);
                    if (findMatch2 !== null) {

                        const tab = importmodules.length > 0 ? "\t" : "";
                        if (findMatch2[2] !== findMatch2[4])
                            importmodules.push(`${tab}${findMatch2[4]} as ${findMatch2[2]}`);
                        else
                            importmodules.push(`${tab}${findMatch2[4]}`);

                        // Doesn't support of exporting variables found under "require"
                        if (importedVariables.find(v => v === findMatch2[4]))
                            cannotConvert = true;

                        // newLine = "// " + newLine;
                        newLine = undefined;


                        if (!this.#AllExports.find(i => i.Filename === iCurrentFilePath.toLocaleLowerCase()))
                            this.#AllExports.push({ Filename: iCurrentFilePath.toLocaleLowerCase(), type: eExportType.Other });
                    }
                }
            }

            if (newLine !== undefined) {

                if (iFilenameMatch.test(iCurrentFilePath)) {
                    if (this.#JustPrint && newLine !== oldLine) {
                        console.log(`FROM: ${oldLine}`);
                        console.log(`TO  : ${newLine}`);
                    }
                }
                result.push(newLine);
            }

            if (newLine !== line)
                updatedLinesCount++;
        }

        if (importmodules.length > 0)
            result.push(`export {\r\n${importmodules.join(`,${this.#LineEnding}`)}\r\n}`);



        if (updatedLinesCount > 0) {

            if (iFilenameMatch.test(iCurrentFilePath)) {

                console.log(`\r\n${iCurrentFilePath}\r\n-------------------------------------------------`);

                if (cannotConvert)
                    console.log("WARNING: Cannot convert this file.");

                if (this.#JustPrint === false)
                    fs.writeFileSync(iCurrentFilePath, result.join(this.#LineEnding));

            }
        }
    }

    #GetCompleteRequirePath = (iCurrentFilePath: string, iRequirePath: string, iCurrentLine: string) => {

        let fullRequirePath = path.join(path.dirname(iCurrentFilePath), iRequirePath);
        let result = iRequirePath;

        // **********************************************************
        // Check if it's a directory, and if there's a "index.js" in that directory
        // **********************************************************
        if (fs.existsSync(fullRequirePath)) {

            const item = fs.statSync(fullRequirePath);
            if (item.isDirectory()) {

                // Reference is to a directory, might need to fix this.
                if (fs.existsSync(path.join(fullRequirePath, "index.js"))) {
                    // If this one exists, then it's not enough to ref. the directory.
                    result = (result.endsWith("/") ? result : result + "/") + "index.js";
                }
            }
            else {
                // all is ok, the file is referenced with it's complete name
            }
        }
        else {
            // File is referenced, but the reference in the source and on disk doesn't march
            // Try adding the extension
            result = result + this.#FileExtension;
            fullRequirePath = fullRequirePath + this.#FileExtension;
            if (!fs.existsSync(fullRequirePath))
                console.log("Warning; Cannot find import reference. Line=" + iCurrentLine + ", LookedFor=" + iRequirePath);
        }

        return result;
    }


    #FixImports = (iCurrentFilePath: string, iFilenameMatch: RegExp) => {

        const contents = fs.readFileSync(iCurrentFilePath, "utf8");
        let result: string[] = [];
        let imports: string[] = [];

        const split = contents.split("\r");

        for (const line of split) {

            let newLine: string = line;
            if (newLine.charAt(0) === "\n")
                newLine = newLine.substring(1);

            const oldLine = newLine;
            let newLineImport = "";

            if (newLine && !newLine.trim().startsWith("//")) {

                // **********************************************************
                // Detail; use strict is not needed anymore
                // **********************************************************

                if (newLine.includes("use strict"))
                    newLine = "// " + newLine;

                // **********************************************************
                // Match style: require("..")  - (without assigning a variable)
                // **********************************************************

                const rmatch1 = /^\s*require\((["'].*["'])\);{0,1}/.exec(newLine);
                if (rmatch1 !== null) {

                    // **********************************************************
                    // Get path to item (if node_modules, leav as-is)
                    // **********************************************************

                    let requirePath = rmatch1[1].slice(1, -1);
                    if (requirePath.startsWith("."))    // Only try to find the reference if it's local (eg, skip "node_modules" refs)
                        requirePath = this.#GetCompleteRequirePath(iCurrentFilePath, requirePath, newLine);

                    imports.push(`import '${requirePath}';`);
                    newLine = undefined;
                }


                if (newLine !== undefined) {

                    // **********************************************************
                    // Match style: let/const variable = require("..")
                    // **********************************************************

                    const trimmedLine = newLine.trim();
                    const requirematch = /\w+\s+({{0,1}.*}{0,1})\s+=\s+require\((["'].*["'])\);{0,1}/.exec(trimmedLine);
                    // const requirematch = /\w+\s+(\w+)\s+=\s+require\((["'].*["'])\);{0,1}/.exec(trimmedLine);

                    if (requirematch !== null) {

                        // **********************************************************
                        // Get path to item (if node_modules, leav as-is)
                        // **********************************************************

                        let requirePath = requirematch[2].slice(1, -1);
                        if (requirePath.startsWith("."))    // Only try to find the reference if it's local (eg, skip "node_modules" refs)
                            requirePath = this.#GetCompleteRequirePath(iCurrentFilePath, requirePath, newLine);

                        // **********************************************************
                        // * Depending on how the exports looks like, write "import" line
                        // **********************************************************

                        const matchPath = path.join(path.dirname(iCurrentFilePath), requirePath);
                        const referencedExport = this.#AllExports.find(p => p.Filename.startsWith(matchPath.toLocaleLowerCase()));

                        if (referencedExport) {
                            switch (referencedExport.type) {
                                case eExportType.DefaultExportObject:

                                    // *************************************************
                                    // Style: export default { a,b,c}
                                    // *************************************************

                                    if (this.#RunMode === eMode.KeepComments)
                                        imports.push("// DefaultExportObject");

                                    newLineImport = `import ${requirematch[1]} from '${requirePath}';`;
                                    break;

                                case eExportType.DefaultExportSingleItem:

                                    // *************************************************
                                    // Style 1: export default Foo
                                    // Style 2: export default new Bar()
                                    // *************************************************

                                    if (this.#RunMode === eMode.KeepComments)
                                        imports.push("// DefaultExportSingleItem");

                                    newLineImport = `import ${requirematch[1]} from '${requirePath}';`;
                                    break;

                                case eExportType.Other:

                                    // ************************************************
                                    // * Other
                                    // *************************************************

                                    if (this.#RunMode === eMode.KeepComments)
                                        imports.push("// Other");

                                    if (requirePath.startsWith(".") && !requirematch[1].includes("{"))
                                        newLineImport = `import * as ${requirematch[1]} from '${requirePath}';`;
                                    else
                                        newLineImport = `import ${requirematch[1]} from '${requirePath}';`;
                                    break;
                            }
                        }
                        else {

                            // ************************************************
                            // * Probably node_modules import
                            // *************************************************

                            if (this.#RunMode === eMode.KeepComments)
                                imports.push("// Unknown");

                            if (requirePath.startsWith("."))
                                newLineImport = `import * as ${requirematch[1]} from '${requirePath}';`;
                            else
                                newLineImport = `import ${requirematch[1]} from '${requirePath}';`;
                        }

                        newLine = undefined;

                        // if (iFilenameMatch.test(iCurrentFilePath)) {
                        //     console.log("\r\n\r\n------------------------------------------------")
                        //     console.log(oldLine);
                        //     console.log(newLineImport);
                        // }

                    }
                }
            }

            // **********************************************************
            // Anything to store?
            // **********************************************************

            if (newLineImport !== "") {

                imports.push(newLineImport);

                if (this.#JustPrint) {
                    if (iFilenameMatch.test(iCurrentFilePath)) {
                        console.log(`FROM: ${oldLine}`);
                        console.log(`TO  : ${newLineImport}`);
                    }
                }
            }

            if (newLine !== undefined) {
                result.push(newLine);
            }
        }

        // **********************************************************
        // Imports must be at top of file
        // **********************************************************

        // if (result.length < 1)
        //     debugger;

        if (imports.length > 0) {

            imports = imports.filter((v, i, a) => a.indexOf(v) === i); // Make distinct (remove duplicates)

            if (this.#SortImports)
                imports.sort();

            result = imports.concat(result);
        }

        // **********************************************************
        // Save/print result
        // **********************************************************

        if (iFilenameMatch.test(iCurrentFilePath)) {

            console.log(`\r\n${iCurrentFilePath}\r\n-------------------------------------------------`);

            if (this.#JustPrint === false)
                fs.writeFileSync(iCurrentFilePath, result.join(this.#LineEnding));
        }
    }

    ConvertRecursive(iFolder: string, iFilenameMatch: RegExp = /.*/) {

        if (this.#JustPrint)
            console.log("-- NOTE: Exports will be printed before imports, but the rendered file(s) are correct.")

        this.#AllExports = [];
        console.log("Running...")
        const files = this.#RecursiveDir(iFolder).filter(f => f.endsWith(this.#FileExtension));

        for (const file of files)
            this.#FixExports(file, iFilenameMatch);

        for (const file of files)
            this.#FixImports(file, iFilenameMatch);


        if (!this.#JustPrint)
            console.log("Don't forget to edit package.json to include: type=\"module\"");
        console.log("Done...")

    }


}

// ----------------------------------------------------------------------


// ***********************************************************************
// *
// * This program replaces "require" and "module.export"
// * with "import" and "export". At the point of writing, I wish I knew
// * about the AST (https://astexplorer.net/), so instead of using text
// * parsing I could have done it differently. Still, the code makes
// * a pretty good job so it's still usuable.
// *
// ***********************************************************************
// *
// * USAGE
// *
// * 1. Backup your source code first
// * 2. Decide if you want to keep the old statements in the file or not (eg, replace)
// *    require with "import", or leave the old require in the file (as a comment)
// * 3. If you're in the same directory as the source:
// *    a) Open your package.json and ensure that it does not have type: "module" setting.
// * 4. Run: ts-node fixmodules.ts
// * 5. Open your package.json and make sure it DOES have type: "module" setting

const config = {
    RunMode: eMode.NormalConvert,
    JustPrint: false,                // Doesn't write files, just prints output to screen
    SourcePath: path.join(".\\src"),
    SortImports: true,
    FileExtension: ".js",
    LineEnding: "\r\n"
}

const convertts = new ConvertTS(config);
// convertts.Run();

convertts.ConvertRecursive("./src/");


# 2020-06-12 Transpile

This document briefly states how to use ```tsc``` to transpile Typescript+Javascript into a folder. It also includes information on how to debug the target.

:!: For development, it's recommended *not* to transpile, see [Step-by-step setting up TypeScript in vscode (including debugging and without transpiling](../../../../articles/Development/TypeScript/EmptyProject/index)

# Important settings

## Setting "outDir"

Open ```tsconfig.json``` and set ```outDir``` accordingly:

```json
    "outDir": "./out",       /* Redirect output structure to the directory. */
````

## Setting target version

If you're doing backend development and can run a newer release of ```node```, then it's most logical to use as new version as possible. Typescript can use various methods to turn new typescript functionality into old javascript compatible code.

```json
"target": "ES2020"
```

## Transpile

From commandline, run:

```bash
cd PROJECTFOLDER
tsc -p .
dir out
```

## Run the result

```bash
node out/index.js
```

## Compile and run

```bash
tsc -p . && node out/index.js
```

document.onreadystatechange = function () {
    if (this.readyState === "complete") {

        // Find all H1--H6 and create links for them. Store in navigation :)
        var navigation = document.getElementById("navigation");

        let lMainContent = document.getElementById("main_content");
        let lAllElements = lMainContent.getElementsByTagName("*");

        let key = 1;
        while (key++) {

            if (lAllElements[key] === undefined)
                break;

            if (key > 10000)
                break;

            let currentElementTag = lAllElements[key].tagName;

            switch (currentElementTag) {
                case "H1":
                case "H2":
                case "H3":
                case "H4":
                case "H5":
                case "H6":
                    let link = lAllElements[key].id;
                    let description = lAllElements[key].innerHTML;

                    let linkdiv = document.createElement("div");
                    linkdiv.setAttribute("class", "colorit");

                    // Create anchor
                    let anchor = document.createElement("a");
                    anchor.setAttribute('href', '#' + link);
                    anchor.innerHTML = description + "<br/>";
                    linkdiv.appendChild(anchor);

                    navigation.appendChild(linkdiv);
                    break;

                case "CODE":

                    let codeblockcontents = lAllElements[key].innerHTML;

                    console.log(codeblockcontents.length);

                    if (codeblockcontents.length > 10) {

                        console.log(lAllElements[key].id === "");
                        if (lAllElements[key].id === "")
                            lAllElements[key].id = "tb" + key;

                        // Create button
                        let button = document.createElement("button");
                        button.setAttribute('data-clipboard-target', '#' + lAllElements[key].id);    // Must be unique

                        // Create image
                        let img = document.createElement("img");
                        img.setAttribute('src', 'https://clipboardjs.com/assets/images/clippy.svg');
                        img.setAttribute('width', '13');
                        img.setAttribute('alt', 'Copy to clipboard');

                        // Add it
                        button.appendChild(img);

                        lAllElements[key].appendChild(button);
                    }

                    break;
            }
        }

        console.log("ClipBoardJS");

        new ClipboardJS('code', {
            text: function (trigger) {
                console.log(trigger);
                let elem = document.getElementById(trigger.id);
                return elem.innerText;
            }
        });

    }

};

document.onreadystatechange = function () {
    if (this.readyState === "complete") {

        // Find all H1--H6 and create links for them. Store in navigation :)
        console.time("Building shortcuts");
        var navigation = document.getElementById("navigation");
        navigation.appendChild(BuildLinksFromHeaders("main_content"));
        console.timeEnd("Building shortcuts");


    }
};

function BuildLinksFromHeaders(iStartingElement, iLevel) {

    let searchfrom = document.getElementById("main_content");
    let allElementsArray = searchfrom.getElementsByTagName("*");
    let result = document.createElement("div");

    for (const key in allElementsArray) {

        let currentElementTag = allElementsArray[key].tagName;
        let link = allElementsArray[key].id;
        let description = allElementsArray[key].innerHTML;

        switch (currentElementTag) {
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
                var newlink = document.createElement("a");
                newlink.setAttribute('href', '#' + link);
                newlink.innerHTML = description + "<br>";
                result.appendChild(newlink);
                break;
        }

    }

    return result;

}
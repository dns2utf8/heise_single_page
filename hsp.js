/**
 * if not on single page, click the link if it exists
 */
(function() {

let handler = ev => {
    let nodes = document.querySelectorAll("a[href]");
    for (i in nodes) {
        let a = nodes[i];
        if (a.href.indexOf('seite=all') !== -1) {
            a.click();
        }
    }
};
    
if (location.search.indexOf('seite=all') === -1) {
    handler();
    //window.addEventListener("load", handler, true);
    //document.addEventListener("load", handler, true);
}

})();

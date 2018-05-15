/**
 * if not on single page, click the link if it exists
 */
if (location.search.indexOf('seite=all') === -1) {
    window.addEventListener("load", ev => {
        let nodes = document.querySelectorAll("a[href]");
        for (i in nodes) {
            let a = nodes[i];
            if (a.href.indexOf('seite=all') !== -1) {
                a.click();
            }
        }
    }, true);
}

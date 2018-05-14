/**
 * if not on single page, click the link if it exists
 */
if (location.search.indexOf('seite=all') === -1) {
    window.addEventListener("load", ev => {
        [].forEach.call(
            document.querySelectorAll("a[href]"),
            a => {
                if (a.href.indexOf('seite=all') !== -1) {
                    console.error(a);
                    a.click();
                }
            }
        );
    });
}

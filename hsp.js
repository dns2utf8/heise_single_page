/**
 * if not on single page, click the link if it exists
 */
(function() {

const PLUS_COLOR = '#a1c2e5';

const clicker = needle => {
    const nodes = document.querySelectorAll("a[href]");
    nodes.forEach(a => {
        if (a.href.indexOf(needle) !== -1) {
            a.click();
        }
    });
};

if (location.pathname.indexOf('/forum/') === 0) {
    clicker('show-thread-below-posting');
}

if (location.search.indexOf('seite=all') === -1) {
    clicker('seite=all');
}

// Highlight Heise+
const l = document.querySelectorAll('.heiseplus-logo');
l.forEach(e => {
    e.parentElement.parentElement.parentElement.style.background = PLUS_COLOR;
    e.parentElement.parentElement.parentElement.parentElement.style.background = PLUS_COLOR;
});

document.querySelectorAll('.heiseplus-lnk')
    .forEach(el => el.style.background = PLUS_COLOR);

})();

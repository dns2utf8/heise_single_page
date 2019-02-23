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

const find_parent_with_class_name = (node, class_name) => {
    let parentElement = node.parentElement;
    while (parentElement.classList.contains(class_name) === false) {
        if (parentElement.parentElement === null) {
            return parentElement;
        }
        parentElement = parentElement.parentElement;
    }
    return parentElement;
};

if (location.pathname.indexOf('/forum/') === 0) {
    clicker('show-thread-below-posting');
}

if (location.search.indexOf('seite=all') === -1) {
    clicker('seite=all');
}

// Highlight Heise+ on main page
document.querySelectorAll('.a-article-teaser .heiseplus-logo-small')
    .forEach(e => {
        find_parent_with_class_name(e, 'a-article-teaser').style.background = PLUS_COLOR;
    });

document.querySelectorAll('.heiseplus-lnk')
    .forEach(el => el.style.background = PLUS_COLOR);

// Mark the heading of all the Heise+ articles
document.querySelectorAll('.heiseplus-logo')
    .forEach(e => {
        find_parent_with_class_name(e, 'article-header').style.background = PLUS_COLOR;
    });

})();

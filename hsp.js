/**
 * if not on single page, click the link if it exists
 */
(function() {

const PLUS_COLOR = '#a1c2e5';
const PAID_COLOR = 'rgb(208, 205, 196)';

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
            return node;
        }
        parentElement = parentElement.parentElement;
    }
    return parentElement;
};

const mark_promos = _ => {
    Array.from(document.querySelectorAll("article footer span"))
        .filter(e => e.innerText.trim() === "heise-Angebot")
        .forEach(e => {
            const p = [
                // main page
                find_parent_with_class_name(e, "a-article-teaser"),
                // newsticker
                find_parent_with_class_name(e, "archiv-liste__item"),
            ];
            p.forEach(p => p.querySelectorAll("*")
                .forEach(e => e.style.color = PAID_COLOR)
            );
        });
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

// Mark pure promo articles
mark_promos();
// delayed in /newsticker/
setTimeout(mark_promos, 1500);

const remove_tracking_notice = async _ => {
    const item = await browser.storage.sync.get('tracker_notice');
    if (item.tracker_notice === true) {
        document.querySelectorAll('#uc-central-banner-modal')
            .forEach(el => el.remove());
    }
};
remove_tracking_notice();
setTimeout(remove_tracking_notice, 1500);
setTimeout(remove_tracking_notice, 2500);

})();

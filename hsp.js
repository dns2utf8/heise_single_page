/**
 * if not on single page, click the link if it exists
 */
(function() {

const PLUS_COLOR = '#a1c2e5';
const PAID_COLOR = 'rgb(208, 205, 196)';
// "Ⓗ "
const HEISE_LOGO = '<svg style="height: 1em;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.151799 16.893437c-.287135.66998-.741763 1.447634-1.5792369 1.447634-.5973506.02701-1.0998169-.443037-1.1126438-1.04086.050612-.478921.1970864-.942756.4307008-1.363887l3.8045229-8.6857983c.287134-.658015.658015-1.1365715 1.411742-1.1365715.596627-.021203 1.08599.4681601 1.064787 1.0647881-.02826.6120162-.19604 1.2094747-.49052 1.746731zm3.302038 1.447634c.849437 0 1.292102-.753727 1.603165-1.43567l1.41174-3.194364c.277532-.523489.448331-1.096884.502485-1.686911.0212-.596629-.468161-1.085991-1.064789-1.064789-.76569 0-1.124608.514449-1.423704 1.196392l-1.698877 3.82845c-.230399.403565-.369267.852846-.406772 1.316032-.0075.592181.485166 1.068452 1.076752 1.04086zm8.302954-9.798443c-.622124-5.3717956-5.192337-8.54223188-10.611988-8.54223188-2.4331435-.01947725-4.8178999.67971831-6.8553208 2.00993698-1.0438548.6827638-1.234152.8110494-2.2013595 1.8304783-2.0331909 2.3114046-3.1334882 5.2967077-3.08668889 8.3747376 0 6.903175 5.55125439 11.784451 12.28693519 11.784451 3.445605-.06615 6.698303-1.603217 8.937042-4.223259l-.502485-.753727c-.369496.375633-.76968.719791-1.196391 1.028895-2.157141 1.517822-4.732161 2.328787-7.369768 2.320998-5.0242728-.04505-9.0351591-4.201487-8.9011495-9.224173 0-5.7666052 2.2970707-10.9230507 8.8174005-10.9230507 4.869312 0 8.817403 3.2781115 8.817403 8.3747377-.04199 1.74352-.655706 3.424944-1.746731 4.785563l.861402.741763c1.330254-1.262795 2.25832-2.890033 2.667951-4.677888.249179-1.170378.256389-1.908704.08375-2.907231z" stroke-width="1.196391"/></svg> ';

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

const mark_affiliates = _ => {
    document.querySelectorAll("a.fflt-lnk").forEach(e => e.style.color = PAID_COLOR);
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
mark_affiliates();
// delayed in /newsticker/
setTimeout(mark_promos, 1500);

const remove_tracking_notice = async _ => {
    const item = await browser.storage.sync.get('tracker_notice');
    if (item.tracker_notice === true) {
        document.querySelectorAll('#usercentrics-root')
            .forEach(el => {
                document.querySelector('body').style.overflow = 'auto'
                el.remove();
            });
    }
};
const delayed_remove_tracking_notice = async (event) => {
    window.requestAnimationFrame(async _ => {
        remove_tracking_notice();
        setTimeout(remove_tracking_notice, 1500);
        setTimeout(_ => {
            window.requestAnimationFrame(remove_tracking_notice);
            setTimeout(_ => {
                window.requestAnimationFrame(async _ => {
                    remove_tracking_notice();
                    setTimeout(_ => {
                        window.requestAnimationFrame(remove_tracking_notice);
                    }, 15000);
                });
            }, 2500);
        }, 2500);
    });
};

delayed_remove_tracking_notice();

window.addEventListener('load', delayed_remove_tracking_notice);
document.addEventListener('readystatechange', delayed_remove_tracking_notice);

// add heise logo to in page links
[...document.querySelectorAll("article#meldung p a")]
    .map(a => [a, new URL(a.href)])
    .filter(al => ["www.heise.de", "heise.de"].indexOf(al[1].host) >= 0)
    .forEach(al => {
        const a = al[0];
        a.innerHTML = HEISE_LOGO + a.innerHTML;
    });

})();

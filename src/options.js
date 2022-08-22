//'use strict'

console.log("hsp starting up");

function saveOptions(e) {
    const value = document.querySelector("#tracker_notice").checked || false;
    console.log(["saveOptions", value]);
    /// Storage that is synchronized by the browser over the users machines
    if (typeof browser === 'undefined') {
        // chromium based
        chrome.storage.sync.set({tracker_notice: value}, function() {
            console.log('tracker_notice is set to ' + value);
        });
    } else {
        // firefox
        browser.storage.sync.set({
            tracker_notice: value,
        });
    }
    e.preventDefault();
}

async function restoreOptions() {
    var item = undefined;
    /// Storage that is synchronized by the browser over the users machines
    if (typeof browser === 'undefined') {
        // chromium based
        item = new Promise((resolve, reject) => {
            chrome.storage.sync.get(['tracker_notice'], function(result) {
                console.log('tracker_notice currently is ' + result.tracker_notice);
                resolve({ tracker_notice: result.tracker_notice });
            });
        });
    } else {
        // firefox
        item = await browser.storage.sync.get('tracker_notice');
        console.log(['item', item.tracker_notice]);
    }
    document.querySelector("#tracker_notice").checked = item.tracker_notice || false;
}

function probier(fn) {
    return function(args) {
        try {
            fn(args);
        } catch (e) {
            const error = document.createElement('pre');
            error.innerText = `${e}`;
            document.querySelector("#errors").appendChild(error);
        }
    }
}

document.addEventListener('DOMContentLoaded', probier(restoreOptions));
document.querySelector("form").addEventListener("submit", probier(saveOptions));
document.querySelector("#tracker_notice").addEventListener("change", probier(saveOptions));

document.querySelector("form").style.display = '';
document.querySelectorAll("#errors > pre")[0].remove();

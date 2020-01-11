//'use strict'

function saveOptions(e) {
    const value = document.querySelector("#tracker_notice").checked || false;
    console.log(["saveOptions", value]);
    browser.storage.sync.set({
        tracker_notice: value,
    });
    e.preventDefault();
}

async function restoreOptions() {
    const item = await browser.storage.sync.get('tracker_notice');
    console.log(['item', item.tracker_notice]);
    document.querySelector("#tracker_notice").checked = item.tracker_notice || false;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#tracker_notice").addEventListener("change", saveOptions);

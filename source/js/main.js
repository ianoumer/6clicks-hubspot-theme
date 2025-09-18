/* global balanceText */
// {% raw %}
import debugLog from './modules/_debugLog';
import loadScript from './modules/_loadScript';
import flyingPages from "flying-pages-module";
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";
import dataDOM from "./modules/Alpine.data/DOM";

// The window.Alpine = Alpine bit is optional, but is nice to have for
// freedom and flexibility. Like when tinkering with Alpine from the devtools for example.
window.Alpine = Alpine;

// Function for executing code on document ready
function domReady(callback) {
  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

// If you imported Alpine into a bundle, you have to make sure you are registering any
// extension code IN BETWEEN when you import the Alpine global object, and when you
// initialize Alpine by calling Alpine.start().

// Add plugins to Alpine
Alpine.plugin(intersect);
Alpine.plugin(collapse);
Alpine.plugin(focus);

Alpine.data("xDOM", dataDOM);

// Load balance-text script if the browser is Safari
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
  loadScript('//cdn.jsdelivr.net/npm/balance-text@3.3.1/balancetext.min.js', 'async', () => {
    balanceText(document.querySelectorAll('[x-balance-text]'), {watch: true});
  });
}

// Start Alpine when the page is ready.
domReady(() => {

  Alpine.start();
  flyingPages({
    // Prefetch all pages by default
  });
});
// {% endraw %}

// ==UserScript==
// @name         Use g/G in 'normal mode'
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Press 'g' to scroll to the bottom, 'Shift+g' to the top of the scrollable container focused by Escape/Ctrl+[, overriding page shortcuts. Ignores inputs and textareas.
// @author       Your barely patient AI overlord
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find the primary scrollable element (same as unfocus script)
    function getScrollableElement() {
        // Check if document.body is scrollable
        if (document.body.scrollHeight > window.innerHeight) {
            document.body.tabIndex = 0; // Ensure body is focusable
            return document.body;
        }

        // Find the first scrollable div (with overflow-y: auto or scroll)
        const scrollableDiv = Array.from(document.querySelectorAll('div')).find(div => {
            const style = window.getComputedStyle(div);
            return (style.overflowY === 'auto' || style.overflowY === 'scroll') && div.scrollHeight > div.clientHeight;
        });

        if (scrollableDiv) {
            scrollableDiv.tabIndex = 0; // Ensure the div is focusable
            return scrollableDiv;
        }

        // Fallback to document.body
        document.body.tabIndex = 0;
        return document.body;
    }

    document.addEventListener('keydown', function(event) {
        // Ignore if in input or textarea
        const isInputOrTextarea = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';
        if (isInputOrTextarea) return;

        // Check for 'g' (bottom) or 'Shift+g' (top)
        if (event.key.toLowerCase() === 'g') {
            event.preventDefault(); // Stop default browser/page behavior
            event.stopImmediatePropagation(); // Block other page listeners

            const scrollableElement = getScrollableElement();
            if (event.shiftKey) {
                // Shift+g: Scroll to top of the scrollable element
                scrollableElement.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // g: Scroll to bottom of the scrollable element
                scrollableElement.scrollTo({ top: scrollableElement.scrollHeight, behavior: 'smooth' });
            }

            // Ensure the scrollable element is focused
            scrollableElement.focus();
        }
    }, { capture: true }); // Capture phase to run before page listeners
})();






// ==UserScript==
// @name         Escape or Ctrl+[ Unfocus Input and Focus Scroll
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Unfocuses any input or textarea with Escape or Ctrl+[, overrides page shortcuts, and focuses the scrollable container for immediate scrolling
// @author       Your barely patient AI overlord
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find the primary scrollable element
    function getScrollableElement() {
        // Check if document.body is scrollable
        if (document.body.scrollHeight > window.innerHeight) {
            document.body.tabIndex = 0; // Ensure body is focusable
            return document.body;
        }

        // Find the first scrollable div (with overflow-y: auto or scroll)
        const scrollableDiv = Array.from(document.querySelectorAll('div')).find(div => {
            const style = window.getComputedStyle(div);
            return (style.overflowY === 'auto' || style.overflowY === 'scroll') && div.scrollHeight > div.clientHeight;
        });

        if (scrollableDiv) {
            scrollableDiv.tabIndex = 0; // Ensure the div is focusable
            return scrollableDiv;
        }

        // Fallback to document.body
        document.body.tabIndex = 0;
        return document.body;
    }

    document.addEventListener('keydown', function(event) {
        // Check if active element is an input or textarea
        const isInputOrTextarea = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

        // Trigger if Escape or Ctrl+[ is pressed
        if (isInputOrTextarea && (event.key === 'Escape' || (event.ctrlKey && event.key === '['))) {
            event.preventDefault(); // Stop default browser/page behavior
            event.stopImmediatePropagation(); // Block other page listeners
            document.activeElement.blur(); // Unfocus the input/textarea
            const scrollableElement = getScrollableElement(); // Get the scrollable element
            scrollableElement.focus(); // Focus the scrollable element for scrolling
        }
    }, { capture: true }); // Capture phase to run before page listeners
})();






// ==UserScript==
// @name         Ctrl+I Focus Nearest Input
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Focuses the nearest text input or textarea when Ctrl+I is pressed on any website
// @author       Your overworked AI pal
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Helper to check if element is visible
    function isVisible(element) {
        return element.offsetWidth > 0 && element.offsetHeight > 0 &&
               window.getComputedStyle(element).visibility !== 'hidden' &&
               window.getComputedStyle(element).display !== 'none';
    }

    // Helper to calculate distance between two elements' bounding rectangles
    function getDistance(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        const dx = (rect1.left + rect1.width / 2) - (rect2.left + rect2.width / 2);
        const dy = (rect1.top + rect1.height / 2) - (rect2.top + rect2.height / 2);
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Find the nearest text input or textarea
    function findNearestInput() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="search"], input[type="email"], input[type="password"], input[type="tel"], input[type="url"], textarea');
        const activeElement = document.activeElement || document.body;
        let closestInput = null;
        let minDistance = Infinity;

        inputs.forEach(input => {
            if (isVisible(input) && !input.disabled && !input.readOnly) {
                const distance = getDistance(activeElement, input);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestInput = input;
                }
            }
        });

        return closestInput;
    }

    // Keydown listener for Ctrl+I
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'i') {
            event.preventDefault(); // Stop default Ctrl+I behavior
            const nearestInput = findNearestInput();
            if (nearestInput) {
                nearestInput.focus();
            }
        }
    });
})();



// ==UserScript==
// @name         Ctrl+H as Backspace in Input Fields
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remaps Ctrl+H to act as Backspace in input and textarea elements across all websites
// @author       Some random AI who’s tired of your shit
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(event) {
        // Check if Ctrl+H is pressed and we're in an input or textarea
        if (event.ctrlKey && event.key === 'h' && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            event.preventDefault(); // Stop default Ctrl+H behavior (like browser history)
            // Simulate backspace
            let input = document.activeElement;
            let value = input.value;
            let start = input.selectionStart;
            let end = input.selectionEnd;

            if (start === end) {
                // No selection: delete one character before cursor
                if (start > 0) {
                    input.value = value.slice(0, start - 1) + value.slice(start);
                    input.selectionStart = input.selectionEnd = start - 1;
                }
            } else {
                // Selection exists: delete selected text
                input.value = value.slice(0, start) + value.slice(end);
                input.selectionStart = input.selectionEnd = start;
            }
        }
    });
})();



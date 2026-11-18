/** localStorage key for an explicit theme choice; absent = the default (dark). */
export const THEME_STORAGE_KEY = "theme";

/**
 * Inline, render-blocking script that sets `data-theme` on <html> before the
 * first paint, so there is no flash of the wrong theme. Dark is the default;
 * light is only used once the visitor picks it with the toggle.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

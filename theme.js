/* =========================================
   THEME (LIGHT / DARK MODE)
   Shared by every page. Include with:
   <script src="theme.js"></script>
========================================= */

(function () {
    var body = document.body;
    var themeButtons = document.querySelectorAll(".theme-toggle");

    function getSavedTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (e) {
            return null; // storage blocked (e.g. private mode)
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            /* ignore: theme still applies for this visit */
        }
    }

    function applyTheme(theme) {
        var isDark = theme === "dark";
        body.classList.toggle("dark-mode", isDark);
        themeButtons.forEach(function (button) {
            var icon = button.querySelector("i");
            if (!icon) return;
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);
            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        });
    }

    var preferredTheme =
        getSavedTheme() ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    applyTheme(preferredTheme);

    themeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
            saveTheme(nextTheme);
            applyTheme(nextTheme);
        });
    });
})();

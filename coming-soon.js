/* =========================================
   "COMING SOON" MESSAGE
   Any element with the data-coming-soon attribute
   shows a short message instead of navigating.
   Optional: data-coming-soon="Custom message"
========================================= */

(function () {
    var toast = null;
    var hideTimer = null;

    function getToast() {
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "coming-soon-toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }
        return toast;
    }

    function show(message) {
        var el = getToast();
        el.textContent = message;
        el.classList.add("show");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
            el.classList.remove("show");
        }, 2500);
    }

    document.addEventListener("click", function (event) {
        var target = event.target.closest("[data-coming-soon]");
        if (!target) return;
        event.preventDefault();
        show(target.getAttribute("data-coming-soon") || "Coming soon");
    });
})();
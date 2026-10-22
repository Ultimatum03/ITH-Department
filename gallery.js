/* =========================================
   GALLERY LIGHTBOX
   Opens when the expand button on an image is
   pressed. Esc closes, arrow keys move between
   the images currently shown by the filter.
========================================= */

(function () {

    var grid = document.querySelector(".gallery-grid");
    if (!grid) return;

    var lightbox = null;
    var imgEl, captionEl, closeBtn, prevBtn, nextBtn;
    var items = [];
    var index = 0;
    var opener = null;


    function build() {

        if (lightbox) return;

        lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Image viewer");

        lightbox.innerHTML =
            '<button type="button" class="lightbox-close" aria-label="Close image">' +
                '<i class="fa-solid fa-xmark"></i>' +
            '</button>' +
            '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">' +
                '<i class="fa-solid fa-chevron-left"></i>' +
            '</button>' +
            '<figure class="lightbox-figure">' +
                '<img class="lightbox-img" alt="">' +
                '<figcaption class="lightbox-caption"></figcaption>' +
            '</figure>' +
            '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">' +
                '<i class="fa-solid fa-chevron-right"></i>' +
            '</button>';

        document.body.appendChild(lightbox);

        imgEl = lightbox.querySelector(".lightbox-img");
        captionEl = lightbox.querySelector(".lightbox-caption");
        closeBtn = lightbox.querySelector(".lightbox-close");
        prevBtn = lightbox.querySelector(".lightbox-prev");
        nextBtn = lightbox.querySelector(".lightbox-next");

        closeBtn.addEventListener("click", close);
        prevBtn.addEventListener("click", function () { step(-1); });
        nextBtn.addEventListener("click", function () { step(1); });

        /* Click on the dark backdrop closes the viewer */
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) close();
        });
    }


    function visibleItems() {
        return Array.prototype.filter.call(
            document.querySelectorAll(".gallery-item"),
            function (item) { return !item.classList.contains("hide"); }
        );
    }


    function render() {

        var item = items[index];
        var img = item.querySelector("img");
        var title = item.querySelector("h3");

        imgEl.src = img.getAttribute("src");
        imgEl.alt = img.getAttribute("alt") || "";
        captionEl.textContent = title ? title.textContent.trim() : "";

        var single = items.length < 2;
        prevBtn.classList.toggle("is-hidden", single);
        nextBtn.classList.toggle("is-hidden", single);
    }


    function open(item, trigger) {

        build();

        items = visibleItems();
        index = items.indexOf(item);
        if (index < 0) return;

        opener = trigger;
        render();

        lightbox.classList.add("open");
        document.body.classList.add("lightbox-open");
        closeBtn.focus();
    }


    function close() {

        lightbox.classList.remove("open");
        document.body.classList.remove("lightbox-open");

        if (opener) opener.focus();
    }


    function step(direction) {
        index = (index + direction + items.length) % items.length;
        render();
    }


    grid.addEventListener("click", function (event) {

        var button = event.target.closest(".gallery-view");
        if (!button) return;

        open(button.closest(".gallery-item"), button);
    });


    document.addEventListener("keydown", function (event) {

        if (!lightbox || !lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {
            close();
        } else if (event.key === "ArrowLeft" && items.length > 1) {
            step(-1);
        } else if (event.key === "ArrowRight" && items.length > 1) {
            step(1);
        } else if (event.key === "Tab") {

            /* Keep keyboard focus inside the viewer */
            var focusable = [closeBtn, prevBtn, nextBtn].filter(function (el) {
                return !el.classList.contains("is-hidden");
            });
            var first = focusable[0];
            var last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

})();
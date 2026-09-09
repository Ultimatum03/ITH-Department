/* =========================================
   GALLERY FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".gallery-filter");

const galleryItems =
    document.querySelectorAll(".gallery-item");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active state */
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        /* Activate clicked button */
        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");


        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.classList.contains(filter)
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });

    });

});
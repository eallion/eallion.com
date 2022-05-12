// Go to top button
(function (document) {
    const topButton = document.getElementById("topControl");
    topButton.onclick = function (e) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            topButton.style.opacity = "1";
        } else {
            topButton.style.opacity = "0";
        }
    };
})(document);

const scrollTopBtn = document.querySelector('.js-scroll-top');
if (scrollTopBtn) {
    scrollTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const progressPath = document.querySelector('.scroll-top path');
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    const updateProgress = function () {
        const scroll = window.scrollY || window.scrollTopBtn || document.documentElement.scrollTopBtn;

        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const height = docHeight - windowHeight;
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }

    updateProgress();
    const offset = 100;

    window.addEventListener('scroll', function (event) {
        updateProgress();

        //Scroll back to top
        const scrollPos = window.scrollY || window.scrollTopBtn || document.getElementsByTagName('html')[0].scrollTopBtn;
        scrollPos > offset ? scrollTopBtn.classList.add('is-active') : scrollTopBtn.classList.remove('is-active');

    }, false);
}

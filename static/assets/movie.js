function search(e) {
    // 隐藏所有 .sorting 元素
    document.querySelectorAll('.sorting').forEach(item => item.classList.add('hide'));

    // 移除之前处于活动状态的 .dvtjjf 元素
    document.querySelector(`.dvtjjf.active[data-search="${e.target.dataset.search}"]`)?.classList.remove('active');

    if (e.target.dataset.value) {
        // 将当前点击的 .dvtjjf 元素设为活动状态
        e.target.classList.add('active');
    }

    // 构建属性选择器数组
    const searchItems = document.querySelectorAll('.dvtjjf.active');
    const attributes = Array.from(searchItems, searchItem => {
        const property = `data-${searchItem.dataset.search}`;
        const logic = searchItem.dataset.method === 'contain' ? '*' : '^';
        const value = searchItem.dataset.method === 'contain' ? `${searchItem.dataset.value}` : searchItem.dataset.value;
        return `[${property}${logic}='${value}']`;
    });

    // 构建选择器字符串
    const selector = `.sorting${attributes.join('')}`;

    // 显示匹配选择器的元素
    document.querySelectorAll(selector).forEach(item => item.classList.remove('hide'));
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sc-gtsrHT')) {
        e.preventDefault();
        search(e);
    }
});

function sort(e) {
    const sortBy = e.target.dataset.order;
    const style = document.createElement('style');
    style.classList.add('sort-order-style');

    // 移除之前的排序样式
    document.querySelector('style.sort-order-style')?.remove();

    // 移除之前处于活动状态的 .sort-by-item 元素
    document.querySelector('.sort-by-item.active')?.classList.remove('active');

    // 将当前点击的 .sort-by-item 元素设为活动状态
    e.target.classList.add('active');

    if (sortBy === 'rating') {
        const movies = Array.from(document.querySelectorAll('.sorting'));

        // 根据评分进行排序
        movies.sort((movieA, movieB) => {
            const ratingA = parseFloat(movieA.dataset.rating) || 0;
            const ratingB = parseFloat(movieB.dataset.rating) || 0;
            if (ratingA === ratingB) {
                return 0;
            }
            return ratingA > ratingB ? -1 : 1;
        });

        // 生成排序样式表
        const stylesheet = movies.map((movie, idx) => `.sorting[data-rating="${movie.dataset.rating}"] { order: ${idx}; }`).join('\r\n');
        style.innerHTML = stylesheet;
        document.body.appendChild(style);
    } else if (sortBy === 'count') {
        const movies = Array.from(document.querySelectorAll('.sorting'));

        // 根据评分人数进行排序
        movies.sort((movieA, movieB) => {
            const countA = parseInt(movieA.dataset.count) || 0;
            const countB = parseInt(movieB.dataset.count) || 0;
            if (countA === countB) {
                return 0;
            }
            return countA > countB ? -1 : 1;
        });

        // 生成排序样式表
        const stylesheet = movies.map((movie, idx) => `.sorting[data-count="${movie.dataset.count}"] { order: ${idx}; }`).join('\r\n');
        style.innerHTML = stylesheet;
        document.body.appendChild(style);
    }
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sort-by-item')) {
        e.preventDefault();
        sort(e);
    }
});

// 今日诗词
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://api.eallion.com/jinrishici/one.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        var result = JSON.parse(xhr.responseText);
        var gushici = document.getElementById('gushici');
        var poem_info = document.getElementById('poem_info');
        gushici.innerHTML = '「<a href="https://www.google.com/search?q=' + result.data.content + '" target="_blank" rel="noopener noreferrer">' + result.data.content + '</a>」';
        poem_info.innerHTML = '<a href="https://www.google.com/search?q=' + result.data.origin.author + ' ' + result.data.origin.title + '" target="_blank" rel="noopener noreferrer">' + '【' + result.data.origin.dynasty + '】' + result.data.origin.author + '《' + result.data.origin.title + '》' + '</a>';
    }
};
xhr.send();
jQuery(document).ready(function ($) {
  $("photos img").each(function () {
    var _a = $("<a></a>").attr("href", this.src);
    $(this).wrap("<div class='photo'></div>").wrap(_a);
  })
  isImgLoad(function () {
    var photos = document.querySelector('photos');
    if (photos) {
      waterfall(photos);
    }
    $(window).resize(function () {
      if (photos) {
        waterfall(photos);
      }
    });
  });
  var t_img;
  var isLoad = true;
  function isImgLoad(callback) {
    $('photos img').each(function () {
      if (this.height === 0) {
        isLoad = false;
        return false;
      }
    });
    if (isLoad) {
      clearTimeout(t_img);
      callback();
    } else {
      isLoad = true;
      t_img = setTimeout(function () {
        isImgLoad(callback);
      }, 500);
    }
  }
});

jQuery(document).ready(function ($) {
  //灯箱
  $(".post-content img:not(.avatar)").each(function () {
    var _b = $("<a></a>").attr("href", this.src);
    $(this).wrap(_b);
  })
  $(".post-content a[rel!=link]:has(img)").slimbox();
  //相对时间
  //$.lately({ 'target': '.post-date' });
  //文章toc固定
  var nav = $(".tocify");
  if (nav.length > 0) {
    nav.removeClass("hide");
    var navTop = $(".post-content").offset().top;
    var w = $(window).width() / 2 + 400;
    nav.css("left", w);
    nav.css("top", navTop);
    $(window).scroll(function () {
      var scrolls = $(this).scrollTop();
      if (scrolls > navTop) {
        nav.css({ "top": 0, "position": "fixed" });
      } else {
        nav.css({ "top": navTop, "position": "absolute" });
      };
    });
  }
  //外链新窗口
  var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var location_href = window.location.href.replace(parse_url, '$3');
  $('.post-content a:not(:has(img)),.author-name a,.links-item a,a.read-more').hover(function () {
    var this_href = $(this).attr('href');
    var replace_href = this_href.replace(parse_url, '$3');
    if (this_href != replace_href && location_href != replace_href) { $(this).attr('target', '_blank'); }
  });
  //豆瓣图书电影条目
  $(".post-content a[href*='douban.com/subject/']").each(function () {
    var _this = $(this);
    var str = _this.attr("href");
    var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
    if (db_reg.test(str)) {
      var db_type = str.replace(db_reg, "$1");
      var db_id = str.replace(db_reg, "$2").toString();
      var db_api = "https://bm.weajs.com/api/";
      if (db_type == 'movie') {
        var ls_item = 'movie' + db_id;
        var url = db_api + "movies/" + db_id + "/";
        if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) == 'undefined') {
          $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function (data) {
              localStorage.setItem(ls_item, JSON.stringify(data));
              moiveShow(_this, ls_item)
            }
          });
        } else {
          moiveShow(_this, ls_item)
        }
      } else if (db_type == 'book') {
        var ls_item = 'book' + db_id;
        var url = db_api + "books/" + db_id;
        if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) == 'undefined') {
          $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
              localStorage.setItem('book' + db_id, JSON.stringify(data));
              bookShow(_this, ls_item)
            }
          });
        } else {
          bookShow(_this, ls_item)
        }
      }
    }
  });
  function moiveShow(_this, ls_item) {
    var storage = localStorage.getItem(ls_item);
    var data = JSON.parse(storage);
    var str = _this.attr("href");
    //console.log(data)
    var db_star = Math.ceil(data.rating);
    $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.directors + " / 类型：" + data.genres + " / " + data.pubdate + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img loading='lazy' class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this);
  }
  function bookShow(_this, ls_item) {
    var storage = localStorage.getItem(ls_item);
    var data = JSON.parse(storage);
    var str = _this.attr("href");
    ///console.log(data)
    var db_star = Math.ceil(data.rating);
    $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img loading='lazy' class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this);
  }
});

// 回到顶部
$('.to-top').toTop({
  //options with default values
  autohide: true,
  offset: 420,
  speed: 500,
  position: true,
  right: 15,
  bottom: 30
});

// 首页调用嘀咕 JSON 版
$(document).ready(function(){
  if ( $("#index-talk").length > 0 ) {
    jsonUrl = "https://6561-eallion-8gkunp4re49bae66-1251347414.tcb.qcloud.la/json/talks.json"
    $.getJSON(jsonUrl+"?t="+Date.parse( new Date()),function(res){
      var talksHtml = ''
      $.each(res.data, function(i, item){
        d = new Date(item.date)
        date = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() +' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
        dataTime = '<span class="datatime">'+date+'</span>'
        talksHtml += '<li class="item item-'+(i+1)+'">'+dataTime+'： <a href="https://eallion.com/talk/" target="_blank">'+item.content+'</a></li>'
      });
      $('#index-talk').append('<span class="index-talk-icon"><svg height="24" width="24" viewBox="0 0 20 20"><path d="M17.659,3.681H8.468c-0.211,0-0.383,0.172-0.383,0.383v2.681H2.341c-0.21,0-0.383,0.172-0.383,0.383v6.126c0,0.211,0.172,0.383,0.383,0.383h1.532v2.298c0,0.566,0.554,0.368,0.653,0.27l2.569-2.567h4.437c0.21,0,0.383-0.172,0.383-0.383v-2.681h1.013l2.546,2.567c0.242,0.249,0.652,0.065,0.652-0.27v-2.298h1.533c0.211,0,0.383-0.172,0.383-0.382V4.063C18.042,3.853,17.87,3.681,17.659,3.681 M11.148,12.87H6.937c-0.102,0-0.199,0.04-0.27,0.113l-2.028,2.025v-1.756c0-0.211-0.172-0.383-0.383-0.383H2.724V7.51h5.361v2.68c0,0.21,0.172,0.382,0.383,0.382h2.68V12.87z M17.276,9.807h-1.533c-0.211,0-0.383,0.172-0.383,0.383v1.755L13.356,9.92c-0.07-0.073-0.169-0.113-0.27-0.113H8.851v-5.36h8.425V9.807z"></path></svg></span><ul class="talk-list">'+talksHtml+'</ul>')
      Lately({ 'target': '#index-talk .datatime' });
    });
    function Roll (){
      var list_li = $('.talk-list li'),cur_li = list_li.first(),last_li = list_li.last();
      last_li.after(cur_li);
    };
    setInterval(Roll,3000);
    //点击关闭嘀咕 Widget
	  $('button').click(function(){
		  $(this).parents('#index-talk').remove();
	  });
  }
});
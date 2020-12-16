//初始化 （首页 Widget 专用）
const app = tcb.init({
  env: 'eallion-8gkunp4re49bae66' //这里是你的环境id
})
app.auth({
    persistence: "session"
}).anonymousAuthProvider().signIn().then(() => {
    //定义数据对象
    const db = app.database()
    //选择数据表
    const collection = db.collection('talks')
    /**
     * 定义基本变量
     * count | int, 数目
     * per | int, 每页显示项目数
     * page | int, 第几页
     */
    var count=0, per = 5,page = 1
    /**
     * 获取数目
     */
    collection.count(function(err,res){
    count = res.total
    $('.count-data').text(count)
    getList()
    })
    /**
     * 封装获取数据函数
     */
    function getList(){
    if((page-1)*per >= count){
  return
    }
    var date
    collection.limit(per).skip((page-1)*per).orderBy('date','desc').get(function(err, res) {
  (res.data).forEach(item => {
  date = item.date
  $('.list').append('<li><p><span class="index-talk-icon"><svg class="svg-icon" height="24" width="24" viewBox="0 0 20 20"><path d="M17.659,3.681H8.468c-0.211,0-0.383,0.172-0.383,0.383v2.681H2.341c-0.21,0-0.383,0.172-0.383,0.383v6.126c0,0.211,0.172,0.383,0.383,0.383h1.532v2.298c0,0.566,0.554,0.368,0.653,0.27l2.569-2.567h4.437c0.21,0,0.383-0.172,0.383-0.383v-2.681h1.013l2.546,2.567c0.242,0.249,0.652,0.065,0.652-0.27v-2.298h1.533c0.211,0,0.383-0.172,0.383-0.382V4.063C18.042,3.853,17.87,3.681,17.659,3.681 M11.148,12.87H6.937c-0.102,0-0.199,0.04-0.27,0.113l-2.028,2.025v-1.756c0-0.211-0.172-0.383-0.383-0.383H2.724V7.51h5.361v2.68c0,0.21,0.172,0.382,0.383,0.382h2.68V12.87z M17.276,9.807h-1.533c-0.211,0-0.383,0.172-0.383,0.383v1.755L13.356,9.92c-0.07-0.073-0.169-0.113-0.27-0.113H8.851v-5.36h8.425V9.807z"></path></svg></span><span>最新嘀咕：</span><a href="https://eallion.com/talk/" target="_blank">'+item.content+'</a></p></li>')
  });
  if(page*per >= count){
  $('.load').remove()
  return
  }
  page++
    });
    }
    $('.button-load').click(function(){getList()})
}).catch(err => {
    console.log(err)
});

// 首页嘀咕
$(function(){
	//实现循环滚动
	function Roll (){
		var newFrist = $('.popup').children().first().clone(true);
		$('.popup').append(newFrist);
		$('.popup').children().first().remove();
		};
		var clock = setInterval(Roll,2500000);
	//点击关闭滚动窗口
	$('button').click(function(){
		$(this).parents('.index-talk').remove();
	});
});
	鼠标悬浮时滚动暂停
	$('.link').mouseover(function(){
		clearInterval(clock);
	});
	//鼠标离开重启定时器
	$('.link').mouseout(function(){
		clock = setInterval(Roll,2500000);
	});
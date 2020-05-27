
  //轮播图
  if($('#homeSlider').length>0){
  var detailSwiper = new Swiper('#homeSlider',{
    loop:true,       //循环切换
    autoplay: 5000,  //自动播放
    //autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
    pagination:'.swiper-pagination', //分页
    paginationClickable: true,
    //effect : 'coverflow',
  });
  };

  
var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数


//发现页查看更多
$(".find-list .more-btn").on('click',function(){
  findList(pageIndex,listNum);
  pageIndex++;
});

//首页查看更多
$(".home-list .more-btn").on('click',function(){
  homeList(pageIndex,listNum);
  pageIndex++;
});

//首页列表数据(和发现数据方法一样)
function homeList(pageIndex,listNum){

}
//发现数据
function findList(pageIndex,listNum){
  var json_data = $.ajax({
      type: "GET",
      async: false,
      url: "data/find_list.json?pageindex="+ pageIndex +"&pagesize="+listNum,
      dataType: "json",
      success: function (data) {
        var data = data.result;
        var totalCount = data.count;
        pageTotalNum = Math.ceil(totalCount/listNum);
        //列表下拉加载数据
        if(pageIndex >= pageTotalNum){
          // 无数据
          console.log('无数据');
          return false;
        }
        var result = '';
        $.each(data["list"],function(i,info){
          result += '<div class="find-list">';
          result += '<a href="">';
          result += '<div class="img-box">';
          result += '<i class="type type2">'+info.type+'</i>';
          result += '<img src='+info.images + ' />';
          result += '</div>';
          result += '<div class="des-box clr">';
          result += '<p>'+info.title+'</p>';
          result += '<ul class="other-info">';
          result += '<li><img src="images/time_icon.png">'+info.time+'</li>';
          result += '<li><img src="images/address_icon.png">'+info.address+'</li>';
          result += '</ul>';
          result += '<span class="progress-btn going">'+info.status+'</span>';
          result += '</div>';
          result += '</a>';
          result += '</div>';
        });
        // 为了测试，延迟0.3秒加载
        setTimeout(function(){
           $('.find-list-box').append(result);
          // 每次数据加载完，必须重置
        },300);
      },
      error: function(){
        alert('Ajax error!');
      }
    });
}



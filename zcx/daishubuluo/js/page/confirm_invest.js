//同意
$(".hope-select-btn").click(function(){
  $(this).toggleClass("cur");
});

//风险说明
$(".risk-arrow").on('click',function(){
  if($(this).hasClass('cur')){
    $(this).removeClass('cur');
    $('.risk-info-txt').css({'max-height':'18px'});
  }else{
    $(this).addClass('cur');
    $('.risk-info-txt').css({'max-height':'none'});
  }
});

//风险说明
$(".cost-info-help").on('click',function(e){
  
  e.stopPropagation();
  $('.mask').show();
  $('.js-cost-help-pop').addClass('show');
});
$('.pop-close-btn,.mask').on('click',function(e){
  e.stopPropagation();
  $('.mask').hide();
  $('.js-cost-help-pop').removeClass('show');
  
});

$('.js-invest-btn').on('click',function(e){
  e.preventDefault();
  var case1 = $('.js-addr-btn').hasClass('selected');
  var case2 = $('.js-email-btn').hasClass('selected');
  var case3 = $('.hope-select-btn').hasClass('cur');
  if(!case1){
    return jShare('请选择邮寄地址',"","");
  }
  if(!case2){
    return jShare('请选择电子邮件',"","");
  }
  if(!case3){
    return jShare('请阅读并同意相关规则',"","");
  }
  alert('投资成功',"","");
  
});

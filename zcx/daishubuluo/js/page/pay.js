//档位份额不足
$('.pop-close-btn,.mask').on('click',function(e){
  e.stopPropagation();
  $('.mask').hide();
  $('.js-money-tip-pop').removeClass('show');
  
});

$('.js-money-btn').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var payMoneyNum = parseInt($('.pay-money-num').html());
  var userMoneyNum = parseInt($('.user-money-num').html());
  if(payMoneyNum>userMoneyNum){
    $('.mask').show();
    $('.js-money-tip-pop').addClass('show');
  }else{
    alert('支付成功');
  }
});

//点击下一步按钮
$('.js-recharge-btn').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('#rechargeNum').val().length;
  var case2 = $('.js-pay-mode').hasClass('selected');
  if(!case1){
    return jShare('输入金额格式不对',"","");
  }
  if(!case2){
    return jShare('请选择支付方式',"","");
  }
  alert("下一步");
});


//银行卡保存按钮
$('.js-card-info-submit-btn').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('.js-pay-mode-select').hasClass('selected');
  var case2 = $('#cardNum').val().length;
  if(!case1){
    return jShare('请选择银行',"","");
  }
  if(!case2){
    return jShare('请输入卡号',"","");
  }
  alert("成功");
});


$(".js-pay-mode-select").on('click',function(e){
    $("#card_layer").show();
    
});
$("#card_layer ul").on('click',"li",function(e){
    $(this).addClass('cur').siblings().removeClass('cur');
    var cardTxt = $(this).html();
    setTimeout(function(){
      $('.js-pay-mode-select em').html(cardTxt).parent().addClass('selected');
      $("#card_layer").hide();
    },500);
    
    
});
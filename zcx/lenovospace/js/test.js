$(document).ready(function() {
	
	  var num=1;
	  var totalScore=0;
	  var testId=$('.test-id').attr('name');
	  var current_id=1;
	  var max=$('.test_box').length;
	  $("#test_box_1").show();

      var questionvalue="";
	  $('.js-next-btn').on('click',function(){
		  var radioVal = $("#test_box_"+num).find("input[type='radio']:checked");
		  var checkedVal = $("#test_box_"+num).find("input[type='checkbox']:checked");
		  var yesContentVal = $(".yes-content-box").find("input[type='radio']:checked");
		  var radioVal601 = $("#test_box_6 .select-box").eq(0).find("input[type='radio']:checked");
		  var radioVal602 = $("#test_box_6 .select-box").eq(1).find("input[type='radio']:checked");
		  var radioVal603 = $("#test_box_6 .select-box").eq(2).find("input[type='radio']:checked");
		  var radioVal701 = $("#test_box_7 .select-box").eq(0).find("input[type='radio']:checked");
		  var radioVal702 = $("#test_box_7 .select-box").eq(1).find("input[type='radio']:checked");
		  
		  
          var radiostr="";
          checkvalue="";
          if(radioVal.length>1)
          {
               for (var i = 0; i < radioVal.length; i++) {
                var chaeckes=radioVal[i];
                radiostr+=chaeckes.value+",";
              }
              questionvalue+=radiostr+"|";
          }
          else  if(radioVal.length==1){
              var chaeckes=radioVal[0];
              radiostr=chaeckes.value;
              questionvalue+=radiostr+"|";
          } 
         
         if(checkedVal.length>0){
              for (var i = 0; i < checkedVal.length; i++) {
                var chaeckes=checkedVal[i];
                checkvalue+=chaeckes.value+","; 
              }
               questionvalue+=checkvalue+"|";
          }
		  if(num==5){
			   if(yesContentVal.length<=0){
				  tipSelectedShow();
				  var hideTime = setTimeout(tipSelectedHide,1000); 
				  return;
			   }
			} 
		 
		 if(num==6){
			   if(radioVal601.length<=0||radioVal602.length<=0||radioVal603.length<=0){
				  tipSelectedShow();
				  var hideTime = setTimeout(tipSelectedHide,1000); 
				  return;
			   }
		  } 
		  if(num==7){
			   if(radioVal701.length<=0||radioVal702.length<=0){
				  tipSelectedShow();
				  var hideTime = setTimeout(tipSelectedHide,1000); 
				  return;
			   }
		  } 	
		  
		  if(radioVal.length>0||checkedVal.length>0){
			 //flag=false;
			 
			  $("#test_box_"+num).hide();
			  num++;
			  $('.progress').width(12.5*num+'%');
			  $('.number-current').text(num);
			  $("#test_box_"+num).show();
			  
			  if(num==5){
				 $('.js-next-btn').hide();
			  } 
			  
			  if(num>=max){
				 $('.js-next-btn').hide();
				 $('.js-submit-btn').show();
			  }
		  }else{
			  tipSelectedShow();
			  var hideTime = setTimeout(tipSelectedHide,1000);
		  } 
	  }); 
      $('.js-submit-btn').on('click',function(){
			  var checkedVal = $("#test_box_8").find("input[type='checkbox']:checked").val();
              questionvalue+=checkedVal;
			  if(checkedVal!=undefined){
              var dw=$("#company").val();
              var name=$("#name").val();
               var bm=$("#department").val();
              var zw=$("#post").val();
               var phone=$("#phone").val();
              var wx=$("#weChatId").val();
               var yx=$("#email").val();
               var OpenID = getCookie("newweixinOpenID");

               var tjcon="dw="+dw+"&name="+name+"&bm="+bm+"&zw="+zw+"&phone="+phone+"&wx="+wx+"&email="+yx+"&wjdc="+questionvalue+"&openid="+OpenID;
               $.ajax({url:"/Mobile/question.ashx?"+tjcon});
              console.log(questionvalue) 
				 $('.calculateing').show();
				 setTimeout(function(){
					 //window.location.href="index.aspx";
				 },2000);
                 return;
			   }else{
					tipSelectedShow();
					var hideTime = setTimeout(tipSelectedHide,1000);
				}
		  });
	  
	  function tipSelectedShow()
	  {
		  $('.tip-selected').show();
	  }
	  
	  function tipSelectedHide()
	  {
		  $('.tip-selected').hide();
	  }
	  
	  
	  
	  
	  $("#form").validate({
		  //自定义验证规则
		  rules:{
			  email: {
				  required: true,
			  },
			  phone: {
				  required: true,
			  },
			  
		  },
		  //错误信息提示
		  errorPlacement:function(error,element){
			  error.appendTo(element.parent().next(".error_tip"));
		  }
	  });
	  
	  $.validator.addMethod('phone', function( value, element ){
		  var eng = /^1\d{10}$/;
		  return this.optional(element) || (eng.test(value));
	  }, '请输入正确的电话');
	  
	  $.validator.addMethod("isEng", function(value, element) {
		  var eng = /^[A-Za-z]+$/;
		  return this.optional(element) || (eng.test(value));
	  }, "请正确填写内容");
	  
	  
	  $(".js-user-btn").click(function(){
		  if($("#form").valid()){
		   //$("#form").submit();
		   $('.test_middle').show();
		   $('.user-box').hide();
		  }
	  });
	 $(".js-close-btn").on('click',function(){
		  $('.calculateing').hide();
	  });
	  
	  $(".yes-btn").on('click',function(){
		  $('.yes-content-box').show();
	      $('.yes-box').hide();
		  $('.js-next-btn').show();
	  });
	  $(".no-btn").on('click',function(){
		  $('.js-next-btn').show();
		  $("#test_box_5").hide();
		  num++;
		  $('.progress').width(12.5*num+'%');
		  $('.number-current').text(num);
		  $("#test_box_"+num).show();
		  
	  });
	  
	  
	
});





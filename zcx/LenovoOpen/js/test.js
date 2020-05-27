$(document).ready(function() {
	
	  var num=1;
	  var totalScore=0;
	  var testId=$('.test-id').attr('name');
	  var current_id=1;
	  var max=$('.test_box').length;
	  $("#test_box_1").show();

	  $('.js-next-btn').on('click',function(){
		  var radioVal = $("#test_box_"+num).find("input[type='radio']:checked").val();
		  var checkedVal = $("#test_box_"+num).find("input[type='checkbox']:checked").val();
		  if(radioVal!=undefined||checkedVal!=undefined){
			 //flag=false;
			  $("#test_box_"+num).hide();
			  num++;
			  $('.progress').width(10*num+'%');
			  $('.number-current').text(num);
			  $("#test_box_"+num).show();
			  console.log(num);
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
		  var radioVal = $("#test_box_10").find("input[type='radio']:checked").val();
		  if(radioVal!=undefined||checkedVal!=undefined){
			/*$.ajax({
					   type: "POST",
					   url: "",
					   data: "",
					   success: function(data){
						  
					   }
				   });*/
			 $('.calculateing').show();
			 setTimeout(function(){
				 window.location.href="index.html";
			 },2000);
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
	  
	 
	
});





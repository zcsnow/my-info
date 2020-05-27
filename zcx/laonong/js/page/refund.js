$(function(){
	var li_length = 0;
	$('.img-num').text(li_length);
	$('#file').change(function() { 
		if(li_length<10){
			var file = this.files[0]; 
			console.log(file.name);
			var r = new FileReader(); 
			r.readAsDataURL(file); 
			$(r).load(function() { 
				var div_img = '<div class="img-list"><img src="' + this.result + '" alt="" /><a href="javascript:;" class="delete-btn"><img src="images/icon02.png" /></a></div>';
				$('.fuc').before(div_img);
				li_length = $('.upload-list li').length;
				$('.img-num').text(li_length);
				
			});
		}else{
		  alert('最多能上传10张图片');
		}
	});
	
	$('.upload-list').on('click','.delete-btn',function(e){
	  e.stopPropagation();
	  $(this).parent().remove();
	  li_length = $('.upload-list li').length;
	  $('.img-num').text(li_length);
	});
	
	
});
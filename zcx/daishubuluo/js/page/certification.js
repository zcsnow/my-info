//选择收货地址
  var addrTxt,thisCon,content,that,obj,prev,thatDl;
  $("#select_area").click(function(){
    $("#area_overlay").height($(document).height());
    $("#area_overlay, #area_layer").show();
    addrTxt = [];
    return false;
  });
  var title = $("#area_layer h3");
  var prev = $(".prev_btn");
  var obj = $("#area_layer dd  a");     
  var content = $("#area_layer dl");
  $("#area_layer dd a").click(function(){
    
    that = $(this);     
    
    thisCon = that.closest("dl");
    
    obj.removeClass("cur"); 
    that.addClass("cur");
    thatDl = thisCon;
      
    //选择结果
    addrTxt.push(that.text());
    setTimeout(function(){
      
      if(thisCon.next("dl").length > 0){
        prev.show(); // 返回上一级
        content.hide();
        thisCon.next("dl").show();
        title.html(thisCon.next("dl").attr("title"));
        
      }else{
        //返回初始状态
        content.hide();
        $("#area_overlay, #area_layer").hide();
        $("#area_layer dl:first").show();
        title.html($("#area_layer dl:first").attr("title"));
                
        $("#select_area").val(addrTxt.join(" "));       
      }
      
    }, 300);
    return false;
    
  });
  
  //返回上一级 
  $(".prev_btn").click(function(){    
    setTimeout(function(){  
        if(title.html() == "地区选择" && $('#area_province').css('display')=="block"){  
        $("#area_layer, #area_overlay").hide();
        return false;
      }     
      addrTxt.pop();
      content.hide();
      thatDl.show();
      thatDl.find("a").removeClass("cur");
      title.html(thatDl.attr("title"));
      thatDl = thatDl.prev("dl");
      console.log($('#area_province').css('display'));
      
    }, 300);
    return false;
    
  });


$(".certification-select-list").on('click',"li",function(e){
    $(this).addClass('cur').siblings().removeClass('cur');
    
});

//企业认证
$('.js-certification-info-submit').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('#company_name').val().length;
  var case2 = $('#legal_person_name').val().length;
  var case3 = $('#legal_person_id').val().length;
  var case4 = $('#contact_name').val().length;
  var case5 = $('#contact_phone').val().length;
  var case6 = $('#business_license').val().length;
  var case7 = $('#organization_code').val().length;
  var case8 = $('#business_tax').val().length;
  var case9 = $('#select_area').val().length;

  if(!case1){
    return jShare('请输入企业名称',"","");
  }
  if(!case2){
    return jShare('请输入法人真实姓名',"","");
  }
  if(!case3){
    return jShare('请输入法人身份证',"","");
  }
  if(!case4){
    return jShare('请输入联系人姓名',"","");
  }
  if(!case5){
    return jShare('请输入联系方式',"","");
  }
  if(!case6){
    return jShare('请输入公司的营业执照号',"","");
  }
  if(!case7){
    return jShare('请输入组织机构代码',"","");
  }
  if(!case8){
    return jShare('请输入企业税号',"","");
  }
  if(!case9){
    return jShare('请选择所属地区',"","");
  }
  alert("成功");
});

//个人认证
$('.js-certification-info-submit2').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('#user_name').val().length;
  var case2 = $('#user_id').val().length;

  if(!case1){
    return jShare('请输入真实姓名',"","");
  }
  if(!case2){
    return jShare('请输入身份证号码',"","");
  }
  
  alert("成功");
});

//同意
$(".hope-select-btn").click(function(){
  $(this).toggleClass("cur");
});

//多选
$(".js-multiselect-list").on('click',"li",function(e){
    $(this).toggleClass('cur');
    
});

//单选
$(".js-radio-list").on('click',"li",function(e){
    $(this).addClass('cur').siblings().removeClass('cur');
    
});



//投资评估提交
$('.js-evaluation-btn1').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('#investment_scale').val().length;
  var case2 = $('#investment_val').val().length;
  var case3 = $('#investment_dir li').hasClass('cur');


  if(!case1){
    return jShare('请输入投资规模',"","");
  }
  if(!case2){
    return jShare('请输入单项目投资金额',"","");
  }
  if(!case3){
    return jShare('请选择关注方向',"","");
  }
  
  alert("成功");
});

//风险评估提交
$('.js-evaluation-btn2').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('#risk_select1 li').hasClass('cur');
  var case2 = $('#risk_select2 li').hasClass('cur');
  var case3 = $('#risk_select3 li').hasClass('cur');
  var case4 = $('#risk_select4 li').hasClass('cur');
  var case5 = $('#risk_select5 .hope-select-btn').hasClass('cur');
  var case6 = $('#risk_select6 .hope-select-btn').hasClass('cur');
  if( case1 && case2 && case3 && case4 && case5 && case6 ){
    return jShare('认证通过',"","");
  }else{
    return jShare('还有未选择项',"","");
  }

});


//上传证件提交
$('.js-unload-submit').on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  var case1 = $('#upload_business_license').val().length;
  var case2 = $('#upload_organization_code').val().length;
  var case3 = $('#upload_business_tax').val().length;
  if( case1 && case2 && case3){
    return jShare('认证通过',"","");
  }else{
    return jShare('还有选项未选择',"","");
  }

});


$('.real-btn').change(function() { 
    var file = this.files[0]; 
    var r = new FileReader(); 
    r.readAsDataURL(file); 
    var that = $(this);
    $(r).load(function() { 
      //console.log(this.result);
      that.parent().find('.show-img').show().find('img').attr('src',this.result);
      that.next('.upload-icon').css('background-image','none').find('img').hide();

      
    });
});
;(function(){
    var player_name = $('#player-name');
    var test_btn = $('#player-test-btn');
    var play_btn = $('#player-play-btn');
    var player_container = $('#player-container');
    var player_tip = $('#player-tip');

    var video_name,
        video_url,
        canPlay;

    //检测按钮点击处理函数
    test_btn.on('click',function(e){
        canPlay = false;
       if(player_name.val() && player_name.val() != ""){
           video_name = player_name.val();
            $.ajax({
                url:'/player-name-test',
                type:'post',
                data:{player_name:player_name.val()},
                dataType:'json',
                success:function(data){
                   if(data){
                       console.log(data)
                       if(data.exist){
                           canPlay = true;
                           setClickable(play_btn,true);
                           setClickable(test_btn,true);
                           video_url = data.url;
                           player_tip.html('视频存在，可正常播放，视频名为 :' + video_name);
                       }else{
                           alert('视频不存在，请输入正确的视频名称！');
                           setClickable(test_btn,true);
                           player_tip.html('播放前请检测视频是否存在，如不存在则无法正常播放！');
                       }
                   }
                },
                error:function () {
                    alert('检测视频异常！');
                    player_tip.html('播放前请检测视频是否存在，如不存在则无法正常播放！');
                }
            });
           setClickable(test_btn,false);
       } else{
           alert('请输入需要检测的视频文件名！');
           player_tip.html('播放前请检测视频是否存在，如不存在则无法正常播放！');
       }
    });
    //播放按钮点击处理函数
    play_btn.on('click',function(e){
        if(canPlay){
            setHide(player_container,true);
            var myPlayer = videojs('my-video');
            myPlayer.ready(function() {
                this.src({
                    src: video_url,
                    //type: 'video/mp4'
                    type: 'application/x-mpegURL'
                });
                this.play();
            });
        }else{
            alert('视频不存在，请输入正确的视频名称！');
        }

    });
})();
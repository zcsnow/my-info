;$(function(){

  
  $('.js-vote-btn').bind("click", function(){
  		var voteNum = $(this).next('.vote-num').find('strong').text();
		voteNum++;
		$(this).addClass("vote-btned");
		$(this).next('.vote-num').find('strong').text(voteNum);
		$(this).unbind("click");
  });
  
  $(".js-play-btn").click(function(e){
	  e.preventDefault();
	  var soundSrc = $(this).attr('data-sound'); 
	  $('#media').attr('src',soundSrc);
	  $("#media")[0].play();
	  //$("#media")[0].pause();
  });
  


});
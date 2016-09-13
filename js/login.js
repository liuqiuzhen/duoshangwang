
//左侧的轮播

$(function(){
	var $aLi = $(".op-lun li");
	var i =0;
	var timer = setInterval(move,3000);
	$aLi[0].style.opacity = "1";
	function move(){
		i++;
		if(i == $aLi.length){
			i = 0;
		}
		for(var j =0;j<$aLi.length;j++){
			$aLi[j].style.opacity = "0";
		}
		$aLi.eq(i).animate({opacity:"1"},500);
	}	

})





















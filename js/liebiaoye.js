
//鼠标滑过时的显示隐藏
	$(function(){
		$(".left-nav h2").each(function(){
			$(this).hover(function(){
				$(this).addClass("active").find(".list01").show();
			},function(){
				$(this).removeClass("active").find(".list01").hide()
			})
		})
		//banner区的轮播图
		
		move1();
		function move1(){
			$(".lunbo01 li").clone().appendTo($(".lunbo01"));
			var perw = $(".lunbo01 li").eq(0).width();
			$(".lunbo01").css("width",$(".lunbo01 li").length*perw);
			var i = 0;
			var timer = setInterval(move,3000);
			function move(){
				//console.log(i);
				if(i == $(".lunbo01 li").length/2){
					console.log(i);
					$(".lunbo01").css({"left":0});
					i = 0;					
					$(".num01 li").eq(0).addClass("active").siblings().removeClass("active");	
				}else{
					i++;
					$(".num01 li").eq(i).addClass("active").siblings().removeClass("active");
				}
//				if(i==$(".lunbo01 li").length/2){
//					$(".num01 li").eq(0).addClass("active").siblings().removeClass("active");
//				}else{
//					$(".num01 li").eq(i).addClass("active").siblings().removeClass("active");
//				}

				$(".lunbo01").stop().animate({"left":-perw*i+"px"},500);
			}
			$("#prev").click(function(){
				clearInterval(timer);
				if(i == 0){
					i = $(".lunbo01 li").length/2 - 2;
					$(".lunbo01").css("left",-perw*$(".lunbo01 li").length/2);
				}else{
					i= i-2;
				}
				move();
				timer = setInterval(move,3000);
			})
			$("#next").click(function(){
				clearInterval(timer);
				move();
				timer = setInterval(move,3000);
			})
			
			$(".lunbo01").mouseenter(function(){
				clearInterval(timer);
			})
			$(".lunbo01").mouseout(function(){
				timer = setInterval(move,3000)
			})
			$(".num01 li").click(function(){
				clearInterval(timer);
				i = $(this).index()-1;
				move();
				timer = setInterval(move,3000)
			})	
		}
		//点击友情连接的小按钮让其显示
		$(".zhankai").click(function(){
			$(this).find(".iconfont").html("&#xe612;");
			if($(".clear").height()==0){
				$(".clear").show().animate({"height":"30px"})
			}else{
				$(".zhankai").find(".iconfont").html("&#xe613;");
				$(".clear").animate({"height":"0px"},function(){
					$(this).hide();
				})
			}
			
		})
	})
	




































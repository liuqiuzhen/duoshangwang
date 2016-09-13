$(function(){
	//通过id地址该页面的内容
	var	oId =  window.location.search.split("?")[1];	
	$.ajax({
		type:"get",
		url:"shuju/goods.json",
		async:true,
		success:function(data){
			for(var i =0;i<data.length;i++){
				if(data[i].id == oId){
					//上面移入span的图片
					$(".small-pic li").each(function(){
						var index = $(this).index();
						$(this).find("img").attr("src",data[i].picList[index].img);
					})
					$(".big-pic li").each(function(){
						var index = $(this).index();
						$(this).find("img").attr("src",data[i].picList[index].img);
					})
					//下面的小图片列表
					$(".pic-list li").each(function(){
						var index = $(this).index();
						$(this).find("img").attr("src",data[i].small[index].img);
					})
					$(".details .title").html(data[i].title);
					$(".sel-l-r .fen-price").html("￥"+data[i].price);
					$(".lingshow").html("￥"+data[i].price);
					$(".zuidi").html("￥"+data[i].jyls);
					
					$(".dpm").html(data[i].store);
					$(".mashu").html(data[i].size);
					for (var j =0;j<data[i].leibie.length;j++) {
						//var nEle = $("<li class='leibie'>"++"</li>");
						$(".item-de-one li").eq(j).html(data[i].leibie[j]);
						
					}	
				}
			}
		}
	});
	
	$(".item-de-one li").each(function(){
		
	})
	
	$(".jia").click(function(){
		var num = $(".geshu").val();
		++num;
		$(".geshu").attr("value",num);
	})
	
	$(".jian").click(function(){
		var num = $(".geshu").val();
		
		if(num == 0){
			num = 1;
			alert("请最少选择一件")
		}else{
			--num;
		}
		$(".geshu").attr("value",num);
	})

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
	//鼠标滑过时的显示隐藏
	$(".ofenlei").mouseover(function(){
		$(this).find(".iconfont").eq(0).html("&#xe60f;").end();
		$(this).find(".left-nn").show();
		$(".left-nn h2").mouseover(function(){
			$(this).addClass("active").find(".list01").show().end().find(".zuoce").show();
			
		});
		$(".left-nn h2").mouseout(function(){
			$(this).removeClass("active").find(".list01").hide().end().find(".zuoce").hide();
		});
	})
	$(".ofenlei").mouseout(function(){
		$(this).find(".iconfont").eq(0).html("&#xe610;");
		$(this).find(".left-nn").hide();
	})
	
	
	//先让其移入时切换图片
	$(".pic-list li").mousemove(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".small-pic li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		$(".big-pic li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		var num = $(this).index();	
		//给详情页的图片添加放大镜效果
		/*$(".small-pic").mousemove(function(e){
			$(".hov").show();
			var evt = e||event;
			var lefts = evt.clientX - $(this).offset().left  - $(".hov").outerWidth()/2  +"px";
			var tops = evt.clientY  -$(this).offset().top +$("body").scrollTop()- $(".hov").outerHeight()/2 +"px";
			
			if( lefts <=0){
				lefts = 0;
			}else if(lefts > $(this).outerWidth()- $(".hov").outerWidth()){
				lefts = $(this).outerWidth()-$(".hov").outerWidth()+"px";
				$(".hov").css({"left":lefts})
			}
			if(tops <= 0){
				tops = 0;
			}else if(tops >= $(this).outerHeight()- $(".hov").outerHeight()){
				tops = $(this).outerHeight()-$(".hov").outerHeight() +"px";
				$(".hov").css({"top":tops})
			}
			$(".hov").show().css({"left":lefts,"top":tops});		
			var x = lefts / ($(this).width() - $(".hov").width());
			var y = tops / ($(this).height() - $(".hov").height());
			
			var bLeft = x*($(".big-pic").width()-$(".big-pic li").eq(num).find("img").width())+"px";
			var bTop = y*($(".big-pic").height()-$(".big-pic li").eq(num).find("img").height())+"px";
			$(".big-pic li").eq(num).css({"left":bLeft,"top":bTop});
		})*/
		$(".small-pic").mousemove(function(e){
			$(".big-pic").show();
			var hei = $("body").scrollTop() || $("html").scrollTop();
			$(".big-pic li").eq(num).addClass("active").siblings().removeClass("active");
			var lefts = e.clientX - $(this).offset().left  - $(".hov").outerWidth()/2;
			var tops = e.clientY  -$(this).offset().top +hei- $(".hov").outerHeight()/2;
			if( lefts <= 10){
				lefts = 10;
			}else if(lefts > $(this).outerWidth()- $(".hov").outerWidth()){
				lefts = $(this).outerWidth()-$(".hov").outerWidth();
			}
			if(tops <= 10){
				tops = 10;
			}else if(tops >= $(this).outerHeight()- $(".hov").outerHeight()){
				tops = $(this).outerHeight()-$(".hov").outerHeight();
			}
			$(".hov").show().css({"left":lefts,"top":tops});		
			var x = lefts / ($(this).width() - $(".hov").width());
			var y = tops / ($(this).height() - $(".hov").height());	
			var bLeft = x*($(".big-pic").width()-$(".big-pic li").eq(num).find("img").width())+"px";
			var bTop = y*($(".big-pic").height()-$(".big-pic li").eq(num).find("img").height())+"px";
			$(".big-pic li").eq(num).css({"left":bLeft,"top":bTop});
		})
		$(".small-pic").mouseout(function(){
			$(".hov").hide();
			$(".big-pic").hide();
		})
	})
	
	$(".small-pic").mousemove(function(e){
		$(".big-pic").show();
		$(".big-pic li").eq(0).addClass("active");
		var hei = $("body").scrollTop() || $("html").scrollTop();
		var lefts = e.clientX - $(this).offset().left  - $(".hov").outerWidth()/2;
		var tops = e.clientY  -$(this).offset().top + hei- $(".hov").outerHeight()/2;
		if( lefts <= 10){
			lefts = 10;
		}else if(lefts > $(this).outerWidth()- $(".hov").outerWidth()){
			lefts = $(this).outerWidth()-$(".hov").outerWidth();
		}
		if(tops <= 10){
			tops = 10;
		}else if(tops >= $(this).outerHeight()- $(".hov").outerHeight()){
			tops = $(this).outerHeight()-$(".hov").outerHeight();
		}
		$(".hov").show().css({"left":lefts,"top":tops});		
		var x = lefts / ($(this).width() - $(".hov").width());
		var y = tops / ($(this).height() - $(".hov").height());	
		var bLeft = x*($(".big-pic").width()-$(".big-pic li").eq(0).find("img").width())+"px";
		var bTop = y*($(".big-pic").height()-$(".big-pic li").eq(0).find("img").height())+"px";
		$(".big-pic li").eq(0).css({"left":bLeft,"top":bTop});
	})
	$(".small-pic").mouseout(function(){
		$(".hov").hide();
		$(".big-pic").hide();
	})
	
	
	//使用教程
	$(".sj li").each(function(){
		$(this).hover(function(){
			$(this).find(".jiaocheng").show().animate({"height":"79px"});	
		},function(){
			$(this).find(".jiaocheng").animate({"height":"0px"},function(){
				$(this).hide();
			})
		})
	})	
	
	var  nH = $(".huadong").offset().top;
	$(document).scroll(function(){
		var scrollH = $("body").scrollTop() || $("html").scrollTop();
		if(scrollH >nH){
			$(".huadong-nav").show();		
		}else if(scrollH < nH){
			$(".huadong-nav").hide();
		}
	})
	$(".huadong-nav li").each(function(){
		$(this).click(function(){
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			var scro = $(".hua-erji").eq(index).offset().top-40;
			$("body , html").animate({"scrollTop":scro},500);
		})
	})
	
	
	$(".huadong li").each(function(){
		$(this).click(function(){
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			var scro = $(".hua-erji").eq(index).offset().top;
			//console.log(scro);
			$("body , html").animate({"scrollTop":scro},500);
		})
	})
	
	//全选上架商品加小轮播
	var perw = $(".picList-left dl").eq(0).outerWidth()+30;
	$(".picList-left").css({"width":perw*6 + "px"});
	$(".next").click(function(){
		if($(".picList-left").position().left == 0){
			$(".picList-left").animate({"left":-perw+"px"});
		}else{
			$(".picList-left").animate({"left":"0px"});
		}
		
	})
	$(".prev").click(function(){
		if($(".picList-left").position().left == 0){
			$(".picList-left").animate({"left":-perw+"px"});
		}else{
			$(".picList-left").animate({"left":"0px"});
		}
	})
	
	//全选按钮
	var a = 0;
	$(".saleqs").each(function(){
		$(this).click(function(){
			if($(this).index()!= 0){
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
					a--;
				}else{
					a++;
					$(this).addClass("selected");	
				}
				check();
			}else{
				if($(this).hasClass("selected")){
					a = 0;
					$(this).removeClass("selected");
					$(".saleqs").removeClass("selected");
				}else{
					a = $(".saleqs").length-2;
					$(this).addClass("selected");
					$(".saleqs").addClass("selected");
				}
				check();
			}
		})
		
		function check(){
			if(a == $(".saleqs").length-2){
				$("#all_select").addClass("selected");
			}else{
				$("#all_select").removeClass("selected");
			}
		}
	})
	
	//遮罩
	$(".zhezhao").css({"height":$("body").height()})
	$(".modal").css({"top":$("#all_on_sale").offset().top})
	var num  =0;
	$("#all_on_sale").click(function(){
		for(var i =0;i<$(".saleqs").length;i++){
			if($(".saleqs").eq(i).hasClass("selected")){
				num++;
			}
		}
		if(num ==0){
			alert("请选择商品");
		}else{
			$(".zhezhao").show();
			$(".modal").show().css({"height":"294px"}).animate({"opacity":"1"},1000,function(){
			});
		}
	})	
	$(".close").click(function(){
		$(".zhezhao").hide();
		$(".modal").animate({"height":"0"},500,function(){
			$(this).hide().css({"opacity":"0.3"});
		});
	})
	
//	$(".modal").mousedown(function(e){
//		var lefts = e.clientX -$(".modal").offset().left;
//		var tops = e.clientY -$(".modal").offset().top;
//		$(document).mousemove(function(e){
//			var l = e.clientX - lefts - $(".modal").outerWidth()/2;
//			var t = e.clientY - tops - $(".modal").outerHeight()/2;
//			var w = e.pageX- $(".modal").outerWidth();
//			var h = e.pageY- $(".modal").outerWidth();
//			console.log(l,t);
//			if( l <= 0){
//				l = 0;
//			}else if(l > w){
//				l = w;
//			}
//			if(t <= 0){
//				t = 0;
//			}else if(t >= h){
//				t =h;
//			}
//			$(".modal").css({"left":l,"top":t});		
//		})
//		
//	})
//	$(".modal").mouseup(function(){
//		$(document).mousemove() == null;
//	})


	
	//添加详情页的图片
	$.ajax({
		type:"get",
		url:"shuju/xiangqing.json",
		async:true,
		success:function(data){
			var oPicheight = 0;
			for (var i = 0;i<data.length;i++) {
				var newEle = $("<img src="+data[i].img+"/>");
				$("#pics").append(newEle);
			}
		}
	});
	//点击弹出更多的搜索框
	$(".popup_more").click(function(){
		$(".fenxiang-more").show();
	})
	$(".fenxiang-more-close").click(function(){
		$(".fenxiang-more").hide();
	})
})	



window.onload = function(){
	var oTil = document.getElementById("title");
	var oDiv = document.getElementById("modal");
	//让弹出的div框可拖动
	oTil.onmousedown = function(e){
		var evt = e||event;
		var left = evt.clientX - oDiv.offsetLeft;
		var t= evt.clientY - oDiv.offsetTop;
		document.onmousemove = function(e){
			var evt = e||event;
			var w = document.documentElement.clientWidth - oDiv.offsetWidth;
			//var h = document.documentElement.clientHeight - oDiv.offsetHeight;
			var h = $("body").outerHeight() - oDiv.offsetHeight;
			var x =  evt.clientX - left ;
			var y = evt.clientY -t;
			
			if(x<0){
				x = 0;
			}else if(x > w){
				x = w;
			}
			if(y < 0){
				y = 0;
			}else if(y>h){
				y =h;
			}
			oDiv.style.left = x + "px";
			oDiv.style.top = y + "px";
		}
		//aInput[2].onclick;
	}
	oTil.onmouseup = function(){
		document.onmousemove = null;
	}
	oTil.onmouseout = function(){
		document.onmousemove = null;
	}
}
















$(function(){
	
	$.ajax({
		type:"get",
		url:"shuju/goods.json",
		async:true,
		success:function(data){
			for(var i =0;i<18;i++){
				var newElement = $("<dl><dt><a href='xiangqing.html?"+data[i].id+"'><img src='"+data[i].img+"'/></a></dt>"+
				"<dd><p class='prices'><strong><em class='q-pri'>¥</em>"+data[i].price+"</strong>"+
				"<span class='jy_price'><em class='q-pri'>¥</em>"+data[i].jyls+"</span></p>"+
				"<h2><a href='#' class='clr-0866b5 notip'>"+data[i].title+"</a></h2>"+
				"<p class='legend-p'><span class='mix store'><a href='#'>"+data[i].store+"</a></span>"+
				"<span class='ico-tip'><strong class='dxtip'><img src='images/ecduoserbg_15.jpg' style='opacity: 1;' />"+
				"</strong><strong class='pftip'><img src='images/ecduoserbg_17.jpg' style='opacity: 1;' /><strong/>"+
				"</span></p></dd></dl>");
				
				$(".main").append(newElement);
				if(data[i].remai != undefined){
						var newElements = $("<div class='remai'><dl><dt><a href='xiangqing.html?"+data[i].id+"'><img src='"+data[i].img+"'/></a></dt>"+
					"<dd><p class='prices'><strong><em class='q-pri'>¥</em>"+data[i].price+"</strong>"+
					"<span class='jy_price'><em class='q-pri'>¥</em>"+data[i].jyls+"</span></p>"+
					"<h2><a href='#' class='clr-0866b5 notip'>"+data[i].title+"</a></h2>"+
					"<p class='legend-p'><span class='mix store'><a href='#'>"+data[i].store+"</a></span>"+
					"<span class='ico-tip'><strong class='dxtip'><img src='images/ecduoserbg_15.jpg' style='opacity: 1;' />"+
					"</strong><strong class='pftip'><img src='images/ecduoserbg_17.jpg' style='opacity: 1;' /><strong/>"+
					"</span></p></dd></dl></div>");
					
					$(".con-right").append(newElements);
				}	
				
			}
	
			var pageNum = 1;
			//var a = 2;
			//addPic(0);
			var num = 18;//表示页面加入18个图片
			function addPic(pageNum,a){
				//console.log(pageNum);
				$(".fenye li").eq(pageNum+a).addClass("active").siblings().removeClass("active");
				$(".main").html("<dl><a href='#'><img src='images/001.jpg' /></a></dl><dl><a href='#'><img src='images/002.jpg' /></a></dl>");
				
				for(var i = (num*pageNum) ;i< num*(pageNum+1);i++){
					if(i >= data.length){
//						alert("没有更多了");
						//$(".main").append("<p>没有更多了</p>")
						return;
					}else{
						var newElement = $("<dl><dt><a href='xiangqing.html?"+data[i].id+"'><img src='"+data[i].img+"'/></a></dt>"+
						"<dd><p class='prices'><strong><em class='q-pri'></em>"+data[i].price+"</strong>"+
						"<span class='jy_price'><em class='q-pri'>¥</em>"+data[i].jyls+"</span></p>"+
						"<h2><a href='#' class='clr-0866b5 notip'>"+data[i].title+"</a></h2>"+
						"<p class='legend-p'><span class='mix store'><a href='#'>"+data[i].store+"</a></span>"+
						"<span class='ico-tip'><strong class='dxtip'><img src='images/ecduoserbg_15.jpg' style='opacity: 1;' />"+
						"</strong><strong class='pftip'><img src='images/ecduoserbg_17.jpg' style='opacity: 1;' /><strong/>"+
						"</span></p></dd></dl>");
						$(".main").append(newElement);
					}
				}
			}
			//点击按钮实现分页
			$(".fenye li").each(function(){
				var index = $(this).index();
				//表示点击的是首页
				var pageNum = 1;//表示当前显示的页数
				if(index == 0){
					$(this).click(function(){
						pageNum = 0;
						addPic(pageNum,2);
						$(".yeshu").attr("value",pageNum+1);
						$(".fenye li").eq(index).css("color","#eee")
					})
				}else if(index == 1){
					//点击的是上一页
					$(this).click(function(){
						pageNum = $(".yeshu").val();
						if(pageNum <= 1){
							pageNum = 0;
							$(".yeshu").attr("value",1);
						}else{
							--pageNum;
							$(".fenye li").eq(index).css("color","#000");
							$(".yeshu").attr("value",pageNum);
						}
						addPic(pageNum,2);
						
					})
				}else if(index == 6){
					//点击的是下一页
					$(this).click(function(){
						pageNum = $(".yeshu").val();
						console.log(pageNum);
						if(pageNum >= 4){
							pageNum = 4;
							$(".yeshu").attr("value",4);
						}else{
							pageNum++;
							$(".yeshu").attr("value",pageNum);
						}
						addPic(pageNum,1);
					})
					
				}else if(index == 7){
					//点击的是尾页
					$(this).click(function(){
						pageNum = 3;
						$(".yeshu").attr("value",pageNum+1);
						addPic(pageNum,2);
					})
					
				}else{
					//点击的是页码
					$(this).click(function(){	
						//console.log($(this).index());
						pageNum = $(this).index() -2; 
						$(".yeshu").attr("value",pageNum+1);
						addPic(pageNum,2);
					})
				}
			})
			
			//点击input输入框
			$(".queding").click(function(){			
				$(".main").html("<dl><a href='#'><img src='images/001.jpg' /></a></dl><dl><a href='#'><img src='images/002.jpg' /></a></dl>");
				pageNum = $(".yeshu").val();
				addPic(pageNum,0);
			})
			
			//根据价格区间对其进行排序
			$(".rotate-price li").each(function(){
				$(this).click(function(){
					$(".main").html("<dl><a href='#'><img src='images/001.jpg' /></a></dl><dl><a href='#'><img src='images/002.jpg' /></a></dl>");
					var lowPrice = 0;
					var highPrice = 0;
					var arr = [];
					var aPrice = parseInt($(this).find("a").html().split("-"));
					if(aPrice == 200){
						lowPrice =200;
						for(var j =0;j< data.length;j++){
							//console.log(data[j].price)
							if(data[j].price > 200){
								arr.push(data[j]);
							}	
						}
						seapric(arr);	
					}else{
						lowPrice = aPrice;
						highPrice = parseInt($(this).find("a").html().split("-")[1]);
						for(var j =0;j< data.length;j++){
							if(data[j].price >= lowPrice && data[j].price<highPrice){
								arr.push(data[j]);
							}	
						}
						seapric(arr);
					}		
				})
			})
			function seapric(arr){
				for(var i =0;i<18;i++){
					if(i >= arr.length){
						alert("没有更多了");
						return;
					}
					var newElement = $("<dl><dt><a href='xiangqing.html?"+arr[i].id+"'><img src='"+arr[i].img+"'/></a></dt>"+
					"<dd><p class='prices'><strong><em class='q-pri'>¥</em>"+arr[i].price+"</strong>"+
					"<span class='jy_price'><em class='q-pri'>¥</em>"+arr[i].jyls+"</span></p>"+
					"<h2><a href='#' class='clr-0866b5 notip'>"+arr[i].title+"</a></h2>"+
					"<p class='legend-p'><span class='mix store'><a href='#'>"+arr[i].store+"</a></span>"+
					"<span class='ico-tip'><strong class='dxtip'><img src='images/ecduoserbg_15.jpg' style='opacity: 1;' />"+
					"</strong><strong class='pftip'><img src='images/ecduoserbg_17.jpg' style='opacity: 1;' /><strong/>"+
					"</span></p></dd></dl>");								
					$(".main").append(newElement);								
				}
			}
			
			//根据输入框输入的价格搜索
			$(".sure").click(function(){
				$(".main").html("<dl><a href='#'><img src='images/001.jpg' /></a></dl><dl><a href='#'><img src='images/002.jpg' /></a></dl>");
				var arr = [];
				var lowPrice = parseFloat($(".low").val());
				var highPrice  = parseFloat($(".high").val());
				
				console.log(lowPrice,highPrice)
				
				for(var j =0;j< data.length;j++){
					if(data[j].price >= lowPrice && data[j].price<highPrice){
						arr.push(data[j]);
						console.log(data[j].price);
					}	
				}
				
				seapric(arr);
			})		
			$(".san-btn").click(function(){
				$(".main").html("<dl><a href='#'><img src='images/001.jpg' /></a></dl><dl><a href='#'><img src='images/002.jpg' /></a></dl>");
				var str = $(".txtss").val();
				var arr = [];
				
				for(var j =0;j<data.length;j++){
					console.log( data[j].title.indexOf(str)!= -1);
					console.log(data[j].store == str || data[j].title.indexOf(str)!= -1)
					if(data[j].store == str || data[j].title.indexOf(str)!= -1){
						arr.push(data[j]);
					}
				}
				console.log(arr);
				seapric(arr);
			})
		}	
	});
	
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




























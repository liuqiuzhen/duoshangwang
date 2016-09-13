	//选择衣服的类别
	//颜色分类 尺码 件数

	var  k = 0;//衣服的件数
	$(".geshu").val();//每类衣服的件数
	
	var $aLei = $(".jlei")//表格里的行数
	var $aColor = $(".color")//颜色
	var $aNum = $(".number")//数量
	var $aSize = $(".size")//码数
	var j = 0; //判断如果该表格中存在就让里面的数量增加
	var price = parseFloat($("#shuliang .price").html()).toFixed(2);
		$(".leibie").each(function(){
			$(this).click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".mashu").html();//得到码数
			var _this = $(this);
			var j = 0; //判断如果该表格中存在就让里面的数量增加
				$(".jia").click(function(){
					for (var i = 0;i< $(".color").length;i++) {
						if($(".color").eq(i).html()==_this.html()){
							if($(".color").eq(i).html() == $(".item-de-one li").filter(".active").html()){
								var nn = parseInt($(".number").eq(i).html());
								++nn;
								console.log(nn);
								$(".geshu").attr("value",nn);						
								var a = $(".geshu").val()
								$(".number").eq(i).html(a);
							}else{
								$(".number").eq(i).html();
								--nn;
							}
							j++;
						}
					}
					if(j == 0 && $(".geshu").val() >=0){
						//将内容增加到表格中
						var newTr = $("<tr class='jlei'><td class='color'>"+_this.html()+"</td><td class='number'>1</td><td class='size'>均码</td></tr>");
						$(".check").append(newTr);	
					}
					var colorElemt = $(".item-de-one .active").html();
					k++;
					$(".zongjia i").html(k);
					$(".zongjia span").html(k*price);
				})
				
				$(".jian").click(function(){
					if(parseInt($(".geshu").val()) == 0){
						//$(".geshu").attr("value",0);
						
					}else{
						var colorElemt = $(".item-de-one .active").html();
						k--;
						$(".geshu").val(k);
						$(".zongjia i").html(k);
						$(".zongjia span").html(k*price);
					}
					for (var i =0;i< $(".color").length;i++) {
						if($(".color").eq(i).html()==_this.html()){
							if($(".color").eq(i).html() == $(".item-de-one li").filter(".active").html()){
								var nn = parseInt($(".number").eq(i).html());
								--nn;
								
								$(".geshu").attr("value",nn);						
								var a = $(".geshu").val()
								$(".number").eq(i).html(a);
							}else{
								$(".number").eq(i).html();
								nn = nn-1;
							}
							j++;
						}
					}
				})
				
			})
		})

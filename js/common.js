$(function(){
	$(".daohang").hover(function(){
		$(this).find(".iconfont").html("&#xe60f;");
		if($(".left-nav1").css("display") == "none"){
			$(".left-nav1").show();
			$('.left-nav').hide();
		}else{
			$(this).find(".iconfont").html("&#xe610;");
			$(".left-nav1").hide();
			$('.left-nav').show();
		}
		
	})
	
	//鼠标滑过时的显示隐藏
	
	$(".left-nav1 h2").each(function(){
		$(this).hover(function(){
			$(this).addClass("active").find(".list01").show();
		},function(){
			$(this).removeClass("active").find(".list01").hide()
		})
	})
	//鼠标划过时显示哪个导航


	//关闭自动弹出的小框
	var oBtimer = setInterval(function(){
		//$(".box").show().animate({"bottom":"10px"},500);
	},10000)
	$(".box span").click(function(){
		$(".box").animate({"bottom":"-210px"},500,function(){
			$(this).hide();
		});
	})
	
	//扣扣在线咨询左边框显示
	
	$(".butt").click(function(){
		//在外面显示
		if($(this).find("span").html() == "《"){
			$(this).find("span").html("》");
			
			$(".butt").animate({"left":"0px"},200);
			$("#zixun").animate({"right":"-172px"},300,function(){
				$(".butt").animate({"left":"-46px"},200);
			});
		}else{
			//隐藏式
			$(this).find("span").html("《");
			$(this).animate({"left":"0px"},300,function(){
				$(".butt").animate({"left":"-36px"},200);
				$("#zixun").show().animate({"right":"0px"},300);
			})
			
		}
	})	
	//点击返回到顶部
	$(".h-top").click(function(){
		$("body , html").animate({"scrollTop":"0px"},500);
	})
	
	//调用cookie函数
	var cookieUtil ={
		setCookie:function(name,value,iDate){
			var date = new Date();
			date.setDate(date.getDate()+iDate);
			document.cookie = name+"="+value+";expires="+date+";path=/";
		},
		getCookie:function(name){
			var arr = document.cookie.split("; ");
			for(var i =0;i<arr.length;i++){
				var arr1 = arr[i].split("=");
				if(arr1[0]==name){
					return arr1[1];
				}
			}
			return "";
		},
		removeCookie:function(name){
			this.setCookie(name,1,-1);
		}
	}
	
    //表单提交
    $("#tijiao").click(function(){
    	var phone = $("#phone").valid();
    	var psw = $("#password").valid();
    	var rePsw = $("#repassword").valid();
    	var yzm = $("#yanzhengma").valid();
    	var chec = $("#check").is(":checked");
    	if(phone && psw && rePsw && yzm && chec){
    		cookieUtil.setCookie("phone",$("#phone").val(),7);
    		cookieUtil.setCookie("psw",$("#password").val(),7);	
    		$(".zhu").eq(0).hide();
    		 $(".buzou li").eq(0).removeClass("active").end().eq(1).addClass("active");
    		$(".zhu").eq(1).show();
    	}
    })
    
	$("#jiaojiao").click(function(){
		var username = $("#username").valid();
		var email = $("#email").valid();
		if(username && email){
			cookieUtil.setCookie("username",$("#username").val(),7);
    		cookieUtil.setCookie("email",$("#email").val(),7);
			$(".zhu").eq(1).hide();
    		$(".buzou li").eq(1).removeClass("active").end().eq(2).addClass("active");
    		$(".zhu").eq(2).show();
		}
	})
	
	
	//判断登录框的内容存在
	
	//点击登录按钮判断是否存在该用户
	var  n=0;
	$(".tijiao").click(function(){
		var name = $("#name").val();
		var mima = $("#password").val();
		if(name == cookieUtil.getCookie("username") && mima == cookieUtil.getCookie("psw")){
			$("#regForm").attr("action","shouye.html");
			$(".xiaoxi").show();
			$(".erro").hide();
		}else{
			$("#regForm").attr("href","#");
			$(".erro").show();
		}	
	})
				
	var name = cookieUtil.getCookie("username");
	if(cookieUtil.getCookie("username") != ""){
		$(".top-n-left span").eq(0).html("Hi~"+name);
		$("#yonghuming").html("Hi~"+name);
		$(".center").show();
		$(".quit").show();
		$(".xiaoxi").show();
		$(".tuichu").show();
		$(".pleslogin").hide();
		$(".zhuce").hide();
		$(".weideng").hide();
		$.ajax({
			type:"get",
			url:"shuju/price.json",
			async:true,
			success:function(data){
				for(var i =0;i<$(".price").length;i++){
					$(".price").eq(i).html(data[i].price)
				}
			}
		});
	}else{
		$(".center").hide();
		$(".quit").hide();
		$(".xiaoxi").hide();
		$(".tuichu").hide();
		$(".top-n-left span").eq(0).html("您好，欢迎来到多商网");
		$(".pleslogin").show();
		$(".zhuce").show();
		$(".weideng").show();
	}
	$(".tuichu").click(function(){
		console.log("a");
		cookieUtil.removeCookie("username");
		cookieUtil.removeCookie("email");
		cookieUtil.removeCookie("psw");
	})
	
	//点击加入购物车时将相应的商品添加进去
	$("#add-car").click(function(){
		var arr = [];
		var	oId =  window.location.search.split("?")[1];	
		var arrIndex = document.cookie.split("; ");
		for(var i =0;i<arrIndex.length;i++){
			var newArr = arrIndex[i].split("=");
			if(newArr[1] == "ocar"){
				if(newArr[0] == oId){
					alert("购物车中已存在该商品");
				}
			}
		}
		var leiIndex = $(".item-de-one .active").index()-1;
		
		var leibie = $(".item-de-one .active").html() +";"+ $("#shuliang .mashu").html();
		var pieces = $(".geshu").val();
		var store = $(".dpm").html();
		var arr = [];
		arr.push(leiIndex);
		arr.push(pieces);
		console.log(arr);
		
		//arr.push()
		if(pieces == 0){
			alert("至少选择一个商品");
		}else{
			cookieUtil.setCookie(oId,arr,7);
			alert("该商品加入到购物车");
		}
		//将选择的型号,衣服的个数存到cookie里面
		//var obj = {"id":leibie,"pieces":pieces,"store":store};
	})
	
		$(function () {
		var
			oSeachBox	  = $('#searchinfo'),
			oSeachContent = $('#search_text'),
			oSearchList   = $('#search_list11'),
			iSearchIndex  = -1,
			sOriHtml 	  = oSearchList.html();
		oSeachContent.focus(function () {
			oSeachContent.attr("value","")
			oSearchList.css('display', 'block');
		}).blur(function () {
			oSearchList.css('display', 'none');
		}).keyup(function (ev) {
			var
				ev = ev || window.event,
				aLi = $('#search_list11 li');
			if(ev.keyCode === 38 || ev.keyCode === 40) {
				if(ev.keyCode === 38 && iSearchIndex > 0) {
					iSearchIndex--;
				} else if(ev.keyCode === 40 && iSearchIndex < aLi.length - 1) {
					iSearchIndex++;
				}
			}
		}).bind('input propertychange', function () {
			var sSearchCon = $(this).val();
			if(sSearchCon) {
				$.ajax({
					url: 'http://www.gou.com/search/getkey.do',
					data: {
						q: sSearchCon,
					},
					type:'GET',
					jsonp: 'jsoncallback',
					dataType: 'jsonp',
					success: function (str) {
						var sHtml = '';
						sHtml = str.Content;
						sHtml+="<li>"+sSearchCon+"</li>"
						if(sHtml) {
							oSearchList.css('display', 'block').html(sHtml);
						} else {
							oSearchList.css('display', 'none');
						}
						iSearchIndex = -1;
					}
				});
			} else {
				oSearchList.html(sOriHtml);
				iSearchIndex = -1;
			}
		});
	
})
	
})

function getByclass(obj,name){
	if(document.getElementsByClassName){
		return obj.getElementsByClassName(name);
	}else {
		var allEle = obj.getElementsByTagName("*");
		var newArr = [];
		for(var i =0;i < allEle.length;i++){
			var str = allEle.className;
			var arr = str.split(" ");
			for(var j = 0; j < arr.length;j++){
				if(arr[j] == name){
					newArr.push(allEle[i]);
				}
			}
		}
	}
	return newArr;
}


























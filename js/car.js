//用cookie实现加入购物车

$(function(){
	var arrIndex = document.cookie.split("; ");
	$.ajax({
		type:"get",
		url:"shuju/goods.json",
		async:true,
		success:function(data){
		//要加入购物车的商品
			for(var i =0;i<arrIndex.length;i++){
				var newArr = arrIndex[i].split("=");
				for (var j =0;j<data.length;j++) {
					if(newArr[0] == data[j].id){
						
						
							
						var arr = newArr[1].split(",");
						var newCarshop = $("<div class='con'><h4>商城:<span class='store'>"+data[j].store+"</span></h4>"+
					"<table class='cars'><thead><tr><td>商城商品</td><td>价格</td><td>数量</td><td>小计</td>"+
					"<td>操作</td></tr></thead><tbody><tr class='shop'><td class='name'><p><img src='"+data[j].img+"'/></p>"+
					"<div class='xin'><a href='#'>"+data[j].title+"</a><span>"+data[j].size[0]+"  "+data[j].leibie[arr[0]]+"</span></div></td>"+
					"<td class='price'>￥"+data[j].price+"</td><td class='num'><span class='jians'>-</span><input type='text' value='"+arr[1]+"' class='txts'/><span class='jia'>+</span></td>"+
					"<td class='xiaoji'>￥"+data[j].price+"</td><td><span class='delete' id='"+data[j].id+"'>删除</span></td>"+
					"</tr></tbody></table><div class='goumai'><p class='zj'>商品总价:<span class='zongjia'>￥59.99</span></p><p class='g-x'>"+
					"<a href='liebiao2.html' class='jixu'>继续购物</a><a href='#' class='xiadan'>立即下单</a></p></div></div>");
					$("#car").append(newCarshop);
					}
				}
			}
		}	
	});
})

//调用cookie函数
	var cookieUtil ={
		setCookie:function(name,value,iDate){
			var date = new Date();
			date.setDate(date.getDate()+iDate);
			document.cookie = name+"="+value+";expires="+date+";path='/';";
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

window.onload = function(){
	var oCar = document.getElementById("car");
	var aJian = getByclass(oCar,"jians");//点击减少按钮
	var aCon = getByclass(oCar,"con");
	var aTbody = document.getElementsByTagName("tbody");
	var aJia = getByclass(oCar,"jia");
	var aDelete = getByclass(oCar,"delete");
	//console.log(aDelete.length,oCar);
	var aTr = getByclass(oCar,"shop");
	var aNum = getByclass(oCar,"txts");
	
	var aXiaoji = getByclass(oCar,"xiaoji");
	var allPrice = getByclass(oCar,"zongjia");
	var aDanjia = getByclass(oCar,"price");
	
	for(var j =0;j < aTbody.length;j++){
		if(aTbody[j].children.length == 0){
			oCar.removeChild(aCon[j]);
		}
	}
	//	点击删除
	del();
	function del(){
		for(var i =0 ;i<aDelete.length;i++){
			console.log("aaaaa");
			aDelete[i].index = i;
			aDelete[i].onclick = function(){
			cookieUtil.removeCookie($(this).attr("id"),-1);
			}
		}
	}
	//点击增加按钮时让里面的衣服的数量和钱数跟着改变
	addNum();
	function addNum(){
		for (var i=0;i<aJia.length;i++) {
			aJia[i].index = i;
			aJia[i].onclick = function(){
				del();
				var n = parseInt(aNum[this.index].value);
				
				aNum[this.index].value = n = n+1;
				
				var oDl= aNum[this.index].parentNode.parentNode.lastChild.firstChild.id;
				var arr = cookieUtil.getCookie(oDl).split(",");
				arr[1] = aNum[this.index].value;
				cookieUtil.setCookie(oDl,arr,7);

				var pric = (n*parseFloat(aDanjia[this.index].innerHTML.split("￥")[1])).toFixed(2);
				
				aXiaoji[this.index].innerHTML = "￥"+ pric;
				jiaGe();
			}	
		}
	}
	reduce();
	function reduce(){
		for (var i=0;i<aJian.length;i++) {
			aJian[i].index = i;
			aJian[i].onclick = function(){
				del();
				var n = parseInt(aNum[this.index].value) ;
				if(n == 0){
					alert("输入有误");
					n = 1;
					aNum[this.index].value  =1;
				}else{
					aNum[this.index].value = n-1;
				}
				var oDl= aNum[this.index].parentNode.parentNode.lastChild.firstChild.id;
				var arr = cookieUtil.getCookie(oDl).split(",");
				arr[1] = aNum[this.index].value;
				cookieUtil.setCookie(oDl,arr,7);
				
				var pric = (n*parseFloat(aDanjia[this.index].innerHTML.split("￥")[1])).toFixed(2);
				aXiaoji[this.index].innerHTML = "￥"+ pric;
				jiaGe();
			}
		}
	}
	//让小计里的钱数变化还有商品总价的钱数变化
	change();
	function change(){
		del();
		for(var i =0;i<aXiaoji.length;i++){	
			aXiaoji[i].innerHTML = "￥"+(aNum[i].value*parseFloat(aDanjia[i].innerHTML.split("￥")[1])).toFixed(2);
		}
	}
	//计算商品总价	
	function jiaGe(){
		del();
		for(var i =0;i<aTbody.length;i++){
			var aXj = getByclass(aTbody[i],"xiaoji");
			var price =0;
			for(var j =0;j < aXj.length;j++){
				price += parseFloat(aXj[j].innerHTML.split("￥")[1]);
			}
			allPrice[i].innerHTML = "￥"+price.toFixed(2);
		}
	}
	jiaGe();	
	//通过input输入框改变衣服的个数
	for(var i =0;i<aNum.length;i++){
		aNum[i].index = i;
		aNum[i].onchange = function(){
			var n = parseInt(aNum[this.index].value);
			if(n < 1){
				alert("输入有误");
				n = 1;
				aNum[this.index].value  =1;
			}
			
			var oDl= aNum[this.index].parentNode.parentNode.lastChild.firstChild.id;
				var arr = cookieUtil.getCookie(oDl).split(",");
				arr[1] = aNum[this.index].value;
				cookieUtil.setCookie(oDl,arr,7);
				
			del();
			addNum();
			reduce();
			change();
			jiaGe();
		}
	}
	
	//console.log(oCar);
	
	//判断页面中是否有本店如果有直接在后面添加
	var oCar = document.getElementById("car");
	var aCon = getByclass(oCar,"con");
	var aShop = getByclass(oCar,"shop");
	var aCars = getByclass(oCar,"cars");
	var aXiaoji = getByclass(oCar,"xiaoji");
	var allPrice = getByclass(oCar,"zongjia");
	var aStore =document.getElementsByClassName("store");
	//console.log(aStore.length);
	for(var k =0;k<aStore.length;k++){
		for(var j = k+1;j<aStore.length;j++){
			if(aStore[k].innerHTML == aStore[j].innerHTML){
				//console.log(aStore[k].innerHTML,aStore[k+1].innerHTML);
				aCars[k].appendChild(aShop[j]);
				aCon[j].remove();
				allPrice[k].innerHTML ="￥"+(parseFloat(aXiaoji[k].innerHTML.split("￥")[1])+parseFloat(aXiaoji[j].innerHTML.split("￥")[1])).toFixed(2)
				console.log((parseFloat(aXiaoji[k].innerHTML.split("￥")[1])+parseFloat(aXiaoji[k+1].innerHTML.split("￥")[1])).toFixed(2));
			}
		}
	}
					
}









































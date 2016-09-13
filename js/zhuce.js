//点击让密码显示
var n=0;
$(".pswshow").click(function(){
	n++;
	if(n%2 == 0){
		$(this).css("background-position","-30px -90px");
		$("#password").attr("type","password");
	}else{
		$("#password").attr("type","text");
		$(this).css("background-position","-60px -89px");
	}
	
})
window.onload = function(){
 //随机生成验证码
 	function yanZhengma(){
 		var arr = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K",
    	"L","M","N","O","P","Q","R","S","T","U","V","W",'X',"Y","Z"];
    	var str = "";
    	for(var i =0;i< 4;i++){
    		var num = Math.floor(Math.random()*62 + 0 ).toFixed(0);
    		$(".color span").eq(i).html(arr[num]);
    		str+=$(".color span").eq(i).html();
    	}
    	var corl = "";
    	for(var k =0;k<4;k++){
    		for(var i =0;i<6;i++){
	    		var cor = Math.floor(Math.random()*9 + 0 ).toFixed(0);
		    		corl += arr[cor];
		    }
    		$(".color span").eq(k).css({"color":"#"+corl});
    		corl = "";
    	}
    	$("#color2").attr("value",str);
 	}
 		yanZhengma();
 	
    $(".changeyzm").click(function(){	
    	 yanZhengma();
    	 console.log("aaaaaa");
    })
}
$(document).ready(function(){
    $("#regForm").validate({
        rules: {
        	phone:{
        		required:true,
        		minlength:11
        	},
        	password:{
        		required:true,
        		minlength:6,
        		maxlength:16
        	},
        	repassword:{
        		required:true,
        		equalTo: "#password"
        	},
        	yanzhengma:{
        		required:true,
        		equalTo: "#color2"
        	},
        	check:{
        		required:true
        	},
        	username:{
        		required:true,
        		minlength:2
        	},
        	email:{
        		required:true,
        		email:true 
        	}
        },
        messages:{
        	phone:{
        		required:"手机号不能为空",
        		minlength:"请输入有效的手机号码",
//      		errorPlacement:function(){
//      			$(".item").appendTo($("<div class='right'>通过信息验证</div>"));
//      		}
        	},
        	password:{
        		required:"密码不能为空",
        		minlength:"密码长度不低于6位",
        		maxlength:"密码长度不能超过16位"
        	},
        	repassword:{
        		required:"确认密码不能为空",
        		equalTo: "确认密码和密码不一致"
        	},
        	yanzhengma:{
        		required:"请填写验证码",
        		equalTo: "验证码填写错误"
        	},
        	check:{
        		required:"不同意协议"
        	},
        	username:{
        		required:"用户名不能为空",
        		minlength:"用户名的长度不能小于2"
        	},
        	email:{
        		required:"邮箱不能为空",
        		email:"填写正确的邮箱" 
        	}
        	
        }
    })
    
    $("#regForm2").validate({
        rules: {
        	username:{
        		required:true,
        		minlength:2
        	},
        	email:{
        		required:true,
        		email:true 
        	},
	      	favorite: {
	        	required: true
	      	},
	      	store:{
	      		required:false,
	      		url:true
	      	},
	      	yaoqingma:{
	      		required:false,
	      		rangelength:[0,5]
	      	}
        },
        messages:{
        	username:{
        		required:"用户名不能为空",
        		minlength:"用户名的长度不能小于2"
        	},
        	email:{
        		required:"邮箱不能为空",
        		email:"填写正确的邮箱" 
        	},
        	favorite: {
	        	required: "至少选择一个身份"
	      	},
	      	store:{
	      		required:"可选填",
	      		url:"填写正确的路径"
	      	},
	      	yaoqingma:{
	      		required:"",
	      		rangelength:"填写正确的验证码"
	      	}
        }
    })
		
//  //表单提交
//  $("#tijiao").click(function(){
//  	var phone = $("#phone").valid();
//  	var psw = $("#password").valid();
//  	var rePsw = $("#repassword").valid();
//  	var yzm = $("#yanzhengma").valid();
//  	var chec = $("#check").is(":checked");
//  	if(phone && psw && rePsw && yzm && chec){
//  		cookieUtil.setCookie("phone",$("#phone").val(),7);
//  		cookieUtil.setCookie("psw",$("#password").val(),7);	
//  		$(".zhu").eq(0).hide();
//  		 $(".buzou li").eq(0).removeClass("active").end().eq(1).addClass("active");
//  		$(".zhu").eq(1).show();
//  	}
//  })
//  
//	$("#jiaojiao").click(function(){
//		var username = $("#username").valid();
//		var email = $("#email").valid();
//		if(username && email){
//			cookieUtil.setCookie("username",$("#username").val(),7);
//  		cookieUtil.setCookie("email",$("#email").val(),7);
//			$(".zhu").eq(1).hide();
//  		$(".buzou li").eq(1).removeClass("active").end().eq(2).addClass("active");
//  		$(".zhu").eq(2).show();
//		}
//	})

    
});
















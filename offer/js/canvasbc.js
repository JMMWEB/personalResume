var can=document.getElementById("canvas");
		var ctx=can.getContext("2d");
		//把窗口的宽度高度赋值给画布
		var w=can.width=590;
		var h=can.height=400;
		var count=30;
		var drops=[];//定义一个空数组来保存雨滴个数
		//浏览器窗口改变时重新获取宽高
		/*window.onresize=function(){
			 w=can.width=window.innerWidth;
			 h=can.height=window.innerHeight;
		}*/

		function Drop(){}//定义雨滴对象
		//添加原型对象方法
		Drop.prototype={
			init:function(){//初始化
				this.x=random(0,w);
				this.y=0;
				this.r=1;//初始半径
				this.color="#0ff";
				this.vy=random(4,5);//竖直方向的加速度
				this.vr=1;//半径的加速度
				this.a=1;//初始透明度
				this.va=0.96;//透明度的变化系数
				this.l=random(h*0.8,h*0.9);//下落的距离
			},
			draw:function(){
				if(this.y>this.l)
				{
					ctx.beginPath();
					ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false);
					ctx.strokeStyle="rgba(0,255,255,"+this.a+")";
					ctx.stroke();
				}
				else{
					ctx.fillStyle=color(this.a);
					ctx.fillRect(this.x,this.y,2,10);
					
				}
				this.update();
			},
			//更新坐标
			update:function(){
				if(this.y<this.l){
					this.y+=this.vy;
				}
				else{
					if(this.a>0.03){
						this.r+=this.vr;
						if(this.r>20){
							this.a*=this.va;
						}
					}else{
						this.init();
					}
				}
			}

		};
		//不断的更新雨滴位置
		function move(){
			ctx.fillStyle="rgba(0,0,0,.1)";
			ctx.fillRect(0,0,w,h);//绘制透明层
			for(var i=0;i<drops.length;i++){
				drops[i].draw();
			}
			//调用经动画
			requestAnimationFrame(move);
		}
		//创建一个雨滴实例对象
		/* var drop=new Drop();
		drop.init();
		drop.draw(); */
		//延迟产生每个雨滴
		function setup(){
			
			for(var i=0;i<count;i++)
			{
				(function(j){
					setTimeout(function(){
						var drop=new Drop();
						drop.init();
						drops.push(drop);
					},j*200);
				}(i))
			}
		}
		setup();
		move();
		//产生随机数
		function random(min,max){
			return Math.random()*(max-min)+min;
		}
		//随机颜色
		function color(a){
			var r=Math.floor(Math.random()*255);
			var g=Math.floor(Math.random()*255);
			var b=Math.floor(Math.random()*255);
			return "rgba("+r+","+g+","+b+","+a+")";

	}

(function(){
	var list=[
		{'label':'HTML','value':80},
		{'label':'CSS','value':80},
		{'label':'javascript','value':70},
		{'label':'jQuery','value':70},
		{'label':'HTTP',value:60},
		{'label':'AJAX',value:70},
		{'label':'Mysql',value:30},
		{'label':'PS','value':70},
		{'label':'angularJS','value':30}
	];
	var fc=new FusionCharts({
		type: 'doughnut3d',//column3d  column2d  bar2d  bar3d pie2d pie3d doughnut2d
		width: '590',
		height: '400',
		dataSource: {
		data: list
		}

	});
	fc.render('skill');
}());


var imglen = $("#pic img").length;//长度 有几个
var lastIndex = Math.floor(imglen/2);//确定中间图片序列号
var imgleft =[];
//给每一个img添加初始样式
for(var i = 0; i<imglen;i++){//i++  i=i+1
	if(i<lastIndex){
		$("#pic img").eq(i).addClass("fron")
	}else if(i>lastIndex){
		$("#pic img").eq(i).addClass("back")
	}else{
		$("#pic img").eq(i).addClass("now")
	}
}
//把图片排列起来
function mid(){
	var owid = $(window).width()//窗口宽度
	var mid = $(".now").index();//获取当前序列
	$(".now").css("left",owid/2-150+"px");//当前图片位置
	for(var i =0;i<imglen;i++){
		$("#pic img").eq(i).css("left",owid/2-150+100*(i-mid)+"px");
		imgleft[i]=parseInt($("#pic img").eq(i).css("left"));//存储left值到数组
	}
}
mid();
$(window).resize(function(){mid();})//调整窗口再执行
//点击事件
$("#pic img").click(function(){
	document.getElementById("aeffict").play();
	var nowmid = $(this).index();//获取当前序列
	for(var i =0;i<imglen;i++){
		imgleft[i] -= 100*(nowmid-lastIndex);
		$("#pic img").eq(i).css("left",imgleft[i]);
	}
	for(var i = 0; i<imglen;i++){//i++  i=i+1
		if(i<nowmid){
			$("#pic img").eq(i).removeClass().addClass("fron")
		}else if(i>nowmid){
			$("#pic img").eq(i).removeClass().addClass("back")
		}else{
			$("#pic img").eq(i).removeClass().addClass("now")
		}
	}
	lastIndex = nowmid;//替换当前图片序列
})
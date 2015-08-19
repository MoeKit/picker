# 基本用法

- order: 0
---

<style> 
    input { width: 200px; } 
</style>

## 简单例子
生成一个底部单项选择框   
参数：
+ input: `String`, input的id，必须带#号
+ cols：`[Object]`，对象数组（下面详解）  
+ onOpen: `Function`, 打开选择框执行的事件
+ onClose: `Function`, 关闭选择框执行的事件
+ onChange: `Function`, 列值改变事件

<input type="text" id="JS_single" placeholder="">
<div id="JS_single_hint"></div>

````javascript
var Picker = require('picker');

single = new Picker({
	"input": "#JS_single",
	"cols": [
		{
            "width": 100,
			"values": "iPhone,iPhone2,iPhone3,iPhone4,iPhone4s,\
            iPhone5,iPhone5c,iPhone5s,iPhone6,iPhone6s,iPhone7".split(",")
		}
	],
    "onChange": function(picker, cur, old){
        document.querySelector("#JS_single_hint").innerHTML = "上一次的值"+old+",当前的值"+cur;
    },
    "onOpen": function(picker){
        document.querySelector("#JS_single_hint").innerHTML = "弹出框出现了";
    },
    "onClose": function(picker){
        document.querySelector("#JS_single_hint").innerHTML = "弹出框隐藏了";
    }
});
````

## 参数cols的对象key值
+ values: `Array`, 存放列实际值
+ displayValues: `Array`, 存放列显示值(不存在显示值时用实际值代替)
+ width: `Number`, 列宽度
+ textAlign: `String`, 文本水平对齐属性，(left,right,center)
+ onChange: `Function`, 列值改变事件

<input type="text" id="JS_cols" placeholder="">
<div id="JS_cols_hint"></div>

````javascript
var Picker = require('picker');

cols = new Picker({
    "input": "#JS_cols",
    "cols": [
        {
            "width": 100,
            "values": [1,2,3,4,"4s",5,"5c","5s",6,"6s",7],
            "displayValues": "iPhone,iPhone2,iPhone3,iPhone4,iPhone4s,\
            iPhone5,iPhone5c,iPhone5s,iPhone6,iPhone6s,iPhone7".split(","),
            "textAlign": "right",
            "onChange": function(picker, cur, old){
                document.querySelector("#JS_cols_hint").innerHTML = "上一次的值"+old+",当前的值"+cur;
            }
        }
    ]
});
````

# 多列选项

- order: 1
---

<style> 
    input { width: 200px; } 
</style>

## 双列选项

<input type="text" id="JS_two" placeholder="">

````javascript
var Picker = require('picker');

var single = new Picker({
	"input": "#JS_two",
	"cols": [
		{
			"values": ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
		},
		{
			"values": ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
		}
	]
});
````

## 三列选项
多项选择则继续在cols参数累加列数据

<input type="text" id="JS_three" placeholder="">

````javascript
var Picker = require('picker');

var single = new Picker({
	"input": "#JS_three",
	"cols": [
		{
			"values": ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
		},
		{
			"values": ["在家里","在公司","在车上","在路上","在飞机上","在火车上"]
		},
		{
			"values": ["卖报","吃饭","聊天","看书","打游戏","自言自语","敲代码","装B","cosplay","上QQ","上网"]
		}
	]
});
````

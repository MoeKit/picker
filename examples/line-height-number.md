# 行高行数

- order: 1
---

<style> 
    input { width: 200px; } 
</style>

## 每一列的行高和可视的行数
参数：
+ itemHeight: 'Number', 行高，默认30
+ itemsNumber: 'Number', 可视行数，必须为奇数，默认7

<input type="text" id="JS_heightNumber" placeholder="">

````javascript
var Picker = require('picker');

var single = new Picker({
	"input": "#JS_heightNumber",
	"itemsNumber": 3,
	"itemHeight": 40,
	"cols": [
		{
            "width": 100,
			"values": "iPhone,iPhone2,iPhone3,iPhone4,iPhone4s,\
            iPhone5,iPhone5c,iPhone5s,iPhone6,iPhone6s,iPhone7".split(",")
		}
	]
});
````
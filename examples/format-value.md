# 格式化值

- order: 2
---

<style> 
    input { width: 200px; } 
</style>

## 格式化输出到input上面的值

<input type="text" id="JS_formatValue" placeholder="">

````javascript
var Picker = require('picker');

var single = new Picker({
    "input": "#JS_formatValue",
    "formatValue": function(picker, values){
    	return "现在是"+values[0]+"点"+values[1]+"分";
    },
    "cols": [
        {
        	"width": 40,
            "values": (function(){
            	var arr = [];
            	for(var i=0; i<=23; i++){ arr.push(i); }
            	return arr;
            }())
        },
        {
        	"width": 40,
            "values": (function(){
            	var arr = [];
            	for(var i=0; i<60; i++){ arr.push(i); }
            	return arr;
            }())
        }
    ]
});
````
# 测试

- order: 99
---

<style> 
    input { width: 200px; } 
</style>

## test

<input type="text" id="JS_test" placeholder="">

````javascript
var Picker = require('picker');

var single = new Picker({
	"input": "#JS_test",
	"cols": [
		{
            "width": 100,
			"values": "iPhone,iPhone2,iPhone3,iPhone4,iPhone4s,\
            iPhone5,iPhone5c,iPhone5s,iPhone6,iPhone6s,iPhone7".split(","),
            "onChange": function(picker, cur, old){
                console.log("pciker.cols.onChange");
            }
		}
	],
    "onChange": function(picker, cur, old){
        console.log("pciker.onChange");
    }
});
````
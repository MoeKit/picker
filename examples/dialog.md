# 独立的对话框弹出

- order: 8
---

<style> 
    input { width: 200px; } 
</style>

## picker-dialog

<input type="text" id="JS_dialog" placeholder="">
<button type="button" id="JS_updateContainer">更新内容</button>
<div id="JS_hint"></div>

````javascript
var PickerDialog = require('../src/picker-dialog');
var btn = document.getElementById("JS_dialog");
single = new PickerDialog({
	input: "#JS_dialog",
	innerHTML: "show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>",
	onOpen: function(dialog){
		console.log(dialog);
		document.getElementById("JS_hint").innerHTML = "窗口已打开";
	},
	onClose: function(dialog){
		console.log(dialog);
		document.getElementById("JS_hint").innerHTML = "窗口已关闭";
	}
});
document.getElementById("JS_updateContainer").addEventListener("click", function(){
	single.html("I am superman!<br/>I am superman!<br/>I am superman!<br/>I am superman!<br/>I am superman!<br/>I am superman!<br/>I am superman!<br/>I am superman!<br/>I am superman!<br/>");
}, false);
````
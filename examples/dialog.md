# 独立的对话框弹出

- order: 8
---

<style> 
    input { width: 200px; } 
</style>

## picker-dialog

<input type="text" id="JS_dialog" placeholder="">

````javascript
var PickerDialog = require('../src/picker-dialog');
var btn = document.getElementById("JS_dialog");
var single = new PickerDialog();
single.container.innerHTML = "show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>show<br/>";
btn.addEventListener("click", function(){
    single.show();
}, false);

````
# 顶部工具栏

- order: 4
---

<style> 
    input { width: 200px; } 
</style>

## Toolbar配置
默认toolbar只有右上角的done按钮，用于关闭弹出框  
可自己重定义配置toollbar, 并重新监听事件  
右上角默认在`picker-toolbar-right`类名上绑定事件

> toolbar左上角增加随机选项事件  
> 在参数`toolbarTemplate`上配置toolbar的html
> 在参数`onOpen`上配置其对应事件

<input type="text" id="JS_toolbar" placeholder="">

````javascript
var Picker = require('picker');
tookbar = new Picker({
    input: "#JS_toolbar",
    toolbarTemplate: '<div class="picker-toolbar">'+
                        '<a href="javascript:void(0);" class="picker-toolbar-random">Random</a>'+
                        '<a href="javascript:void(0);" class="picker-toolbar-right">Done</a>'+
                     '</div>',
    cols: [
        {
            values: ['Mr', 'Ms'],
        },
        {
            textAlign: 'left',
            values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
        },
        {
            values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
        }
    ],
    after: function(picker){
        __tap__( picker.container.querySelector('.picker-toolbar-random'), function () {
            console.log(123);
            var col0Values = picker.cols[0].values;
            var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];
 
            var col1Values = picker.cols[1].values;
            var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];
 
            var col2Values = picker.cols[2].values;
            var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
 
            picker.setValue([col0Random, col1Random, col2Random]);
        } );
    },
    onOpen: function(picker){
        
        
    }
});
````
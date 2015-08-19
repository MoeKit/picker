# 列分隔符-日期时间

- order: 5
---

<style> 
    input { width: 200px; } 
</style>

## 日期时间控件
参数`cols`可增加分隔符，key值为：
+ divider: `Boolean`, `true`为启用分隔符
+ content: `String`, 分隔符内容

<input type="text" id="JS_timed" placeholder="">

````javascript
var Picker = require('picker');
timed = new Picker({
    input: "#JS_timed",
    formatValue: function(picker, values, displayValues){
        return displayValues?displayValues[0]:values[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
    },
    cols: [
        // Months
        {
            values: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
        },
        // Days
        {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
        // Years
        {
            values: (function () {
                var arr = [];
                for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                return arr;
            })(),
        },
        // Space divider
        {
            divider: true,
            content: '&nbsp;&nbsp;&nbsp;&nbsp;'
        },
        // Hours
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
            textAlign: "right"
        },
        // Divider
        {
            divider: true,
            content: ':'
        },
        // Minutes
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                return arr;
            })(),
        }
    ]
});
````
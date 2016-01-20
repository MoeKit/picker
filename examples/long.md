# 多列的列项长度过长

- order: 11
---

<style> 
    input { width: 200px; } 
</style>

## 后列依赖前列
`onChange`事件第一个参数`picker`  
`picker.cols`是每一列的实例数组  
列实例的`replaceValues`事件可以重新渲染列的值

<input type="text" id="JS_dependent" placeholder="">
<a id="qwe" style="pointer-events: auto;">asdfasdf</a>
````javascript
var Picker = require('picker');

var carVendors = {
    '广东省广东省广东省广东省' : ['广州市', '韶关市', '深圳市', '珠海市珠海市珠海市珠海市珠海市珠海市', '河源市', '揭阳市'],
    '新疆维吾尔自治区' : ['阿克苏地区', '昌吉回族自治州', '克孜勒苏柯尔克孜自治州', '伊犁哈萨克自治州', '石河子市', '图木舒克市'],
    '西藏自治区' : ['日喀则地区', '昌都地区昌都地区昌都地区昌都地区', '林芝地区', '拉萨市']
};
pickerDependent = new Picker({
    input: '#JS_dependent',
    formatValue: function (picker, values) {
        return values[1];
    },
    cols: [
        {
        	width: 110,
            textAlign: 'right',
            values: ['广东省广东省广东省广东省', '新疆维吾尔自治区', '西藏自治区'],
            "onChange": function(picker, country) {
                if(picker.cols[1].replaceValues){
                    picker.cols[1].replaceValues(carVendors[country]);
                }
            }
        },
        {
        	textAlign: 'left',
            values: carVendors['广东省广东省广东省广东省'],
            width: 130
        },
    ]
});
document.getElementById("qwe").addEventListener("click", function(){
    this.innerHTML = new Date().getTime();
}, false);
````

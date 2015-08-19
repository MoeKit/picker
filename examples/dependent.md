# 交互依赖

- order: 3
---

<style> 
    input { width: 200px; } 
</style>

## 后列依赖前列
`onChange`事件第一个参数`picker`  
`picker.cols`是每一列的实例数组  
列实例的`replaceValues`事件可以重新渲染列的值

<input type="text" id="JS_dependent" placeholder="">

````javascript
var Picker = require('picker');

var carVendors = {
    Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
    German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
    American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
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
            values: ['Japanese', 'German', 'American'],
            "onChange": function(picker, country) {
                if(picker.cols[1].replaceValues){
                    picker.cols[1].replaceValues(carVendors[country]);
                }
            }
        },
        {
        	textAlign: 'left',
            values: carVendors.Japanese,
            width: 120
        },
    ]
});
````

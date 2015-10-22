# 列分隔符-日期

- order: 5
---

<style> 
    input { width: 200px; } 
</style>

## 日期控件
在切换年月日时，需要自动显示对应月日，故需要自己重新渲染选择列数据后再选中需要的数据项

<input type="text" id="JS_timed" placeholder="">

````javascript
var Picker = require('picker');
function createNumberArray(num){
	var arr = [];
	for(var i = 1; i <= num; i++){
		arr.push(i);
	}
	return arr;
}
timed =  new Picker({
		input: "#JS_timed",
		formatValue: function(picker, values, displayValues) {
			return values[0] + '-' + values[1] + '-' + values[2];
		},
		cols: [
			// Years
			{
				values: (function() {
					var arr = [];
					for (var i = 1950; i <= 2030; i++) {
						arr.push(i);
					}
					return arr;
				})(),
				onChange: function(picker, values) {
					var year = picker.cols[0].currentValue;
					var month = picker.cols[1].currentValue;
					var day = picker.cols[2].currentValue;
					var _day = month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 ? 31 :
						month == 4 || month == 6 || month == 9 || month == 11 ? 30 :
						year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28;
					picker.cols[2].replaceValues(createNumberArray(_day));
					picker.cols[2].select(day > _day ? _day : day);
				}
			},
			// Months
			{
				values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
				textAlign: 'left',
				onChange: function(picker, values) {
					var year = picker.cols[0].currentValue;
					var month = picker.cols[1].currentValue;
					var day = picker.cols[2].currentValue;
					var _day = month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 ? 31 :
						month == 4 || month == 6 || month == 9 || month == 11 ? 30 :
						year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28;
					picker.cols[2].replaceValues(createNumberArray(_day));
					picker.cols[2].select(day > _day ? _day : day);
				}
			},
			// Days
			{
				values: createNumberArray(31),
			}
		]
	});

````
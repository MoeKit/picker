# 直接嵌入到页面中-小蜜桃

- order: 6

---
<style> 
    input { width: 200px; } 
    #JS_container_box { width: 237px; margin: 0 auto; }
    
</style>

## picker选择框直接嵌入页面中
参数: 
+ container: `String`, id，必须带#号

<input type="text" id="JS_container" placeholder="">不可点击，如果需要可用display:none隐藏
<div id="JS_container_box" style=" width: 240px; margin: 0 auto;"></div>


````javascript
var Picker = require('picker');
function getDaysArr(year, month){
    var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    if( [1,3,5,7,8,10,12].indexOf(Number(month)) >= 0 ) return arr.concat([29,30,31]);
    if( [4,6,9,11].indexOf(Number(month)) >= 0 ) return arr.concat([29,30]);
    if( year%400 === 0 || (year%4 === 0 && year%100 !== 0) ) return arr.concat([29]);
    else return arr;
}
pickerMitao = new Picker({
    input: '#JS_container',
    container: "#JS_container_box",
    "itemsNumber": 3,
    "itemHeight": 40,
    cols: [
        {
            values: (function () {
                var arr = [];
                for (var i = 1950; i <= 2200; i++) { arr.push(i); }
                return arr;
            })(),
            displayValues: (function () {
                var arr = [];
                for (var i = 1950; i <= 2200; i++) { arr.push(i+"年"); }
                return arr;
            })(),
            "onChange": function(picker, values){
                var displayDaysArr = (getDaysArr(picker.cols[0].currentValue, picker.cols[1].currentValue).join("日,")+"日").split(",");
                var daysArr = getDaysArr(picker.cols[0].currentValue, picker.cols[1].currentValue);
                if( daysArr.length != picker.cols[2].values.length ){
                    picker.cols[2].replaceValues(daysArr, displayDaysArr);
                    picker.cols[2].values = daysArr;
                } 
            }
        },
        {
            values: "1 2 3 4 5 6 7 8 9 10 11 12".split(" "),
            displayValues: ("1 2 3 4 5 6 7 8 9 10 11 12".split(" ").join("月,")+"月").split(","),
            "onChange": function(picker, values){
                var displayDaysArr = (getDaysArr(picker.cols[0].currentValue, picker.cols[1].currentValue).join("日,")+"日").split(",");
                var daysArr = getDaysArr(picker.cols[0].currentValue, picker.cols[1].currentValue);
                if( daysArr.length != picker.cols[2].values.length ){
                    picker.cols[2].replaceValues(daysArr, displayDaysArr);
                    picker.cols[2].values = daysArr;
                } 
            }
        },
        {
            values: getDaysArr(1950,1),
            displayValues: (getDaysArr(1950,1).join("日,")+"日").split(",")
        },
    ]
});


````

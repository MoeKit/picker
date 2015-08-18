# mitao

---
<style> 
    input { width: 200px; } 
    #JS_test_mitao_box { width: 237px; margin: 0 auto; }
    .basescroller-current-indicator-all { width: 238px; border-radius: 3px; border: 1px solid #8a8a8a; }
    .basescroller-current-indicator { border-top: 1px solid #8a8a8a; border-bottom: 1px solid #8a8a8a; }
    .basescroller-selected { color: #ff6086; }
</style>
<script type="text/javascript" src="http://assist.work.bzdev.net/common/js/logger.js"></script>

## Normal usage

<input type="text" id="JS_test_mitao" placeholder="">
mitao
<div id="JS_test_mitao_box" style=" width: 240px; margin: 0 auto;"></div>


````javascript
var Picker = require('picker');
function getDaysArr(year, month){
    var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    if( [1,3,5,7,8,10,12].indexOf(Number(month)) >= 0 ) return arr.concat([29,30,31]);
    if( year%400 === 0 || (year%4 === 0 && year%100 !== 0) ) return arr.concat([29]);
    else return arr;
}
pickerMitao = new Picker({
    input: '#JS_test_mitao',
    container: "#JS_test_mitao_box",
    "itemsNumber": 3,
    "itemHeight": 40,
    cols: [
        {
            values: (function () {
                var arr = [];
                for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                return arr;
            })(),
            "onChange": function(picker, values){
                var daysArr = getDaysArr(picker.cols[0].currentValue, picker.cols[1].currentValue);
                console.log( daysArr.length , picker.cols[2].values );
                if( daysArr.length != picker.cols[2].values.length ) picker.cols[2].replaceValues(daysArr);
            }
        },
        {
            values: "1 2 3 4 5 6 7 8 9 10 11 12".split(" "),
            "onChange": function(picker, values){
                var daysArr = getDaysArr(picker.cols[0].currentValue, picker.cols[1].currentValue);
                console.log( daysArr.length , picker.cols[2].values );
                if( daysArr.length != picker.cols[2].values.length ) picker.cols[2].replaceValues(daysArr);
            }
        },
        {
            values: getDaysArr(1950,1)
        },
    ]
});


````

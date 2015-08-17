# Demo

---

<script type="text/javascript" src="http://assist.work.bzdev.net/common/js/logger.js"></script>

## Normal usage

<input type="text" id="JS_test_single" placeholder="">
single
<input type="text" id="JS_test_two_value" placeholder="">
two_value
<input type="text" id="JS_test_dependent" placeholder="">
dependent
<input type="text" id="JS_test_toolbar" placeholder="">
toolbar
<input type="text" id="JS_test_timed" placeholder="">
timed
<input type="text" id="JS_test">
test
<input type="date" id="JS_test1">
<div id="JS_picker"></div>
<div id="JS_picker_test" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 20px; z-index: 2220; background: #fff;"></div>


````javascript
var getNumArray = function(_min, _max){
	var t = [];
	for(var i=_min; i<=_max; i++){
		t.push({
			name: i,
			value: i
		});
	}
	return t;
};
var arr2 = (function(){
	var t = [];
	var t1 = 'a';
	for(var i=0; i<5; i++){
		t.push({
			name: t1,
			value: t1
		});
		t1+='a';
	}
	return t;
}());
var Picker = require('picker');
pc = new Picker({
	'input': '#JS_test',
	'onChange': function(picker, _new, _old){
		console.log( picker, _new, _old );
	},
	'formatValue': function(picker, values){
		console.log( picker );
		return values[0]+"年"+values[1]+"月"+values[2]+"日 "+values[3]+":"+values[4]+":"+values[5]
	},
	'cols': [
		{
			'width': 33,
            textAlign: 'center',
            values: getNumArray(1950,2050)
        },
		{
			'values': getNumArray(1,12)
		},
		{
			'values': getNumArray(1,31)
		},
		{
			'values': getNumArray(0,23)
		},
		{
			'values': getNumArray(0,59)
		},
		{
			'values': getNumArray(0,59)
		}
	]
})
	.on('toolbarRight', function(){
		pc.hide();
	});

var single = new Picker({
	"input": "#JS_test_single",
	"cols": [
		{
			"values": "iPhone4,iPhone4s,iPhone5,iPhone5c,iPhone5s,iPhone6".split(",")
		}
	]
});

var tv = new Picker({
	"input": "#JS_test_two_value",
	"cols": [
		{
			"values": ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
		},
		{
			"values": ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
		}
	]
});

carVendors = {
    Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
    German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
    American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
};
pickerDependent = new Picker({
    input: '#JS_test_dependent',
    formatValue: function (picker, values) {
    	console.log( this );
        return values[1];
    },
    cols: [
        {
        	width: 50,
            textAlign: 'right',
            values: ['Japanese', 'German', 'American'],
            "onChange": function(picker, country) {
                if(picker.cols[1].replaceValues){
                    picker.cols[1].replaceValues(carVendors[country]);
                }
            }
        },
        {
        	textAlign: 'right',
            values: carVendors.Japanese,
            width: 50
        },
    ]
});

tookbarq = new Picker({
	input: "#JS_test_toolbar",
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
	onOpen: function(picker){
		picker.container.querySelector('.picker-toolbar-random').onclick = function () {
            var col0Values = picker.cols[0].values;
            var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];
 
            var col1Values = picker.cols[1].values;
            var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];
 
            var col2Values = picker.cols[2].values;
            var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
 
            picker.setValue([col0Random, col1Random, col2Random]);
        };
	},
	onClose: function(picker){
		console.log("onClose", picker);
	}
});

timed = new Picker({
	input: "#JS_test_timed",
	cols: [
		// Months
        {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
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
            content: '  '
        },
        // Hours
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
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

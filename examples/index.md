# Demo

---

<script type="text/javascript" src="http://assist.work.bzdev.net/common/js/logger.js"></script>

## Normal usage
<input type="text" id="JS_test">
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
	'cols': [
		{
			'values': getNumArray(1,13),
			'onChange': function(a,b){
			}
		},
		{
			'values': getNumArray(1,31),
			'onChange': function(a,b){
			}
		},
		{
			'width': 33,
            textAlign: 'center',
            values: getNumArray(1950,2050)
        },
		{
			'values': getNumArray(0,23),
			'onChange': function(a,b){
			}
		},
		{
			'values': getNumArray(0,59),
			'onChange': function(a,b){
			}
		},
		{
			'values': getNumArray(0,59),
			'onChange': function(a,b){
			}
		}
	]
})
	.on('toolbarRight', function(){
		pc.hide();
	});
````
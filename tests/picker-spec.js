var expect = require('expect.js');
var Picker = require('../index');
var input = document.createElement('input');
input.id = 'JS_picker';
input.type = 'text';
input.style.display = 'none';
document.body.appendChild(input);
var input = document.createElement('input');
input.id = 'JS_picker_destroy';
input.type = 'text';
input.style.display = 'none';
document.body.appendChild(input);
var div = document.createElement('div');
div.id = 'JS_container';
div.style.display = 'none';
document.body.appendChild(div);

describe('picker', function() {

    describe('参数', function() {
        it('是json格式, key有input：对应input标签的id（含#）', function() {
            var picker = new Picker({
                'input': '#JS_picker'
            });
        });

        it('itemNumber：可视选项的个数', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'itemNumber': 7
            });
        });

        it('itemHeight: 选项的高度', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'itemHeight': 30
            });
        });

        it('cols: 每一列选项的值', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'cols': [{
                    'values': [1, 2, 3, 4, 5, 6]
                }]
            });
        });

        it('toolbarTemplate: 顶部toolbar模板', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'toolbarTemplate': '<div>test</div>'
            });
        });

        it('formatValue: 选项改变后值输出的格式', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'formatValue': function(picker, values) {
                    return values.join(" ");
                }
            });
        });

        it('onChange: 选项改变时执行的事件', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'onChange': function(picker, current, old) {
                    console.log(current, old);
                }
            });
        });

        it('onOpen: 弹出框显示时执行的事件', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'onOpen': function(picker) {

                }
            });
        });

        it('onClose: 弹出框隐藏时执行的事件', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'onClose': function(picker) {

                }
            });
        });

        it('container: picker选项存放的地方，值为id（带#）', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'container': '#JS_container'
            });
        });

    });

	describe('事件', function() {

		it('close：隐藏弹出框事件', function(){
			var picker = new Picker({
	            'input': '#JS_picker'
	        });
            picker.close();
		});

		it('open：显示弹出框事件', function(){
			var picker = new Picker({
	            'input': '#JS_picker'
	        });
            picker.open();
            picker.close();
		});

		it('setValue：设置所有列值', function(){
			var picker = new Picker({
	            'input': '#JS_picker'
	        });
            picker.setValue([]);
		});

		it('destroy：设置所有列值', function(){
			var picker = new Picker({
	            'input': '#JS_picker_destroy'
	        });
            picker.destroy();
		});

	});

	describe('实例属性cols列的事件', function() {
		
		it('getValue：获取当前列的选中的值', function(){
			var picker = new Picker({
	            'input': '#JS_picker',
	            'cols': [
			        {
			            "values": [1,2,3,4,"4s",5,"5c","5s",6,"6s",7]
			        }
			    ]
	        });
            picker.cols[0].getValue();
		});

		it('replaceValues：重新渲染选择器选项', function(){
			var picker = new Picker({
	            'input': '#JS_picker',
	            'cols': [
			        {
			            "values": [1,2,3,4,"4s",5,"5c","5s",6,"6s",7]
			        }
			    ]
	        });
            picker.cols[0].replaceValues([23,2,345,456,12,312,4]);
		});

		it('select：通过值选中一项', function(){
			var picker = new Picker({
	            'input': '#JS_picker',
	            'cols': [
			        {
			            "values": [1,2,3,4,"4s",5,"5c","5s",6,"6s",7]
			        }
			    ]
	        });
            picker.cols[0].select(3);
		});

		it('selectByIndex：通过索引选择一项', function(){
			var picker = new Picker({
	            'input': '#JS_picker',
	            'cols': [
			        {
			            "values": [1,2,3,4,"4s",5,"5c","5s",6,"6s",7]
			        }
			    ]
	        });
            picker.cols[0].select(3);
		});

	});

    describe('容错处理', function() {
        it('参数为空', function() {
            var pickerq = new Picker();
        });

        it('参数为空的json', function() {
            var pickerw = new Picker({});
        });

        it('参数为json，且input对应的值不存在', function() {
            var picker = new Picker({
                'input': '#JS_test'
            });
        });

        it('参数为json，且container对应的值不存在', function() {
            var picker = new Picker({
                'input': '#JS_picker',
                'container': '#JS_test'
            });
        });
    });
});

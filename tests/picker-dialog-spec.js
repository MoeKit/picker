var expect = require('expect.js');
var PickerDialog = require('../src/picker-dialog.js');
var input = document.createElement('input');
input.id = 'JS_PickerDialog';
input.type = 'text';
input.style.display = 'none';
document.body.appendChild(input);

describe('picker-dialog', function() {

    describe('参数', function() {
        it('是json格式, key有input：对应input标签的id（含#）', function() {
            var picker = new PickerDialog({
                'input': '#JS_PickerDialog'
            });
        });

        it('innerHTML, dialog的内容', function() {
            var picker = new PickerDialog({
                'input': '#JS_PickerDialog',
                'innerHTML': "test/test/test"
            });
        });

        it('onOpen: 弹出框显示时执行的事件', function() {
            var picker = new PickerDialog({
                'input': '#JS_PickerDialog',
                'onOpen': function() {

                }
            });
        });

        it('onClose: 弹出框隐藏时执行的事件', function() {
            var picker = new PickerDialog({
                'input': '#JS_PickerDialog',
                'onClose': function() {

                }
            });
        });
    });

    describe('事件', function() {
        it('show事件, 显示弹出框', function() {
            var pickerDialog = new PickerDialog({
                'input': '#JS_PickerDialog'
            });
            pickerDialog.show();
        });

        it('hide事件, 显示弹出框', function() {
            var pickerDialog = new PickerDialog({
                'input': '#JS_PickerDialog'
            });
            pickerDialog.hide();
        });

        it('html事件, 改变dialog的内容', function() {
            var pickerDialog = new PickerDialog({
                'input': '#JS_PickerDialog'
            });
            pickerDialog.html("真的能改变吗");
        });

        it('updateInputPosition事件, 更新input的位置', function() {
            var pickerDialog = new PickerDialog({
                'input': '#JS_PickerDialog'
            });
            pickerDialog.updateInputPosition();
        });
        
    });

    describe('容错处理', function() {
        it('参数是随意对象、数字、字符、数组等等', function() {
            var pickerDialog = new PickerDialog();
            var pickerDialog = new PickerDialog({
                'key': 'value'
            });
            var pickerDialog = new PickerDialog(['i am array']);
            var pickerDialog = new PickerDialog('i am string');
            var pickerDialog = new PickerDialog(110112114119);
        });
    });
    
});

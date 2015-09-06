var expect = require('expect.js');
var PickerDialog = require('../src/picker-dialog.js');

describe('picker-dialog', function() {

    describe('参数', function() {
        it('无参实例化', function() {
            var pickerDialog = new PickerDialog();
        });
    });

    describe('属性', function() {
        it('通过container(DOM)设置html', function() {
            var pickerDialog = new PickerDialog();
            pickerDialog.container.innerHTML = "i am html";
        });
    });

    describe('事件', function() {
        it('show事件, 显示弹出框', function() {
            var pickerDialog = new PickerDialog();
            pickerDialog.show();
        });

        it('hide事件, 显示弹出框', function() {
            var pickerDialog = new PickerDialog();
            pickerDialog.hide();
        });
    });

    describe('容错处理', function() {
        it('参数是随意对象、数字、字符、数组等等', function() {
            var pickerDialog = new PickerDialog({
                'key': 'value'
            });
            var pickerDialog = new PickerDialog(['i am array']);
            var pickerDialog = new PickerDialog('i am string');
            var pickerDialog = new PickerDialog(110112114119);
        });
    });
    
});

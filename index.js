'use strict';
var Eventor = require('eventor');
var PickerDialog = require('./src/picker-dialog.js');
var PickerCore = require('picker-core');
var SimulateClick = require('./src/simulate-click.js');
require('./src/picker.css');
var Picker = function(option) {
    var _this = this;
    this.dialogConf = {};
    if (isType(option, 'Object')) {
        this.dialogConf = option.dialogConf || {};
        this.cols = option.cols || [];
        this.input = document.querySelector(option.input);
        this.toolbarTemplate = option.toolbarTemplate || ('<div class="picker-toolbar">' +
            '<a href="javascript:void(0);" class="picker-toolbar-right">Done</a>' +
            '</div>');

        this.formatValue = option.formatValue || function(picker, values) {
            return values.join(" ");
        };
        this.onOpen = option.onOpen;
        this.onClose = option.onClose;
        this.onChange = option.onChange;
        option = null;
    };
    this.picker = {};
    if (this.isError()) return false;
    this.init();
    return this;
};
Eventor.mixTo(Picker);
SimulateClick(Picker);
Picker.prototype.isError = function() {
    if (!this.input) {
        console.error('input对应的dom对象不存在');
        return true;
    }
    return false;
};
Picker.prototype.init = function() {
    this.input.setAttribute('readonly', 'readonly');
    this.input.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    this.hackInputFocus();
    this.initDialog();
    this.initPicker();
    this.initPickerCore();
    this._InitCssPickerCore();
    this._bingEventSetValues();
    this._bindEventToolbar();
    this._bindEventInput(this.input);
    return this;
};
Picker.prototype.destroy = function() {
    for (var i in this) {
        delete this[i];
    }
    for (var i in this.__proto__) {
        delete this.__proto__[i];
    }
};
Picker.prototype.initPicker = function() {
    console.log(this.toolbarTemplate);
    this.dialog.container.innerHTML = this.toolbarTemplate + '<div class="picker-cols"></div>';
    // '<div class="picker-cols"></div>' 
    this.picker.toolbar = this.dialog.container.querySelector('.picker-toolbar');
    if (!!this.picker.toolbar) {
        this.picker.toolbarLeft = this.picker.toolbar.querySelector('.picker-toolbar-left');
        this.picker.toolbarRight = this.picker.toolbar.querySelector('.picker-toolbar-right');
    }
    this.picker.container = this.dialog.container;
    this.picker.wrap = this.dialog.container.querySelector('.picker-cols');
    return this;
};
Picker.prototype.initDialog = function() {
    this.dialog = new PickerDialog(this.dialogConf);
    //this.picker.wrap = this.dialog.container;
    return this;
};
Picker.prototype.hide = function() {
    return this.dialog.hide(), this.onClose && this.onClose(this.picker), this;
};
Picker.prototype.show = function() {
    this.input.innerHTML = this._getValues();
    return this.dialog.show(), this.onOpen && this.onOpen(this.picker), this;
};
Picker.prototype.initPickerCore = function() {
    var _this = this;
    this.picker.cols = [];
    var _cols = this.cols;
    for (var i = 0; i < _cols.length; i++) {
        if( _cols[i].divider === true ){

        } else {
            if( !!_cols[i].displayValues ){
                var _data = [];
                for(var i=0; i<_cols[i].values.length; i++){
                    
                }
            } else {
                var _data = _cols[i].values;
            }
            
            var _temp = new PickerCore({
                container: this.picker.wrap,
                data: _data,
                itemHeight: 30,
                selectedCallback: (function() {
                    var _i = i;
                    return function(_new, _old) {
                        if (!!_this.onChange) _this.onChange(_this.picker, _new, _old);
                        else if (!!_cols[_i].onChange) _cols[_i].onChange(_this.picker, _new, _old);
                        _this.input.innerHTML = _this._getValues();
                    }
                }())
            });
            _temp.values = _cols[i].values;
            _temp.replaceValues = _temp.render;
            this.picker.cols.push(_temp);
        }
        
    }
    this.picker.component = this.dialog.container.querySelectorAll('.basescroller-component');
    this.picker.scroller = this.dialog.container.querySelectorAll('.basescroller-scroller');
    return this;
};
Picker.prototype._InitCssPickerCore = function() {
    var _cols = this.cols;
    var _component = this.picker.component;
    var _scroller = this.picker.scroller;
    var randomCount = _cols.length,
        percent = 100;
    // 算出需要设置均宽的选择项及其均宽的百分比
    for (var i = 0; i < _cols.length; i++) {
        if( _cols[i].divider === true ){
            randomCount--;
        }
        if (!isType(_cols[i].width, 'Number')) {
            delete _cols[i].width;
        } else {
            randomCount--;
            percent -= _cols[i].width;
        }
    }
    // 设置选择项的width、text-align
    for (var i = 0; i < _component.length; i++) {
        _component[i].style.width = !!_cols[i].width ? _cols[i].width + '%' : percent / randomCount + '%';
        _component[i].style.textAlign = _cols[i].textAlign || 'center';
    }
    // 格式化选项宽度
    var _componentWidth = 0;
    var _scrollerWidth = 0;
    var _padding = 0;
    for (var i = 0; i < _scroller.length; i++) {
        _componentWidth = _component[i].offsetWidth;
        _scrollerWidth = _scroller[i].offsetWidth;
        if (_componentWidth >= _scrollerWidth + 40) {
            _scroller[i].style.width = (_scrollerWidth + 20) + "px";
            _scroller[i].style.padding = "0 " + ((_componentWidth - _scrollerWidth - 20) / 2 || 0) + "px";
        } else if (_componentWidth >= _scrollerWidth + 20) {
            _scroller[i].style.padding = "0 " + ((_componentWidth - _scrollerWidth) / 2 || 0) + "px";
        }
    }
    return this;
};
Picker.prototype._bingEventSetValues = function() {
    // 设置新值给当前的选项列
    var _this = this;
    this.picker.setValue = function(values) {
        if( Object.prototype.toString.call(values) == "[object Array]" ){
            for (var i = 0; i < _this.picker.cols.length; i++) {
                if (!!values[i]) {
                    _this.picker.cols[i].select(values[i]);
                }
            }
        } else console.error("picker.setValue的参数必须是数组");    
    }
}
Picker.prototype._bindEventToolbar = function() {
    // 设置左右toolbar按钮的事件
    var _this = this;
    if (this.picker.toolbarLeft) {
        this.picker.toolbarLeft.click = function(e) {
            _this.emit('toolbarLeft', e);
        };
        this.picker.toolbarLeft.tap(this.picker.toolbarLeft.click);
    };
    if (this.picker.toolbarRight) {
        _this.on('toolbarRight', function(e) {
            _this.hide();
        });
        this.picker.toolbarRight.click = function(e) {
            _this.emit('toolbarRight', e);
        };
        this.picker.toolbarRight.tap(this.picker.toolbarRight.click);
    };
    // this.setClick(this.picker.toolbarLeft, this.picker.toolbarLeft.click);
    // this.setClick(this.picker.toolbarRight, this.picker.toolbarRight.click);
};
Picker.prototype._bindEventInput = function(input) {
    // 设置input被触发的事件
    var _this = this;
    input.tap(function() {
        log('input click');
        _this.show();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
            var inputTop = _this.input.offsetTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - pickerHeight - inputHeight + (clientHeight - pickerHeight) * 0.5, 400)
            }
        }());
    });
    return this;
};
Picker.prototype._getValues = function() {
    var _temp = [];
    for (var i = 0; i < this.picker.cols.length; i++) {
        _temp.push(this.picker.cols[i].getValue())
    };
    return this.formatValue(this.picker, _temp);
}
    // 兼容安卓微信，在input上面增加一层遮罩层，安卓微信没法禁用不可编辑
Picker.prototype.hackInputFocus = function() {
    var _inputMask = document.createElement('div');
    var _input = this.input;
    var _parent = _input.parentNode;

    _inputMask.style.width = (_input.offsetWidth + _input.clientLeft * 2) + 'px';
    _inputMask.style.height = (_input.offsetHeight + _input.clientTop * 2) + 'px';
    _inputMask.style.position = 'absolute';
    _inputMask.style.left = _input.offsetLeft;
    _inputMask.style.top = _input.offsetTop;
    _inputMask.setAttribute('id', _input.getAttribute('id') + 'Mask');
    _parent.insertBefore(_inputMask, _input);
    this.input = document.getElementById(_input.getAttribute('id') + 'Mask');
    return this;
};
// input输入框如果不在可视区域内，将其滑动到可视区域
Picker.prototype.scrollAnimate = function(position, timestamp) {
    var needs = (document.body.scrollTop - position) / timestamp * 25;
    var interval = setInterval(function() {
        if (Math.abs(document.body.scrollTop - position) < Math.abs(needs)) {
            clearInterval(interval);
        }
        document.body.scrollTop = document.body.scrollTop - needs;
    }, 8);
    return this;
};


function isType(object, type) {
    return Object.prototype.toString.call(object) === '[object ' + type + ']'
};
module.exports = Picker;

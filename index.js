'use strict';
var Eventor = require('eventor');
var PickerDialog = require('./src/picker-dialog.js');
var PickerCore = require('picker-core');
var SimulateClick = require('./src/simulate-click.js');
require('./src/picker.css');

function getNode(tag, classname, value) {
    var node = document.createElement(tag);
    node.className = classname || "";
    node.innerHTML = value || "";
    return node;
}
var Picker = function(option) {
    var _this = this;
    this.dialogConf = {};
    if (isType(option, 'Object')) {
        this.dialogConf = option.dialogConf || {};
        this.e = option.input;
        this.itemsNumber = option.itemsNumber || 7;
        this.itemHeight = option.itemHeight || 30;
        this.cols = option.cols || [];
        this.input = document.querySelector(option.input);
        this.container = document.querySelector(option.container);
        this.toolbarTemplate = option.toolbarTemplate || ('<div class="picker-toolbar">' +
            '<a href="javascript:void(0);" class="picker-toolbar-right">Done</a>' +
            '</div>');
        this.clientWidth = document.documentElement.clientHeight; //  浏览器宽度
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
    this._hackInputFocus();
    if( this.container ){
        this.dialog = {};
        this.dialog.container = this.container;
        this.dialog.container.innerHTML = '<div class="picker-cols"></div>';
        this.picker.wrap = this.dialog.container.querySelector('.picker-cols');
        this.initPickerCore();
    } else {
        this.initDialog();
        this.initPicker();
        this.initPickerCore();
        this._bingEventSetValues();
        this._bindEventToolbar();
        this._bindEventInput(this.input);
    }
    
    

    
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
        if (_cols[i].divider === true) {
            this.picker.wrap.appendChild(getNode("div", "basescroller-divider", _cols[i].content));

        } else {
            if (!_cols[i].values) continue;
            //if( !!_cols[i].values ){
            if (!!_cols[i].displayValues) {
                var _data = [];
                for (var j = 0; j < _cols[i].values.length; j++) {
                    _data.push({
                        "name": _cols[i].displayValues[j] || _cols[i].values[j],
                        "value": _cols[i].values[j]
                    });
                }
            } else {
                var _data = _cols[i].values;
            }
            var option = {
                container: this.picker.wrap,
                data: _data,
                itemHeight: this.itemHeight,
                selectedCallback: (function() {
                    var _i = i;
                    return function(_new, _old) {
                        if (!!_cols[_i].onChange) _cols[_i].onChange(_this.picker, _new, _old);
                        else if (!!_this.onChange) _this.onChange(_this.picker, _new, _old);
                        _this.input.innerHTML = _this._getValues();
                    }
                }())
            };
            if( this.itemsNumber ) option.itemsNumber = this.itemsNumber;
            var _temp = new PickerCore(option);
            _temp.container = _temp.scrollerComponent;
            _temp.items = _temp.container.querySelectorAll(".basescroller-item");
            _temp.value = _temp.currentValue;
            delete _temp.scrollerComponent;
            _temp.values = _cols[i].values;
            _temp.replaceValues = function(values, displayValues){
                _this._InitCssPickerCore();
                if( !displayValues ) _temp.render(values);
                else {
                    var arr = [];
                    for(var i=0; i<values.length; i++){
                        arr.push({
                            "name": displayValues[i]||values[i],
                            "value": values
                        });
                    }
                    _temp.render(arr);
                }
            };
            this.picker.cols.push(_temp);
            //}
        }
    }
    // picker-core 样式
    
    
    // picker-core 样式
    this.picker.wrap.appendChild(getNode("div", "basescroller-current-indicator-all"));
    this.picker.component = this.dialog.container.querySelectorAll('.basescroller-component');
    this.picker.scroller = this.dialog.container.querySelectorAll('.basescroller-scroller');
    this._InitCssPickerCore();
    return this;
};
Picker.prototype._InitCssPickerCore = function() {
    var _this = this;

    // 算出需要设置均宽的选择项及其均宽的百分比
    // for (var i = 0; i < _cols.length; i++) {
    //     if( _cols[i].divider === true ){
    //         randomCount--;
    //     }
    //     if( this.e == "#JS_test_timed" ){
    //             console.log( _cols[i].width, isType(_cols[i].width, 'Number') );
    //         }
    //     if (!isType(_cols[i].width, 'Number')) {


    //         delete _cols[i].width;

    //     } else {
    //         percent -= _cols[i].width;
    //         randomCount--;
    //     }
    // }
    // 设置选择项的width、text-align
    _this._setCssWidth();
    setTimeout(function() {
        _this._setCssWidth();
        _this.picker.wrap.style.height = _this.itemsNumber * _this.itemHeight + "px";
        
        var _component = _this.picker.component;
        var _item =      _this.picker.wrap.querySelectorAll(".basescroller-item");
        var _indicator = _this.picker.wrap.querySelectorAll(".basescroller-current-indicator");
        var _indicatorAll = _this.picker.wrap.querySelector(".basescroller-current-indicator-all");
        for (var i = 0; i < _component.length; i++) {
            _component[i].style.height = _this.itemsNumber * _this.itemHeight + "px";
        }
        for(var i=0; i<_indicator.length; i++){
            _indicator[i].style.height = _this.itemHeight-2 + "px";
            _indicator[i].style.top =  _this.itemHeight * (_this.itemsNumber - 1) / 2 + "px";
        }
        _indicatorAll.style.top =  _this.itemHeight * (_this.itemsNumber - 1) / 2 + "px";
        _indicatorAll.style.height = _this.itemHeight-2 + "px";
        for(var i=0; i<_item.length; i++){
            _item[i].style.height = _this.itemHeight + "px";
            _item[i].style.lineHeight = _this.itemHeight + "px";
        }
    }, 100);

    // 格式化选项宽度
    // var _componentWidth = 0;
    // var _scrollerWidth = 0;
    // var _padding = 0;
    // for (var i = 0; i < _scroller.length; i++) {
    //     _componentWidth = _component[i].offsetWidth;
    //     _scrollerWidth = _scroller[i].offsetWidth;
    //     if (_componentWidth >= _scrollerWidth + 40) {
    //         _scroller[i].style.width = (_scrollerWidth + 20) + "px";
    //         _scroller[i].style.padding = "0 " + ((_componentWidth - _scrollerWidth - 20) / 2 || 0) + "px";
    //     } else if (_componentWidth >= _scrollerWidth + 20) {
    //         _scroller[i].style.padding = "0 " + ((_componentWidth - _scrollerWidth) / 2 || 0) + "px";
    //     }
    // }
    return this;
};
Picker.prototype._setCssWidth = function() {
    var _cols = this.cols;
    var _component = this.picker.component;
    for (var i = 0; i < _component.length; i++) {
        var componentWidth = _component[i].querySelector(".basescroller-scroller");
        componentWidth = !!componentWidth ? componentWidth.offsetWidth : _component[i].offsetWidth;
        _component[i].style.width = !!_cols[i].width ? _cols[i].width + 'px' : componentWidth + 'px';
        _component[i].style.textAlign = _cols[i].textAlign || 'center';
    }
}
Picker.prototype._bingEventSetValues = function() {
    // 设置新值给当前的选项列
    var _this = this;
    this.picker.setValue = function(values) {
        if (Object.prototype.toString.call(values) == "[object Array]") {
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
    // if (this.picker.toolbarLeft) {
    //     this.picker.toolbarLeft.click = function(e) {
    //         _this.emit('toolbarLeft', e);
    //     };
    //     this.picker.toolbarLeft.tap(this.picker.toolbarLeft.click);
    // };
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
        _this.show();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
            var inputTop = _this.input.offsetTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - (clientHeight - pickerHeight)/2, 400);
            }
        }());
    });
    return this;
};
Picker.prototype._getValues = function() {
        var _temp = [];
        for (var i = 0; i < this.picker.cols.length; i++) {
            if (this.picker.cols[i].getValue) _temp.push(this.picker.cols[i].getValue());
        };
        return this.formatValue(this.picker, _temp);
    }
    // 兼容安卓微信，在input上面增加一层遮罩层，安卓微信没法禁用不可编辑
Picker.prototype._hackInputFocus = function() {
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
    var _this = this;
    var needs = (document.body.scrollTop - position) / timestamp * 25;
    _this.interval = setInterval(function() {
        if (Math.abs(document.body.scrollTop - position) < Math.abs(needs)) {
            clearInterval(_this.interval);
        }
        document.body.scrollTop = document.body.scrollTop - needs;
    }, 8);
    return this;
};


function isType(object, type) {
    return Object.prototype.toString.call(object) === '[object ' + type + ']'
};
module.exports = Picker;

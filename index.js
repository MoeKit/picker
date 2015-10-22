'use strict';
var Eventor = require('eventor');
var PickerDialog = require('./src/picker-dialog.js');
var PickerCore = require('picker-core');
var F_tap = require('./src/simulate-click.js');
require('./src/picker.css');

function getNode(tag, classname, value) {
    var node = document.createElement(tag);
    node.className = classname || "";
    node.innerHTML = value || "";
    return node;
}
var Picker = function(option) {
    var _this = this;
    if( Object.prototype.toString.call(option) === '[object Object]' ){
        this.params = {
            "itemsNumber": option.itemsNumber || 7,
            "itemHeight": option.itemHeight || 30,
            "cols": option.cols || [],
            "input": option.input || "",
            "inputContainer": document.querySelector(option.input) || "",
            "toolbarTemplate": option.toolbarTemplate || ('<div class="picker-toolbar">' +
                '<a href="javascript:void(0);" class="picker-toolbar-right">Done</a>' +
                '</div>'),
            "formatValue": option.formatValue || function(picker, values) {
                return values.join(" ");
            },
            "after": option.after,
            "_open": function(){ // 内部打开事件
                _this.inputSelf.value = _this.params.formatValue(_this, _this._getValues());
            },
            "_close": function(){

            }
        };
        this.input = document.querySelector(option.input);
        this.inputSelf = this.input;
        if (!!option.container) {
            this.params.container = option.container || "";
            this.container = document.querySelector(option.container);
        }
        if (!!option.onOpen) this.params.onOpen = option.onOpen;
        if (!!option.onClose) this.params.onClose = option.onClose;
        if (!!option.onChange) this.params.onChange = option.onChange;

        option = null;
    };
    if (this.isError()) return false;
    this.init();
    return this;
};
Eventor.mixTo(Picker);
Picker.prototype.isError = function() {
    if (!this.input) {
        console.error('input对应的dom对象不存在');
        return true;
    }
    if( !!this.params.container && !this.container ){
        console.error('container对应的dom对象不存在');
        return true;
    }
    return false;
};
Picker.prototype.init = function() {
    this.input.setAttribute('readonly', 'readonly');
    this.input.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    // this._hackInputFocus();
    if (this.container) {
        this.dialog = {};
        this.dialog.container = this.container;
        this.dialog.container.innerHTML = '<div class="picker-cols"></div>';
        this._wrap = this.dialog.container.querySelector('.picker-cols');
        this.initPickerCore();
    } else {
        this.initDialog();
        this.initPicker();
        this.initPickerCore();
        this._bindEventToolbar();
    }
    this.params.after && this.params.after(this);
    this._getValues();
    return this;
};
Picker.prototype.destroy = function() {
    if ((this.container.classList + "").indexOf("modal-in") > 0) this.dialog.hide();
    if (!!this.params.container) this.container.innerHTML = "";
    else this.container.remove();
    // this.input.untap();
    F_tap.untap( this.input );
    clearTimeout(this.timeout);
    for (var i in this) {
        delete this[i];
    }
};
Picker.prototype.initPicker = function() {
    this._wrap = this.container.querySelector('.picker-cols');
    return this;
};
Picker.prototype.initDialog = function() {
    this.dialog = new PickerDialog(this.params);
    //this._wrap = this.dialog.container;
    if (!this.params.container) {
        this.container = this.dialog.container;
        this.container.innerHTML = this.params.toolbarTemplate + '<div class="picker-cols"></div>';
    }
    return this;
};
Picker.prototype.close = function() {
    return this.dialog.hide(), this.params.onClose && this.params.onClose(this), this;
};
Picker.prototype.open = function() {
    // this.inputSelf.value = this.params.formatValue(this, this._getValues());
    return this.dialog.show(), this.params.onOpen && this.params.onOpen(this), this;
};
Picker.prototype.initPickerCore = function() {
    var _this = this;
    this.cols = [];
    var _cols = this.params.cols;
    for (var i = 0; i < _cols.length; i++) {
        if (_cols[i].divider === true) {
            this._wrap.appendChild(getNode("div", "basescroller-divider", _cols[i].content));

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
                container: this._wrap,
                data: _data,
                itemHeight: this.params.itemHeight,
                itemsNumber: this.params.itemsNumber,
                selectedCallback: (function() {
                    var _i = i;
                    return function(_new, _old) {
                        if (!!_cols[_i].onChange) _cols[_i].onChange(_this, _new, _old);
                        else if (!!_this.params.onChange) _this.params.onChange(_this, _new, _old);
                        _this.inputSelf.value = _this.params.formatValue(this, _this._getValues());
                    }
                }())
            };
            var _temp = new PickerCore(option);
            _temp.container = _temp.scrollerComponent;
            _temp.items = _temp.container.querySelectorAll(".basescroller-item");
            delete _temp.scrollerComponent;
            _temp.values = _cols[i].values;
            _temp.replaceValues = function(values, displayValues) {
                _this._InitCssPickerCore();
                if (!displayValues) this.render(values);
                else {
                    var arr = [];
                    for (var i = 0; i < values.length; i++) {
                        arr.push({
                            "name": displayValues[i] || values[i],
                            "value": values[i]
                        });
                    }
                    this.render(arr);
                }
            };
            this.cols.push(_temp);

            //}
        }
    }
    // picker-core 样式


    // picker-core 样式
    this._wrap.appendChild(getNode("div", "basescroller-current-indicator-all"));
    this._component = this.container.querySelectorAll('.basescroller-component');
    // this.picker.scroller = this.dialog.container.querySelectorAll('.basescroller-scroller');
    this._InitCssPickerCore();
    return this;
};
Picker.prototype._InitCssPickerCore = function() {
    var _this = this;
    // 设置选择项的width、text-align
    _this._setCssWidth();
    this.timeout = setTimeout(function() {
        if( !!_this.params ){
            _this._setCssWidth();
            _this._wrap.style.height = _this.params.itemsNumber * _this.params.itemHeight + "px";

            var _item = _this._wrap.querySelectorAll(".basescroller-item");
            var _indicator = _this._wrap.querySelectorAll(".basescroller-current-indicator");
            var _indicatorAll = _this._wrap.querySelector(".basescroller-current-indicator-all");
            for (var i = 0; i < _this._component.length; i++) {
                _this._component[i].style.height = _this.params.itemsNumber * _this.params.itemHeight + "px";
            }
            for (var i = 0; i < _indicator.length; i++) {
                _indicator[i].style.height = _this.params.itemHeight - 2 + "px";
                _indicator[i].style.top = _this.params.itemHeight * (_this.params.itemsNumber - 1) / 2 + "px";
            }
            _indicatorAll.style.top = _this.params.itemHeight * (_this.params.itemsNumber - 1) / 2 + "px";
            _indicatorAll.style.height = _this.params.itemHeight - 2 + "px";
            for (var i = 0; i < _item.length; i++) {
                _item[i].style.height = _this.params.itemHeight + "px";
                _item[i].style.lineHeight = _this.params.itemHeight + "px";
            }
        }
    }, 100);
    return this;
};
Picker.prototype._setCssWidth = function() {
    for (var i = 0; i < this._component.length; i++) {
        var componentWidth = this._component[i].querySelector(".basescroller-scroller");
        componentWidth = !!componentWidth ? componentWidth.offsetWidth : this._component[i].offsetWidth;
        this._component[i].style.width = !!this.params.cols[i].width ? this.params.cols[i].width + 'px' : componentWidth + 'px';
        this._component[i].style.textAlign = this.params.cols[i].textAlign || 'center';
    }
}
Picker.prototype.setValue = function(values) {
    // 设置新值给当前的选项列
    if (Object.prototype.toString.call(values) == "[object Array]") {
        for (var i = 0; i < this.cols.length; i++) {
            if (!!values[i]) {
                this.cols[i].select(values[i]);
            }
        }
    } else console.error("setValue的参数必须是数组");
}
Picker.prototype._bindEventToolbar = function() {
    // 设置左右toolbar按钮的事件
    var _this = this;
    var toolbarRight = _this.container.querySelector('.picker-toolbar-right');
    if (toolbarRight) {
        _this.on('toolbarRight', function(e) {
            _this.close();
        });
        toolbarRight.click = function(e) {
            _this.emit('toolbarRight', e);
        };
        F_tap.tap( toolbarRight, toolbarRight.click );
        // toolbarRight.tap(toolbarRight.click);
    };
};
Picker.prototype._bindEventInput11111 = function() {
    // 设置input被触发的事件
    var _this = this;
    F_tap.untap( this.input );
    F_tap.tap( this.input, function(){
        _this.open();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
            var inputTop = _this.input.offsetTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
            }
        }());
    } );
    // this.input.untap();
    // this.input.tap(function() {
    //     _this.open();
    //     // 如果input被picker遮挡到，则滚动input至可视区域
    //     (function() {
    //         var clientHeight = document.documentElement.clientHeight; //  浏览器高度
    //         var scrollTop = document.body.scrollTop; // 滚动高度
    //         var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
    //         var inputTop = _this.input.offsetTop; // input相对body高度
    //         var inputHeight = _this.input.offsetHeight; // input高度
    //         if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
    //             _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
    //         }
    //     }());
    // });
    F_tap.tap( this.params.inputContainer, function(){
        _this.open();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
            var inputTop = _this.input.offsetTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
            }
        }());
    } );
    // this.params.inputContainer.tap(function() {
    //     _this.open();
    //     // 如果input被picker遮挡到，则滚动input至可视区域
    //     (function() {
    //         var clientHeight = document.documentElement.clientHeight; //  浏览器高度
    //         var scrollTop = document.body.scrollTop; // 滚动高度
    //         var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
    //         var inputTop = _this.input.offsetTop; // input相对body高度
    //         var inputHeight = _this.input.offsetHeight; // input高度
    //         if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
    //             _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
    //         }
    //     }());
    // });
    return this;
};
Picker.prototype._getValues = function() {
    var _temp = [];
    for (var i = 0; i < this.cols.length; i++) {
        if (this.cols[i].getValue) _temp.push(this.cols[i].getValue());
    };
    this.values = _temp;
    return _temp;
}
module.exports = Picker;

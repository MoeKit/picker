'use strict';
var Eventor = require('eventor');
var PickerDialog = require('./src/picker-dialog.js');
var PickerCore = require('picker-core');
var SimulateClick = require('./src/simulate-click.js');
require('./src/picker.css');
var Picker = function(option) {
    this.dialogConf = {};
    if (isType(option, 'Object')) {
        this.dialogConf = option.dialogConf || {};
        this.cols = option.cols || [];
        this.input = document.querySelector(option.input);
        option = null;
    }
    this.picker = {};
    if( this.isError() ) return false;
    this.init();
    return this;
}
Eventor.mixTo(Picker);
SimulateClick(Picker);
Picker.prototype.isError = function(){
	if( !this.input ){
		console.error('input对应的dom对象不存在');
		return true;
	}
	return false;
}



Picker.prototype.init = function() {
	this.input.setAttribute('readonly','readonly');
	this.input.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
	this.hackInputFocus();
	this.initDialog();
    this.initPicker();
    this.initPickerCore();
    this._InitCssPickerCore();
    this._bindEventToolbar();
    this._bindEventInput(this.input);
    return this;
}
Picker.prototype.destroy = function(){
	for(var i in this){
		delete this[i];
	}
	for(var i in this.__proto__){
		delete this.__proto__[i];
	}
}
Picker.prototype.initPicker = function() {
    this.dialog.wrap.innerHTML = require('./src/picker.tpl');
    this.picker.toolbar = this.dialog.wrap.querySelector('.picker-toolbar');
    this.picker.toolbarLeft = this.picker.toolbar.querySelector('.picker-toolbar-left');
    this.picker.toolbarRight = this.picker.toolbar.querySelector('.picker-toolbar-right');
    this.picker.wrap = this.dialog.wrap.querySelector('.picker-cols');
    return this;
}
Picker.prototype.initDialog = function() {
    this.dialog = new PickerDialog(this.dialogConf);
    //this.picker.wrap = this.dialog.wrap;
    return this;
}
Picker.prototype.hide = function() {
    return this.dialog.hide(), this;
}
Picker.prototype.show = function() {
    return this.dialog.show(), this;
}
Picker.prototype.initPickerCore = function() {
    this.picker.cols = [];
    var _cols = this.cols;
    for (var i = 0; i < _cols.length; i++) {
        this.picker.cols.push(new PickerCore({
            container: this.picker.wrap,
            data: _cols[i].values || [],
            itemHeight: 30,
            selectedCallback: _cols[i].onChange || function() {}
        }));
    }
    this.picker.list = document.querySelectorAll('.basescroller-component');
    return this;
}
Picker.prototype._InitCssPickerCore = function() {
    var _cols = this.cols;
    var _query = this.picker.list;
    var randomCount = _cols.length,
        percent = 100;
    // 算出需要设置均宽的选择项及其均宽的百分比
    for (var i = 0; i < _cols.length; i++) {
        if (!isType(_cols[i].width, 'Number')) {
            delete _cols[i].width;
        } else {
            randomCount--;
            percent -= _cols[i].width;
        }
    }
    // 设置选择项的width、text-align
    for (var i = 0; i < _query.length; i++) {
        _query[i].style.width = !!_cols[i].width ? _cols[i].width + '%' : percent / randomCount + '%';
        _query[i].style.textAlign = _cols[i].textAlign || 'center';
    }
    return this;
}

Picker.prototype._bindEventToolbar = function() {
    var _this = this;
    this.picker.toolbarLeft.click = function() {
        _this.emit('toolbarLeft');
    }
    this.picker.toolbarRight.click = function() {
        _this.emit('toolbarRight');
    }
    this.setClick(this.picker.toolbarLeft, this.picker.toolbarLeft.click);
    this.setClick(this.picker.toolbarRight, this.picker.toolbarRight.click);
}
Picker.prototype._bindEventInput = function(input) {
    var _this = this;
	this.setClick(input, function(e){
    	log('input click');
    	_this.show();
    	// 如果input被picker遮挡到，则滚动input至可视区域
    	(function(){
    		var clientHeight = document.documentElement.clientHeight;
	    	var scrollTop = document.body.scrollTop;
	    	var pickerHeight = _this.dialog.wrap.offsetHeight;
	    	var inputTop = _this.input.offsetTop;
	    	var inputHeight = _this.input.offsetHeight;
	    	if( inputTop-scrollTop-pickerHeight-inputHeight > 3 ){
	    		_this.scrollAnimate(inputTop-pickerHeight-inputHeight+(clientHeight-pickerHeight)*0.5, 400)
	    	}
    	}());
    });
    return this;
}
// 兼容安卓微信，在input上面增加一层遮罩层
Picker.prototype.hackInputFocus = function(){
	var _inputMask = document.createElement('div');
	var _input = this.input;
	var _parent = _input.parentNode;
	
	console.log( _input.offsetWidth, _input.clientWidth, _input.scrollWidth,  _input.offsetLeft,  _input.clientLeft , _input.scrollLeft );
	console.log( _input.offsetHeight, _input.clientHeight, _input.scrollHeight,  _input.offsetTop,  _input.clientTop , _input.scrollTop );
	_inputMask.style.width = (_input.offsetWidth+_input.clientLeft*2)+'px';
	_inputMask.style.height = (_input.offsetHeight+_input.clientTop*2)+'px';
	_inputMask.style.position = 'absolute';
	_inputMask.style.left = _input.offsetLeft;
	_inputMask.style.top = _input.offsetTop;
	_inputMask.setAttribute('id', _input.getAttribute('id')+'Mask');
	_parent.insertBefore(_inputMask, _input);
	this.input = document.getElementById(_input.getAttribute('id')+'Mask');
	return this;
}
Picker.prototype.scrollAnimate = function(position, timestamp){
	var needs = (document.body.scrollTop-position)/timestamp*25;
	var interval = setInterval(function(){
		if( Math.abs(document.body.scrollTop-position) < Math.abs(needs) ){
			clearInterval(interval)
		}
		document.body.scrollTop = document.body.scrollTop-needs;
	}, 8);
	return this;
}


function isType(object, type) {
    return Object.prototype.toString.call(object) === '[object ' + type + ']'
}
module.exports = Picker;

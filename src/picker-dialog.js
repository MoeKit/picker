'use strict';
require('./picker-dialog.css');
var Eventor = require('eventor');
require('./simulate-click.js')();
var PickerDialog = function(option){
	if( !!document.querySelectorAll('.picker-mask').length<=0 ){
		var divMask = document.createElement('a');
		divMask.className = 'picker-mask';
		divMask.href = 'javascript:void(0);';
		document.body.appendChild(divMask);
	}
	var div = document.createElement('div');
	div.className = 'picker-dialog';
	document.body.appendChild(div);
	this.mask = document.querySelectorAll(".picker-mask");
	this.mask = this.mask[ this.mask.length-1 ];
	this.container = document.querySelectorAll(".picker-dialog");
	this.container = this.container[ this.container.length-1 ];
	this._bindEvents();
	return this;
}
Eventor.mixTo(PickerDialog);
PickerDialog.prototype._bindEvents = function(){
	var _this = this;
	function triggerClick(e){
		_this.hide();
		_this.emit('close');
	}
	this.mask.tap(triggerClick);
	//this.setClick(this.mask, triggerClick);
	return this;
}
PickerDialog.prototype.show = function(){
	var _this = this;
	_this.mask.classList.add("show");
	_this.container.classList.add("modal-in");
	return this;
}
PickerDialog.prototype.hide = function(){
	var _this = this;
	_this.mask.classList.remove("show");
	_this.container.classList.remove("modal-in");
	return this;
}
module.exports =  PickerDialog;
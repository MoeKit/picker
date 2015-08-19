# picker [![spm version](http://moekit.com/badge/picker)](http://spmjs.io/package/picker)

---

## Usage
```js
var Picker = require("picker");
var pickerDate = new Picker(options);

// use Picker
```

## API
### 实例化选项options
+ input: `String` 用于触发选择器和值显示，input的id，需带#号
+ container: `String` 嵌入页面盒子，盒子id，需带#号 *当此值存在时，对应选择器弹出框各项功能将被取消，如onOpen，onClose*
+ itemsNumber: `Number` 选择器列的可视行数，单位px, 默认7
+ itemHeight: `Number` 选择器列的行高，单位px, 默认30
+ formatValue: `Function` 所有列的值的格式化函数，此函数可重新定义值的格式，值的格式默认'val1 val2 val3 ...', ，格式化函数参数有两个：*[optional]*，函数需return一个值回来
	+ picker: picker集合（后面详细说明）
	+ values: `Array` 所有列的值的集合
+ onChange: 列选项变更的回调行数，回调参数有三个: *[optional]*
	+ picker: picker集合（后面详细说明）
	+ current 当前选中的值
	+ prev 之前的值
+ onOpen: 选择器被打开的回调函数，回调参数有一个: *[optional]*
	+ picker: picker集合（后面详细说明）
+ onClose: 选择器被关闭的回调函数，回调参数有一个: *[optional]*
	+ picker: picker集合（后面详细说明）
+ toolbarTemplate: 重新定制选择器弹出框顶部的toolbar的html，默认只有右上角有一个done按钮（用于关闭）, 默认html：
```html
<div class="picker-toolbar">
	<a href="javascript:void(0);" class="picker-toolbar-right">Done</a>
</div>
```
如需保留右上角事件，可copy上面的html进行增加修改~, 至于新的toolbar事件可在onOpen回调函数中绑定
+ cols：`[Object]` 一个对象数组，每一个对象代表一个选项列，对象的key有：
	+ width: `Number` 选项列的宽度，单位px
	+ textAlign: `String` 选项列的水平对齐方式，三种：left,right,center
	+ values: `Array` 选项列的实际值
	+ displayValues: `Array` 选项列的显示值，不存在该key值时，实际值充当显示值
	+ onChange: 细节同上（实例化选项的onChange）, 此处优先级大于实例化选项的onChange
	+ divider: `Boolean` 是否启用选项列的分隔符，true为启用
	+ content: `String` 分隔符的内容，启用分隔符才有效

## 实例方法与属性
+ show 显示选择器弹出框
+ hide 隐藏选择器弹出框
+ picker picker集合

## picker属性
+ cols 列实例集合
+ setValues `Function` 通过实际值选中一项，函数带一个参数：
	+ values 列值集合

## cols列实例方法与属性
+ values `Array` 列实际值
+ value 当前值
+ prevValue 之前的值
+ replaceValues `Function` 重新渲染选择器的选项，函数带两个参数：
	+ values `Array` 实际值
	+ displayValues `Array` 显示值（可选）
+ setValue `Function` 通过实际值选中一项，函数带一个参数：
	+ values 列值集合
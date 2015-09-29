# History

---

## 0.0.1

`new` It is the first version of picker.

## 0.0.2

重构实例结构，补全文档

## 0.0.3

input元素事件从picker迁入picker-dialog, 以保证picker能更好的处理业务逻辑;  
simulate-click从HTMLElement的prototype移除，重新定制并导出到window.__tap__和window.__untap__;  
修正单元测试
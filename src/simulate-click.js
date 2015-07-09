module.exports = function(Obj) {
    Obj.prototype.setClick = function(dom, fn) {
        var touchstart, touchend, target;
        dom.addEventListener('touchstart', function(e) {
        	this.clickabled = true;
            e.stopPropagation();
            touchstart = e.timeStamp;
            target = e.target;
        });
        dom.addEventListener('touchmove', function(e) {
            this.clickabled = false;
        });
        dom.addEventListener('touchend', function(e) {
            e.stopPropagation();
            touchend = e.timeStamp;
            if (touchend - touchstart > 50 && touchend - touchstart < 1000 && this.clickabled ) {
                fn && fn(e);
            }
        });
        // dom.addEventListener('click', function(e) {
        // 	e.stopPropagation();
        // 	if( clickabled ){
        // 		clickabled = false;
        // 		fn && fn(e);
        // 		clickabled = true;
        // 	}
        // });
    }
}

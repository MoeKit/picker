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
            if (touchend - touchstart > 50 && touchend - touchstart < 1000 && this.clickabled) {
                fn && fn(e);
            }
        });
        // dom.addEventListener('click', function(e) {
        //  e.stopPropagation();
        //  if( clickabled ){
        //      clickabled = false;
        //      fn && fn(e);
        //      clickabled = true;
        //  }
        // });
    }
    HTMLElement.prototype.tap = function(fn) {
        var touchstart, touchend, target, eStart;
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
            this.addEventListener('touchstart', function(e) {
                this.clickabled = true;
                e.stopPropagation();
                touchstart = e.timeStamp;
                target = e.target;
                eStart = e;
            });
            this.addEventListener('touchmove', function(e) {
                if (Math.abs(e.changedTouches[0].pageX - eStart.changedTouches[0].pageX) > 10 || Math.abs(e.changedTouches[0].pageY - eStart.changedTouches[0].pageY) > 10) {
                    this.clickabled = false;
                }
            });
            this.addEventListener('touchend', function(e) {
                e.stopPropagation();
                touchend = e.timeStamp;
                if (touchend - touchstart > 30 && touchend - touchstart < 1000 && this.clickabled) {
                    setTimeout(function() {
                        if (!!fn) {
                            fn(e);
                        }
                    }, 0);
                }
            });
        } else {
            this.addEventListener('click', function(e) {
                e.stopPropagation();
                fn && fn(e);
            });
        }
    };
}

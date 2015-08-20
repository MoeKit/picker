module.exports = function() {
    HTMLElement.prototype.tap = function(fn) {
        var _this = this;
        this.__t = {};
        this.tevent = {
            tstart: function(e) {
                this.clickabled = true;
                e.stopPropagation();
                _this.__t.start = e.timeStamp;
                _this.__t.startEvent = e;
            },
            tmove: function(e) {
                if (Math.abs(e.changedTouches[0].pageX - _this.__t.startEvent.changedTouches[0].pageX) > 10 || Math.abs(e.changedTouches[0].pageY - _this.__t.startEvent.changedTouches[0].pageY) > 10) {
                    this.clickabled = false;
                }
            },
            tend: function(e) {
                e.stopPropagation();
                if (e.timeStamp - _this.__t.start > 30 && e.timeStamp - _this.__t.start < 1000 && this.clickabled) {
                    setTimeout(function() {
                        if (!!fn) {
                            fn(e);
                        }
                    }, 0);
                }
            },
            click: function(e) {
                e.stopPropagation();
                fn && fn(e);
            }
        };
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
            this.addEventListener('touchstart', this.tevent.tstart, false);
            this.addEventListener('touchmove', this.tevent.tmove, false);
            this.addEventListener('touchend', this.tevent.tend, false);
        } else {
            this.addEventListener('click', this.tevent.click, false);
        }
    };
    HTMLElement.prototype.untap = function() {
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
            this.tevent.tstart && this.removeEventListener('touchstart', this.tevent.tstart, false);
            this.tevent.tmove && this.removeEventListener('touchmove', this.tevent.tmove, false);
            this.tevent.tend && this.removeEventListener('touchend', this.tevent.tend, false);
        } else {
            this.tevent.click && this.removeEventListener('click', this.tevent.click, false);
        }
    }
}

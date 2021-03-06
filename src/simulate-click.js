'use strict';
var Event = {
    tap: function(element, callback){
        if( !element ) return console.error("tap对象不能为空");
        element.__tap = {};
        element.__tap.event = {
            start: function(e) {
                e.stopPropagation();
                element.__tap.clickabled = true;
                element.__tap.starttime = e.timeStamp;
                element.__tap.startPageX = e.changedTouches[0].pageX;
                element.__tap.startPageY = e.changedTouches[0].pageY;
            },
            move: function(e) {
                if (Math.abs(e.changedTouches[0].pageX - element.__tap.startPageX) >= 5 || 
                    Math.abs(e.changedTouches[0].pageY - element.__tap.startPageY) >= 5) {
                    element.__tap.clickabled = false;
                }
            },
            end: function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.timeStamp - element.__tap.starttime > 30 && 
                    e.timeStamp - element.__tap.starttime < 300 && 
                    element.__tap.clickabled ) {
                    // setTimeout(function() {
                        if (!!callback) {
                            callback(e);
                        }
                    // }, 0);
                }
            },
            click: function(e) {
                e.stopPropagation();
                callback && callback(e);
            }
        }
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
            element.addEventListener('touchstart', element.__tap.event.start, false);
            element.addEventListener('touchmove', element.__tap.event.move, false);
            element.addEventListener('touchend', element.__tap.event.end, false);
        } else {
            element.addEventListener('click', element.__tap.event.click, false);
        }
        return element;
    },
    untap: function(element){
        if( !element ) return console.error("untap对象不能为空");
        element.__tap = element.__tap || {};
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) && !!element.__tap.event ) {
            element.__tap.event.start && element.removeEventListener('touchstart', element.__tap.event.start, false);
            element.__tap.event.move && element.removeEventListener('touchmove', element.__tap.event.move, false);
            element.__tap.event.end && element.removeEventListener('touchend', element.__tap.event.end, false);
        } else if(!!element.__tap.event) {
            element.__tap.event.click && element.removeEventListener('click', element.__tap.event.click, false);
        }
        return element;
    }

};
window.__tap__ = Event.tap;
window.__untap__ = Event.untap;
module.exports = Event;

// module.exports = function() {
//     HTMLElement.prototype.tap = function(fn) {
//         var _this = this;
//         this.__t = {};
//         this.tevent = {
//             tstart: function(e) {
//                 this.clickabled = true;
//                 e.stopPropagation();
//                 _this.__t.start = e.timeStamp;
//                 _this.__t.startEvent = e;
//             },
//             tmove: function(e) {
//                 if (Math.abs(e.changedTouches[0].pageX - _this.__t.startEvent.changedTouches[0].pageX) > 10 || Math.abs(e.changedTouches[0].pageY - _this.__t.startEvent.changedTouches[0].pageY) > 10) {
//                     this.clickabled = false;
//                 }
//             },
//             tend: function(e) {
//                 e.stopPropagation();
//                 if (e.timeStamp - _this.__t.start > 30 && e.timeStamp - _this.__t.start < 1000 && this.clickabled) {
//                     setTimeout(function() {
//                         if (!!fn) {
//                             fn(e);
//                         }
//                     }, 0);
//                 }
//             },
//             click: function(e) {
//                 e.stopPropagation();
//                 fn && fn(e);
//             }
//         };
//         if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
//             this.addEventListener('touchstart', this.tevent.tstart, false);
//             this.addEventListener('touchmove', this.tevent.tmove, false);
//             this.addEventListener('touchend', this.tevent.tend, false);
//         } else {
//             this.addEventListener('click', this.tevent.click, false);
//         }
//     };
//     HTMLElement.prototype.untap = function() {
//         if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) && !!this.tevent ) {
//             this.tevent.tstart && this.removeEventListener('touchstart', this.tevent.tstart, false);
//             this.tevent.tmove && this.removeEventListener('touchmove', this.tevent.tmove, false);
//             this.tevent.tend && this.removeEventListener('touchend', this.tevent.tend, false);
//         } else if(!!this.tevent) {
//             this.tevent.click && this.removeEventListener('click', this.tevent.click, false);
//         }
//     }
// }

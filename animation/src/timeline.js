'use strict';
/**
 * 只需要进行一次 浏览器检测 就能得到requestAnimationFrame
 * @type {number}
 */
var DEFAULT_INTERVAL = 1000/60;


//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||   //标准浏览器
        window.webkitRequestAnimationFrame ||  //chrome
        window.mozRequestAnimationFrame ||    //ff
        window.oRequestAnimationFrame ||      //opera
        function (callback) {                 //IE
            return window.setTimeout(callback,callback.interval || DEFAULT_INTERVAL);
        }
})();



var cancelAnimationFrame = (function(){
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            return window.clearTimeout(id);
        };
})();

/**
 * Timeline 时间轴类
 * @constructor
 */
function Timeline() {
    this.animationHandler = 0;
    this.state = STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onerterframe = function (time) {

};

/**
 * 动画开始
 * @param interval
 */
Timeline.prototype.start = function (interval) {
    if(this.state === STATE_START)
        return;
    this.state = STATE_START;
    this.interval = interval || DEFAULT_INTERVAL;
    startTimeline(this, +new Date());
};

/**
 * 动画停止
 */
Timeline.prototype.stop = function () {
    if(this.state !== STATE_START) {
        return ;
    }
    this.state = STATE_STOP;
    //如果动画开始过，则记录动画从开始到现在所经历的时间
    if(this.startTime){
        this.dur = +new Date() - this.startTime;
    }
    cancelAnimationFrame(this.animationHandler);
};

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function () {
    if(this.state ===STATE_START){
        return;
    }
    if(!this.dur || !this.interval) {
        return;
    }
    this.state = STATE_START;

    //无缝连接动画
    startTimeline(this, +new Date() - this.dur);
};

/**
 * 时间轴动画启动函数
 * @param timeline  时间轴的实例
 * @param startTime  动画开始时间戳
 */
function startTimeline(timeline,startTime) {
    timeline.startTime = startTime;
    nextTick.interval = timeline.interval;

    //记录上一次回调的时间戳
    var lastTick = +new Date();
    nextTick();


    /**
     * 每一帧执行的函数
     */
    function nextTick() {
        var now = +new Date();
        timeline.animationHandler = requestAnimationFrame(nextTick);

        //如果当前时间与上一次回调的时间戳大于设置的时间间隔,
        //表示这一次可以执行回调函数
        if(now -lastTick>= timeline.interval) {      //timeline.interval    用户传入的 时间间隔
            timeline.onenterframe(now - startTime);
            lastTick = now;
        }
    }
}

module.exports = Timeline;

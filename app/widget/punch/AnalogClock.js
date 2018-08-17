/**
 * Punch Analog Clock widget
 * @class AnalogClock
 * @namespace Breeze.widget.punch.AnalogClock
 * @alias widget.breeze.punch.AnalogClock
 * @extends Ext.Component
 * @xtype breeze-analogclock
 */
Ext.define('Breeze.widget.punch.AnalogClock', {
    extend: 'Ext.Component',
    alias:'widget.breeze.punch.analogclock',
    xtype: 'breeze-analogclock',
    userCls:'tko-analog-clock',
    //html:"<div class='tko-analog-clock-min'></div><div class='tko-analog-clock-hrs'></div><div class='tko-analog-clock-sec'></div>",
    html:"<div class='tko-analog-clock-min'></div><div class='tko-analog-clock-hrs'></div>",
    onRender:function(){
        this.callParent(arguments);
        this.updateTime();
    },
    updateTime:function(){
        var t = new Date();
        var s = (t.getSeconds() + (t.getMilliseconds() / 1000)) * 6;
        var m = (t.getMinutes() + (s / 360)) * 6;
        var h = ((t.getHours() % 12) + (m / 360)) * 30;
        this.el.select('.tko-analog-clock-min').elements[0].style.transform = 'rotateZ('+ m +'deg)';
        this.el.select('.tko-analog-clock-hrs').elements[0].style.transform = 'rotateZ('+ h +'deg)';
        /*this.el.select('.tko-analog-clock-sec').elements[0].style.transform = 'rotateZ('+ s +'deg)';*/
        var me = this;
        setTimeout(function(){
            me.updateTime();
        }, 1000); // use .66 is second hand is in use
    }
});
Ext.define('Breeze.view.main.tko.AnalogClock', {
    extend: 'Ext.Component',
    alias:'widget.main.tko.analogClock',

    userCls:'tko-analog-clock',
    html:"<div class='tko-analog-clock-min'></div><div class='tko-analog-clock-hrs'></div><div class='tko-analog-clock-sec'></div>",

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
        this.el.select('.tko-analog-clock-sec').elements[0].style.transform = 'rotateZ('+ s +'deg)';
    }


});
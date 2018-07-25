Ext.define('Breeze.view.main.tko.DigitalClock', {
	extend:'Ext.Component',
	alias:'widget.main.tko.digitalClock',
	config:{
		clockedIn:false,
		abbreviated:false
	},
	userCls:'tko-digital-clock',
	html:"<div class='tko-digital-clock-date'></div><div class='tko-digital-clock-time'></div><div class='tko-digital-clock-inout'></div>",

	onRender:function(){
		this.callParent(arguments);
		this.updateInout();
		this.updateDateTime();
	},

	applyClockedIn:function(ci){
		if(this.rendered){
			this.updateInout();
		}
		return ci;
	},

	applyAbbreviated:function(ab){
		if(this.rendered){
			this.updateDateTime();
		}
		return ab;
	},


	updateDateTime:function(){
		var t = new Date();
		var min = ("0" + (t.getMinutes())).slice(-2); 
		var hrs = (t.getHours() + 24) % 12 || 12;
		var mer = ["AM","PM"][Math.round(t.getHours()/24)];
		//var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][t.getMonth()];
		//var mab = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][t.getMonth()];
		var mon = (this.getAbbreviated()) ? Ext.Date.getShortMonthName(t.getMonth()) : Ext.Date.monthNames[t.getMonth()];

		var dat = t.getDate();
		var ord = ["st","nd","rd"][((t.getDate()+90)%100-10)%10-1]||"th";
		this.el.select('.tko-digital-clock-date').elements[0].innerHTML = mon + " " + dat + "<sup>" + ord + "</sup>";
		this.el.select('.tko-digital-clock-time').elements[0].innerHTML = hrs + ":" + min + "<sub>" + mer + "</sub>";
		var me = this;
		setTimeout(function(){
			me.updateDateTime();
		}, 1000);
	},

	updateInout:function(){
		// console.log("[updateInout]");
		// console.log(this.getClockedIn());
		var io = ["&#10003; Clocked In", "&times; Clocked Out"][(this.config.clockedIn)? 0 : 1];
		this.el.select('.tko-digital-clock-inout').elements[0].innerHTML = io;
	}



});
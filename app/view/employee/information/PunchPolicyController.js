/**
 * Sub-controller for Employee Info subview Punch Policies
 * @class PunchPolicyController
 * @alias Breeze.view.employee.information.PunchPolicyController
 */
Ext.define('Breeze.view.employee.information.PunchPolicyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.information.punchpolicy',

    // == Event Handlers ==

	// -- Rounding Rules --

    /**
     * Handles change event fired by rounding_inc select field
     * Updates rounding preview, and restricts min/max
     * of rounding offset field based on new value
     */
    onRoundingIncChange: function(c,newVal,oldVal,eOpts){
        // console.log('Rounding Inc Changed');
        var roundOff = this.lookup('roundingTab').down('[name="rounding_off"]');
        var roundMin = -((newVal / 2).toFixed() -1);
        var roundMax = ((newVal - .1) / 2).toFixed();
        roundOff.setValue(
            Math.max(Math.min(roundOff.getValue(),roundMax), roundMin)
        );

        roundOff.setMinValue(roundMin);
        roundOff.setMaxValue(roundMax);

        this.refreshRoundingPreview();
    },

    /**
     * Handles change event fired by rounding_off spinner field
     */
    onRoundingOffChange: function(c,newVal,oldVal,eOpts){
        // console.log('Rounding Inc Changed');
        this.refreshRoundingPreview();
    },

	// -- Overtime --

	onOvertime1Change: function(c, newV, oldV, eOpts){
		this.updateOvertime(1,newV);
	},
	onOvertime2Change: function(c, newV, oldV, eOpts){
		this.updateOvertime(2,newV);
	},
	onOvertime3Change: function(c, newV, oldV, eOpts){
		this.updateOvertime(3,newV);
	},
	onOvertime4Change: function(c, newV, oldV, eOpts){
		this.updateOvertime(4,newV);
	},

	// -- Deductions --

	/**
	 * Toggle whether deduction lunch spinners are enabled based on checkbox
	 */
	onPunchForLunchChange: function(c, newV, oldV, eOpts){
		var deductions = this.lookup('deductionsTab');
		deductions.down('[name="lunch_seg"]').setDisabled(!newV);
		deductions.down('[name="lunch_minutes"]').setDisabled(!newV);
	},



    // == Helper Methods ==

	/**
	 * Update overtime check row for level with value
	 * @param {Number} index Overtime row to update
	 * @param {Boolean} value Whether checked or not
	 */
	updateOvertime: function(index, value){
		var tab = this.lookup('overtimeTab');

		var ot1Check = tab.down('[name="overtime_opt1"]');
		var ot1Day = tab.down('[name="overtime_day1"]');
		var ot1Week = tab.down('[name="overtime_week1"]');
		var ot1Rate = tab.down('[name="overtime_rate1"]');

		var ot2Check = tab.down('[name="overtime_opt2"]');
		var ot2Day = tab.down('[name="overtime_day2"]');
		var ot2Week = tab.down('[name="overtime_week2"]');
		var ot2Rate = tab.down('[name="overtime_rate2"]');

		var ot3Check = tab.down('[name="overtime_opt3"]');
		var ot3Day = tab.down('[name="overtime_day3"]');
		var ot3Week = tab.down('[name="overtime_week3"]');
		var ot3Rate = tab.down('[name="overtime_rate3"]');

		var ot4Check = tab.down('[name="overtime_opt4"]');
		var ot4Day = tab.down('[name="overtime_day4"]');
		var ot4Week = tab.down('[name="overtime_week4"]');
		var ot4Rate = tab.down('[name="overtime_rate4"]');

		var toggle = function(state, items){
			items.forEach(function(i){
				i.setVisibility(state);
			})
		};

		if(index == 4){
			toggle(value, [ot4Day, ot4Week, ot4Rate]);
		}
		if(index == 3){
			toggle(value, [ot3Day, ot3Week, ot3Rate]);
			if(value){ot4Check.setDisabled(false);}
			if(!value){
				toggle(false, [ot4Day, ot4Week, ot4Rate]);
				ot4Check.setChecked(false);
				ot4Check.setDisabled(true);
				
			}
		}
		if(index == 2){
			toggle(value, [ot2Day, ot2Week, ot2Rate]);
			if(value){ot3Check.setDisabled(false);}
			if(!value){
				toggle(false, [ot3Day, ot3Week, ot4Rate]);
				toggle(false, [ot4Day, ot4Week, ot4Rate]);
				ot3Check.setChecked(false);
				ot3Check.setDisabled(true);
				ot4Check.setChecked(false);
				ot4Check.setDisabled(true);
				
			}
		}
		if(index == 1){
			toggle(value, [ot1Day, ot1Week, ot1Rate]);
			if(value){ot2Check.setDisabled(false);}
			if(!value){
				toggle(false, [ot2Day, ot2Week, ot2Rate]);
				toggle(false, [ot3Day, ot3Week, ot3Rate]);
				toggle(false, [ot4Day, ot4Week, ot4Rate]);
				ot2Check.setChecked(false);
				ot2Check.setDisabled(true);
				ot3Check.setChecked(false);
				ot3Check.setDisabled(true);
				ot4Check.setChecked(false);
				ot4Check.setDisabled(true);
			}
		}

	},

    /**
     * Refresh displayed 'rounding' preview text
     */
    refreshRoundingPreview: function(){
        var increment = this.lookup('roundingTab').down('[name="rounding_inc"]');
        var offset = this.lookup('roundingTab').down('[name="rounding_off"]');

        var nRoundMinutes = increment.getValue();
        var nOffsetSeconds = offset.getValue();

        var baseDate = new Date('1/1/2000 08:00:00 AM');

        // ref times

        var tRefTime1 = Ext.Date.add(
            baseDate, Ext.Date.SECOND, (nRoundMinutes * -60)
        );
        var tRefTime2 = baseDate;
        var tRefTime3 = Ext.Date.add(
            baseDate, Ext.Date.SECOND, (nRoundMinutes * 60)
        );

        // calculate labels
        var tLowTime1 = tRefTime1;
	    while (this.roundPunchTime(Ext.Date.add(tLowTime1, Ext.Date.SECOND, -60), nRoundMinutes, nOffsetSeconds).toString() == tRefTime1.toString()) {
	        tLowTime1 = Ext.Date.add(tLowTime1, Ext.Date.SECOND, -60);
	    }

        var tHighTime1 = tRefTime1;
	    while (this.roundPunchTime(Ext.Date.add(tHighTime1, Ext.Date.SECOND, 60), nRoundMinutes, nOffsetSeconds).toString() == tRefTime1.toString()) {
	        tHighTime1 = Ext.Date.add(tHighTime1, Ext.Date.SECOND, 60);
        }
        
        var refText1 = this.getTimePart(tRefTime1);
	    var lowText1 = this.getTimePart(tLowTime1);
	    var highText1 = this.getTimePart(tHighTime1);

	    //Second label line
	    var tLowTime2 = tRefTime2;
	    while (this.roundPunchTime(Ext.Date.add(tLowTime2, Ext.Date.SECOND, -60), nRoundMinutes, nOffsetSeconds).toString() == tRefTime2.toString()) {
	        tLowTime2 = Ext.Date.add(tLowTime2, Ext.Date.SECOND, -60);
	    }

	    var tHighTime2 = tRefTime2;
	    while (this.roundPunchTime(Ext.Date.add(tHighTime2, Ext.Date.SECOND, 60), nRoundMinutes, nOffsetSeconds).toString() == tRefTime2.toString()) {
	        tHighTime2 = Ext.Date.add(tHighTime2, Ext.Date.SECOND, 60);
	    }

	    var refText2 = this.getTimePart(tRefTime2);
	    var lowText2 = this.getTimePart(tLowTime2);
	    var highText2 = this.getTimePart(tHighTime2);

	    //Third label line
	    var tLowTime3 = tRefTime3;
	    while (this.roundPunchTime(Ext.Date.add(tLowTime3, Ext.Date.SECOND, -60), nRoundMinutes, nOffsetSeconds).toString() == tRefTime3.toString()) {
	        tLowTime3 = Ext.Date.add(tLowTime3, Ext.Date.SECOND, -60);
	    }

	    var tHighTime3 = tRefTime3;
	    while (this.roundPunchTime(Ext.Date.add(tHighTime3, Ext.Date.SECOND, 60), nRoundMinutes, nOffsetSeconds).toString() == tRefTime3.toString()) {
	        tHighTime3 = Ext.Date.add(tHighTime3, Ext.Date.SECOND, 60);
	    }

	    var refText3 = this.getTimePart(tRefTime3);
	    var lowText3 = this.getTimePart(tLowTime3);
	    var highText3 = this.getTimePart(tHighTime3);

        var roundPrev1 = this.lookup('roundPrev1');
        var roundPrev2 = this.lookup('roundPrev2');
        var roundPrev3 = this.lookup('roundPrev3');

        if (nRoundMinutes == 1) {
	        offset.setDisabled(true);

	        roundPrev1.hide();
	        roundPrev2.setHtml("Punches will not be rounded");
	        roundPrev3.hide();
	    } else {
	        offset.setDisabled(false);

	        roundPrev1.setHtml("Punches between " + lowText1 + " and " + highText1 + " will round to " + refText1);
	        roundPrev1.show();
	        roundPrev2.setHtml("Punches between " + lowText2 + " and " + highText2 + " will round to " + refText2);
	        roundPrev2.show();
	        roundPrev3.setHtml("Punches between " + lowText3 + " and " + highText3 + " will round to " + refText3);
	        roundPrev3.show();
	    }
    },

    /**
     * Ported from EmployeeInfo.js view
     */
    roundPunchTime: function (tPunchTime, nRoundMinutes, nOffsetSeconds) {
	    nOffsetSeconds = nOffsetSeconds * 60;

	    tPunchTime = this.normalizeTime(tPunchTime, "Minutes");

	    var tOffsetTime = Ext.Date.add(tPunchTime, Ext.Date.SECOND, (nOffsetSeconds * -1));

	    var resetOffSetTime = this.resetDay(tOffsetTime);
	    var nSecondInDay = Math.abs(((tOffsetTime - resetOffSetTime) / 1000).toFixed());

	    var a = (nSecondInDay / nRoundMinutes / 60);
	    var b = (nSecondInDay / nRoundMinutes / 60).toFixed();
	    var nRoundedSeconds = (nSecondInDay / nRoundMinutes / 60).toFixed() * nRoundMinutes * 60;

	    var tRoundTime = Ext.Date.add(resetOffSetTime, Ext.Date.SECOND, nRoundedSeconds);

	    return tRoundTime;
    },
    
    /**
     * Ported from EmployeeInfo.js view
     */
    getTimePart: function (tTime) {
	    return Ext.Date.format(tTime, 'g:i A');
    },
    
    /**
     * Ported from EmployeeInfo.js view
     */
    normalizeTime: function (tTime, cUnits, optRound) {
	    if (tTime == '') {
	        return tTime;
	    }

	    var Yr = tTime.getFullYear();
	    var Mnth = tTime.getMonth() + 1;
	    var Dy = tTime.getDate();
	    var HH = tTime.getHours();
	    var MM = tTime.getMinutes();
	    var SS = tTime.getSeconds();
	    var AddSeconds = 0

	    switch (cUnits) {
	        case "Hours":
	            if (optRound && MM >= 30) {
	                AddSeconds = 60 * 60
	            }
	            MM = 0
	            SS = 0
	            break;
	        case "Minutes":
	            if (optRound && SS >= 30) {
	                AddSeconds = 60
	            }
	            SS = 0
	            break;
	        default:
	            break;
	    }

	    var tNewTime = new Date(Yr + "-" + Mnth + "-" + Dy + " " + HH + ":" + MM + ":" + SS + " AM");
	    //var tNewTime = Ext.Date.parse( Yr + "-" + Mnth + "-" + Dy + " " + HH + ":" +  MM + ":" + SS + " AM", "Y-m-d g:i:s A");

	    tNewTime = Ext.Date.add(tNewTime, Ext.Date.SECOND, AddSeconds);

	    return tNewTime
    },
    
    /**
     * Ported from EmployeeInfo.js view
     */
    resetDay: function (tTime) {
	    var Yr = tTime.getFullYear();
	    var Mnth = tTime.getMonth() + 1;
	    var Dy = tTime.getDate();

	    return new Date(Yr + "-" + Mnth + "-" + Dy + " 12:00:00 AM");
	},

});
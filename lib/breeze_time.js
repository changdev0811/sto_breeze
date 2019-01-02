var BreezeTime = {};

(function(){

    timeFormatRegEx = /([1-9]|1[0-2])\:(0[0-9]|[1-5][0-9])(AM|PM)/;

    /**
     * Encapsulates a time that can be converted back and forth to minutes
     * @param {Number} hour Hour
     * @param {Number} minute Minute
     * @param {String} period Period ('AM' or 'PM')
     */
    BreezeTime = function (hour,minute,period){
        this.hour = hour;
        this.minute = minute;
        this.period = period;
    };

    /**
     * Parses a time string ('HH:MM PP') and returns value as
     * new instance of BreezeTime
     * @param {String} timeString time string to parse
     * @return {BreezeTime} New instance of BreezeTime
     */
    BreezeTime.parse = function(timeString){
        var raw = timeString.trim(),
            time = raw.substr(0, raw.length - 2).trim(),
            period = raw.substr(-2).trim(),
            vals = time.split(':').map((v)=>{return parseInt(v);});

        return new BreezeTime(vals[0], vals[1], period);
    };

    /**
     * Static method that checks the format of a time string for
     * validity
     * @param {String} timeString time string to check
     * @return {Boolean} True if format is correct, false otherwise
     * @static
     */
    BreezeTime.isValidFormat = function(timeString){
        if(timeString.match(timeFormatRegEx) !== null){
            return true;
        } else {
            return false;
        }
    };

    /**
     * Construct new instance of BreezeTime from number of minutes
     * @param {Number} minutes Minutes value
     * @return {BreezeTime} New instance of BreezeTime
     */
    BreezeTime.fromMinutes = function(minutes){
        var period = (minutes >= 720)? 'PM' : 'AM',
            hour = (minutes/60)%12,
            minute = (minutes%60);
        return new BreezeTime(hour, minute, period);
    };

    /**
     * Convert time to minutes
     * @return {Number} Time expressed as minutes
     */
    BreezeTime.prototype.asMinutes = function(){
        var hours = (this.hour == 12)? 0 : this.hour;
        var minutes = (hours * 60) + this.minute;
        if(this.period == "PM"){
            minutes += (12 * 60);
        }
        return minutes;
    };

    /**
     * Shorthand convert value to time string
     */
    BreezeTime.prototype.asTime = function(){
        return [
            this.hours, ':', this.minutes.toZeroPaddedString(2), this.period
        ].join('');
    };

    BreezeTime.util = {
        /**
         * Ported from EmployeeInfo.js view normalizeTime
         * @param {*} tTime 
         * @param {*} cUnits 
         * @param {*} optRound 
         */
        normalize: function (tTime, cUnits, optRound) {
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
    
            var tNewTime = new Date(
                `${Yr}-${Mnth}-${Dy} ${HH}:${MM}:${SS} AM`
            );
            
            tNewTime = Ext.Date.add(tNewTime, Ext.Date.SECOND, AddSeconds);
    
            return tNewTime;
        },
        /**
         * Ported from EmployeeInfo.js view getTimePart
         * @param {*} tTime 
         */
        getPart: function (tTime) {
            return Ext.Date.format(tTime, 'g:i A');
        },
        /**
         * Ported from EmployeeInfo.js view resetDay
         * @param {*} tTime 
         */
        resetDay: function (tTime) {
            var Yr = tTime.getFullYear();
            var Mnth = tTime.getMonth() + 1;
            var Dy = tTime.getDate();
    
            return new Date(Yr + "-" + Mnth + "-" + Dy + " 12:00:00 AM");
        },
        /**
         * Ported from EmployeeInfo.js view roundPunchTime
         * @param {*} tPunchTime 
         * @param {*} nRoundMinutes 
         * @param {*} nOffsetSeconds 
         */
        roundPunch: function (tPunchTime, nRoundMinutes, nOffsetSeconds) {
            nOffsetSeconds = nOffsetSeconds * 60;
    
            tPunchTime = BreezeTime.util.normalize(tPunchTime, "Minutes");
    
            var tOffsetTime = Ext.Date.add(tPunchTime, Ext.Date.SECOND, (nOffsetSeconds * -1));
    
            var resetOffSetTime = BreezeTime.util.resetDay(tOffsetTime);
            var nSecondInDay = Math.abs(((tOffsetTime - resetOffSetTime) / 1000).toFixed());
    
            var a = (nSecondInDay / nRoundMinutes / 60);
            var b = (nSecondInDay / nRoundMinutes / 60).toFixed();
            var nRoundedSeconds = (nSecondInDay / nRoundMinutes / 60).toFixed() * nRoundMinutes * 60;
    
            var tRoundTime = Ext.Date.add(resetOffSetTime, Ext.Date.SECOND, nRoundedSeconds);
    
            return tRoundTime;
        }
    }
})();
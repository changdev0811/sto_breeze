var BreezeTime = {};

(function(){

    timeFormatRegEx = /^([0]?[1-9]|1[0-2])\:(0[0-9]|[1-5][0-9])[\s]?(AM|PM)/;

    /**
     * Encapsulates a time that can be converted back and forth to minutes
     * @param {Number} hour Hour
     * @param {Number} minute Minute
     * @param {String} period Period ('AM' or 'PM')
     * @class BreezeTime
     */
    BreezeTime = function (hour,minute,period){
        this.hour = Math.floor(hour);
        this.minute = Math.floor(minute);
        this.period = period.toUpperCase();
    };

    /**
     * Automatically detects whether to use parse or
     * fromMinutes based on the passed data type
     * @return {BreezeTime} New instance
     */
    BreezeTime.resolve = function(val){
        if(typeof val == 'number'){
            return BreezeTime.fromMinutes(val);
        } else {
            if(BreezeTime.isValidFormat(val.trim())){
                return BreezeTime.parse(val.trim());
            } else {
                return null;
            }
        }
    };

    /**
     * Parses a time string ('HH:MM PP') and returns value as
     * new instance of BreezeTime
     * @param {String} timeString time string to parse
     * @return {BreezeTime} New instance of BreezeTime
     * @memberof BreezeTime
     */
    BreezeTime.parse = function(timeString){
        var raw = timeString.trim(),
            p = raw.match(timeFormatRegEx),
            h = parseInt(p[1]),
            m = parseInt(p[2]),
            pd = p[3];

        return new BreezeTime(h,m,pd);
    };

    /**
     * Static method that checks the format of a time string for
     * validity
     * @param {String} timeString time string to check
     * @return {Boolean} True if format is correct, false otherwise
     * @static
     * @memberof BreezeTime
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
     * @memberof BreezeTime
     */
    BreezeTime.fromMinutes = function(minutes){
        var period = (minutes >= 720)? 'PM' : 'AM',
            hour = Math.floor((minutes/60)%12),
            minute = Math.floor(minutes%60);
        return new BreezeTime(hour, minute, period);
    };

    /**
     * Convert time to minutes
     * @return {Number} Time expressed as minutes
     * @memberof BreezeTime
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
     * @param {Object} options Optional object specifying options:
     *      - padHour (default false): adds 0 to start of single digit hours
     *      - space (default false): adds space between time and period
     * @return {String} Time string from time stored in object
     * @memberof BreezeTime
     */
    BreezeTime.prototype.asTime = function(options){
        // default options
        var opts = {padHour: false, space: false};
        // If options provided, override defaults with whatever was defined
        if(options){
            Object.assign(opts, options);
        }
        // prepare values
        var hour = (this.hour == 0)? 12 : this.hour,
            minute = this.minute.toZeroPaddedString(2, true),
            period = this.period.toUpperCase();
        // apply options
        hour = (opts.padHour)? hour.toZeroPaddedString(2,true) : hour;
        period = (opts.space)? (' ' + period) : period;

        return hour + ':' + minute + period;
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

    // for testing
    if(typeof module !== 'undefined'){
        module.exports = BreezeTime;
    }
})();
var BreezeTime = {};

(function(){

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
    }

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
})();
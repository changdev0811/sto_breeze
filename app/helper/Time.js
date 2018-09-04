/**
 * Time related helper methods
 * @class Time
 * @alias Breeze.helper.Time
 */
Ext.define('Breeze.helper.Time', {
    statics: {
        /**
         * Convert minutes into an hours:minutes string
         * @param {Number} minutes Minutes to convert
         * @return {String} Minutes converted to hours and minutes
         */
        minutesToHours: function(minutes){
            var min = minutes % 60;
            var hrs = (minutes - min)/60;
            min = (min.toString().length == 1)? '0' + min : min;
            return [hrs,min].join(':')
        },
        /**
         * Minutes class, ported over from homemmade.js
         */
        Minutes: function(minutes,HHMM) {
            this.minutes = minutes;
            this.HHMM = HHMM;
        
            this.display = function () {
                if (this.HHMM == false) {
                    return this.toDecimalHours()
                }
                else {
                    return this.toHoursMinutes();
                }
            }
            this.toHoursMinutes = function() {
                var signstring = '';
                if (this.minutes < 0) {
                    signstring = '-';
                    this.minutes = Math.abs(this.minutes);
                }
                var finalminutes = this.minutes % 60;
        
                this.minutes = this.minutes - finalminutes;
                var hours = this.minutes / 60;
                return signstring + hours + ':' + this.padDigits( Math.round(finalminutes),2);
            }
        
            this.toDecimalHours = function() {
                var myreturn = this.minutes / 60;
                return myreturn.toFixed(2);
            }
            
           this.padDigits = function(number, digits) {
                return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
            }
        }
    }
});
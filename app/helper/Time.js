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
        }
    }
});
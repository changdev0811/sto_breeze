/****!
    UTC Timely extensions for Date object
    @author vdtdev@gmail.com
*****/
(function () {
    /**
     * Constant values passable to Date toUTC method's 'out' option
     */
    Date.UTC_OUT = {
        // Output as Date object
        DATE: 0,
        // Output as String
        STRING: 1,
        // Output as time number
        NUMBER: 2
    };

    /**
     * Constant values passable to Date toUTC method's 'format' option
     */
    Date.UTC_FORMAT = {
        // UTC formatting (as per toUTCDate())
        UTC: 0,
        // ISO formatting (as per toISODate())
        ISO: 1
    };

    /**
     * Advanced toUTC function supporting forcing time zone, output as Date or String,
     * and outputting in stripped ISO format
     * @param {Object} options Object providing optional set of options:
     *  - out (Date.UTC_OUT): Output type (string or date) [default DATE]
     *  - format (Date.UTC_FORMAT): Format for string, specifying whether to use toUTC
     *      or toISO methods [default UTC]
     *  - strip (boolean): If true and using ISO style string out, strip trailing 'Z'
     *      [default false]
     *  - forceZone (boolean): If true, rebuild date using getUTCxyz methods [default false]
     * @return {Date|String} Date object or date string constructed using provided options
     */
    Date.prototype.toUTC = function (options) {
        var output = (options && options.out) ? options.out : Date.UTC_OUT.DATE,
            format = (options && options.format) ? options.format : Date.UTC_FORMAT.UTC,
            strip = (options && options.strip) ? options.strip : false,
            forceZone = (options && options.forceZone) ? options.forceZone : false,
            date = new Date(this);

        // forceZone true, so rebuild date obj using getUTCxyz methods
        if (forceZone) {
            date = new Date(
                date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
            );
        }

        // Requested output as date object, so go ahead and return
        if (output == Date.UTC_OUT.DATE) {
            return date;
        }

        if(output == Date.UTC_OUT.NUMBER){
            return date.getTime() - (date.getTimezoneOffset() * 6000);
        }

        // Remainder of code pertains to string output

        if (format == Date.UTC_FORMAT.ISO) {
            // Requested ISO-style string output format
            var string = date.toISOString();
            if (strip) {
                // Requested stripping trailing 'Z'
                string = string.substr(0, string.length - 1);
            }

            // return string form of date
            return string;
        } else {
            // Requested UTC-style string output format

            // return UTC style string
            return date.toUTCString();
        }

        // Shouldn't be possible to reach this point
        return null;
    };

    Date.fromUTC = function(date){
        return new Date(
            date.getTime() + (date.getTimezoneOffset() * 60000)
        );
    },

    /**
     * Return short date string format of date (MM/DD/YYYY)
     * @param {String} sep Optional separator character (default is '/')
     * @return {String} Short formatted date string
     */
    Date.prototype.shortDate = function (sep) {
        var sep = (typeof sep == 'undefined') ? '/' : sep;
        return [
            this.getMonth() + 1,
            this.getDate(),
            this.getFullYear()
        ].join(sep);
    };

    /**
     * Return short UTC date string format of date (MM/DD/YYYY)
     * @param {String} sep Optional separator character (default is '/')
     * @return {String} Short formatted date string
     */
    Date.prototype.shortDateUTC = function (sep) {
        var sep = (typeof sep == 'undefined') ? '/' : sep;
        return [
            this.getUTCMonth() + 1,
            this.getUTCDate(),
            this.getUTCFullYear()
        ].join(sep);
    };
})();
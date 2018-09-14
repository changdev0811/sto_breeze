/**
 * Embedded timely js lib providing UTC functionality to dates
 * 
 * Make available by calling static load method
 */
Ext.define('Breeze.helper.libs.Timely', {
    statics: {
        load: function () {
            if (!Date.toUTC) {

                /**
                 * Constant values passable to Date toUTC method's 'out' option
                 */
                Date.UTC_OUT = {
                    // Output as Date object
                    DATE: 0,
                    // Output as String
                    STRING: 1
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
            }
        }
    }
});
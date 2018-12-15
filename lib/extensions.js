/**
 * Extension methods for standard JavaScript classes / modules
 * @author wade <wade@ventureinteractive.com>
 */
(function(){
    /**
     * Array extension functions
     */
    (function(){
        
        /**
         * Insert value into array at position
         * @param {Number} position Position to insert at
         *      insertion is to be performed
         * @param {Object} value Value or Array of values to insert
         * @param {Boolean} before If true, items are inserted before given
         *      position. Otherwise, they are inserted after Default false
         */
        Array.prototype.insertAt = function(position, value, before){
            var before = before || false,
                pos = position + (before)? 0 : 1;
            if(Array.isArray(value)){
                var values = value.slice(0).reverse();
                while(values.length > 0){
                    this.splice(pos, 0, values.pop());
                }
            } else {
                this.splice(pos, 0, value);
            }
        },

        /**
         * Insert value into array at position of an existing value
         * @param {Object} positionValue Value of array item whose position
         *      insertion is to be performed
         * @param {Object} insertValue Value or Array of values to insert
         * @param {Boolean} before If true, items are inserted before position
         *      of specified item. Default false
         */
        Array.prototype.insertAtValue = function(positionValue, insertValue, before){
            var pos = this.indexOf(positionValue);
            if(pos !== -1){
                this.insertAt(pos, insertValue, before);
            }
        };

        /**
         * Insert value into array before position of an existing value
         * @param {Object} positionValue Value of array item whose position
         *      insertion is to be performed
         * @param {Object} insertValue Value or Array of values to insert
         */
        Array.prototype.insertBeforeValue = function(positionValue, insertValue){
            this.insertAtValue(positionValue, insertValue, true);
        };

        /**
         * Insert value into array after position of an existing value
         * @param {Object} positionValue Value of array item whose position
         *      insertion is to be performed
         * @param {Object} insertValue Value or Array of values to insert
         */
        Array.prototype.insertAfterValue = function(positionValue, insertValue){
            this.insertAtValue(positionValue, insertValue, false);
        };
    })();

    /**
     * Object extension functions
     */
    (function(){

        /**
         * Attempt to get a property from object by name,
         * providing a value to return instead if property is undefined
         * @param {String} name Name of property
         * @param {Object} defVal Default value to use if prop undefined
         * @return {Object} Property or default value if undefined
         */
        // Object.prototype.fetch = function(name, defVal){
        //     var defVal = Object.defVal(defVal,null);
        //     return Object.defVal(this[name], defVal);
        // },

        /**
         * Return a default value if a given variable is undefined
         * @param {Object} a Source value variable
         * @param {Object} b Value to use if source is undefined
         * @param {boolean} c If true, treat null as undefined. Default false
         * @return {Object} Source value a if defined, else b
         */
        Object.defVal = function(a,b,c){
            return c&&c?Object.isUnvalued(a)?b:a:"undefined"==typeof a?b:a
        };

        /**
         * Check if value is null or undefined
         * @param {Object|any} v Value to check
         * @return {Boolean} True if null or undefined, false otherwise
         */
        Object.isUnvalued = function(v){
            return (v == null || typeof v == 'undefined');
        };


        /**
         * Find property nested in object by path
         * @param {Object} object Object containing property
         * @param {String} path Path built of property names joined by '.'
         * @param {Boolean} failOnPartial If true, return null if full path
         *      cannot be resolved. Default false
         * @return {Object} Property at target path
         */
        Object.resolveNestedPath = function (object, path, failOnPartial) {
            var failOnPartial = (failOnPartial) ? failOnPartial : false,
                steps = path.split('.'),
                loc = object;

            for (
                var i = 0, nextProp = steps[0]; i < steps.length; i++ , nextProp = steps[i]
            ) {
                if (typeof loc[nextProp] !== 'undefined') {
                    loc = loc[nextProp];
                } else {
                    if (failOnPartial) {
                        return null;
                    } else {
                        return loc;
                    }
                }
            }

            return loc;
        };


    })();

    /**
     * String extension functions
     */
    (function(){
        /**
         * Ported from /homemade.js:randomString()
         * @param {Number} length Optional override of output string length (def 16)
         * @return {String} randomized string
         */
        String.random = function(length) {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = (length)? length : 16;
            var randomstring = "";
            for (var i = 0; i < string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
            }
            return randomstring;
        }
    })();

    /**
     * Number extension functions
     */
    (function(){
        /**
         * Convert number to string and pad with a character until
         * it reaches a target length
         * @param {(Number|String)} pad Padding character/number
         * @param {Number} length Target length (base + padding)
         * @param {Boolean} before If true, add padding before value. Default false
         * @return {String} Source number padded to given length
         */
        Number.prototype.toPaddedString = function(pad, length, before){
            var before = (before)? before : false,
                s = this.toString().length,
                pads = (new Array(length - s)).fill(pad,0,length - s);
            if(before){
                return pads.concat(this).join('');
            } else {
                return [this].concat(pads).join('');
            }
        };

        /**
         * Convert number to string and pad with zeros until
         * it reaches a target length
         * @param {Number} length Target length (base + padding)
         * @param {Boolean} before If true, add padding before value. Default false
         * @return {String} Source number padded to given length
         */
        Number.prototype.toZeroPaddedString = function(length, before){
            return this.toPaddedString(0,length,before);
        };
    })();
})();
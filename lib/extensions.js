/**
 * Extension methods for standard JavaScript classes / modules
 * @author wade@ventureinteractive.com
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
         * Check if value is null or undefined
         * @param {Object|any} v Value to check
         * @return {Boolean} True if null or undefined, false otherwise
         */
        Object.isUnvalued = function(v){
            return (v == null || typeof v == 'undefined');
        };

        // /**
        //  * 'Clone' source object using either Object.assign on an empty object
        //  * or using JSON.parse(JSON.stringify). Default is to use assign method
        //  * @param {Boolean} jsonMode Optionally choose to use JSON version (default false)
        //  * @return {Object} Unassociated copy of source object
        //  */
        // Object.prototype.clone = function(jsonMode){
        //     var jsonMode = (jsonMode)? false : jsonMode;
        //     if(jsonMode){
        //         return JSON.parse(JSON.stringify(this));
        //     } else {
        //         return Object.assign({}, this);
        //     }
        // };
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
})();
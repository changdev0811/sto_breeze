/**
 * Extension methods for standard JavaScript classes / modules
 * @author wade@ventureinteractive.com
 */
(function(){

    // ===Array===

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
        if(Array.isArray(insertValue)){
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
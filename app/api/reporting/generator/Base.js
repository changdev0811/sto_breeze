/**
 * Report generator Base Class
 * @class Base
 * @namespace Breeze.api.reporting.generator.Base
 */
Ext.define('Breeze.api.reporting.generator.Base', {
    extends: 'Breeze.api.Base',
   
    config: {
        // Initial parameters for generation (input phase)
        parameters: null
    },


    prepare: function() {

    },

    generate: function(){
        
    },

    /**
     * Add new object with name and value keys to specified Array
     * @param {Array} params Array to append to
     * @param {String} name Name for new parameter
     * @param {Object} value Value for new parameter
     */
    appendParam: function(params, name, value){
        params.push({name: name, value: value});
    },

    createTemporaryTable: function(method, name){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(method), {
                tablename: name
            },
            true, true,
            function(r){
                resolve(r);
            },
            function(err){
                console.warn('Create temporary table failed: ', err);
                reject(err);
            }
        });
    },

    /**
     * Generate new temporary table name
     * @param {String} kind Table kind name
     * @return {String} Generated table name
     */
    newTemporaryTableName: function(kind){
        var authCookie = this.auth.getCookie();
        return [
            'z',
            authCookie.cust,
            authCookie.emp,
            kind,
            new Date().getTime()
        ].join('')
    }



});
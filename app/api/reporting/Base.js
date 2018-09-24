/**
 * Report generator Base Class
 * 
 * Inherits references to auth and api helpers from api Base class
 * @class Base
 * @namespace Breeze.api.reporting.Base
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.reporting.Base', {
    extend: 'Breeze.api.Base',
   
    statics: {
        // Store type to use
        store: 'Breeze.store.reporting.BufferedReport'
    },

    config: {
        // Initial parameters for generation (input phase)
        parameters: null
    },

    /**
     * Function that initiates generation process and calls generate when ready
     * 
     * Should return a promise, wrapping or passing through promise output from generate
     * 
     * Should be overridden in extending classt
     */
    process: function(callback){

    },

    /**
     * Function that executes generation process, called by process
     * 
     * Should return a promise resolving in generated report data
     * 
     * Should be overridden in extending class
     */
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

    /**
     * Overridable method for creating a temporary table using an Ajax call whose name is provided
     * @param {String} method AJAX Method name
     * @param {String} name Table name to pass as parameter
     * @return {Promise} Promise resolving on success, rejecting on failure with error object
     */
    createTemporaryTable: function(method, name){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                method, 
                {
                    tablename: name
                },
                true, true,
                function(r){
                    console.info('createTemporaryTable going to resolve', r);
                    resolve(r);
                },
                function(err){
                    console.warn('Create temporary table failed: ', err);
                    reject(err);
                }
            );
        });
    },

    /**
     * Generate new temporary table name
     * @param {String} kind Table kind name
     * @return {String} Generated table name
     */
    createTemporaryTableName: function(kind){
        var authCookie = this.auth.getCookies();
        return [
            'z',
            authCookie.cust,
            authCookie.emp,
            kind,
            new Date().getTime()
        ].join('')
    },

    /**
     * Create and return report data store using provided parameters
     * @param {String} report Report type string
     * @param {Object} params Report parameters to pass to doReport ajax call as myParameters
     * @param {Object} options Optional extra options to pass along, including format, page, and optional
     *  id which causes the constructed store to use said value for the storeId
     * @return {Promise} Promise resolving with store instance, rejecting with error message
     */
    createReportStore: function(report, params, options){
        var format = (options && options['format'])? options.format : 'PDF';
        var page = (options && options['page'])? options.page : 1;
        var storeParams = (options && options['id'])? { storeId: options.id } : {};
        storeParams = Object.assign({}, storeParams, {
            myFormat: format,
            page: page,
            myReport: report,
            myParameters: JSON.stringify(params),
            offset: 240,
            limit: 25
        });
        var store = Ext.create(this.statics().store, storeParams);
        return new Promise(function(resolve,reject){
            store.load(function(records,op,success){
                if(success){
                    resolve(store);
                } else {
                    reject('Loading failed');
                }
            });
        });
    }



});
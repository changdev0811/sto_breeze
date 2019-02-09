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

    mixins: {
        options: 'Breeze.mixin.OptionsParameter'
    },

    config: {
        // Initial parameters for generation (input phase)
        parameters: null,
        // Exception handler function(proxy, response, op, eOpts))
        exceptionHandler: null
    },

    constructor: function(cfg){
        this.setConfig(cfg || {});
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
     * @param {Array} paramsArray Array to append to
     * @param {String} name Name for new parameter
     * @param {Object} value Value for new parameter
     */
    appendParam: function(paramsArray, name, value){
        paramsArray.push({name: name, value: value});
    },

    /**
     * Add multiple parameters into params array from a view model data object 
     * @param {Array} paramsArray Array to append parameters to
     * @param {Object} paramsDataObject Data object from view model containing
     *      source parameter data
     * @param {Object} options Optional extra parameters
     *      - overwrite (default true) : if true, and checkNames is true,
     *          then if param is already in array, it will be overwritten
     *          with new value
     *      - checkNames (default false) : if true, param array will be
     *          checked to see if a param with given name already exists;
     *          if so, it will only be overwritten if overwrite is true
     */
    appendParamsFromDataObject: function(paramsArray, paramsDataObject, 
        options) {
        
        var options = this.resolveOptions(options,
            {overwrite: true, checkNames: false}
        );

        /**
         * Returns index of existing object in params array with a given name
         * @param {String} name Name of param to look for
         * @return Index of param with given name, or -1 if none found
         */
        var indexOfParamByName = function(name){
            var z = paramsArray.find((i) => { return (i.name == name); });
            if(z){
                return paramsArray.indexOf(z);
            } else {
                return -1;
            }
        };

        var names = Object.keys(paramsDataObject);
        for(var i = 0; i < names.length; i++){
            var name = names[i],
                value = paramsDataObject[name];
            if(options.checkNames){
                var idx = indexOfParamByName(name);
                if(idx !== -1 && options.overwrite){
                    paramsArray[idx].value = value;
                } else {
                    this.appendParam(paramsArray, name, value);
                }
            } else {
                this.appendParam(paramsArray, name, value);
            }
        }
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
     *      - format (string): Output format (default 'PDF')
     *      - page (number): Output page (default 1)
     *      - id (String): Optional ID for store (default null)
     * @return {Promise} Promise resolving with store instance, rejecting with error message
     */
    createReportStore: function(report, params, options){
        var format = (options && options['format'])? options.format : 'PDF';
        var page = (options && options['page'])? options.page : 1;
        var options = this.resolveOptions(
            options,
            { format: 'PDF', page: 1, id: null }
        );
        var storeParams = (options.id !== null)? { storeId: options.id } : {};
        storeParams = Object.assign({}, storeParams, {
            myFormat: format,
            page: page,
            myReport: report,
            myParameters: JSON.stringify(params),
            offset: 240,
            limit: 25
        });
        var store = Ext.create(this.statics().store, storeParams);
        console.info('exception handler', this.getExceptionHandler());
        if(this.getExceptionHandler() !== null){
            // If a handler was provided for dealing with exceptions, add listener
            store.getProxy().addListener('exception', this.getExceptionHandler());
        }
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
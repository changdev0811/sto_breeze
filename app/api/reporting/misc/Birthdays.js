/**
 * Report handler for Misc Birthday List report
 * @class Birthdays
 * @namespace Breeze.api.reporting.misc.Birthdays
 * @extends Breeze.api.reporting.Base
 */
Ext.define('Breeze.api.reporting.misc.Birthdays', {
    extend: 'Breeze.api.reporting.Base',
    
    statics: {
        ajaxCall: '',
        report: 'MiscBirthdayList'
    },

    /**
     * Initiate generation process, calling generate when pre-reqs are available.
     * If pre-reqs are available at start, returns promise from generate. Otherwise,
     * returns promise that passes through promise from generate method. A double reject
     * will result in error being returned directly (shouldn't be reachable)
     * @see Breeze.api.reporting.Base for more details on method
     * @return {Promise} Promise resolving with output of generate method
     * @example
     * 
     * var yaag = Ext.create('Breeze.api.reporting.YearAtAGlance');
     * yaag.process().then(
     *  function(report){
     *      if(typeof report == "string"){
     *          // How to handle 'impossible' double error, in which result is a string
     *          console.warn('Returned presumably impossible double error!', report);
     *      } else {
     *          console.info('Report data:', report);
     *      }
     *  }
     * ).catch(
     *  function(err){
     *      console.warn('Error', err);
     *  }
     * )
     
     * @param {Object} modelParamsData Parameter data object from report 
     * viewmodel
     * @param {String} format Output format ('PDF', 'EXCEL' or 'WORD')
     *  default is 'PDF'
     */
    process: function(modelParamsData, format){
        var cfg = Ext.getStore('CompanyConfig'),
            format = (format)? format : 'PDF',
            me = this,
            modelParams = modelParamsData;

        if(cfg.isLoaded()){
            return this.generate(
                    cfg.getAt(0),
                    modelParams,
                    format
                );
        } else {
            return new Promise(function(resolve, reject){
                cfg.load(function(r,op,success){
                    if(success){
                        resolve(
                            me.generate(
                                Ext.getStore('CompanyConfig').getAt(0),
                                modelParams
                            )
                        );
                    } else {
                        reject('Failed to load company config store for Department Absence report');
                    }
                });
            }).then(
                function(gen){
                    return gen;
                }
            ).catch(
                function(err){
                    return err;
                }
            );
        }
    },

    /**
     * Takes pre-reqs prepared by process function and returns a promise resolving with
     * generated report data. Returned directly by process or as a result of a pass through
     * once pre-reqs are ready; shouldn't be called directly
     * 
     * @see Breeze.api.reporting.Base for more details on method
     * 
     * @param {Object} cfg Config params passed in by process
     * @param {String} format Output data format
     * @return {Promise} Promise resolving with report data or rejecting with error message
     */
    generate: function(cfg, modelParamsData, format){
        var me = this,
            params = [],
            // Store current user ID from cookie in emp and currentUser
            cust = this.auth.getCookies().cust,
            emp = this.auth.getCookies().emp,
            currentUser = this.auth.getCookies().emp;
        // use employee id from constructor params, if available
        if(this.getParameters() && this.getParameters()['employeeId']){
            emp = this.getParameters().employeeId;
        }

        // Add in parameters from model object
        this.appendParamsFromDataObject(params, modelParamsData);

        // Add additional params taken from config
        this.appendParam(params, 'RepLogoPath', cfg.get('RepLogoPath'));
        this.appendParam(params, 'CompanyName', cfg.get('CompanyName'));
        this.appendParam(params, 'customer_id', cust);

        var reportKind = this.statics().report;

        return new Promise(function(resolve, reject){
            me.createReportStore(
                reportKind, {"Rows": params}, { format: format }
            ).then(
                function(store){
                    resolve(store.getAt(0).get('CurrentPageURL'));
                }
            ).catch(
                function(err){
                    console.warn('Error loading report store', err);
                    reject(err);
                }
            )
        });
    }
});
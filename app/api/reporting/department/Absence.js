/**
 * Report handler for Department Absence report
 * @class Absence
 * @namespace Breeze.api.reporting.department.Absence
 * @extends Breeze.api.reporting.Base
 */
Ext.define('Breeze.api.reporting.department.Absence', {
    extend: 'Breeze.api.reporting.Base',
    
    statics: {
        ajaxCall: '',
        report: 'DepartmentAbsence'
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
     */
    process: function(modelParamsData){
        var cfg = Ext.getStore('CompanyConfig');
        
        var me = this,
            modelParams = modelParamsData;
        if(cfg.isLoaded()){
            return this.generate(cfg.getAt(0));
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
     * @return {Promise} Promise resolving with report data or rejecting with error message
     */
    generate: function(cfg, modelParamsData){
        var me = this,
            params = [],
            // Store current user ID from cookie in emp and currentUser
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


        var reportKind = this.statics().report;

        return new Promise(function(resolve, reject){
            me.createReportStore(
                reportKind, {"Rows": params}
            ).then(
                function(store){
                    resolve(store.getAt('CurrentPageURL'));
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
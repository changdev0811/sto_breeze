/**
 * Report Generator for Year at a Glance
 * @class YearAtAGlance
 * @namespace Breeze.api.reporting.YearAtAGlance
 * @extends Breeze.api.reporting.Base
 */
Ext.define('Breeze.api.reporting.YearAtAGlance', {
    extend: 'Breeze.api.reporting.Base',

    // config: {
    //     // Initial parameters for generation (input phase)
    //     parameters: null
    // },

    statics: {
        ajaxCall: 'createYAAGReportTempTable',
        report: 'EmployeeYearAtAGlance'
    },


    /**
     * Initiate generation process, calling generate when pre-reqs are available.
     * If pre-reqs are available at start, returns promise from generate. Otherwise,
     * returns promise that passes through promise from generate method. A double reject
     * will result in error being returned directly (shouldn't be reachable)
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
     */
    process: function(){
        var cfg = Ext.getStore('CompanyConfig');
        
        var me = this;
        if(cfg.isLoaded()){
            return this.generate(cfg.getAt(0));
        } else {
            return new Promise(function(resolve, reject){
                cfg.load(function(r,op,success){
                    if(success){
                        resolve(
                            me.generate(Ext.getStore('CompanyConfig').getAt(0))
                        );
                    } else {
                        reject('Faild to load config store for YAAG report');
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
     * @return {Promise} Promise resolving with report data or rejecting with error message
     */
    generate: function(cfg) {
        var emp = this.auth.getCookies().emp;
        // use employee id from constructor params, if available
        if(this.getParameters() && this.getParameters()['employeeId']){
            emp = this.getParameters().employeeId;
        }

        var params = [];
        
        this.appendParam(params, 'CompanyName', cfg.get('CompanyName'));
        this.appendParam(params, 'custid', this.auth.getCookies().cust);
        this.appendParam(params, 'LogoInHeader', true);
        this.appendParam(params, 'NameInHeader', true);
        this.appendParam(params, 'RepSignature', false);
        this.appendParam(params, 'RepLogoPath', cfg.get('RepLogoPath'));
        this.appendParam(params, 'ReportTitle', 'My Year at a Glance');
        this.appendParam(params, 'idtype', 'emps');
        this.appendParam(params, 'incids', emp);
        this.appendParam(params, 'GroupByDept', true);
        this.appendParam(params, 'recyear', new Date().getFullYear());
        this.appendParam(params, 'Colors', true);
        this.appendParam(params, 'recyeartype', 'ALL');

        var realParams = { recyear: new Date().getFullYear(), recyeartype: 'ALL' };

        var me = this;

        var ajaxCall = this.statics().ajaxCall;
        var reportKind = this.statics().report;

        /* Build and return the almighty promise of promises so process can
            return it directly or return in via pass-through */
        return new Promise(function(resolve, reject){
            me.createTemporaryTable(
                ajaxCall,
                me.createTemporaryTableName('YAAG')
            ).then(function(r){
                me.createReportStore(reportKind, {"Rows": params}).then(
                    function(records, op){
                        resolve(records[0].get('CurrentPageContent'));
                    }
                ).catch(
                    function(err){
                        reject('Error loading report store: ', err);
                    }
                );
            }).catch(function(err){
                reject('Error creating temporary table needed for YAAG report: ', err);
            });
        });
    }


});
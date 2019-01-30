/**
 * Report Generator for Employee's Year at a Glance
 * @class YearAtAGlance
 * @namespace Breeze.api.reporting.employee.YearAtAGlance
 * @extends Breeze.api.reporting.Base
 */
Ext.define('Breeze.api.reporting.employee.YearAtAGlance', {
    extend: 'Breeze.api.reporting.Base',

    statics: {
        ajaxCall: 'createYAAGReportTempTable',
        report: 'EmployeeYearAtAGlance'
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
            currentUser = this.auth.getCookies().emp,
            offset = 240;
        // use employee id from constructor params, if available
        if(this.getParameters() && this.getParameters()['employeeId']){
            emp = this.getParameters().employeeId;
        }

        // Add in parameters from model object
        this.appendParamsFromDataObject(params, modelParamsData);

        // Add additional params taken from config
        this.appendParam(params, 'RepLogoPath', cfg.get('RepLogoPath'));
        this.appendParam(params, 'CompanyName', cfg.get('CompanyName'));
        // this.appendParam(params, 'customer_id', cust);
        this.appendParam(params, 'custid', cust);      // According to tko code, instead of customer_id

        emp = emp < 0 ? 0 : emp;
        // var mytablename = 'z' + cust + emp + 'YAAG' + new Date().getTime();
        var mytablename = me.createTemporaryTableName('YAAG');

        this.appendParam(params, 'tablename', mytablename);

        console.info('params in controller', params);

        var reportKind = this.statics().report;
        var ajaxCall = this.statics().ajaxCall;

        var reportParams = params;
        var yaagTempParams = {}

        yaagTempParams.idtype = modelParamsData.idtype;
        yaagTempParams.recyear = modelParamsData.recyear;
        yaagTempParams.recyeartype = modelParamsData.recyeartype;
        yaagTempParams.tablename = mytablename;

        var incid_arr = modelParamsData.incids.split(",");

        function YAAGToTempTable(incidArr, params){
            var eid = incidArr.pop();
            if(eid != undefined){
                var mParams = Object.assign({}, params);
                mParams.incids = eid;
                mParams.offset = offset;
                me.makeApiCall(
                    'YAAGtoTempTable',
                    mParams
                ).then(
                    function(r){
                        return YAAGToTempTable(incidArr, params);
                    }
                ).catch(
                    function(err){
                        console.warn(err);
                        return err;
                    }
                );
            } else {
                me.createReportStore(
                    reportKind, {"Rows": reportParams}, { format: format }
                ).then(
                    function(store){
                        return(store.getAt(0).get('CurrentPageURL'));
                    }
                ).catch(
                    function(err){
                        console.warn('Error loading report store', err);
                        return err;
                    }
                );
            }
        }

        return new Promise(function(resolve, reject){
            /*me.createTemporaryTable(
                ajaxCall,
                mytablename
            ).then(*/
            me.makeApiCall(
                ajaxCall,
                {
                    tablename: mytablename,
                    offset: offset
                }
            ).then(
                function(r){
                    resolve(YAAGToTempTable(incid_arr, yaagTempParams));
                }
            ).catch(
                function(err){
                    reject(err);
                }
            );
        });
    }
});
/**
 * Report handler for Point Details report
 * @class Details
 * @namespace Breeze.api.reporting.point.Details
 * @extends Breeze.api.reporting.Base
 */
Ext.define('Breeze.api.reporting.point.Details', {
    extend: 'Breeze.api.reporting.Base',
    
    statics: {
        ajaxCall: '',
        report: ''
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
     */
    process: function(){

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
    generate: function(cfg){

    }
});
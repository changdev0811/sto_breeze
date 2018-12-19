/**
 * Admin Holiday Editor API calls
 * Extends Breeze.api.Base.
 * @class HolidayEditor
 * @namespace Breeze.api.admin.HolidayEditor
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.HolidayEditor', {
    extend: 'Breeze.api.Base',

    /**
     * @api /ApplyHolidayToEmployees
     */
    applyToEmployees: function(){
        /*{recyear: number}*/
    },

    /**
     * @api EditHoliday
     */
    update: function(){

    },

    /**
     * @api AddHoliday
     */
    add: function() {

    },

    /**
     * @api DeleteHoliday
     */
    delete: function() {

    },

    /**
     * @param {Number} sourceYear Source holiday year
     * @param {Boolean} allYears If true, save for all future years, else just next year
     * @api appendHolidaysToYear
     */
    appendToYear: function(sourceYear, allYears){
        /*
         {allYears: boolean, source_year: number}
        */
    }



});
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
     * @todo TODO: Implement applyToEmployees
     */
    applyToEmployees: function(){
        /*{recyear: number}*/
    },

    /**
     * Save holiday API call
     * @param {Number} year Recording year
     * @param {String} name Holiday name
     * @param {Number} percentage Percentage
     * @param {Date} date Holiday date
     * @param {Number} uniqueNumber Unique holiday number
     * @param {Boolean} floating True indicates floating holiday
     * @param {Number} floatingDay Optional floating holiday day value
     * @param {Number} floatingWeek Optional floating holiday week value
     * @return {Promise} promise resolving/rejecting with toast message
     * @api EditHoliday
     */
    update: function(
        year, name, percentage, date, uniqueNumber, floating,
        floatingDay, floatingWeek
    ){
        var floatingDay = Object.defVal(floatingDay, 0, true),
            floatingWeek = Object.defVal(floatingWeek, 0, true),
            api = this.api;
        if(!floating){
            floatingDay = 0;
            floatingWeek = 0;
        }
            
        if(!floating){
            date = date.setFullYear(year);
        }
        
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                {
                    recording_year: year,
                    holiday_name: name,
                    percentage: percentage,
                    holiday_date: date,
                    unique_number: uniqueNumber,
                    float_week: floatingWeek,
                    float_day: floatingDay
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Holiday saved successfully'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            )
        });

    },

    /**
     * @api AddHoliday
     * @todo TODO: Implement add
     */
    add: function() {

    },

    /**
     * @api DeleteHoliday
     * @todo TODO: Implement delete
     */
    delete: function() {

    },

    /**
     * @param {Number} sourceYear Source holiday year
     * @param {Boolean} allYears If true, save for all future years, else just next year
     * @api appendHolidaysToYear
     * @todo TODO: Implement appendToYear
     */
    appendToYear: function(sourceYear, allYears){
        /*
         {allYears: boolean, source_year: number}
        */
    }



});
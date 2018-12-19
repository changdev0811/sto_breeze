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
     * @param {Number} year Calendar year to apply
     * @return {Promise} Promise resolving with successs toast or rejecting with
     *      error toast
     * @api /ApplyHolidayToEmployees
     */
    applyToEmployees: function(year){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'ApplyHolidayToEmployees',
                { 
                    recyear: year
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Holiday schedule successfully applied'
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
            );
        });
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
        var floatingDay = Object.defVal(floatingDay, 0, true) + 1,
            floatingWeek = Object.defVal(floatingWeek, 0, true) + 1,
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
                'EditHoliday',
                {
                    recording_year: year,
                    holiday_name: name,
                    percentage: percentage,
                    holiday_date: new Date(date).toUTC(),
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
            );
        });

    },

    /**
     * Add new holiday
     * @param {(Number|String)} year Recording year to add holiday to
     * @return {Promise} Promise resolving with toast message and unique_Number
     *      value of created holiday (in id attribute), or rejecting with error
     *      toast
     * @api AddHoliday
     */
    add: function(year) {
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'AddHoliday',
                { recording_year: year },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Holiday successfully added',
                            id: resp.err
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
     * Delete holiday
     * @param {(String|Number)} holidayId unique_Number value identifying holiday
     *      to be deleted
     * @return {Promise} Promise resolving with successs toast or rejecting with
     *      error toast
     * @api DeleteHoliday
     */
    delete: function(holidayId) {
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'DeleteHoliday',
                { unique_number: holidayId },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Holiday successfully deleted'
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
            );
        });
    },

    /**
     * @param {Number} sourceYear Source holiday year
     * @param {Boolean} allYears If true, save for all future years, else just next year
     * @return {Promise} Promise resolving with successs toast or rejecting with
     *      error toast
     * @api appendHolidaysToYear
     */
    appendToYear: function(sourceYear, allYears){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'appendHolidaysToYear',
                { 
                    source_year: sourceYear,
                    allYears: allYears
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Holiday successfully saved forward'
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
            );
        });
    }



});
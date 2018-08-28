/**
 * Custom override of Calendar Event model
 * @class Event
 * @alias Breeze.model.calendar.Event
 */
Ext.define('Breeze.model.calendar.Event', {
    extend: 'Ext.calendar.model.Event',
    alias: 'model.calendar.event',

    // fields: [
    //     {name: 'start', type: 'date'},
    //     {name: 'finish', type: 'date'}
    // ],

    getDescription: function(){
        return this.data.desc;
    },

    setDescription: function(description){
        this.set('desc', description);
    },

    // getStartDate: function(){
    //     return this.data.start;
    // },
    
    // getEndDate: function(){
    //     return this.data.finish;
    // },

    getTitle: function(){
        if(typeof this.data.title == 'undefined'){
            return this.data.absenceString.split("&lt;")[0];
        } else {
            return this.data.title;
        }
    },

    // getAllDay: function(){
    //     var allDayString = this.data.fullDay;
    //     if(allDayString === true || allDayString === false){
    //         return allDayString;
    //     }
    //     if(allDayString == "true"){
    //         return true;
    //     }
    //     if(allDayString == "false"){
    //         return false;
    //     }
    //     return false;
    // }
});
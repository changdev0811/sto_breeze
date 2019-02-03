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

    fields: [
        {name: 'isLeave', type: 'boolean', default: false}
    ],

    init: function(){
        // this.callParent(arguments);
        // console.info('Event init');
    },

    getDescription: function(){
        return this.data.durationDesc;
    },

    setDescription: function(description){
        this.set('durationDesc', description);
    },

    getIsLeave: function(){
        return this.get('isLeave');
    },

    getStartDate: function(){
        //return this.data.start;
        return Date.fromUTC(this.data.startDate);
    },
    
    getEndDate: function(){
        return Date.fromUTC(this.data.endDate);
    },

    getAllDay: function(){
        return (this.data.allDay || this.data.dayPercent == 1);
    },

    /**
     * Overrides accessor for Event's title
     * If a title attribute isn't defined, attempts to come up with one
     * using absenceString attribute, or by looking up the event's category
     * name
     */
    getTitle: function(){
        // console.info(this.data.title, this.data.absenceString, this.data.categoryId);
        if(
            (
                Object.isUnvalued(this.data['title']) || 
                (
                    typeof this.data.title == 'string' &&
                    this.data.title.trim().length == 0
                )
            ) && !Object.isUnvalued(this.getCalendar())
        ){
            // console.info(this.get('calendarId'), this.getCalendar().get('id'),this.getCalendar().get('title'));
            return this.getCalendar().get('title');
            // this.data.title = null;
            // if(
            //     !Object.isUnvalued(this.getCalendar()) && 
            //     !Object.isUnvalued(this.getCalendar().data) && 
            //     !Object.isUnvalued(this.getCalendar().data.title)
            // ){
            //     return this.getCalendar().data.title;
            // }
            // /*  No title attribute defined, or the one given is blank
            //     so we need to build one */
            // else if(
            //     typeof this.data.absenceString !== 'undefined' && 
            //     (
            //         typeof this.data.absenceString == 'string' && 
            //         this.data.absenceString.length > 0
            //     )
            // ) {
            //     // Absence string exists and isn't empty, so use that
            //     return this.data.absenceString.split("&lt;")[0];
            // } else {
            //     // No absence string, so use category lookup to set title
            //     var categories = Breeze.api.company.Category.getNamedStore('compactList');

            //     if(categories !== null) {
            //         // Categories store loaded successfully
            //         var eventCatId = this.data.categoryId;
            //         var idx = categories.findBy(
            //             (c) => {
            //                 return (c.getData().Category_Code == eventCatId);
            //             }
            //         );
            //         if(idx !== -1){
            //             // match found
            //             return categories.getAt(idx).getData().Category_Name;
            //         }
            //     }

            //     // none of the previous return statements in this block fired,
            //     // so return default
            //     return 'Unknown Event';
            // }
        } else {
            // Event has a title, use that
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
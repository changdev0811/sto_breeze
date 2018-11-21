/**
 * Calendar collections store, overriding default Ext.calendar.store.Calendars store type
 * @class Calendar
 */
Ext.define('Breeze.store.calendar.Calendar', {
    extend: 'Ext.calendar.store.Calendars',
    alias: 'store.calendar.Calendar',
    requires: [
        'Breeze.store.calendar.Events'
    ],

    statics: {
        /**
         * Array of extra event types
         */
        extraEventTypes: [
            {
                id: 'points',
                title: 'Points',
                eventType: '[POINTS]',
                color: '#ff9595'
            },
            {
                id: 'notes',
                title: 'Notes',
                eventType: '[NOTES]',
                color: '#fecb95'
            },
            {
                id: 'worktime',
                title: 'Worked Time',
                eventType: '[WORKTIME]',
                color: '#9bc796'
            },
            {
                id: 'adjustments',
                title: 'Adjustments',
                eventType: '[ADJUSTMENTS]',
                color: '#7dc6d1'
            }
        ]
    },

    /**
     * Construct calendars store with appropriate data from categories
     * and extra event types to trigger Event Stores to load using api call
     * @param {Object} cfg Configuration parameters
     *  lookup - lookup id
     *  categories - categories array, from getCategories api call
     *  startDate - date range start
     *  endDate - date range end
     */
    constructor: function(cfg){
        var me = this;
        cfg = cfg || {};

        var categories = cfg.categories;
        var lookup = cfg.lookup,
            start = cfg.startDate,
            end = cfg.endDate,
            utcStart = cfg.utcStartDate,
            utcEnd = cfg.utcEndDate;


        var datum = categories.getData().items.map(function(r){
            return {
                "id": r.get('Category_Code'),
                "title": r.get('Category_Name'),
                "start": start,
                "end": end,
                "color": r.get('Category_Color_HEX'),
                "eventStore": {
                    // "type": "Breeze.store.calendar.Events",
                    "eventType": r.get('Category_Code'),
                    "lookup": lookup,
                    "UTCstart": utcStart,
                    "UTCend": utcEnd,
                    "start": start,
                    "end": end
                }
            };
        });

        var extraTypes = Breeze.store.calendar.Calendar.extraEventTypes;
        for(var i = 0; i < extraTypes.length; i++){
            var xtra = extraTypes[i];
            datum = datum.concat({
                "id": xtra.id,
                "title": xtra.title,
                "start": start,
                "start": end,
                "color": xtra.color,
                "eventStore": {
                    // "type": "Breeze.store.calendar.Events",
                    "eventType": xtra.eventType,
                    "lookup": lookup,
                    "UTCstart": utcStart,
                    "UTCend": utcEnd,
                    "start": start,
                    "end": end
                }
            })
        }

        me.callParent([
            Ext.apply({
                eventStoreDefaults: {
                    type: "calendar.events"
                },
                data: datum
            }, cfg)
        ]);

    }
});
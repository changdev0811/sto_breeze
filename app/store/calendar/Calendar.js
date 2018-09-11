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
                eventType: '[POINTS]'
            },
            {
                id: 'notes',
                title: 'Notes',
                eventType: '[NOTES]'
            },
            {
                id: 'worktime',
                title: 'Worked Time',
                eventType: '[WORKTIME]'
            },
            {
                id: 'adjustments',
                title: 'Adjustments',
                eventType: '[ADJUSTMENTS]'
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
        var lookup = cfg.lookup;
        var start = cfg.startDate;
        var end = cfg.endDate;

        var datum = categories.getData().items.map(function(r){
            return {
                "id": r.get('Category_Code'),
                "title": r.get('Category_Name'),
                "startDate": start,
                "endDate": end,
                "color": r.get('Category_Color_HEX'),
                "eventStore": {
                    // "type": "Breeze.store.calendar.Events",
                    "eventType": r.get('Category_Code'),
                    "lookup": lookup
                }
            };
        });

        var extraTypes = Breeze.store.calendar.Calendar.extraEventTypes;
        for(var i = 0; i < extraTypes.length; i++){
            var xtra = extraTypes[i];
            datum = datum.concat({
                "id": xtra.id,
                "title": xtra.title,
                "startDate": start,
                "endDate": end,
                "eventStore": {
                    // "type": "Breeze.store.calendar.Events",
                    "eventType": xtra.eventType,
                    "lookup": lookup
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
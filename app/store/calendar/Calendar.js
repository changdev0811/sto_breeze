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

    constructor: function(cfg){
        var me = this;
        cfg = cfg || {};

        var categories = cfg.categories;
        var datum = categories.getData().items.map(function(r){
            return {
                "id": r.get('Category_Code'),
                "title": r.get('Category_Name'),
                "eventStore": {
                    // "type": "Breeze.store.calendar.Events",
                    "categoryId": r.get('Category_Code')
                }
            };
        });

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
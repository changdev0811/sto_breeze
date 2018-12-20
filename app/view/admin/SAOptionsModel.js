/**
 * View Model class for SAOptions Admin view
 * @class UDCModel
 * @namespace Breeze.view.admin.SAOptionsModel
 * @alias viewmodel.admin.saoptions
 */
Ext.define('Breeze.view.admin.SAOptionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.saoptions',

    constructor: function(cfg){
        this.callParent([cfg]);
    },

    data: {
        // TODO: change to null
        //selectedCategoryID: "1"
    },

    formulas: {
        //selectedCat: function(get){
        //    var cat = get('cats').findRecord('Category_Id', get('selectedCategoryID'));
        //    return cat;
        //},
    },

    stores: {
        // TODO: Remove when API dummy is available
        
        daysOfWeek: {
            fields: ['id', 'value'],
            data: [
                { "id": 1, "value": 'Sunday' },
                { "id": 2, "value": 'Monday' },
                { "id": 3, "value": 'Tuesday' },
                { "id": 4, "value": 'Wednesday' },
                { "id": 5, "value": 'Thursday' },
                { "id": 6, "value": 'Friday' },
                { "id": 7, "value": 'Saturday' }
            ]
        },

        OptionList:{
            fields: ['ID', 'CodeTypeID', 'Description'],
            data: [
                {"ID":57,"CodeTypeID":15,"Description":"Days"},
                {"ID":58,"CodeTypeID":15,"Description":"Weeks"},
                {"ID":59,"CodeTypeID":15,"Description":"Months"},
                {"ID":60,"CodeTypeID":15,"Description":"Years"}
            ]
        },

        pendingCancellationStore: {
            //model: 'CancelOption',
            data: [
                {Code: 131,    Description: 'Disabled'},
                {Code: 132,    Description: 'Enabled'}
            ]
        },

        CancellationStore: {
            //model: 'CancelOption',
            data: [
                {Code: 131,    Description: 'Disabled'},
                {Code: 132,    Description: 'Enabled'},
                {Code: 133,    Description: 'Enabled - Requires Approval'}
            ]        
        }

    },

    formulas: {
        renewalDate: function(get){
            return Ext.util.Format.date(get('customerData.renewal_date'), 'm-d-Y');
        }
    }

});
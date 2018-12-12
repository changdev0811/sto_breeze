/**
 * View Model class for RestoreEmployeeModel Admin view
 * @class RestoreEmployeeModel
 * @namespace Breeze.view.admin.UDCModel
 * @alias viewmodel.admin.restoreemployee
 */
Ext.define('Breeze.view.admin.RestoreEmployeeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.restoreemployee',

    constructor: function(cfg){
        this.callParent([cfg]);
    },

    data: {
    	// TODO: change to null
    	//selectedCategoryID: "1"
    },

    //formulas: {
    //	selectedCat: function(get){
    //		var cat = get('cats').findRecord('Category_Id', get('selectedCategoryID'));
    //		return cat;
    //	},
    //},

	stores: {
        // TODO: Remove when API dummy is available
        EmployeeOnlyTreeStoreDeleted: {
            data: [
                {
                    "id":null,
                    "text":"Deleted, Will",
                    "iconCls":"fal fa-user fa-2x fa-fw sto-skyblue",
                    "leaf":"True",
                    "d":[],
                    "data":"5008",
                    "type":"emp",
                    "fullName":null,
                    "qtip":null,
                    "cls":null,
                    "status":0,
                    "icon":"none.png",
                    "checked":null
                },
                {
                    "id":null,
                    "text":"Deleted, Will",
                    "iconCls":"fal fa-user fa-2x fa-fw sto-skyblue",
                    "leaf":"True",
                    "d":[],
                    "data":"5009",
                    "type":"emp",
                    "fullName":null,
                    "qtip":null,
                    "cls":null,
                    "status":0,
                    "icon":"none.png",
                    "checked":null
                }
            ]
        },

    }

});
/**
 * View Model class for Point Cats Admin view
 * @class PointCatsModel
 * @namespace Breeze.view.admin.PointCatsModel
 * @alias viewmodel.admin.pointcats
 */
Ext.define('Breeze.view.admin.PointCatsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.pointcats',

    constructor: function(cfg){
        this.callParent([cfg]);
    },

    /*
    createEmptyPointCategory: function(){
        this.setData({
            pointCategory: {
    			occfrom: '', 		//occfroms,
				occto: '', 			//occtos,
				occvalue: '', 		//occvalues,
				absencecats: '', 	//selcats,
				point_name: '',		//pointName,
				point_id: null,		//selPointID,
				duration_type: 60,	//pointDurType,
				point_details: '',	//pointDetails,
				duration_amount: 0	//pointDurAmt
            }
        });
    },
    */

    data: {
    	// TODO: change to null
    	selectedPointID: 1
    },

    formulas: {
    	selectedPointCat: function(get){
    		var cat = get('pointCats').findRecord('PointID', get('selectedPointID'));
    		return cat;
    	}
    },


    stores: {
        // TODO: Remove when API dummy is available
        pointCats: {
            data: [
                {
                    "AbsenceCats": "0",
                    "DurAmt": 1,
                    "DurType": 60,
                    "Occurences": [
                        {
                            "occfrom": 1,
                            "occto": 0,
                            "occvalue": 0
                        }
                    ],
                    "PointDetails": "This is a newly generated category.",
                    "PointID": 1,
                    "PointIOC": 0,
                    "PointName": "Arbitrary Point",
                    "PointVal": 0
                }
            ]
        },
        pointOccurances: {
            fields: ['occfrom','occto','occvalue'],
            data: [
                {
                    "occfrom": 1,
                    "occto": 0,
                    "occvalue": 0
                },
                {
                    "occfrom": 2,
                    "occto": 3,
                    "occvalue": 4
                }
            ]
        }
    }




});
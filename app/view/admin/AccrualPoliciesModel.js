/**
 * View Model class for Accrual Policies Admin view
 * @class AccrualPoliciesModel
 * @namespace Breeze.view.admin.AccrualPoliciesModel
 * @alias viewmodel.admin.accrualpolicies
 */
Ext.define('Breeze.view.admin.AccrualPoliciesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.accrualpolicies',

    constructor: function(cfg){
        this.callParent([cfg]);
        this.createEmptyPolicy();
    },

    createEmptyPolicy: function(){
        this.setData({
            policy: {
                accDay: '',
                accInc: '',
                accMS: '',
                accPer: '',
                accRuleName: '',
                accSvcFrom: '',
                accSvcTo: '',
                accUnit: '',
                accrualCapAmounts: '0',
                accrualCapUnits: '49',
                allowAccrual: '0',
                balanceCapAmounts: '0',
                balanceCapUnits: '49',
                carExpAmt: '0',
                carExpUnit: '59',
                carOver: '-1',
                carSvcFrom: '0',
                carSvcTo: '0',
                carCalTypes: '46',
                catIds: '',
                catWaitRates: '44',
                recMode: '20',
                schedName: '',
                scheduleId: '',
                shiftStartSegments: '',
                shiftStopSegments: ''
            }
        });
    },

    data: {
        selectedCategory: null    
    },

    stores: {
        accrualCapUnit: {
            fields: [
                {name: 'code', type: 'integer'},
                {name: 'description', type: 'string'}
            ],
            data: [
                { code: 48, description: 'Days' },
                { code: 49, description: 'Hours' },
                { code: 50, description: 'Minutes' }
            ]
        }
    },

    formulas: {
        categoryYearType: {
            bind: {
                categories: '{policyCategories}',
                categoryId: '{selectedCategory}'
            },
            get: function(data){
                if(
                    !Object.isUnvalued(data.categories) && 
                    Object.isUnvalued(data.categoryId)
                ){
                    var cat = data.categories
                        .query('categoryId', data.categoryId);
                    return cat.get('calendarType');
                } else {
                    return null;
                }
            }
        }
    }

});
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
        },
        groupedCategoryAccrualRules: {
            source: '{selectedCategoryAccrualRules}',
            groupField: 'ruleName'
        }
    },

    formulas: {
        selectedCategory: function(get){
            var cat = get('policyCategories').findRecord('categoryId', get('categoryId'));
            if(!Object.isUnvalued(cat)){
                return cat;
            } else {
                return cat;
            }
        },

        selectedCategoryAccrualRules: function(get){
            var cat = get('policyCategories').findRecord('categoryId', get('categoryId'));
            if(!Object.isUnvalued(cat)){
                return cat.accrualRules();
            } else {
                return null;
            }
        },
        categoryYearType: {
            // TODO: Implement category year type set
            // set: function(get){

            // },
            get: function(get){
                var catId = get('categoryId'),
                    cats = get('policyCategories');
                if(
                    !Object.isUnvalued(catId) && 
                    !Object.isUnvalued(cats)
                ){
                    var cat = cats
                        .findRecord('categoryId', catId);
                    return cat.get('calendarType');
                } else {
                    return null;
                }
            }
        }
    }

});
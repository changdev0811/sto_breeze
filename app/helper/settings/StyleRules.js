/**
 * Static class providing various style rules for use with ListStylable
 * mixin and TreeStores
 * @class StyleRules
 * @namespace Breeze.helper.settings.StyleRules
 * @static
 */
Ext.define('Breeze.helper.settings.StyleRules', {
    singleton: true,


    /**
     * Icons and labels for trees built from list API responses
     */
    list: {
        Emp: {
            conditional: true,
            attribute: 'info.role',
            choices: {
                admin: {
                    iconCls: 'x-fas fa-user-tie'
                },
                user: {
                    iconCls: 'x-fas fa-user'
                }
            }
        },
        Cal: {
            iconCls: 'x-fas fa-calendar', text: 'Calendar'
        },
        EmpInfo: {
            iconCls: 'x-fas fa-id-card', text: 'Employee Information'
        },
        FYI: {
            iconCls: 'x-fas fa-table', text: 'FYI'
        },
        YAG: {
            iconCls: 'x-fas fa-eye', text: 'Year at a Glance'
        },
        WTR: {
            iconCls: 'x-fas fa-calendar-check-o', text: 'WorkTime Records'
        }
    }
});
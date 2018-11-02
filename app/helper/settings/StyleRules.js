/**
 * Static class providing various style rules for use with ListStylable
 * mixin and TreeStores
 * @class StyleRules
 * @namespace Breeze.helper.settings.StyleRules
 * @static
 */
Ext.define('Breeze.helper.settings.StyleRules', {
    singleton: true,

    actions: ['Cal','EmpInfo','FYI','YAG','WTR','cal','empinfo','fyi','yag','wtr'],

    /**
     * Icons and labels for trees built from list API responses
     */
    list: {
        // Employee
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
        // Department
        Dep: {
            iconCls: 'x-fas fa-building'
        },
        // Calendar Link
        Cal: {
            iconCls: 'x-fas fa-calendar', text: 'Calendar'
        },
        // Employee Info link
        EmpInfo: {
            iconCls: 'x-fas fa-id-card', text: 'Employee Information'
        },
        // FYI link
        FYI: {
            iconCls: 'x-fas fa-table', text: 'FYI'
        },
        // Year at a Glance link
        YAG: {
            iconCls: 'x-fas fa-eye', text: 'Year at a Glance'
        },
        // WorkTime Records link
        WTR: {
            iconCls: 'x-fas fa-calendar-check-o', text: 'WorkTime Records'
        }
    }
});
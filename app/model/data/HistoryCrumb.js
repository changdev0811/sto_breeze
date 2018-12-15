/**
 * Data model used for crumb in History Bread widget
 * @class HistoryCrumb
 * @namespace Breeze.model.data.HistoryCrumb
 */
Ext.define('Breeze.model.data.HistoryCrumb', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.historycrumb',
    fields: [
       { name: 'label', type: 'string' },
       { name: 'hash', type: 'string' },
       { name: 'active', type: 'boolean', defaultValue: false }
    ]
});
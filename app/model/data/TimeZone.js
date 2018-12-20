/**
 * Time Zone model
 * (from /TimeZone)
 * @class TimeZone
 * @namespace Breeze.model.data.TimeZone
 */
Ext.define('Breeze.model.data.TimeZone', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.timezone',
    fields: [
        { name: 'Timezone_id', type: 'string' },
        { name: 'description', type: 'string' }
    ]
});
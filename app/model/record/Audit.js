/**
 * Audit record for audits/company history
 * (ported from /AuditRecord.js)
 * @class Audit
 * @namespace Breeze.model.record.Audit
 */
Ext.define('Breeze.model.record.Audit', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'AuditDate', type: 'string' },
        { name: 'AuditMessage', type: 'string' }
    ]
});
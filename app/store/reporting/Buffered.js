/**
 * Buffered Report data store, ported from BufferedReportStore
 * @class Buffered
 * @namespace Breeze.store.reporting.buffered
 * @alias store.reporting.buffered
 * @extends Breeze.store.Base
 * @see Breeze.model.reporting.Object
 */
Ext.define('Breeze.store.reporting.Buffered', {
	extend: 'Breeze.store.Base',
    model: 'Breeze.model.reporting.Object',
    alias: 'store.reporting.buffered',
	autoLoad: false,
	buffered: false,
	remoteFilter: true,
	remoteGroup: false,
	remoteSort: false
});
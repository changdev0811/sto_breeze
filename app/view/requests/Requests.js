/**
 * View for Requests
 * Uses card layout to swap between MyRequests and MyRequestsInput
 * Child views use controller attached here
 * @class Requests
 * @namespace Breeze.view.requests.Requests
 * @alias widget.requests.requests
 */
Ext.define('Breeze.view.requests.Requests', {
    extend: 'Ext.Container',
    alias: 'widget.requests.requests',
    controller: 'requests.requests',
    requires: ['Ext.layout.Card'],
    layout: 'card',
    items: [
        {
            xtype: 'requests.myrequests',
            itemId: 'requests'
        },
        {
            xtype: 'requests.myrequestsinput',
            itemId: 'form'
        }
    ]

});
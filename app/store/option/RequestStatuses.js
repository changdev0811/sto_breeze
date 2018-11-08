/**
 * Request status options, autoloaded without proxy
 * (Pulled from old Reports/LeaveRequests.js view)
 * @class RequestStatuses
 * @namespace Breeze.store.option.RequestStatuses
 */
Ext.define('Breeze.store.option.RequestStatuses', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.TypeOption',
    data: [
        {
            ID: 0,
            CodeTypeID: 0,
            Description: 'All'
        },
        {
            ID: 2,
            CodeTypeID: 0,
            Description: 'Approved'
        },
        {
            ID: 6,
            CodeTypeID: 0,
            Description: 'Cancellation Denied'
        },
        {
            ID: 4,
            CodeTypeID: 0,
            Description: 'Cancellation Pending'
        },
        {
            ID: 5,
            CodeTypeID: 0,
            Description: 'Cancelled'
        },
        {
            ID: 3,
            CodeTypeID: 0,
            Description: 'Denied'
        },
        {
            ID: 1,
            CodeTypeID: 0,
            Description: 'Pending'
        }
    ]
});
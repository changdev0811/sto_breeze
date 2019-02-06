/**
 * Routes chunk for Supervisor
 * @class Supervisor
 * @memberof Breeze.helper.navigation
 * @extends Breeze.helper.navigation.TreeBase
 */
Ext.define('Breeze.helper.navigation.Supervisor', {
    extend: 'Breeze.helper.navigation.TreeBase',

    config: {
        targetPath: 'personal',
        mergeChild: true,
        mergeBefore: false,
        data: [
            {
                text: 'Leave Request Approval', leaf: true,
                iconCls: 'x-fas fa-thumbs-up',
                routeRef: 'personal/leave_request_approval',
                id: 'leaveRequestApproval'
            }, {
                text: 'Time Sheet Approval', leaf: true,
                iconCls: 'x-fas fa-thumbs-up',
                routeRef: 'personal/time_sheet_approval',
                id: 'timeSheetApproval'
            }
        ]
    }
});
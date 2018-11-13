/**
 * Routes chunk for Admin
 */
Ext.define('Breeze.helper.navigation.Admin', {
    extend: 'Breeze.helper.navigation.TreeBase',

    config: {
        targetPath: 'personal',
        mergeOptions: {
            child: false,
            before: true
        },
        data: [
            {
                text: 'Admin',
                routeRef: 'admin/list',
                id: 'admin',
                iconCls: 'x-fas fa-user-tie',
                children: [
                    {
                        text: 'Accrual Policies', leaf: true,
                        iconCls: 'x-fas fa-handshake',
                        id: 'accrualPolicies',
                        routeRef: 'admin/accrualpolicies'
                    },
                    {
                        text: 'Audit', leaf: true,
                        iconCls: 'x-fas fa-history',
                        id: 'audit',
                        routeRef: 'admin/audit'
                    },
                    {
                        text: 'Departments', leaf: true,
                        iconCls: 'x-fas fa-building',
                        id: 'departments',
                        routeRef: 'admin/departments'
                    },
                    {
                        text: 'Holiday Editor', leaf: true,
                        iconCls: 'x-fas fa-calendar-edit',
                        id: 'holidayEditor',
                        routeRef: 'admin/holidayeditor'
                    },
                    {
                        text: 'MOTD (Message of the Day)', leaf: true,
                        iconCls: 'x-fas fa-comment',
                        id: 'motd',
                        routeRef: 'admin/motd'
                    },
                    {
                        text: 'Point Categories', leaf: true,
                        iconCls: 'x-fas fa-exclamation',
                        id: 'pointCategories',
                        routeRef: 'admin/pointcategories'
                    },
                    {
                        text: 'Projects', leaf: true,
                        iconCls: 'x-fas fa-project-diagram',
                        id: 'projects',
                        routeRef: 'admin/projects'
                    },
                    {
                        text: 'Punch Errors', leaf: true,
                        iconCls: 'x-fas fa-exclamation-square ',
                        id: 'punchErrors',
                        routeRef: 'admin/puncherrors'
                    },
                    {
                        text: 'Punch Policies', leaf: true,
                        iconCls: 'x-fas fa-hand-holding-box',
                        id: 'punchPolicies',
                        routeRef: 'admin/punchpolicies'
                    },
                    {
                        text: 'Release Notes', leaf: true,
                        iconCls: 'x-fas fa-sticky-note',
                        id: 'releaseNotes',
                        routeRef: 'admin/releasenotes'
                    },
                    {
                        text: 'Restore Employees', leaf: true,
                        iconCls: 'x-fas fa-user-cog',
                        id: 'restoreEmployees',
                        routeRef: 'admin/restoreemployees'
                    },
                    {
                        text: 'Super Admin Options', leaf: true,
                        iconCls: 'x-fas fa-cogs',
                        id: 'superAdmin',
                        routeRef: 'admin/superadmin'
                    },
                    {
                        text: 'Supervisor Roles', leaf: true,
                        iconCls: 'x-fas fa-badge-check',
                        id: 'supervisorRoles',
                        routeRef: 'admin/roles'
                    },
                    {
                        text: 'User Defined Categories', leaf: true,
                        iconCls: 'x-fas fa-archive',
                        id: 'userDefinedCategories',
                        routeRef: 'admin/udc'
                    }
                ]
            }
        ]
    }
});
/**
 * View Model for Nav view
 */
Ext.define('Breeze.view.main.NavModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main.nav',

    stores: {
        personalNav: {
            type: 'tree',
            root: {
                children: [
                    /*{
                        text: 'Dashboard', leaf: true,
                        iconCls: 'x-fa fa-tachometer'
                    },*/ {
                        text: 'Personal',
                        iconCls: 'x-fa fa-user',
                        children: [
                            {
                                text: 'Calendar', leaf: true,
                                iconCls: 'x-fa fa-calendar'
                            }, {
                                text: 'Employee Information', leaf: true,
                                iconCls: 'x-fa fa-id-card-o'
                            }, {
                                text: 'FYI', leaf: true,
                                iconCls: 'x-fa fa-table'
                            }, {
                                text: 'Year at a Glance', leaf: true,
                                iconCls: 'x-fa fa-eye'
                            }
                        ]
                    }, {
                        text: 'My Requests', leaf: true,
                        iconCls: 'x-fa fa-retweet'
                    },  {
                        text: 'Reports', leaf: true,
                        iconCls: 'x-fa fa-bar-chart'
                    },  {
                        text: 'Help', leaf: true,
                        iconCls: 'x-fa fa-question-circle',
                        navRef: 'help'
                    }
                ]
            }
        }
    }
});
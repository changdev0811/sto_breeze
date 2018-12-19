/**
 * Employees SubNav view
 * @class SubNav
 * @namespace Breeze.view.main.employees.SubNav
 * @alias widget.main.employees.subnav
 */
Ext.define('Breeze.view.main.employees.SubNav', {
    extend: 'Ext.Container',
    alias: 'widget.main.employees.subnav',
    xtype: 'breeze-employees-subnav',


    
    controller: 'main.employees.subnav',
    viewModel: {
        type: 'main.employees.subnav'
    },

    listeners: {
        initialize: 'onInit'
    },






    layout: 'hbox',
    //height:'auto',
    ui: 'employees-side-bar-panel',
    // padding: '16pt',
    
    items: [

      {
          //xtype: 'segmentedbutton',
          xtype: 'container',
          layout:'hbox',
          flex:1,
          defaults: {
            //margin:'20pt 0pt 4pt 22pt',
          },
          items: [
              {
                  xtype: 'button',
                  ui:'sub-nav-button calIcon',
                  itemId:'cal',
                  iconCls: 'x-fas fa-calendar calIcon',
                  margin:'20pt 0pt 4pt 22pt',
                  enableToggle:true,
                  text: 'Calendar',
                  listeners:{
                    tap:'onNavTap'
                  }
              },
              {
                  xtype:'container',
                  flex:1,
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button empInfIcon',
                  itemId:'empinfo',
                  iconCls: 'x-fas fa-id-card empInfIcon',
                  margin:'20pt 11pt 4pt 11pt',
                  enableToggle:true,
                  text: 'Employee Information',
                  listeners:{
                    tap:'onNavTap'
                  }
              },
              {
                  xtype:'container',
                  flex:1,
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button fyiIcon',
                  itemId:'fyi',
                  iconCls: 'x-fas fa-table fyiIcon',
                  margin:'20pt 11pt 4pt 11pt',
                  enableToggle:true,
                  text: 'FYI',
                  listeners:{
                    tap:'onNavTap'
                  }
              },
              {
                  xtype:'container',
                  flex:1,
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button yearAtGlanceIcon',
                  itemId:'yag',
                  iconCls: 'x-fas fa-eye yearAtGlanceIcon',
                  margin:'20pt 11pt 4pt 11pt',
                  enableToggle:true,
                  text: 'Year at a Glance',
                  listeners:{
                    tap:'onNavTap'
                  }
              },
              {
                  xtype:'container',
                  flex:1,
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button worktimeRecIcon',
                  itemId:'wtv',
                  iconCls: 'x-fas fa-calendar-check-o worktimeRecIcon',
                  margin:'20pt 22pt 4pt 11pt',
                  enableToggle:true,
                  text: 'Worktime Records',
                  listeners:{
                    tap:'onNavTap'
                  }
              }
          ]
      }


    ]
});
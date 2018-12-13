/**
 * Employees SubNav view
 * @class SubNav
 * @namespace Breeze.view.main.employees.SubNav
 * @alias widget.main.employees.subnav
 */
Ext.define('Breeze.view.main.employees.SubNav', {
    extend: 'Ext.Container',
    alias: 'widget.main.employees.SubNav',
    xtype: 'breeze-employees-subnav',

    layout: 'hbox',
    //height:'auto',
    ui: 'employees-side-bar-panel',
    // padding: '16pt',
    
    items: [

      {
          xtype: 'segmentedbutton',
          defaults: {
            margin:'20pt 0pt 4pt 22pt',
          },
          items: [
              {
                  xtype: 'button',
                  ui:'sub-nav-button calIcon',
                  iconCls: 'x-fas fa-calendar calIcon',
                  text: 'Calendar'
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button empInfIcon',
                  iconCls: 'x-fas fa-id-card empInfIcon',
                  text: 'Employee Information'
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button fyiIcon',
                  iconCls: 'x-fas fa-table fyiIcon',
                  text: 'FYI'
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button yearAtGlanceIcon',
                  iconCls: 'x-fas fa-eye yearAtGlanceIcon',
                  text: 'Year at a Glance'
              },
              {
                  xtype: 'button',
                  ui:'sub-nav-button worktimeRecIcon',
                  iconCls: 'x-fas fa-calendar-check-o worktimeRecIcon',
                  text: 'Worktime Records'
              }
          ]
      }


    ]
});
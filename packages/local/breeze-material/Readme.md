# breeze-material - Read Me

## Overview

Theme based on Material for Breeze app. For ExtJS 6.5.3

## Guidelines

Files should be named/organized as per the sencha recommended conventions when possible.

Styles not theme specific, but application view specific (single use, overrides, or not shared) should go along side of the view JS files in `app/view` (e.g. for view `app/view/main/Nav.js`, in `app/view/main/Nav.scss`)

### Directory Structure

- `sass/` - theme's 'fashion' source files
    - `/var/` - variables, in files organized by class name
        - `/var/all.scss` - global vars
    - `/src/` - Rules + UI mixins using vars in `/var`
    - `/etc/` - Extra utility functions + mixins, non-component styling functionality
- `resources/` - Images, glyphfonts + other static resource files
- `overrides/` - JavaScript overrides for ExtJS components

### Naming

Files in `sass/src` and `overrides` should be named and placed in directories matching the namespace of the components they apply to (e.g. for `Ext.panel.Panel` use `sass/src/panel/Panel.scss`). The same applies to variables in `sass/var`, which should be in files named for components the vars apply to.

Extra utility scss files placed in `sass/etc` must be manually imported; `sass/etc/all.scss` will be auto imported, so imports can be placed in that

### References

- [Global Sencha Theme SASS Variables Doc](https://docs.sencha.com/extjs/6.5.3/modern/Global_CSS.html)
- [Theming System Overview Doc](https://docs.sencha.com/extjs/6.5.3/guides/core_concepts/theming.html)
- [Modern Theming Doc]
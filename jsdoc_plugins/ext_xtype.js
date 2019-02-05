/**
 * ExtJS specific jsdoc support plugin > xtype
 * @author Wade H (vdtdev@gmail.com)
 */
exports.defineTags = function(dict){
    dict.defineTag('xtype', {
        canHaveType: false,
        canHaveName: true,
        mustHaveValue: true,
        onTagged: function(doclet, tag){
            if(!doclet.xtypes){
                doclet.xtypes = [];
            }
            doclet.xtypes.push({
                value: tag.value.name
            });
        }
    })
};

exports.handlers = {
    newDoclet: function(e){
        const xtypes = e.doclet.xtypes;
        if(xtypes){
            let xtypeList = xtypes.map((x)=>{return `<li><code>${x.value}</code></li>`});
            e.doclet.description = `${e.doclet.description}
                                    <b>xtypes<b><ul>
                                    ${xtypeList}`;
        }
    }
};
// The dhistouch Viewport is an extension of the Ext.Panel component.
raxaemr.views.Viewport = Ext.extend(Ext.Panel, {
    // Let's set some config options for the panel.
    fullscreen: true, // we want this to be fullscreen
    layout: 'fit',
    
    initComponent: function() {

        // Create new instance of the LoginForm.
        raxaemr.views.loginForm = new raxaemr.views.LoginForm();
        
        // Adding LoginForm to the Viewport
        Ext.apply(this, {
            items: [
                raxaemr.views.loginForm
            ]
        });

        // Similar to calling "super" in languages like Java.  Kicks off initialization in parent classes.
        raxaemr.views.Viewport.superclass.initComponent.apply(this, arguments);
    },
    
    layoutOrientation : function(orientation, w, h) {
        raxaemr.views.Viewport.superclass.layoutOrientation.call(this, orientation, w, h);
    }
});
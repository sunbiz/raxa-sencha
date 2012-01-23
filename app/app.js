// Registering 'raxaemr' as the name of our application.
Ext.regApplication({
    name: 'raxaemr',
    launch: function() {
        this.views.viewport = new this.views.Viewport(); //calling the viewport
    }
});
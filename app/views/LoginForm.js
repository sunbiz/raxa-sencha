/*
 * LoginForm which has a textfield and password field.
 * 
 * User needs to login just once and if successful, this is saved into the local Storage of HTML5
 * If authentication failed, then user is shown a AuthenticationFailure Dialog
 */
raxaemr.views.LoginForm = Ext.extend(Ext.ux.JSONPFormPanel, {
    layout: 'vbox',
    url: host + '/ws/rest/v1/session',
    standardSubmit: false,
    
    items: [
    {  
        xtype: 'fieldset',
        title: '',
        instructions: 'Please fill username and password',
        items: [
        {
            xtype: 'textfield',
            label: 'Login',
            name: 'j_username',
            useClearIcon: true,
            required: true
        },{
            xtype: 'passwordfield',
            label: 'Password',
            name: 'j_password',
            useClearIcon: true,
            required: true
        }]
    },{
        xtype: 'panel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items:[
        {
            xtype: 'button',
            text: 'Login',
            ui: 'confirm',
            handler: function() {
                Ext.dispatch({
                    controller: raxaemr.controllers.LoginFormController,
                    action: 'submit',
                    data: raxaemr.views.LoginForm
                });	
            }
        },{
            xtype: 'spacer',
            width: 20
        },{
            xtype: 'button',
            text: 'Reset',
            handler: function() {
                raxaemr.views.loginForm.reset();
            }
        }]
    }],
    
    initComponent: function() {
        raxaemr.views.LoginForm.superclass.initComponent.apply(this, arguments);
    }
});


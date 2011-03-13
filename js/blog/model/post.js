define([
    'backbone-all'
], function(
    backbone){
    return Backbone.Model.extend({
        defaults: {
            title: '',
            body: ''
        }
    });
});

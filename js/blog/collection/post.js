define([
    'backbone-all',
    'blog/model/post'
],function(
    backbone,
    post){
    return Backbone.Collection.extend({
        model: post
    });
});

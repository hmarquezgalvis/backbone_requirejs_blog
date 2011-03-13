define([
    'backbone-all',
    'blog/collection/post',
    'blog/view/post_list',
    'blog/view/post_edit',
    'blog/view/post'
],function(
    backbone,
    post_collection,
    post_list_view,
    post_edit_view,
    post_view){
    return Backbone.Controller.extend({
        routes: {
            "":                 "list",
            "view/:cid":        "view",
            "new":              "edit",
            "edit/:cid":        "edit"
        },
        posts: new post_collection(),
        list: function() {
            var controller = this;
        	var view = new post_list_view({
                el: this.app.el,
                collection: this.posts
            });
            view.app = this.app;
            view.bind('new', function() {
                controller.edit();
            });
            view.bind('view', function(post) {
                controller.view(post.cid);
            });
            view.bind('edit', function(post) {
                controller.edit(post.cid);
            });
            view.bind('delete', function(post) {
                controller.posts.remove([post]);
                controller.list();
            });
            view.render();
            this.saveLocation("");
        },
        view: function(cid) {
            var controller = this;
            var post = this.posts.getByCid(cid);
            if(!post){
                this.list();
            }
        	var view = new post_view({
                el: this.app.el,
                model: post
            });
            view.app = this.app;
            view.bind('list',function(){
                controller.list();
            });
            view.bind('edit',function(post){
                controller.edit(post.cid);
            });
            view.bind('delete', function(post) {
                controller.posts.remove([post]);
                controller.list();
            });
            view.render();
            controller.saveLocation("view/" + cid);
        },
        edit: function(cid) {
            var controller = this;
        	var view = new post_edit_view({
                el:     this.app.el,
                model:  this.posts.getByCid(cid)
            });
            view.app = this.app;
            view.bind('add', function(post) {
                controller.posts.add([post]);
            });
            view.bind('submit', function(post) {
                controller.view(post.cid);
            });
            view.render();
            if(cid === undefined){
                this.saveLocation("new");
            }else{
                this.saveLocation("edit/"+cid);
            }
        },
    });
});


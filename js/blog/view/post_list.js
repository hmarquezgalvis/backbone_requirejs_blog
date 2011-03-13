define([
    'backbone-all',
    'blog/view/post',
    'text!blog/template/post_list.html'
], function(
    backbone,
    post_view,
    html){
	return Backbone.View.extend({
        events: {
            'click .new_post'   : 'newPostClicked'
        },
		template: _.template(html),
		render: function() {
            var view = this;
    		this.el.html(this.template({
    			app: this.app
    		}));
            var list = this.el.find('.posts');
            this.collection.each(function(post){
                var subview = new post_view({
                    el: $('<div>').appendTo(list),
                    model: post
                });
                subview.in_list = true;
                subview.app = view.app;
                subview.render();
                subview.bind('delete',function(post){
                    view.trigger('delete',post);
                });
                subview.bind('edit',function(post){
                    view.trigger('edit',post);
                });
                subview.bind('view',function(post){
                    view.trigger('view',post);
                });
            });
            return this;
  		},
        newPostClicked: function() {
            this.trigger('new');
            return false;
        }
  	});
});

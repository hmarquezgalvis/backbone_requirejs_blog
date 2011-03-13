define([
    'backbone-all',
    'text!blog/template/post.html'
], function(
    backbone,
    html){
	return Backbone.View.extend({
        events: {
            'click .show_list'   : 'onShowListClicked',
            'click .edit_post'   : 'onEditPostClicked',
            'click .delete_post' : 'onDeletePostClicked',
            'click .view_post'   : 'onViewPostClicked'
        },
		template: _.template(html),
		render: function() {
    		this.el.html(this.template({
    			app: this.app,
                post: this.model.toJSON()
    		}));
            if(this.in_list === true){
                this.el.find('.show_list').hide();
            }else{
                this.el.find('.view_post').hide();
            }
            return this;
  		},
        onShowListClicked: function() {
            this.trigger('list');
            return false;
        },
        onDeletePostClicked: function() {
            if(confirm(this.app.options.confirmPostDeleteText)){
                this.trigger('delete',this.model);
            }
            return false;
        },
        onViewPostClicked: function() {
            this.trigger('view',this.model);
            return false;
        },
        onEditPostClicked: function() {
            this.trigger('edit',this.model);
            return false;
        }
  	});
});

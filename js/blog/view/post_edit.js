define([
    'backbone-all',
    'blog/model/post',
    'text!blog/template/post_edit.html'
], function(
    backbone,
    post_model,
    html){
	return Backbone.View.extend({
        events: {
            'submit form'   : 'onFormSubmitted'
        },
		template: _.template(html),
		render: function() {
            if(this.model === undefined){
                this.model = new post_model();
                this.trigger('add',this.model);
            }
    		this.el.html(this.template({
    			app: this.app,
    		}));
            // set this way to escape html entities
            this.el.find('#post_title').val(this.model.get('title'));
            this.el.find('#post_body').val(this.model.get('body'));
            return this;
  		},
        onFormSubmitted: function(event) {
            var form = $(event.currentTarget);
            var data = {};
            $.each(form.serializeArray(),function(){
                data[this.name] = this.value;
            });
            this.model.set(data);
            this.trigger('submit',this.model);
            return false;
        }
  	});
});

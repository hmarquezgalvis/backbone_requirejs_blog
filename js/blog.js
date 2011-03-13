define([
	'jquery',
    'backbone-all',
    'blog/controller/post'
], function(
    jquery,
    backbone,
    post_controller){
    return function(options){
    	options = $.extend({
    		confirmPostDeleteText: 'Are your sure you want to delete this post?',
    		createPostTitleText: 'Add new post',
    		addNewPostText: 'Add new post',
    		deletePostText: 'Delete post',
    		editPostText: 'Edit post',
    		showPostListText: 'Show post list',
    		keepReadingText: 'Keep reading...',
            saveButtonText: 'Save',
            postBodyLabelText: 'Body',
            postTitleLabelText: 'Title'
    	},options);
    	post_controller.prototype.app = {
    		options: options,
    		el:      this
    	};
        new post_controller();
        Backbone.history.start();
    };
});


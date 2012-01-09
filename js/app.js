var App = Em.Application.create();


// Base classes for jQueryMobile Support
// In a 'real' implementation, this should be broken out into its own Ember.js module/extension.
App.MobileBaseView = Em.View.extend({
    attributeBindings:['data-role']
});

App.PageView = App.MobileBaseView.extend({
    'data-role': 'page'
});

App.ToolbarBaseView = App.MobileBaseView.extend({
    attributeBindings:['data-position'],
    'data-position': function() {
        if (this.get('isFullScreen')) {
            return 'fullscreen'
        }

        if (this.get('isFixed')) {
            return 'fixed'
        }
        return ''
    }.property('isFixed', 'isFullScreen').cacheable(),

    isFixed: true,
    isFullsScreen: false
});

App.HeaderView = App.ToolbarBaseView.extend({
    'data-role': 'header'

});

App.ContentView = App.MobileBaseView.extend({
    'data-role': 'content'
});

App.FooterView = App.MobileBaseView.extend({
    'data-role': 'footer'
});

App.ListItemView = Em.View.extend({
    tagName: 'li'
});

App.ListView = Em.CollectionView.extend({
    attributeBindings: ['data-role'],
    'data-role':'listview',
    tagName: 'ul',
    itemViewClass: App.ListItemView,

    // Observe the attached content array's length and refresh the listview on the next RunLoop tick.
    contentLengthDidChange: function(){
        console.log('listview changed');
        var _self = this;
        Em.run.next(function() {
            _self.$().listview('refresh');
        });
    }.observes('content.length')

});

App.Button = Em.Button.extend({
    // Simple marker for consistency with the App.ViewName convention. jQuery Mobile automatically styles buttons.
});

// App Classes

App.sampleFixture = [
    Em.Object.create({
        title: 'Broken Bells',
        description: 'Broken Bells',
        thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
    }),
    Em.Object.create({
        title: 'Broken Bells',
        description: 'Broken Bells',
        thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
    }),
    Em.Object.create({
        title: 'Broken Bells',
        description: 'Broken Bells',
        thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
    }),
    Em.Object.create({
        title: 'Broken Bells',
        description: 'Broken Bells',
        thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
    }),
    Em.Object.create({
        title: 'Broken Bells',
        description: 'Broken Bells',
        thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
    }),
    Em.Object.create({
        title: 'Broken Bells',
        description: 'Broken Bells',
        thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
    })
];

App.listController = Em.ArrayProxy.create({
    content: App.sampleFixture,

    addMore: function() {
        var content = this.get('content');
        content.pushObject(Em.Object.create({
            title: 'New Item',
            description: 'Another Item',
            thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
        }));
    }
});

App.MyView = App.ContentView.extend({

});

App.MainView = App.PageView.extend({
    templateName:'main',
    id: 'main-view',
    didInsertElement: function() {
        $.mobile.changePage(this.$());
    }
});

$(document).bind('mobileinit', function() {
    $.mobile.touchOverflowEnabled = true;
});


$(document).bind('pageinit', function(){
    console.log('pageinit');
    var v = App.get('mainView');

    if (!v) {
        console.log('main not created');
        v = App.MainView.create();
        App.set('mainView',v);
        v.append();
    }
});


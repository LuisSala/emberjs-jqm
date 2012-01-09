# Ember + jQuery Mobile Prototype

### Description:

This is a *very* basic example of Ember.js and jQuery Mobile "playing nice" with one-another

### Features / Problems:

  * FIX (list of features or problems)

### Synopsis:

This project is a basic proof-of-concept demonstrating jQuery Mobile and Ember.js working together.

The app defines some custom Ember.js views that add the necessary data-roles to the corresponding elements.

App.ListView demonstrates a list control that observes the attached content array (an Em.ArrayProxy in this example)
and refreshes the attached listview. This pattern would need to be used with any "complex" jQuery Mobile widgets/controls
as jQuery Mobile is, of course, not aware of Ember.js data bindings. But that's what observers are for!

```javascript
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
```

### Requirements:
This project includes everything you need.

### Install:

  * Simply push this to your web server of choice.

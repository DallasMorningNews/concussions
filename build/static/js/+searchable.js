TDMN = {};

(function($, Backbone, Marionette, _, TDMN) {

  'use strict';

  // Data models
  TDMN.schoolsCollection = new Backbone.Collection();
  TDMN.helmetsCollection = new Backbone.Collection();


  // Views
  var SearchBoxView = Marionette.ItemView.extend({
    collectionEvents: {
      reset: 'render'
    },

    template: '#tpl-search-box',

    onRender: function() {
      var self = this;

      this.$('#search-input').selectize({
        options: this.collection.toJSON(),
        maxItems: 1,
        allowEmptyOption: true,
        placeholder: 'Enter a school name to search',
        labelField: 'name',
        searchField: 'name',
        sortField: 'name',
        valueField: 'id',
        onChange: function(value) {
          self.collection.trigger('select', value);
        }
      });
    }
  });

  var searchBox = new SearchBoxView({
    el: '#search-box',

    collection: TDMN.schoolsCollection,
  });


  var SchoolSearchView = Marionette.CollectionView.extend({
    el: '#search-results',

    collectionEvents: {
      select: 'select'
    },

    childView: Marionette.ItemView.extend({
      template: '#tpl-search-results'
    }),

    _selected: null,

    select: function(id) {
      this._selected = Number(id);
      this.render();
    },

    filter: function(child, index, collection) {
      return child.id === this._selected;
    }
  });

  var schoolSearchView = new SchoolSearchView({
    collection: TDMN.schoolsCollection
  });


  // Fetch and bootstrap collections
  $.getJSON('js/data.json', function(data) {
    TDMN.helmetsCollection.reset(data.helmets);

    // Add helmets info to the schools so we can easily render it in the
    // templates
    data.schools.map(function(school) {
      school.helmets = _.map(school.helmets, function(helmet) {
        helmet.helmet = TDMN.helmetsCollection.get(helmet.helmet).toJSON();
        return helmet;
      });
      return school;
    });

    TDMN.schoolsCollection.reset(data.schools);
  });


})(jQuery, Backbone, Marionette, _, TDMN);

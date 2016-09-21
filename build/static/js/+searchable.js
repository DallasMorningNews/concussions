TDMN = {};

(function($, Backbone, Marionette, _, TDMN) {

  'use strict';

  // Data models
  var searchQueryModel = new Backbone.Model();

  var SchoolsCollection = Backbone.Collection.extend({
    highlight: function(id) {
      this.trigger('highlight', this.get(id));
    }
  });

  TDMN.schoolsCollection = new SchoolsCollection();
  TDMN.helmetsCollection = new Backbone.Collection();


  // Views
  var SearchBoxView = Marionette.ItemView.extend({
    constructor: function() {
      this.debouncedHandleQuery = _.debounce(this.handleQuery, 200);
      Marionette.ItemView.apply(this, arguments);
    },

    events: {
      'input input': 'debouncedHandleQuery'
    },

    template: '#tpl-search-box',

    handleQuery: function(evt) {
      this.model.set('q', evt.currentTarget.value);
    }
  });

  var searchBox = new SearchBoxView({
    el: '#search-box',

    model: searchQueryModel
  });

  searchBox.render();


  var SchoolSearchView = Marionette.CollectionView.extend({
    el: '#search-results',

    collectionEvents: {
      reset: 'render'
    },

    childView: Marionette.ItemView.extend({
      template: '#tpl-search-results'
    }),

    _searchQuery: '',

    search: function(q) {
      this._searchQuery = q.toLowerCase();
      this.render();
    },

    filter: function(child, index, collection) {
      if(this._searchQuery === '') return false;

      return child.get('name').toLowerCase().indexOf(this._searchQuery) !== -1;
    }
  });

  var schoolSearchView = new SchoolSearchView({
    collection: TDMN.schoolsCollection
  });


  // Wiring
  searchQueryModel.on('change:q', function(searchModel, query) {
    schoolSearchView.search(query);
  });

  TDMN.schoolsCollection.on('highlight', function(highlightedSchool) {
    searchQueryModel.set('q', highlightedSchool.get('name'));
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

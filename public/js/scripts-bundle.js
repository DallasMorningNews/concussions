$(document).ready(function(){var e=new Date,t=e.getFullYear();$(".copyright").text(t)}),TDMN={},function(e,t,l,o,n){"use strict";n.schoolsCollection=new t.Collection,n.helmetsCollection=new t.Collection;var c=l.ItemView.extend({collectionEvents:{reset:"render"},template:"#tpl-search-box",onRender:function(){var e=this;this.$("#search-input").selectize({options:this.collection.toJSON(),maxItems:1,allowEmptyOption:!0,placeholder:"Enter a school name to search",labelField:"name",searchField:"name",sortField:"name",valueField:"id",onChange:function(t){e.collection.trigger("select",t)}})}}),s=(new c({el:"#search-box",collection:n.schoolsCollection}),l.CollectionView.extend({el:"#search-results",collectionEvents:{select:"select"},childView:l.ItemView.extend({template:"#tpl-search-results"}),_selected:null,select:function(e){this._selected=Number(e),this.render()},filter:function(e,t,l){return e.id===this._selected}})),i=new s({collection:n.schoolsCollection});e.getJSON("js/data.json",function(e){n.helmetsCollection.reset(e.helmets),e.schools.map(function(e){return e.helmets=o.map(e.helmets,function(e){return e.helmet=n.helmetsCollection.get(e.helmet).toJSON(),e}),e}),n.schoolsCollection.reset(e.schools),i.select(1)})}(jQuery,Backbone,Marionette,_,TDMN);
//# sourceMappingURL=scripts-bundle.js.map

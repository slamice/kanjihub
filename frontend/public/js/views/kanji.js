/**
 * @fileOverview
 * View that manages and renders the Kanji Detail page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/kanji.handlebars'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, Handlebars, tpl) {
  'use strict';

  var KanjiView;

  /**
   * @constructor
   */
  KanjiView = Backbone.View.extend({

    tagName: 'div',
    id: 'kanji-detail-page',
    className: 'container-fluid',

    /**
     * @private
     */
    template: Handlebars.compile(tpl),

    /**
     * @private
     */
    events: {
    },

    initialize: function () {
      _.bindAll(this, 'render', 'remove');
      this.model.on('change', this.render);
      this.model.fetch();
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.$el.html(this.template({
        kanji: this.model.toJSON()
      }));

      return this;
    }

  });

  return KanjiView;
});

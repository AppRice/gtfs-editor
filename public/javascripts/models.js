var GtfsEditor = GtfsEditor || {};

(function(G, $) {

  G.Agency = Backbone.Collection.extend({
    url: 'agency/'
  });

  G.Routes = Backbone.Collection.extend({
    // short_name, long_name, type
    url: 'route/'
  });

  G.Stops = Backbone.Collection.extend({
    // name, lat, lng, url, code, desc
  });

  G.TripPattern = Backbone.Model.extend({
    // name, headsign, alignment, stop_times[], shape, route_id (fk)
      // stop_id, travel_time, dwell_time

    addStop: function(stopTime) {
      this.get('stop_times').push(stopTime);
    },

    addStopAt: function(stopTime, i) {
      this.get('stop_times').splice(i, 0, stopTime);
    },

    removeStopAt: function(i) {
      return this.get('stop_times').splice(i, 1)[0];
    },

    moveStopTo: function(fromIndex, toIndex) {
      var stopTimes = this.get('stop_times'),
          stopTime;

      stopTime = this.removeStopAt(fromIndex);
      this.addStopAt(stopTime, toIndex);
    }
  });

  G.TripPatterns = Backbone.Collection.extend({
    model: G.TripPattern
  });

  G.Calendars = Backbone.Collection.extend({
    // days, start_date, end_date, exceptions[]
  });

  G.Trips = Backbone.Collection.extend({
    // trip_pattern_id (fk), cal_id (fk),
      // start_time (for static trips)
      // start_time, end_time, headway (for frequencies)
      // is_frequency
  });

})(GtfsEditor, jQuery);
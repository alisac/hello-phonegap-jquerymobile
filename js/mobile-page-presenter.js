/* JavaScript
 * Hello PhoneGap jQuery Mobile App
 *
 * call hello app functions during events;
 * also has callbacks for hellp app functions
 *
 * 07-15-2013 alisa.ky.chen@gmail.com */

// 25-04-2013 NOTE: neither jQuery 1.9.1 nor 1.8.3 were
// playing nice with previously written functions;
// continue using $().live(event, function)
// instead of $().on(event, function)

/*** overwrite initial mobile configuration,
 *** setting default animations and themes ***/
$(document).bind("mobileinit", function(){
  // 28-05-2013 NOTE: iOS implements smoother transitions
  // compared to other platforms; Android seen flashing
  // and flickering between pages
  if (navigator.userAgent.indexOf("Android") != -1) {
    $.mobile.defaultPageTransition = "none";
    $.mobile.defaultDialogTransition = "none";
  } else {
    $.mobile.defaultPageTransition = "slide";
    $.mobile.defaultDialogTransition = "slidedown";
  }
  // clear body background for mcgov-dps-mobile.css
  $.mobile.page.prototype.options.theme = "";
  $.mobile.pageLoadErrorMessageTheme = "d";
});

/*** remainder requires COMPLAINTAPP, jQuery,
 *** and/or google from Google Maps API to be ready ***/
(function (app, $, google) {
  var defPGReady = new $.Deferred(),
      defJQMReady = new $.Deferred(),
      // google map
      MAP = null;


    /*** app module dependencies ***/
    // from device module
    app.storage = app.module.device.storage;
    app.getCurrentPosition = app.module.device.getCurrentPosition;

  /*** methods, device callback functions ***/
  /* show map with marker on page; callback function
   * dependent on Google Maps API
   * https://developers.google.com/maps/
   * documentation/javascript/examples/marker-animations */
  function initShowMap(position, mapJQSel) {
    var map,
        lat = position.coords.latitude,
        lng = position.coords.longitude,
        center = new google.maps.LatLng(lat, lng),
        mapOptions = {
          center: center,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false
        };

    if (typeof mapJQSel === "undefined") { mapJQSel = ".divMap"; }

    MAP = new google.maps.Map($(mapJQSel).get(0), mapOptions);
  }
  
  /* resize the map */
  function resizeMap() {
    var currCenter = MAP.getCenter();
    google.maps.event.trigger(MAP, "resize");
    MAP.setCenter(currCenter);
  }

  /* show message when unable to show map on page;
   * callback function */
  function showMapErrorMsg(error, mapJQSel) {
    if (typeof mapJQSel === "undefined") { mapJQSel = ".divMap"; }

    $(mapJQSel).html("<p>Can't retrieve position." +
        "<br />" + error.message + "</p>");
  }

  // NOTE: no point in placing event bindings for first page (#index)
  // inside $.when(); pageinit and (at least the first call of) pageshow
  // for the first page do not work because those have already been fired
  // by the time PhoneGap Cordova is ready
  /*** index ***/
  //$("#index").live("pageinit", function() {
  //});


  /*** bind events after both Cordova and jQuery Mobile are ready ***/
  // phonegap ready
  defPGReady.done(app.module.device.onDeviceReady);
  document.addEventListener("deviceready", defPGReady.resolve, false);
  // jqm ready
  $(document).bind("mobileinit", defJQMReady.resolve);

  // both ready
  $.when(defPGReady, defJQMReady).then(function () {
    $("#map").live("pageinit", function() {
      $(".divMap").html("<p>Loading map...</p>");
      //MAP = initShowMap();
      app.getCurrentPosition(initShowMap, showMapErrorMsg);
    });
    $("#map").live("pageshow", function() {
      $(window).on( "orientationchange"/*, resize"*/, resizeMap);
    });
    $("#map").live("pagebeforehide", function() {
      // turn off resizing the map
      $(window).off( "orientationchange"/*, resize"*/, resizeMap);
    });

  });
}(COMPLAINTAPP, jQuery, google));
function throttle (callback, limit) {
  var wait = false;                  // Initially, we're not waiting
  return function (e) {               // We return a throttled function
      if (!wait) {                   // If we're not waiting
          callback(e);           // Execute users function
          wait = true;               // Prevent future invocations
          setTimeout(function () {   // After a period of time
              wait = false;          // And allow future invocations
          }, limit);
      }
  }
}

var MultiTouch = function(options) {



  const socket = io();

  var defaults = {
    id: 'touchpoints',
    touchTemplate: '<div class="touchpoint"></div>'
  };

  options = $.extend({}, defaults, options);
  var el = document.getElementById(options.id);
  el.style.width = '100%';
  el.style.height = '100%';
  
  var touchpoints = {},
      halfWidth,
      halfHeight;
  
  function resetCanvas (e) {
    halfWidth = $(el).width()/2; 
    halfHeight = $(el).height()/2;
  }

  function sendUpdate(){
    socket.emit("touchpoints", {
      "width": $(el).width(),
      "height": $(el).height(),
      "touchpoints": touch_array,
      "intensity": parseInt($("#calc-intensity").val(), 10)
    });
    //console.log(touch_array);
  }
  
  $(document).resize(resetCanvas);
  resetCanvas();

  var touch_array = [];

  moveTouch = function(id, x, y) {
    if (touchpoints[id]) {
      touchpoints[id].css({
        'transform': 'translate('+x+'px, '+y+'px)'
      });
    }
  }
  
  removeTouch = function(id) {
    touchpoints[id].remove();
    delete touchpoints[id];

    // remove from array for socketio connection
    index = touch_array.map(function(item) {
      return item.id
    }).indexOf(id);
    touch_array.splice(index, 1);
  }
  
  
  var self = {
    init: function () {
      $(el)
      .on('touchstart mousedown', self.onTouchStart)
      .on('touchmove mousemove drag', self.onTouchMove)
      .on('touchend mouseup', self.release);
    },
    onTouchStart: function (event) {
      event.preventDefault();
      
      // place touches by index
      var touches = (event.originalEvent && event.originalEvent.touches) ? event.originalEvent.touches : [event];
      touch_array = [];

      $.each(touches, function (i, touch) {
        var id = touch.identifier != null ? touch.identifier : 'mouse';
        var tmpl = $(options.touchTemplate);        
        
        // new touch element
        if(!touchpoints[id]) {
          touchpoints[id] = tmpl.appendTo(el);
        }

        touch_array.push({
          'id': id,
          "x": touch.pageX,
          "y": touch.pageY
        });
        
        moveTouch(id, touch.pageX, touch.pageY);
        sendUpdate();
      });
    },
    
    onTouchMove: throttle(function(event) {
      event.preventDefault();
      
      var touches = (event.originalEvent && event.originalEvent.touches) ? event.originalEvent.touches : [event];
      touch_array = [];

      $.each(touches, function (i, touch) {
        var id = touch.identifier != null ? touch.identifier : 'mouse';
        moveTouch(id, touch.pageX, touch.pageY);

        touch_array.push({
          'id': id,
          "x": touch.pageX,
          "y": touch.pageY
        });
      });

      sendUpdate();

      //console.log(touch_array);
      //console.log(touchpoints);
    }, 20),
    
    release: function (event) {
      event.preventDefault();
      
      var touches = (event.originalEvent && event.originalEvent.changedTouches) ? event.originalEvent.changedTouches : [event];
      
      $.each(touches, function (i, touch) {
        var id = touch.identifier != null ? touch.identifier : 'mouse';
        
        removeTouch(id);
      });
      sendUpdate();
    }
  };
  return self.init();
};

$(function () {

  $("#start-overlay").on('click touchend', function() {
    $("#start-overlay").fadeOut("slow");
  });

  new MultiTouch({
    id: 'touchpoints',
    touchTemplate: '<div class="touchpoint"></div>'
  });
});

$('.menu-btn').on('click', function(e) {
  e.preventDefault;
  $(this).toggleClass('menu-btn_active');
  $('.menu-nav').toggleClass('menu-nav_active');
})

$("input").on("input change", function (event) {
  var parameterName =  $(this).attr("id").split("calc-")[1];

  switch (parameterName) {
    case "intensity":
      newVal = parseInt($(this).val()*100/127, 10);
      $("#calc-intensity_value").html("Intensity: " + newVal + '% ' + '&ensp;'.repeat(3 - newVal.toString().length));
      break;
  }

  //var intensity = parseInt($("#calc-intensity").val(), 10);
});

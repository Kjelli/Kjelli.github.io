var stuff = [];
var current;

var makeMap = function(elements){
  var contents = "";
  for(var i = 0; i < elements.length; i ++){
    var n = $(elements[i]).data('link');
    if(n === undefined){
      continue;
    }
    $('#map').append("<div class='para'><a data-scroll href='#"+n+"'>"+$(elements[i]).text()+"</a></div>");
    stuff[n] = $('.para:last-child');
    if($('.para').length == 1){
      current = stuff[n];
      current.addClass('active');
    }
  }
}

var popsocial = function(direction) {
  if(direction === 'down'){
    $("#floater").animate({left: "+=200px"}, 200);
  }else{
    $("#floater").animate({left: "-=200px"}, 200);
  }
}

var updateActive = function(){
  current.removeClass('active');
  stuff[this.element.id].addClass('active');
  current = stuff[this.element.id];
}

var makeWayPoints = function(){
  var e = document.getElementsByClassName('jumbo');
  for(var i = 0; i < e.length; i++){

    var waypoint = new Waypoint({
      element: e[i],
      handler: updateActive,
      offset: -25
    });
  }

  var waypointLast = new Waypoint({
    element: e[1],
    handler: popsocial,
    offset: -25
  });

}

var adjustMenu = function(){
  $('#map').css({height: $(window).height()}, 0);
}

$(function(){
  adjustMenu();
  makeMap($('h1'));
  makeWayPoints();



  $(window).resize(adjustMenu);

  $('.para').hover(function(){
    $(this).animate({left: "+=5px"}, 100);
  },function(){
    $(this).animate({left: "-=5px"},100);
  });

  smoothScroll.init({
    callbackAfter: function ( toggle, anchor ) {

      current.removeClass('active');
      stuff[anchor.substr(1,anchor.length)].addClass('active');
      current = stuff[anchor.substr(1,anchor.length)];
    },
    offset: 0
  });

  $('#profile-image img').hover(function(){
      $(this).animate({width: '+=10px', height: '+=10px'}, 100);
    }, function(){
      $(this).animate({width: '-=10px', height: '-=10px'}, 100);
    });

});

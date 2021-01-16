var posLati;
var posLong;
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  posLati = position.coords.latitude;
  posLong = position.coords.longitude;
  x.innerHTML = "Latitude: " + posLati + 
  "<br>Longitude: " + posLong;
}

var bb = [
  {
    "x": 46.139768015001394,
    "y": 23.650655394652915
  },
  {
    "x": 46.13981249225359,
    "y": 46.13981249225359
  },
  {
    "x": 46.139767128613975,
    "y": 23.650655059669397
  }
];

setInterval(function(){ 
  getLocation();
  bb.push(
    {
      "x": posLati,
      "y": posLong
    }
  );
  console.log(bb);
  // insertMessage();
}, 2000);




var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var samibagpula;

$(window).load(function() {

  $messages.mCustomScrollbar();

  firebase.database().ref("positions").on("child_added", function (snapshot) {
      // $('<div class="message message-personal"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().message + '<button class="btn-delete" data-id="' + snapshot.key + '" onclick="deleteMessage(this);">Delete</button></div></div>').appendTo($('.mCSB_container')).addClass('new');
      // $('.message-input').val(null);

    var testx = snapshot.val().x;
    var testy = snapshot.val().y;

     
    
    setDate();
    updateScrollbar();
  });

});

var lineData = [samibagpula];


setInterval(function(){ 
  var bounds = {
      "minLon": 46.139768015001394,
      "maxLon": 46.139748099120474,
      "maxLat": 23.6506616107737,
      "minLat": 23.650655394652915
  }
  var dimensions = {
      width:400,
      height:150
  }	
  function getX(x) {
      var position = (x - bounds.minLon) / (bounds.maxLon - bounds.minLon); 
      return dimensions.width*position;
  }
  function getY(y) {
    var position = (y - bounds.minLat) / (bounds.maxLat - bounds.minLat); 
      return dimensions.height*position;
  }

  
  var svg = d3.select("#drawing")
    .append("svg")
    .attr("height", dimensions.height)
    .attr("width", dimensions.width)
    .attr("transform", "translate(20, 20)");
  
  var lineFunction = d3.svg.line()
    .x(function (d) {
        return getX(d.x)
    })
    .y(function (d) {
        return getY(d.y)
    })
    .interpolate("linear");

  svg.append("path")
    .attr("d", lineFunction(bb))
    .style("stroke-width", 0.5)
    .style("stroke", "rgb(6,120,155)")
    .style("fill", "none")
    .on("mouseover", function () {
        d3.select(this)
                .style("stroke", "orange");
    })
    .on("mouseout", function () {
        d3.select(this)
          .style("stroke", "rgb(6,120,155)")
          .style("fill", "none")
    });
  }, 2000);
    // console.log(lineData);
    // console.log(lineData);

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  if ($.trim(posLati) == '') {
    return false;
  }

  sendMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAvV2XXZozHMJaHO3FvivU_ZEmWMaEtOEM",
    authDomain: "inshape-3cb2b.firebaseapp.com",
    databaseURL: "https://inshape-3cb2b-default-rtdb.firebaseio.com/",
    projectId: "inshape-3cb2b",
    storageBucket: "inshape-3cb2b.appspot.com",
    messagingSenderId: "899730972440",
    appId: "1:899730972440:web:88bebafd1fdb507276486d",
    measurementId: "G-0N0FT9MWJ6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  firebase.database().ref("positions").on("child_removed", function (snapshot) {
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been deleted";
  });

  function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");
    firebase.database().ref("positions").child(messageId).remove();
  }

  function sendMessage() {
    firebase.database().ref("positions").push().set({
      "x": posLati,
      "y": posLong
    });
    return false;
  }


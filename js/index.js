var posLati;
var posLong;
var x = document.getElementById("demo");








const newArray = [
  {
    "x1": 46.13975300547012, 
    "y1": 23.65065801633357, 
    "x2": 46.13976124047439, 
    "y2":  23.650654000853024
  },
  {
    "x1": 46.13975300547012, 
    "y1": 23.65065801633357, 
    "x2": 46.13976124047439, 
    "y2":  23.650654000853024
  }
];
newArray.forEach(element => console.log(calcCrow(element.x1,element.y1,element.x2,element.y2).toFixed(1)));

    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371e3; // radius of the earth in meters
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
var test = [
  {
  	"pl": 23,
    "as": 12
  },
   {
  	"pl": 11,
    "as": 5
  },
    {
  	"pl": 17,
    "as": 22
  },
   {
  	"pl": 81,
    "as": 33
  }
];




  for(index=0; index < test.length; index++) {
    console.log(index);
  }























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

var bb = [];
var minLon = Number.POSITIVE_INFINITY;
var maxLon = Number.NEGATIVE_INFINITY;
var minLat = Number.POSITIVE_INFINITY;
var maxLat = Number.NEGATIVE_INFINITY;
var tmp;
var checkLon;
var checkLat;
var runInterval;
var startRunBtn = document.getElementById("startRunBtn");
var stopRunBtn = document.getElementById("stopRunBtn");
var trackMap;
var dimensions = {
  width:400,
  height:150
}	

var btn = document.createElement("SPAN");
var list = document.getElementById("drawing"); 
list.appendChild(btn);

startRunBtn.onclick = setRun;
stopRunBtn.onclick = stopRun;


function setRun() {
  runInterval = setInterval(startRun, 1000);
}

function startRun() {
    getLocation();
    for (var i=bb.length-1; i>=0; i--) {
      checkLon = bb[i].x;
      checkLat = bb[i].y;
      if (checkLon < minLon) minLon = checkLon;
      if (checkLon > maxLon) maxLon = checkLon;
      if (checkLat < minLat) minLat = checkLat;
      if (checkLat > maxLat) maxLat = checkLat;
    }
    if(posLati != undefined) {
    bb.push(
      {
        "x": posLati,
        "y": posLong
      }
    );
    console.log(bb);
    }
    // insertMessage();


    var bounds = {
      "minLon": minLon,
      "maxLon": maxLon,
      "maxLat": minLat,
      "minLat": maxLat
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
    trackMap = lineFunction(bb);
  svg.append("path")
    .attr("d", trackMap)
    .style("stroke-width", 2.5)
    .style("stroke", "rgb(6,120,155)")
    .style("fill", "none")

    if (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }

}
  
function stopRun() {
  clearInterval(runInterval);


  alert(calcCrow(46.13975300547012,23.65065801633357,46.13976124047439,23.650654000853024).toFixed(1));

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371e3; // radius of the earth in meters
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }


  firebase.database().ref("positions").push().set({
    "x": trackMap
  });
  return false;
}



var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var samibagpula;

$(window).load(function() {

  $messages.mCustomScrollbar();

  firebase.database().ref("positions").on("child_added", function (snapshot) {
      // $('<div class="message message-personal"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().message + '<button class="btn-delete" data-id="' + snapshot.key + '" onclick="deleteMessage(this);">Delete</button></div></div>').appendTo($('.mCSB_container')).addClass('new');
      // $('.message-input').val(null);
      var svg = d3.select("#history")
      .append("svg")
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .attr("transform", "translate(20, 20)");

      svg.append("path")
      .attr("d", snapshot.val().x)
      .style("stroke-width", 2.5)
      .style("stroke", "rgb(6,120,155)")
      .style("fill", "none")
    
    setDate();
    updateScrollbar();
  });

});

var lineData = [samibagpula];

// setInterval(function(){ 
  
  // }, 1000);
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


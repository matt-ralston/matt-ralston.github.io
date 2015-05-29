function update() {
  event.preventDefault();

  var theUrl = "http://developer.trimet.org/ws/V1/arrivals/appID/26905EAEEBA02217C9448D594?json=true&locIDs=";

  var idInput = theUrl + $('#stopID').val();

  $.getJSON(idInput, function(json) {
    console.log(json);

  var scheduledResults1 = new Date(json.resultSet.arrival[0].scheduled),
      scheduledResults2 = new Date(json.resultSet.arrival[1].scheduled),
      estimatedResults1 = new Date(json.resultSet.arrival[0].estimated),
      estimatedResults2 = new Date(json.resultSet.arrival[1].estimated),
      scheduledTime1 = scheduledResults1.toLocaleTimeString();
      scheduledTime2 = scheduledResults2.toLocaleTimeString();
      estimatedTime1 = estimatedResults1.toLocaleTimeString();
      estimatedTime2 = estimatedResults2.toLocaleTimeString();

  // $('#locID1').text('Stop ID: ' + json.resultSet.arrival[0].locid);
  // $('#locID2').text('Stop ID: ' + json.resultSet.arrival[1].locid);
  $('#trHeader1').text('Hurry for this one!')
  $('#trHeader2').text('Or stroll over for this one.')
  $('#location1').text(json.resultSet.location[0].desc);
  $('#location2').text(json.resultSet.location[0].desc);
  $('#fullSign1').text('Route: ' + json.resultSet.arrival[0].fullSign);
  $('#fullSign2').text('Route: ' + json.resultSet.arrival[1].fullSign);
  $('#scheduled1').text("Scheduled at: " + scheduledTime1);
  $('#scheduled2').text("Scheduled at: " + scheduledTime2);
  $('#estimatedTime1').text("Estimated at: " + estimatedTime1);
  $('#estimatedTime2').text("Estimated at: " + estimatedTime2);

  $('.tr').addClass("dataRow");
  });

};

$('#letsgo').on('click', update);
$('#letsgo').on('click', localStorageFunction);

function localStorageFunction() {
  event.preventDefault();
  // Store
var stopIDValue = $('#stopID').val();

localStorage.setItem('storedSearch', stopIDValue);
  // Retrieve

localStorage.getItem('lastStored')
document.getElementById('stopID').innerHTML = localStorage.getItem("storedSearch");

};




// var stopIDValue = $('#stopID').val();
// stopIDValue = localStorage.getItem('stopID');
// $('stopIDValue').on('input', function() {
//   localStorage.setItem('stopID', stopIDValue);
// }, false);

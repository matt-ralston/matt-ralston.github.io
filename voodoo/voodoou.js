function Voodoo(name, id, hours, footTraffic, percentEntering, donutsPerEntrant) {
  this.name = name;
  this.id = id;
  this.hours = hours;
  this.footTraffic = footTraffic;
  this.percentEntering = percentEntering;
  this.donutsPerEntrant = donutsPerEntrant;

  this.randomFootTraffic = function() {
    return Math.floor(Math.random() * (this.footTraffic[1] - this.footTraffic[0] + 1)) + this.footTraffic[0];
  };

  this.donutsPerHour = function() {
    return Math.round(this.randomFootTraffic() * (this.percentEntering / 100) * (this.donutsPerEntrant));
  };

  this.createCell = function(data, element) {
    var rowEl = document.getElementById(this.id);
    var cellEl = document.createElement(element);
    cellEl.textContent = data;
    rowEl.appendChild(cellEl);
  };

  //This is from Lamson's code
  // this.createCell = function(amount) {
  //    var rowEl = document.getElementById(this.id);
  //    var cellEl = document.createElement('td');
  //    cellEl.textContent = amount;
  //    rowEl.appendChild(cellEl);
  //  }

  //  this.createCell = function(amount) {
  //    $('#'+this.id).append( $('<td>').text(amount) );
  //  }

  this.donutsToBake = function() {
    var donutsPerHour,
        totalDonuts = 0,
        rowEl = document.getElementById(this.id);

    while (rowEl.firstChild) rowEl.removeChild(rowEl.firstChild);

    this.createCell(this.name, 'th');

    for (var i = 0; i <= this.hours; i++) {
      donutsPerHour = this.donutsPerHour();
      totalDonuts += donutsPerHour;
      this.createCell(donutsPerHour, 'td');
    };

    this.createCell(totalDonuts, 'td');
  };

};

var downtown = new Voodoo('Downtown', 'downtown', 11, [80, 220], 10, 4);
var capitol_hill = new Voodoo('Capitol Hill', 'capitol_hill', 11, [5, 45], 45, 2);
var south_lake_union = new Voodoo('South Lake Union', 'south_lake_union', 11, [180, 250], 5, 6);
var wedgewood = new Voodoo('Wedgewood', 'wedgewood', 11, [20, 60], 20, 1.5);
var ballard = new Voodoo('Ballard', 'ballard', 11, [25, 175], 33, 1);

function update(event) {
  event.preventDefault();

  // var fattyEl = document.getElementById('donutFatty'),
  //     userInput = parseInt(fattyEl.value) || 1;
  var userInput = $('#donutFatty').val() || 1;


  downtown.donutsPerEntrant = userInput
  downtown.donutsToBake();

  capitol_hill.donutsPerEntrant = userInput
  capitol_hill.donutsToBake();

  south_lake_union.donutsPerEntrant = userInput
  south_lake_union.donutsToBake();

  wedgewood.donutsPerEntrant = userInput
  wedgewood.donutsToBake();

  ballard.donutsPerEntrant = userInput
  ballard.donutsToBake();

};

//The following 2 lines are in JS, and 3rd does same in jQuery
// var btn = document.getElementById('submit');
// btn.addEventListener('click', update, false);
$('#submit').on('click', update);


function whatAFatty() {
  var elMsg = document.getElementById('fatty');

  if (this.value > 3) {
    elMsg.textContent = 'What a fatty.';
  } else {
    elMsg.textContent = '';
  }
};



//The following 2 lines are in JS, and 3rd does same in jQuery
// var elUsername = document.getElementById('donutFatty');
// elUsername.addEventListener('blur', whatAFatty, false);
$('#donutFatty').on('blur', whatAFatty);

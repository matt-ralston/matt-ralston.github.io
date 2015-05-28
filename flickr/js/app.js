$(document).ready(function() {

  //AJAX requests w jQuery
  // $.getJSON(URL, data, callback function)

  $('form').submit(function (evt) {
    evt.preventDefault();
    var $search = $('#search');
    var $submitButton = $('#submit');

    $search.prop("disabled", true);
    $submitButton.attr("disabled", true).val("Searching...");

    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; // URL
    var animal = $search.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    }; //data

    function displayPhotos(data) {
      var photoHTML = '<ul>';

      // if/else to see if there are items to display
      if (data.items != 0) {
        $.each(data.items,function(i,photo) {
          var date = new Date(photo.date_taken);
          var dateFormatted = date.toDateString();
          var time = date.toTimeString();
          var timeFormatted = time.slice(0, 5);
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '">';
          photoHTML += '<p class="desc">Photo by<br>' + photo.author.slice(19, -1) + '<br>'
                       + dateFormatted + ' at ' + timeFormatted  + '</p></a></li>';
        }); // end each
        photoHTML += '</ul>';
      } else {
        photoHTML = '<p class="grid-100">No photos were found with that search term.</p>';
      } //end if/else block

      $('#photos').html(photoHTML);

      $search.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    } //end displayPhotos (callback) function

    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end form submit function

}); // end document.ready function

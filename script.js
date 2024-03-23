// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  
  $('.saveBtn').on('click', function () {
    // Get the description from the corresponding textarea
    var description = $(this).siblings('.description').val();
    // Get the hour id from the parent time-block
    var hourId = $(this).parent().attr('id');
    // Save the description in local storage with the hour id as the key
    localStorage.setItem(hourId, description);
  });

  // Function to apply past, present, or future class to each time block
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var hour = parseInt($(this).attr('id').split('-')[1]);
      if (hour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to get user input saved in localStorage and set textarea values
  function displaySavedDescriptions() {
    $('.time-block').each(function () {
      var hourId = $(this).attr('id');
      var description = localStorage.getItem(hourId);
      $(this).find('.description').val(description);
    });
  }

  // Display the current date in the header
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY, h:mm:ss a'));

  // Apply initial class based on current time
  updateTimeBlocks();

  // Display any saved descriptions
  displaySavedDescriptions();

  // Function to fetch time information from Unix Time API
  function updateTimeFromUnixTimeAPI() {
    // Make a GET request to the Unix Time API
    $.get('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now', function (data) {
      // Extract the timestamp from the response
      var unixTimestamp = data['UnixTimeStamp'];
      // Convert the timestamp to a JavaScript Date object
      var date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
      // Update the element on your webpage with the current time
      $('#UnixTime').text(date.toLocaleString());
    });
  }

  // Update time from Unix Time API every second
  setInterval(updateTimeFromUnixTimeAPI, 1000);

});
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

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // Function to get user input saved in localStorage and set textarea values
  function displaySavedDescriptions() {
    $('.time-block').each(function () {
      var hourId = $(this).attr('id');
      var description = localStorage.getItem(hourId);
      $(this).find('.description').val(description);
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Display the current date in the header
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY, h:mm:ss a'));

  // Apply initial class based on current time
  updateTimeBlocks();

  // Display any saved descriptions
  displaySavedDescriptions();

  // Update time blocks every minute
  setInterval(updateTimeBlocks, 60000);



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //


  // TODO: Add code to display the current date in the header of the page.
  // Listener for click events on the save button
  $(function () {

    // Function to fetch time information from Unix Time API
    function updateTimeFromUnixTimeAPI() {
      // Make a GET request to the Unix Time API
      $.get('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now', function (data) {
        // Extract the timestamp from the response
        var unixTimestamp = data['UnixTimeStamp'];
        // Convert the timestamp to a JavaScript Date object
        var date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
        // Update the element on your webpage with the current time
        $('#currentUnixTime').text(date.toLocaleString());
      });
    }
  
    // Update time from Unix Time API initially
    updateTimeFromUnixTimeAPI();
  
    // Update time from Unix Time API every minute
    setInterval(updateTimeFromUnixTimeAPI, 60000);
  
  });
});
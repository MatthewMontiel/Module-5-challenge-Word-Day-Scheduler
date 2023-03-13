// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  let timeNow = dayjs().format("H");

  function changeColor() {
    $(".time-block").each(function () {
      let timePeriod = parseInt(this.id);
      $(this).toggleClass("past", timePeriod < timeNow);
      $(this).toggleClass("present", timePeriod === timeNow);
      $(this).toggleClass("future", timePeriod > timeNow);
    });
  }

  function enterText() {
    $(".saveBtn").on("click", function () {
      let token = $(this).parent().attr("id");
      let points = $(this).siblings(".description").val();
      localStorage.setItem(token, points);
    });
  }

  function revaluateColor() {
    $(".time-block").each(function () {
      let timePeriod = parseInt(this.id);
      if (timePeriod == timeNow) {
        $(this).removeClass("past future").addClass("present");
      } else if (timePeriod < timeNow) {
        $(this).removeClass("future present").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  $(".time-block").each(function () {
    let token = $(this).attr("id");
    let points = localStorage.getItem(token);
    $(this).children(".description").val(points);
  });

  function updateTime() {
    let dateElement = $("#date");
    let timeElement = $("#time");
    let currentDate = dayjs().format("dddd MMMM Do, YYYY");
    let currentTime = dayjs().format("hh:mm:ss A");
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  changeColor();
  enterText();
  revaluateColor();
  setInterval(updateTime, 1000);
});

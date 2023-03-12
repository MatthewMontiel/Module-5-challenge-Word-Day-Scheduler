// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  const timeNow = dayjs().format("H");

  function changetimeColor() {
    $(".time-block").each(function () {
      const timePeriod = parseInt(this.id);
      $(this).toggleClass("past", timePeriod < timeNow);
      $(this).toggleClass("present", timePeriod === timeNow);
      $(this).toggleClass("future", timePeriod > timeNow);
    });
  }

  function enterText() {
    $(".saveBtn").on("click", function () {
      const token = $(this).parent().attr("id");
      const points = $(this).siblings(".description").val();
      localStorage.setItem(token, points);
    });
  }

  function revaluatetimeColor() {
    $(".time-block").each(function () {
      const timePeriod = parseInt(this.id);
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
    const token = $(this).attr("id");
    const points = localStorage.getItem(token);
    $(this).children(".description").val(points);
  });

  function updateTime() {
    const dateElement = $("#date");
    const timeElement = $("#time");
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    const currentTime = dayjs().format("hh:mm:ss A");
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  changetimeColor();
  enterText();
  revaluatetimeColor();
  setInterval(updateTime, 1000);
});

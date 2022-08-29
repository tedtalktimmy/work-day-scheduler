
// this tells current time on the page
function updateTime() {
    var today = moment();

    $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.s"));

    var now = moment().format('kk');


    for (var i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");
        if (now > scheduleElArray[i].data("hour")) {
            scheduleElArray[i].addClass("past");
        } else if (now === scheduleElArray[i].attr("data-hour")) {
            scheduleElArray[i].addClass("present");
        } else {
            scheduleElArray[i].addClass("future");
        }
    }
};

var saveBtn = $(".save-icon");
var containerEl = $(".container");
var cal9am = $("#9AM");
var cal10am = $("#10AM");
var cal11am = $("#11AM");
var cal12pm = $("#12PM");
var cal1pm = $("#1PM");
var cal2pm = $("#2PM");
var cal3pm = $("#3PM");
var cal4pm = $("#4PM");
var cal5pm = $("#5PM");


var scheduleElArray = [
    cal9am,
    cal10am,
    cal11am,
    cal12pm,
    cal1pm,
    cal2pm,
    cal3pm,
    cal4pm,
    cal5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000);

function renderLastRegistered() {
    for (var el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));
    }
}


function handleFormSubmit(event) {
    event.preventDefault();

    var btnClick = $(event.currentTarget);
    var targetText = btnClick.siblings("texarea");
    var targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " + targetTimeBlock, targetText.val());
}
saveBtn.on("click", handleFormSubmit);
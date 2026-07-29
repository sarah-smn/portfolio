console.log("test");
//Elemente hohlen
var start = document.getElementById("start");
var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var match = document.getElementById("match");
var no_match = document.getElementById("no_match");

var buttonJA = document.querySelectorAll(".ja");
var buttonNEIN = document.querySelectorAll(".nein");

var loading = document.querySelector(".loading");

var counter = 0; //zählt Antwort Fragen
var questions = 0; //zählt Menge der Fragen

var startButton = document.querySelector("#start button");

startButton.addEventListener("click", function () {
  start.style.display = "none";
  q1.style.display = "grid";
});

buttonJA.forEach(function (button) {
  button.addEventListener("click", function () {
    counter++;
    questions++;
    quest();
  });
});

buttonNEIN.forEach(function (button) {
  button.addEventListener("click", function () {
    questions++;
    quest();
  });
});

function quest() {
  if (questions == 1) {
    q1.style.display = "none";
    q2.style.display = "grid";
  } else if (questions == 2) {
    q2.style.display = "none";
    q3.style.display = "grid";
  } else if (questions == 3) {
    q3.style.display = "none";
    wait();
  }
}
function result() {
  document.querySelector(".haupttitel").style.display = "none";
  if (counter >= 2) {
    match.style.display = "grid";
  } else {
    no_match.style.display = "grid";
  }
}
var back = document.getElementById("back");
var center = document.getElementById("center");
var loading = document.querySelector(".loading");

function wait() {
  back.style.display = "none";
  center.style.display = "none";
  loading.style.display = "grid";

  setTimeout(function () {
    loading.style.display = "none";
    center.style.display = "flex"; 
    back.style.display = "flex";
    result();
  }, 6000);
}
// Dieser Code wurde mit Unterstützung von Claude (Anthropic) generiert.
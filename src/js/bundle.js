"use strict";

$(document).ready(function() {
  //Countdown Timer
  const countdown = document.querySelector(".countdown");

  //Set Launch Date
  const launchDate = new Date("May 28, 2019 13:00:00").getTime();

  //Update every second
  const intvl = setInterval(function() {
    //Get todays date and time (ms)
    const now = new Date().getTime();

    //Distance from now to the launch date
    const distance = launchDate - now;

    //Time calculation
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((distance % (1000 * 60)) / 1000);

    //Display Result
    countdown.innerHTML = `
        <div>${days}<h3>Days</h3></div>
        <div>${hours}<h3>Hour</h3></div>
        <div>${mins}<h3>Minutes</h3></div>
        <div>${sec}<h3>Seconds</h3></div>
    `;

    //If launch date passed
    if (distance < 0) {
      //Stop countdown
      clearInterval(intvl);
      //Style and ouput text
      countdown.style.color = "#17a2b8";
      countdown.innerHTML = "Launched!";
    }
  }, 1000);
});

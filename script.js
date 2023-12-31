const stopwatchDuration = document.getElementById("stopwatchDuration");
const start = document.getElementById("start");
const lap = document.getElementById("lap");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const laps = document.getElementById("laps");

let hrs = 0,
  mins = 0,
  sec = 0,
  ms = 0,
  count = 0,
  timeInterval;

let lapTime = [];

start.onclick = () => {
  timeInterval = setInterval(() => {
    ms++;
    if (ms === 100) {
      sec++;
      ms = 0;
    }
    if (sec === 60) {
      mins++;
      sec = 0;
    }
    if (mins === 60) {
      hrs++;
      mins = 0;
    }
    stopwatchDuration.innerHTML = `${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(sec)}:${zeroPad(ms)}`;
  }, 10);

  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");
  lap.removeAttribute("disabled");
};

const zeroPad = (num) => {
  return String(num).padStart(2, "0");
};

lap.onclick = () => {
  count++;
  let lapTiming = `${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(sec)}:${zeroPad(ms)}`;
  lapTime.push(lapTiming);
  let li = document.createElement("li");
  li.innerHTML = `Lap ${count}: ${lapTiming}`;
  laps.appendChild(li);
  laps.scroll({ top: lap.scrollHeight, behavior: "smooth" });
};

stop.onclick = () => {
  clearInterval(timeInterval);
  start.removeAttribute("disabled");
  stop.setAttribute("disabled", true);
  lap.setAttribute("disabled", true);
};

reset.onclick = () => {
  laps.innerHTML = "";
  lapTime = [];
  hrs = mins = sec = ms = count = 0;
  clearInterval(timeInterval);
  stopwatchDuration.innerHTML = "00:00:00:00";

  start.removeAttribute("disabled");
  stop.setAttribute("disabled", true);
  lap.setAttribute("disabled", true);
};
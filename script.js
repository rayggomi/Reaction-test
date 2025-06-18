let startTime;
let mode = null;

document.getElementById("visual-btn").addEventListener("click", startVisualTest);
document.getElementById("audio-btn").addEventListener("click", startAudioTest);
document.getElementById("box").addEventListener("click", recordReaction);

function startVisualTest() {
  mode = "visual";
  document.getElementById("result").textContent = "초록색 박스를 클릭하세요!";
  setTimeout(() => {
    document.getElementById("box").style.display = "block";
    document.getElementById("box").style.backgroundColor = "green";
    startTime = new Date().getTime();
  }, Math.random() * 2000 + 1000);
}

function startAudioTest() {
  mode = "audio";
  document.getElementById("result").textContent = "소리가 들리면 박스를 클릭하세요!";
  const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  setTimeout(() => {
    beep.play();
    document.getElementById("box").style.display = "block";
    document.getElementById("box").style.backgroundColor = "blue";
    startTime = new Date().getTime();
  }, Math.random() * 2000 + 1000);
}

function recordReaction() {
  if (!startTime) return;
  const reactionTime = new Date().getTime() - startTime;
  document.getElementById("result").textContent = `반응 시간: ${reactionTime}ms`;
  document.getElementById("box").style.display = "none";
  saveResult(mode, reactionTime);
  startTime = null;
}

function saveResult(type, reactionTime) {
  fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type,
      reactionTime: reactionTime,
      timestamp: new Date().toISOString()
    })
  });
}
let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

addEventListener("resize", () => {
  vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
});

const walker = document.getElementById("walker");

function rng(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function randomSpeed() {
  return [0.25, 0.5, 0.75][rng(0, 3)];
}

let verticalSpeed = randomSpeed();
let horizontalSpeed = randomSpeed();

let walkerX = 0;
let walkerY = 0;

function walk(frameScale) {
  const rect = walker.getBoundingClientRect();

  if (rect.left <= 0 && horizontalSpeed < 0) {
    horizontalSpeed = randomSpeed();
  } else if (rect.right >= vw && horizontalSpeed > 0) {
    horizontalSpeed = -randomSpeed();
  }

  if (rect.top <= 0 && verticalSpeed < 0) {
    verticalSpeed = randomSpeed();
  } else if (rect.bottom >= vh && verticalSpeed > 0) {
    verticalSpeed = -randomSpeed();
  }

  walkerX = Math.min(Math.max(walkerX, 0), vw - rect.width);
  walkerY = Math.min(Math.max(walkerY, 0), vh - rect.height);

  walker.style.left = `${(walkerX += horizontalSpeed * frameScale)}px`;
  walker.style.top = `${(walkerY += verticalSpeed * frameScale)}px`;
}

let rafId;
let _lastTimestamp = null;

function animate(timestamp) {
  if (_lastTimestamp === null) _lastTimestamp = timestamp;
  const deltaTime = timestamp - _lastTimestamp;
  _lastTimestamp = timestamp;

  // scale movement so speeds are interpreted relative to a 60 FPS baseline
  const frameScale = deltaTime / (1000 / 60);

  walk(frameScale);
  rafId = requestAnimationFrame(animate);
}
rafId = requestAnimationFrame(animate);
walker.style.display = "block";

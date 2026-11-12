(function () {
  "use strict";

  const root = document.documentElement;
  const canvas = document.querySelector("#snow");
  const button = document.querySelector("#wish-button");
  const sparkles = document.querySelector("#sparkles");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  requestAnimationFrame(() => root.classList.add("ready"));

  function createSnow() {
    if (!canvas || reducedMotion.matches) return function () {};

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return function () {};

    let width = 0;
    let height = 0;
    let animationId = 0;
    let flakes = [];
    let lastFrame = performance.now();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const density = saveData ? 0.035 : width < 600 ? 0.085 : 0.065;
      const count = Math.max(18, Math.min(78, Math.round(width * density)));
      flakes = Array.from({ length: count }, () => makeFlake(true));
    }

    function makeFlake(randomY) {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -12,
        radius: 0.7 + depth * 2.15,
        speed: 11 + depth * 25,
        drift: 5 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.28 + depth * 0.55,
      };
    }

    function draw(now) {
      const delta = Math.min((now - lastFrame) / 1000, 0.034);
      lastFrame = now;
      context.clearRect(0, 0, width, height);

      flakes.forEach((flake, index) => {
        flake.phase += delta * 0.7;
        flake.y += flake.speed * delta;
        flake.x += Math.sin(flake.phase) * flake.drift * delta;

        if (flake.y > height + 12 || flake.x < -18 || flake.x > width + 18) {
          flakes[index] = makeFlake(false);
          return;
        }

        context.beginPath();
        context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, " + flake.alpha + ")";
        context.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });

    return function stopSnow() {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, width, height);
    };
  }

  let stopSnow = createSnow();

  reducedMotion.addEventListener("change", (event) => {
    stopSnow();
    stopSnow = event.matches ? function () {} : createSnow();
  });

  function celebrate() {
    if (!button || !sparkles) return;

    button.classList.remove("is-celebrating");
    void button.offsetWidth;
    button.classList.add("is-celebrating");

    if (navigator.vibrate) navigator.vibrate(18);
    if (reducedMotion.matches) return;

    const buttonBox = button.getBoundingClientRect();
    const originX = buttonBox.left + buttonBox.width / 2;
    const originY = buttonBox.top + buttonBox.height / 2;

    for (let index = 0; index < 24; index += 1) {
      const spark = document.createElement("span");
      const angle = (Math.PI * 2 * index) / 24 + Math.random() * 0.22;
      const distance = 65 + Math.random() * Math.min(150, window.innerWidth * 0.3);

      spark.className = "burst-spark";
      spark.textContent = index % 3 === 0 ? "✦" : "•";
      spark.style.left = originX + "px";
      spark.style.top = originY + "px";
      spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
      spark.style.setProperty("--y", Math.sin(angle) * distance + "px");
      spark.style.setProperty("--size", 8 + Math.random() * 12 + "px");
      spark.style.setProperty("--duration", 700 + Math.random() * 500 + "ms");
      sparkles.appendChild(spark);
      spark.addEventListener("animationend", () => spark.remove(), { once: true });
    }
  }

  if (button) {
    button.addEventListener("click", celebrate);
    button.addEventListener("animationend", () => button.classList.remove("is-celebrating"));
  }
})();


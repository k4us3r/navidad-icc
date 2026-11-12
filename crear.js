(function () {
  "use strict";

  const STORAGE_KEY = "icc-navidad-snowman-v1";
  const CARD_WIDTH = 360;
  const CARD_HEIGHT = 640;
  const EXPORT_WIDTH = 1080;
  const EXPORT_HEIGHT = 1920;
  const DEFAULT_NAME = "Copito";
  const NAME_LIMIT = 24;

  const CATEGORIES = [
    {
      id: "body",
      label: "Cuerpo",
      icon: "◉",
      options: [
        { id: "classic", label: "Clásico", tint: "#f7fbff" },
        { id: "duo", label: "Dos bolas", tint: "#fff8e9" },
        { id: "tall", label: "Alto", tint: "#edfaff" },
        { id: "chubby", label: "Redondito", tint: "#f8fdff" },
        { id: "frosty", label: "Nevado", tint: "#e8f5fb" },
      ],
    },
    {
      id: "eyes",
      label: "Ojos",
      icon: "••",
      options: [
        { id: "buttons", label: "Botones" },
        { id: "happy", label: "Felices" },
        { id: "sleepy", label: "Dormidos" },
        { id: "big", label: "Grandes" },
        { id: "silly", label: "Divertidos" },
        { id: "starry", label: "Brillantes" },
      ],
    },
    {
      id: "nose",
      label: "Nariz",
      icon: "◆",
      options: [
        { id: "carrot", label: "Zanahoria" },
        { id: "short", label: "Pequeña" },
        { id: "long", label: "Larga" },
        { id: "button", label: "Botón" },
        { id: "berry", label: "Baya roja" },
        { id: "gold", label: "Dorada" },
      ],
    },
    {
      id: "mouth",
      label: "Boca",
      icon: "⌣",
      options: [
        { id: "coal", label: "Carbón" },
        { id: "grin", label: "Sonrisota" },
        { id: "surprised", label: "Sorpresa" },
        { id: "shy", label: "Tímida" },
        { id: "mischief", label: "Traviesa" },
        { id: "moustache", label: "Bigote" },
      ],
    },
    {
      id: "hat",
      label: "Sombrero",
      icon: "▰",
      options: [
        { id: "top", label: "De copa" },
        { id: "santa", label: "Santa" },
        { id: "knit", label: "Tejido" },
        { id: "elegant", label: "Elegante" },
        { id: "pom", label: "Pompón" },
        { id: "earmuffs", label: "Orejeras" },
      ],
    },
    {
      id: "scarf",
      label: "Bufanda",
      icon: "≈",
      options: [
        { id: "red", label: "Roja", colors: ["#c52e3f", "#8f1f31"] },
        { id: "green", label: "Verde", colors: ["#23805b", "#135a40"] },
        { id: "blue", label: "Azul", colors: ["#2788b8", "#145d8c"] },
        { id: "gold", label: "Dorada", colors: ["#f2c454", "#b97e1f"] },
        { id: "striped", label: "Rayada", colors: ["#c52e3f", "#f3d56f"] },
        { id: "holly", label: "Acebo", colors: ["#1f7954", "#d6424e"] },
        { id: "candy", label: "Caramelo", colors: ["#f4f5ee", "#c52e3f"] },
      ],
    },
    {
      id: "arms",
      label: "Brazos",
      icon: "Y",
      options: [
        { id: "twigs", label: "Ramitas" },
        { id: "raised", label: "¡Arriba!" },
        { id: "wave", label: "Saludando" },
        { id: "mittens", label: "Manoplas" },
        { id: "hug", label: "Abrazo" },
      ],
    },
    {
      id: "extra",
      label: "Detalles",
      icon: "+",
      options: [
        { id: "buttons", label: "Botones oro" },
        { id: "candy", label: "Bastón" },
        { id: "gift", label: "Regalito" },
        { id: "bow", label: "Lazo" },
        { id: "star", label: "Estrella" },
        { id: "lights", label: "Luces" },
        { id: "none", label: "Sin detalle" },
      ],
    },
    {
      id: "background",
      label: "Escenario",
      icon: "▲",
      options: [
        { id: "forest", label: "Bosque" },
        { id: "midnight", label: "Estrellada" },
        { id: "pines", label: "Pinos" },
        { id: "village", label: "Pueblito" },
        { id: "frost", label: "Azul hielo" },
        { id: "aurora", label: "Aurora" },
      ],
    },
  ];

  const DEFAULT_STATE = {
    body: "classic",
    eyes: "buttons",
    nose: "carrot",
    mouth: "coal",
    hat: "santa",
    scarf: "red",
    arms: "wave",
    extra: "candy",
    background: "forest",
    name: DEFAULT_NAME,
  };

  const BODY_LAYOUTS = {
    classic: {
      balls: [
        { cx: 180, cy: 460, rx: 86, ry: 73 },
        { cx: 180, cy: 380, rx: 69, ry: 64 },
        { cx: 180, cy: 296, rx: 54, ry: 53 },
      ],
      texture: "clean",
    },
    duo: {
      balls: [
        { cx: 180, cy: 420, rx: 92, ry: 108 },
        { cx: 180, cy: 292, rx: 59, ry: 58 },
      ],
      texture: "cream",
    },
    tall: {
      balls: [
        { cx: 180, cy: 466, rx: 68, ry: 79 },
        { cx: 180, cy: 383, rx: 58, ry: 69 },
        { cx: 180, cy: 300, rx: 49, ry: 53 },
      ],
      texture: "blue",
    },
    chubby: {
      balls: [
        { cx: 180, cy: 462, rx: 101, ry: 70 },
        { cx: 180, cy: 387, rx: 83, ry: 68 },
        { cx: 180, cy: 305, rx: 58, ry: 55 },
      ],
      texture: "clean",
    },
    frosty: {
      balls: [
        { cx: 180, cy: 458, rx: 87, ry: 75 },
        { cx: 180, cy: 376, rx: 72, ry: 66 },
        { cx: 180, cy: 292, rx: 55, ry: 54 },
      ],
      texture: "sparkle",
    },
  };

  const nameIdeas = [
    "Copito",
    "Nevadín",
    "Estrella",
    "Chispa",
    "Nube",
    "Canela",
    "Pompón",
    "Lunita",
    "Glaciar",
    "Noel",
    "Brillito",
    "Polar",
  ];

  const elements = {
    preview: document.querySelector("#snowman-canvas"),
    finalCanvas: document.querySelector("#final-canvas"),
    tabs: document.querySelector("#category-tabs"),
    options: document.querySelector("#option-grid"),
    categoryTitle: document.querySelector("#category-title"),
    optionCounter: document.querySelector("#option-counter"),
    nameInput: document.querySelector("#snowman-name"),
    nameCount: document.querySelector("#name-count"),
    randomize: document.querySelector("#randomize-button"),
    reset: document.querySelector("#reset-button"),
    finish: document.querySelector("#finish-button"),
    finalScreen: document.querySelector("#final-screen"),
    finalBack: document.querySelector("#final-back"),
    download: document.querySelector("#download-button"),
    share: document.querySelector("#share-button"),
    shareStatus: document.querySelector("#share-status"),
    particles: document.querySelector("#celebration-particles"),
    ambientSnow: document.querySelector("#ambient-snow"),
    saveDialog: document.querySelector("#save-dialog"),
    savePreview: document.querySelector("#save-preview"),
    toast: document.querySelector("#toast"),
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let state = loadState();
  let activeCategory = "body";
  let renderFrame = 0;
  let toastTimer = 0;
  let stateVersion = 0;
  let exportCache = null;
  let exportPromise = null;
  let savePreviewUrl = "";

  function categoryById(id) {
    return CATEGORIES.find((category) => category.id === id);
  }

  function optionById(categoryId, optionId) {
    const category = categoryById(categoryId);
    return category ? category.options.find((option) => option.id === optionId) : null;
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== "object") return { ...DEFAULT_STATE };

      const next = { ...DEFAULT_STATE };
      CATEGORIES.forEach((category) => {
        if (category.options.some((option) => option.id === saved[category.id])) {
          next[category.id] = saved[category.id];
        }
      });

      if (typeof saved.name === "string") {
        next.name = saved.name.slice(0, NAME_LIMIT);
      }
      return next;
    } catch (_error) {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_error) {
      // The editor remains fully usable when storage is unavailable.
    }
  }

  function invalidateExport() {
    stateVersion += 1;
    exportCache = null;
    exportPromise = null;
    if (elements.share) elements.share.disabled = true;
  }

  function updateState(key, value) {
    state[key] = value;
    saveState();
    invalidateExport();
    requestRender();
  }

  function displayName() {
    const cleaned = String(state.name || "").trim();
    return cleaned || DEFAULT_NAME;
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seedText) {
    let seed = hashString(seedText) || 1;
    return function random() {
      seed += 0x6d2b79f5;
      let value = seed;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pixelRect(context, x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
  }

  function pixelEllipse(context, cx, cy, rx, ry, fill, outline, grid) {
    const step = grid || 4;

    function layer(layerRx, layerRy, color) {
      context.fillStyle = color;
      for (let y = -layerRy; y <= layerRy; y += step) {
        const normalized = Math.max(0, 1 - (y * y) / (layerRy * layerRy));
        const extent = Math.floor((layerRx * Math.sqrt(normalized)) / step) * step;
        context.fillRect(
          Math.round(cx - extent),
          Math.round(cy + y),
          Math.max(step, extent * 2),
          step
        );
      }
    }

    if (outline) layer(rx + step, ry + step, outline);
    layer(rx, ry, fill);
  }

  function pixelLine(context, points, color, size) {
    const block = size || 4;
    context.fillStyle = color;
    for (let segment = 0; segment < points.length - 1; segment += 1) {
      const start = points[segment];
      const end = points[segment + 1];
      const distance = Math.max(Math.abs(end[0] - start[0]), Math.abs(end[1] - start[1]));
      const steps = Math.max(1, Math.ceil(distance / Math.max(2, block / 2)));
      for (let index = 0; index <= steps; index += 1) {
        const progress = index / steps;
        const x = Math.round((start[0] + (end[0] - start[0]) * progress) / 2) * 2;
        const y = Math.round((start[1] + (end[1] - start[1]) * progress) / 2) * 2;
        context.fillRect(x - block / 2, y - block / 2, block, block);
      }
    }
  }

  function drawPixelStar(context, x, y, size, color) {
    const unit = Math.max(2, Math.round(size / 3));
    pixelRect(context, x - unit / 2, y - size, unit, size * 2, color);
    pixelRect(context, x - size, y - unit / 2, size * 2, unit, color);
    pixelRect(context, x - unit, y - unit, unit * 2, unit * 2, color);
  }

  function drawPine(context, x, groundY, scale, color, snowColor) {
    const unit = Math.max(2, Math.round(4 * scale));
    pixelRect(context, x - unit, groundY - 19 * unit, unit * 2, 20 * unit, "#5b3b2a");

    context.fillStyle = color;
    for (let row = 0; row < 13; row += 1) {
      const half = Math.floor((row + 2) * 0.72) * unit;
      context.fillRect(x - half, groundY - (17 - row) * unit, half * 2, unit);
    }

    if (snowColor) {
      for (let row = 2; row < 12; row += 4) {
        const half = Math.floor((row + 2) * 0.62) * unit;
        context.fillStyle = snowColor;
        context.fillRect(x - half, groundY - (17 - row) * unit, half * 1.35, unit);
      }
    }
  }

  function drawHouse(context, x, y, scale, wall, roof) {
    const unit = Math.max(2, Math.round(4 * scale));
    pixelRect(context, x, y, 14 * unit, 11 * unit, wall);
    for (let row = 0; row < 6; row += 1) {
      pixelRect(context, x - (5 - row) * unit, y + row * unit, (24 - row * 2) * unit, unit, roof);
    }
    pixelRect(context, x + 3 * unit, y + 5 * unit, 3 * unit, 3 * unit, "#ffd86a");
    pixelRect(context, x + 9 * unit, y + 5 * unit, 3 * unit, 3 * unit, "#ffd86a");
    pixelRect(context, x + 6 * unit, y + 7 * unit, 3 * unit, 4 * unit, "#54302c");
  }

  function backgroundPalette(id) {
    const palettes = {
      forest: ["#071b32", "#0d4560", "#173b3f"],
      midnight: ["#030b24", "#15265d", "#212153"],
      pines: ["#082036", "#17516a", "#174f4b"],
      village: ["#22173d", "#744a72", "#27435d"],
      frost: ["#184c72", "#6fb2cf", "#c5e9f1"],
      aurora: ["#04172c", "#133e5c", "#23576b"],
    };
    return palettes[id] || palettes.forest;
  }

  function drawBackground(context, id) {
    const palette = backgroundPalette(id);
    const gradient = context.createLinearGradient(0, 0, 0, CARD_HEIGHT);
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(0.58, palette[1]);
    gradient.addColorStop(1, palette[2]);
    context.fillStyle = gradient;
    context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    const random = seededRandom(id + "-icc-2026");
    for (let index = 0; index < 55; index += 1) {
      const x = Math.floor(random() * CARD_WIDTH / 4) * 4;
      const y = Math.floor((20 + random() * 330) / 4) * 4;
      const size = random() > 0.82 ? 4 : 2;
      pixelRect(context, x, y, size, size, random() > 0.84 ? "#ffe39a" : "rgba(255,255,255,.72)");
    }

    if (id === "aurora") {
      const auroraColors = ["rgba(78,220,164,.28)", "rgba(73,169,207,.24)", "rgba(208,81,136,.18)"];
      auroraColors.forEach((color, band) => {
        for (let step = 0; step < 9; step += 1) {
          pixelRect(context, -40 + step * 46, 115 + band * 34 + step * 4, 100, 8, color);
        }
      });
    }

    if (id === "village") {
      drawHouse(context, 22, 405, 0.66, "#bd765d", "#5c2941");
      drawHouse(context, 274, 420, 0.55, "#d69c63", "#4f2d4d");
      drawHouse(context, 84, 442, 0.44, "#94516c", "#3f2748");
    } else if (id === "midnight") {
      drawPixelStar(context, 54, 128, 7, "#ffe39a");
      drawPixelStar(context, 305, 170, 5, "#fff4c1");
      pixelEllipse(context, 298, 92, 22, 22, "#fff1b0", null, 4);
      pixelEllipse(context, 307, 84, 19, 20, palette[0], null, 4);
    } else if (id === "frost") {
      for (let x = 18; x < CARD_WIDTH; x += 44) {
        drawPixelStar(context, x, 155 + (x % 3) * 22, 4, "rgba(255,255,255,.52)");
      }
    } else {
      drawPine(context, 38, 520, 0.62, "#0a3a36", "#dff4f8");
      drawPine(context, 322, 524, 0.72, "#0b423c", "#e7f7f8");
      if (id === "pines") {
        drawPine(context, 82, 500, 0.44, "#116052", "#e7f7f8");
        drawPine(context, 280, 496, 0.43, "#116052", "#e7f7f8");
      }
    }

    pixelRect(context, 0, 512, CARD_WIDTH, 128, id === "frost" ? "#d9f2f4" : "#dceff2");
    for (let x = 0; x < CARD_WIDTH; x += 8) {
      const rise = ((x / 8) % 5) * 2;
      pixelRect(context, x, 508 - rise, 8, 12 + rise, id === "frost" ? "#edfafa" : "#eff9f8");
    }
    pixelRect(context, 0, 536, CARD_WIDTH, 104, id === "frost" ? "#b9e0e9" : "#c7e4e9");
    for (let index = 0; index < 24; index += 1) {
      const x = Math.floor(random() * CARD_WIDTH / 4) * 4;
      const y = 540 + Math.floor(random() * 55 / 4) * 4;
      pixelRect(context, x, y, random() > 0.8 ? 6 : 4, 2, "rgba(255,255,255,.64)");
    }
  }

  function bodyTint() {
    const selected = optionById("body", state.body);
    return selected ? selected.tint : "#f7fbff";
  }

  function currentLayout() {
    return BODY_LAYOUTS[state.body] || BODY_LAYOUTS.classic;
  }

  function drawArms(context, layout, front) {
    const torso = layout.balls.length > 2 ? layout.balls[1] : layout.balls[0];
    const left = [torso.cx - torso.rx + 7, torso.cy - 6];
    const right = [torso.cx + torso.rx - 7, torso.cy - 6];
    const wood = "#65412e";
    const darkWood = "#3f2a24";

    if (state.arms === "hug") {
      if (!front) return;
      pixelLine(context, [left, [142, torso.cy + 12], [174, torso.cy + 20]], darkWood, 7);
      pixelLine(context, [right, [218, torso.cy + 12], [186, torso.cy + 20]], wood, 7);
      pixelEllipse(context, 174, torso.cy + 20, 8, 7, "#c52e3f", "#7b1e2e", 3);
      pixelEllipse(context, 186, torso.cy + 20, 8, 7, "#c52e3f", "#7b1e2e", 3);
      return;
    }

    if (front) return;

    let leftPoints;
    let rightPoints;
    if (state.arms === "raised") {
      leftPoints = [left, [95, torso.cy - 35], [70, torso.cy - 84]];
      rightPoints = [right, [265, torso.cy - 38], [292, torso.cy - 86]];
    } else if (state.arms === "wave") {
      leftPoints = [left, [104, torso.cy - 22], [83, torso.cy - 65], [68, torso.cy - 88]];
      rightPoints = [right, [272, torso.cy - 7], [306, torso.cy + 13]];
    } else if (state.arms === "mittens") {
      leftPoints = [left, [104, torso.cy - 20], [76, torso.cy - 34]];
      rightPoints = [right, [256, torso.cy - 20], [284, torso.cy - 34]];
    } else {
      leftPoints = [left, [105, torso.cy - 17], [72, torso.cy - 30]];
      rightPoints = [right, [255, torso.cy - 17], [288, torso.cy - 30]];
    }

    pixelLine(context, leftPoints, darkWood, 6);
    pixelLine(context, rightPoints, wood, 6);

    if (state.arms === "twigs" || state.arms === "wave" || state.arms === "raised") {
      const leftEnd = leftPoints[leftPoints.length - 1];
      const rightEnd = rightPoints[rightPoints.length - 1];
      pixelLine(context, [leftEnd, [leftEnd[0] - 13, leftEnd[1] - 10]], wood, 4);
      pixelLine(context, [leftEnd, [leftEnd[0] + 4, leftEnd[1] - 16]], wood, 4);
      pixelLine(context, [rightEnd, [rightEnd[0] + 13, rightEnd[1] - 10]], wood, 4);
      pixelLine(context, [rightEnd, [rightEnd[0] - 4, rightEnd[1] - 16]], wood, 4);
    }

    if (state.arms === "mittens") {
      pixelEllipse(context, 73, torso.cy - 36, 12, 11, "#c73346", "#842237", 3);
      pixelEllipse(context, 287, torso.cy - 36, 12, 11, "#c73346", "#842237", 3);
      pixelRect(context, 78, torso.cy - 40, 7, 8, "#c73346");
      pixelRect(context, 275, torso.cy - 40, 7, 8, "#c73346");
    }
  }

  function drawSnowBody(context, layout) {
    const tint = bodyTint();
    const outline = state.body === "duo" ? "#c5d9df" : "#b7d9e5";

    layout.balls.forEach((ball, index) => {
      pixelEllipse(context, ball.cx + 5, ball.cy + 7, ball.rx, ball.ry, "rgba(7,31,52,.2)", null, 4);
      pixelEllipse(context, ball.cx, ball.cy, ball.rx, ball.ry, tint, outline, 4);
      pixelRect(context, ball.cx - ball.rx * 0.58, ball.cy - ball.ry * 0.46, 10, 6, "rgba(255,255,255,.84)");
      pixelRect(context, ball.cx + ball.rx * 0.48, ball.cy + ball.ry * 0.34, 8, 5, "rgba(117,173,195,.32)");

      if (layout.texture === "sparkle") {
        drawPixelStar(context, ball.cx - 22 + index * 8, ball.cy + 14, 4, "#ffffff");
        pixelRect(context, ball.cx + 26, ball.cy - 17, 5, 4, "#b7dceb");
      }
      if (layout.texture === "blue") {
        pixelRect(context, ball.cx - ball.rx * 0.7, ball.cy + ball.ry * 0.3, 12, 5, "#d5edf5");
      }
      if (layout.texture === "cream") {
        pixelRect(context, ball.cx + 14, ball.cy - 12, 7, 4, "#eee4ce");
      }
    });
  }

  function drawEyes(context, head) {
    const y = head.cy - 9;
    const left = head.cx - 19;
    const right = head.cx + 19;
    const coal = "#16212b";

    if (state.eyes === "happy") {
      pixelLine(context, [[left - 7, y + 3], [left, y - 3], [left + 7, y + 3]], coal, 4);
      pixelLine(context, [[right - 7, y + 3], [right, y - 3], [right + 7, y + 3]], coal, 4);
    } else if (state.eyes === "sleepy") {
      pixelLine(context, [[left - 8, y], [left, y + 4], [left + 8, y]], coal, 4);
      pixelLine(context, [[right - 8, y], [right, y + 4], [right + 8, y]], coal, 4);
    } else if (state.eyes === "big") {
      pixelEllipse(context, left, y, 10, 12, "#ffffff", "#89b6c7", 3);
      pixelEllipse(context, right, y, 10, 12, "#ffffff", "#89b6c7", 3);
      pixelEllipse(context, left + 2, y + 2, 5, 7, coal, null, 2);
      pixelEllipse(context, right + 2, y + 2, 5, 7, coal, null, 2);
      pixelRect(context, left, y - 4, 3, 3, "#ffffff");
      pixelRect(context, right, y - 4, 3, 3, "#ffffff");
    } else if (state.eyes === "silly") {
      pixelEllipse(context, left, y - 2, 8, 9, "#ffffff", "#638ea1", 3);
      pixelEllipse(context, right, y + 2, 10, 11, "#ffffff", "#638ea1", 3);
      pixelEllipse(context, left - 2, y - 1, 4, 5, coal, null, 2);
      pixelEllipse(context, right + 3, y + 5, 4, 5, coal, null, 2);
    } else if (state.eyes === "starry") {
      drawPixelStar(context, left, y, 7, "#e0a931");
      drawPixelStar(context, right, y, 7, "#e0a931");
      pixelRect(context, left - 2, y - 2, 4, 4, "#fff2ae");
      pixelRect(context, right - 2, y - 2, 4, 4, "#fff2ae");
    } else {
      pixelEllipse(context, left, y, 7, 7, coal, "#0a121a", 3);
      pixelEllipse(context, right, y, 7, 7, coal, "#0a121a", 3);
      pixelRect(context, left - 2, y - 3, 3, 3, "#ffffff");
      pixelRect(context, right - 2, y - 3, 3, 3, "#ffffff");
    }
  }

  function drawNose(context, head) {
    const x = head.cx + 1;
    const y = head.cy + 8;

    if (state.nose === "button") {
      pixelEllipse(context, x, y, 7, 7, "#1a2a35", "#0b141b", 3);
      pixelRect(context, x - 3, y - 3, 2, 2, "#9ab7c0");
    } else if (state.nose === "berry") {
      pixelEllipse(context, x, y, 8, 8, "#d3424b", "#862331", 3);
      pixelRect(context, x - 3, y - 4, 3, 3, "#ff9d87");
    } else if (state.nose === "gold") {
      drawPixelStar(context, x, y, 8, "#e8b33e");
      pixelRect(context, x - 2, y - 2, 4, 4, "#fff1a6");
    } else {
      const length = state.nose === "short" ? 18 : state.nose === "long" ? 43 : 31;
      const orange = state.nose === "short" ? "#f29b38" : "#ed7d2e";
      pixelRect(context, x - 5, y - 6, 10, 12, "#a74c23");
      for (let step = 0; step < length; step += 4) {
        const height = Math.max(4, 12 - Math.floor(step / 8) * 2);
        pixelRect(context, x + step, y - Math.floor(height / 2), 6, height, orange);
      }
      pixelRect(context, x + 6, y - 4, 7, 3, "#ffc25b");
    }
  }

  function drawMouth(context, head) {
    const y = head.cy + 31;
    const coal = "#16212b";

    if (state.mouth === "grin") {
      pixelRect(context, head.cx - 21, y - 5, 42, 13, coal);
      pixelRect(context, head.cx - 16, y - 3, 32, 8, "#ffffff");
      pixelRect(context, head.cx - 1, y - 3, 3, 8, "#b8ced7");
    } else if (state.mouth === "surprised") {
      pixelEllipse(context, head.cx, y, 9, 12, coal, "#0b141b", 3);
      pixelRect(context, head.cx - 3, y - 6, 4, 3, "#617786");
    } else if (state.mouth === "shy") {
      pixelLine(context, [[head.cx - 8, y], [head.cx, y + 4], [head.cx + 8, y]], coal, 4);
      pixelRect(context, head.cx - 29, y - 3, 8, 4, "rgba(218,96,103,.55)");
      pixelRect(context, head.cx + 21, y - 3, 8, 4, "rgba(218,96,103,.55)");
    } else if (state.mouth === "mischief") {
      pixelLine(context, [[head.cx - 18, y + 2], [head.cx - 5, y + 7], [head.cx + 19, y - 4]], coal, 5);
      pixelRect(context, head.cx + 7, y, 10, 3, "#ffffff");
    } else if (state.mouth === "moustache") {
      pixelLine(context, [[head.cx - 28, y + 5], [head.cx - 12, y - 3], [head.cx, y + 3]], "#513529", 7);
      pixelLine(context, [[head.cx, y + 3], [head.cx + 12, y - 3], [head.cx + 28, y + 5]], "#513529", 7);
    } else {
      const points = [
        [-24, -4],
        [-16, 3],
        [-7, 8],
        [3, 9],
        [13, 5],
        [22, -2],
      ];
      points.forEach(([offsetX, offsetY]) => {
        pixelEllipse(context, head.cx + offsetX, y + offsetY, 4, 4, coal, null, 2);
      });
    }
  }

  function drawHat(context, head) {
    const top = head.cy - head.ry;
    const x = head.cx;

    if (state.hat === "santa") {
      pixelRect(context, x - 53, top - 5, 106, 14, "#f2f3e9");
      pixelRect(context, x - 49, top - 12, 91, 12, "#bd2939");
      for (let row = 0; row < 10; row += 1) {
        pixelRect(context, x - 42 + row * 5, top - 20 - row * 6, 76 - row * 6, 7, row < 8 ? "#cf3041" : "#a51f33");
      }
      pixelEllipse(context, x + 22, top - 76, 12, 12, "#fff7e8", "#c4d7dc", 3);
      pixelRect(context, x - 36, top - 5, 18, 5, "#f3a0a1");
    } else if (state.hat === "knit" || state.hat === "pom") {
      const main = state.hat === "pom" ? "#2781aa" : "#277a58";
      const accent = state.hat === "pom" ? "#f2c34e" : "#d94a50";
      pixelRect(context, x - 48, top - 2, 96, 14, accent);
      for (let row = 0; row < 8; row += 1) {
        pixelRect(context, x - 39 + row * 2, top - 11 - row * 6, 78 - row * 4, 7, row % 2 ? main : accent);
      }
      pixelEllipse(context, x, top - 61, 13, 13, accent, "#755123", 3);
      pixelRect(context, x - 28, top - 28, 56, 4, "rgba(255,255,255,.28)");
    } else if (state.hat === "elegant") {
      pixelRect(context, x - 61, top - 4, 122, 13, "#5d2749");
      pixelRect(context, x - 41, top - 34, 82, 33, "#7b315d");
      pixelRect(context, x - 45, top - 15, 90, 8, "#e4b546");
      pixelRect(context, x - 26, top - 31, 36, 5, "rgba(255,255,255,.16)");
    } else if (state.hat === "earmuffs") {
      pixelLine(context, [[x - 42, top + 15], [x - 30, top - 18], [x, top - 30], [x + 30, top - 18], [x + 42, top + 15]], "#e5b744", 7);
      pixelEllipse(context, x - 50, top + 28, 13, 17, "#c73346", "#842237", 3);
      pixelEllipse(context, x + 50, top + 28, 13, 17, "#c73346", "#842237", 3);
      pixelRect(context, x - 54, top + 20, 7, 11, "#f28a8c");
      pixelRect(context, x + 47, top + 20, 7, 11, "#f28a8c");
    } else {
      const crownColor = state.hat === "top" ? "#152433" : "#163a42";
      pixelRect(context, x - 61, top - 4, 122, 13, "#0d1924");
      pixelRect(context, x - 39, top - 70, 78, 69, crownColor);
      pixelRect(context, x - 44, top - 18, 88, 11, state.hat === "top" ? "#c22c3f" : "#e6b744");
      pixelRect(context, x - 28, top - 62, 16, 6, "rgba(255,255,255,.13)");
      if (state.hat === "elegant") drawPixelStar(context, x + 27, top - 14, 5, "#ffe48b");
    }
  }

  function scarfColors() {
    const option = optionById("scarf", state.scarf);
    return option && option.colors ? option.colors : ["#c52e3f", "#8f1f31"];
  }

  function drawScarf(context, layout) {
    const head = layout.balls[layout.balls.length - 1];
    const torso = layout.balls.length > 2 ? layout.balls[1] : layout.balls[0];
    const neckY = head.cy + head.ry - 7;
    const colors = scarfColors();
    pixelRect(context, head.cx - head.rx + 5, neckY - 5, head.rx * 2 - 10, 19, colors[0]);
    pixelRect(context, head.cx - head.rx + 8, neckY - 1, head.rx * 1.25, 5, "rgba(255,255,255,.18)");

    const tailX = head.cx + Math.min(35, torso.rx * 0.42);
    pixelRect(context, tailX, neckY + 10, 25, 76, colors[0]);
    pixelRect(context, tailX + 25, neckY + 18, 20, 59, colors[1]);

    if (state.scarf === "striped" || state.scarf === "candy") {
      for (let y = neckY + 16; y < neckY + 80; y += 14) {
        pixelRect(context, tailX, y, 25, 6, colors[1]);
        pixelRect(context, tailX + 25, y + 6, 20, 6, colors[0]);
      }
    }

    if (state.scarf === "holly") {
      pixelRect(context, head.cx - 8, neckY + 1, 7, 7, "#d5424c");
      pixelRect(context, head.cx + 3, neckY - 2, 7, 7, "#d5424c");
      pixelRect(context, head.cx + 14, neckY + 2, 7, 7, "#d5424c");
    }

    for (let x = tailX; x < tailX + 25; x += 8) pixelRect(context, x, neckY + 84, 4, 8, colors[0]);
    for (let x = tailX + 25; x < tailX + 45; x += 7) pixelRect(context, x, neckY + 77, 4, 8, colors[1]);
  }

  function drawButtons(context, layout) {
    const torso = layout.balls.length > 2 ? layout.balls[1] : layout.balls[0];
    const color = state.extra === "buttons" ? "#e4b33e" : "#1c2b36";
    const outline = state.extra === "buttons" ? "#93641c" : "#0c151c";
    const count = layout.balls.length > 2 ? 3 : 4;
    for (let index = 0; index < count; index += 1) {
      const y = torso.cy + 8 + index * 24;
      pixelEllipse(context, torso.cx - 8, y, 6, 6, color, outline, 2);
      if (state.extra === "buttons") pixelRect(context, torso.cx - 10, y - 3, 3, 3, "#fff0a0");
    }
  }

  function drawExtra(context, layout) {
    const torso = layout.balls.length > 2 ? layout.balls[1] : layout.balls[0];
    if (state.extra === "candy") {
      pixelLine(context, [[292, 488], [292, 397], [299, 380], [313, 377], [323, 388]], "#f2f2e8", 12);
      pixelLine(context, [[292, 474], [292, 456]], "#c83243", 12);
      pixelLine(context, [[292, 431], [292, 413]], "#c83243", 12);
      pixelLine(context, [[299, 386], [314, 383], [320, 391]], "#c83243", 8);
    } else if (state.extra === "gift") {
      pixelRect(context, 251, 463, 67, 57, "#b92f43");
      pixelRect(context, 247, 454, 75, 14, "#db4a55");
      pixelRect(context, 279, 454, 11, 66, "#efc34f");
      pixelRect(context, 250, 483, 69, 8, "#efc34f");
      pixelEllipse(context, 274, 450, 14, 9, "#efc34f", "#9b6d1d", 3);
      pixelEllipse(context, 296, 450, 14, 9, "#efc34f", "#9b6d1d", 3);
    } else if (state.extra === "bow") {
      const y = torso.cy + 9;
      pixelEllipse(context, torso.cx - 22, y, 21, 13, "#c63245", "#842237", 3);
      pixelEllipse(context, torso.cx + 22, y, 21, 13, "#c63245", "#842237", 3);
      pixelEllipse(context, torso.cx, y, 10, 10, "#e8b744", "#94631c", 3);
      pixelLine(context, [[torso.cx - 4, y + 8], [torso.cx - 15, y + 46]], "#b3263a", 8);
      pixelLine(context, [[torso.cx + 4, y + 8], [torso.cx + 17, y + 46]], "#b3263a", 8);
    } else if (state.extra === "star") {
      pixelLine(context, [[289, 485], [289, 385]], "#7f542c", 7);
      drawPixelStar(context, 289, 371, 19, "#f3c44e");
      pixelRect(context, 285, 367, 8, 8, "#fff1a6");
    } else if (state.extra === "lights") {
      const points = [[104, torso.cy - 5], [135, torso.cy + 12], [176, torso.cy + 5], [218, torso.cy + 16], [252, torso.cy - 2]];
      pixelLine(context, points, "#2c523d", 3);
      const colors = ["#e84b55", "#f2c44f", "#45bca0", "#5bb4e0", "#e84b55"];
      points.forEach((point, index) => {
        pixelRect(context, point[0] - 4, point[1] + 2, 8, 10, colors[index]);
        pixelRect(context, point[0] - 2, point[1] + 4, 3, 3, "#fff4c8");
      });
    }
  }

  function drawCardHeader(context) {
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgba(255,255,255,.8)";
    context.font = "700 10px system-ui, sans-serif";
    context.fillText("ICC · UNICAH", CARD_WIDTH / 2, 25);
    context.fillStyle = "#fff8e8";
    context.font = "italic 700 28px Georgia, serif";
    context.shadowColor = "rgba(0,0,0,.42)";
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.fillText("¡Feliz Navidad!", CARD_WIDTH / 2, 61);
    context.restore();
    drawPixelStar(context, 46, 57, 5, "#f6c75b");
    drawPixelStar(context, 314, 57, 5, "#f6c75b");
  }

  function fitText(context, text, maxWidth, startSize, family) {
    let size = startSize;
    while (size > 14) {
      context.font = `800 ${size}px ${family}`;
      if (context.measureText(text).width <= maxWidth) break;
      size -= 1;
    }
    return size;
  }

  function drawNamePlate(context) {
    const name = displayName();
    pixelRect(context, 38, 545, 284, 58, "rgba(3,20,38,.88)");
    pixelRect(context, 42, 549, 276, 50, "rgba(18,61,84,.86)");
    pixelRect(context, 42, 549, 276, 3, "#f6c75b");
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#b9d2df";
    context.font = "800 8px system-ui, sans-serif";
    context.fillText("MI MUÑECO DE NIEVE", CARD_WIDTH / 2, 560);
    const size = fitText(context, name, 248, 27, "Georgia, serif");
    context.font = `italic 800 ${size}px Georgia, serif`;
    context.fillStyle = "#fff6da";
    context.shadowColor = "rgba(0,0,0,.45)";
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.fillText(name, CARD_WIDTH / 2, 582);
    context.restore();
    drawPixelStar(context, 55, 574, 4, "#f6c75b");
    drawPixelStar(context, 305, 574, 4, "#f6c75b");
    context.save();
    context.textAlign = "center";
    context.fillStyle = "#345b6e";
    context.font = "800 8px system-ui, sans-serif";
    context.fillText("NAVIDAD 2026", CARD_WIDTH / 2, 623);
    context.restore();
  }

  function drawPostcard(context, snapshot) {
    const previousState = state;
    if (snapshot) state = snapshot;

    context.save();
    context.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
    context.imageSmoothingEnabled = false;
    drawBackground(context, state.background);
    drawCardHeader(context);

    const layout = currentLayout();
    drawArms(context, layout, false);
    drawSnowBody(context, layout);

    const head = layout.balls[layout.balls.length - 1];
    drawEyes(context, head);
    drawNose(context, head);
    drawMouth(context, head);
    drawHat(context, head);
    drawScarf(context, layout);
    drawButtons(context, layout);
    drawArms(context, layout, true);
    drawExtra(context, layout);
    drawNamePlate(context);

    pixelRect(context, 0, 0, CARD_WIDTH, 4, "#f6c75b");
    pixelRect(context, 0, CARD_HEIGHT - 4, CARD_WIDTH, 4, "#f6c75b");
    pixelRect(context, 0, 0, 4, CARD_HEIGHT, "#f6c75b");
    pixelRect(context, CARD_WIDTH - 4, 0, 4, CARD_HEIGHT, "#f6c75b");
    pixelRect(context, 8, 8, CARD_WIDTH - 16, 2, "rgba(255,255,255,.28)");
    context.restore();

    state = previousState;
  }

  function requestRender() {
    cancelAnimationFrame(renderFrame);
    renderFrame = requestAnimationFrame(() => {
      const context = elements.preview.getContext("2d", { alpha: false });
      drawPostcard(context);
      if (!elements.finalScreen.hidden) {
        drawPostcard(elements.finalCanvas.getContext("2d", { alpha: false }));
      }
    });
  }

  function createTabs() {
    const fragment = document.createDocumentFragment();
    CATEGORIES.forEach((category) => {
      const button = document.createElement("button");
      button.className = "category-tab";
      button.type = "button";
      button.dataset.category = category.id;
      button.setAttribute("aria-selected", String(category.id === activeCategory));

      const icon = document.createElement("span");
      icon.className = "category-tab__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = category.icon;

      const label = document.createElement("span");
      label.className = "category-tab__label";
      label.textContent = category.label;

      button.append(icon, label);
      button.addEventListener("click", () => selectCategory(category.id, button));
      fragment.appendChild(button);
    });
    elements.tabs.appendChild(fragment);
  }

  function selectCategory(categoryId, selectedButton) {
    activeCategory = categoryId;
    elements.tabs.querySelectorAll(".category-tab").forEach((button) => {
      button.setAttribute("aria-selected", String(button.dataset.category === categoryId));
    });
    if (selectedButton) selectedButton.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
    renderOptions();
  }

  function drawThumbBackground(context, id) {
    const palette = backgroundPalette(id);
    context.fillStyle = palette[0];
    context.fillRect(0, 0, 52, 52);
    pixelRect(context, 0, 33, 52, 19, "#d8edf1");
    drawPine(context, 12, 39, 0.18, "#15594f", "#ffffff");
    drawPine(context, 42, 41, 0.22, "#124a45", "#ffffff");
    if (id === "village") drawHouse(context, 19, 29, 0.18, "#c97761", "#5b2c49");
    if (id === "aurora") pixelRect(context, 4, 14, 40, 5, "#4edca4");
    if (id === "midnight") drawPixelStar(context, 39, 12, 3, "#ffe48b");
  }

  function drawOptionThumbnail(canvas, category, option, optionIndex) {
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, 52, 52);
    context.fillStyle = "#0a2842";
    context.fillRect(0, 0, 52, 52);
    pixelRect(context, 2, 2, 48, 2, "rgba(255,255,255,.12)");

    if (category.id === "background") {
      drawThumbBackground(context, option.id);
      return;
    }

    if (category.id === "body") {
      const fill = option.tint;
      if (option.id === "duo") {
        pixelEllipse(context, 26, 34, 14, 16, fill, "#9bc7d6", 2);
        pixelEllipse(context, 26, 15, 9, 9, fill, "#9bc7d6", 2);
      } else {
        const widths = option.id === "tall" ? [10, 8, 6] : option.id === "chubby" ? [16, 13, 9] : [14, 11, 8];
        pixelEllipse(context, 26, 39, widths[0], 10, fill, "#9bc7d6", 2);
        pixelEllipse(context, 26, 26, widths[1], 9, fill, "#9bc7d6", 2);
        pixelEllipse(context, 26, 14, widths[2], 8, fill, "#9bc7d6", 2);
      }
      return;
    }

    if (category.id === "scarf") {
      pixelRect(context, 8, 16, 36, 11, option.colors[0]);
      pixelRect(context, 27, 25, 11, 22, option.colors[0]);
      pixelRect(context, 38, 28, 8, 17, option.colors[1]);
      if (option.id === "striped" || option.id === "candy") {
        pixelRect(context, 27, 31, 11, 4, option.colors[1]);
        pixelRect(context, 38, 36, 8, 4, option.colors[0]);
      }
      return;
    }

    if (category.id === "eyes") {
      if (option.id === "happy" || option.id === "sleepy") {
        pixelLine(context, [[9, 26], [16, 21], [23, 26]], "#17232d", 3);
        pixelLine(context, [[29, 26], [36, 21], [43, 26]], "#17232d", 3);
      } else if (option.id === "starry") {
        drawPixelStar(context, 16, 25, 6, "#efbc42");
        drawPixelStar(context, 36, 25, 6, "#efbc42");
      } else {
        const radius = option.id === "big" ? 8 : option.id === "silly" ? 7 : 5;
        pixelEllipse(context, 16, 25, radius, radius + 1, "#17232d", null, 2);
        pixelEllipse(context, 36, option.id === "silly" ? 29 : 25, radius, radius + 1, "#17232d", null, 2);
        pixelRect(context, 14, 21, 2, 2, "#ffffff");
        pixelRect(context, 34, 21, 2, 2, "#ffffff");
      }
      return;
    }

    if (category.id === "nose") {
      if (["button", "berry", "gold"].includes(option.id)) {
        const color = option.id === "berry" ? "#d3424b" : option.id === "gold" ? "#e8b33e" : "#17232d";
        option.id === "gold" ? drawPixelStar(context, 26, 26, 9, color) : pixelEllipse(context, 26, 26, 9, 9, color, "#0b141b", 2);
      } else {
        const length = option.id === "short" ? 18 : option.id === "long" ? 39 : 29;
        for (let x = 8; x < 8 + length; x += 4) pixelRect(context, x, 23, 6, Math.max(4, 12 - Math.floor((x - 8) / 8) * 2), "#ed7d2e");
      }
      return;
    }

    if (category.id === "mouth") {
      if (option.id === "surprised") pixelEllipse(context, 26, 27, 8, 11, "#17232d", null, 2);
      else if (option.id === "grin") {
        pixelRect(context, 10, 22, 32, 14, "#17232d");
        pixelRect(context, 14, 24, 24, 7, "#ffffff");
      } else if (option.id === "moustache") {
        pixelLine(context, [[7, 29], [20, 22], [26, 28], [33, 22], [45, 29]], "#5b392c", 5);
      } else {
        pixelLine(context, [[8, 21 + optionIndex], [18, 29], [28, 31], [44, 21]], "#17232d", 4);
      }
      return;
    }

    if (category.id === "hat") {
      const colors = ["#172633", "#c72d3f", "#287b59", "#7a315d", "#287ca6", "#d9ad3e"];
      pixelRect(context, 5, 36, 42, 7, colors[optionIndex]);
      if (option.id === "earmuffs") {
        pixelLine(context, [[10, 34], [14, 14], [26, 9], [39, 14], [43, 34]], "#e5b744", 4);
        pixelEllipse(context, 8, 35, 6, 9, "#c73346", null, 2);
        pixelEllipse(context, 44, 35, 6, 9, "#c73346", null, 2);
      } else {
        pixelRect(context, 13, 11, 26, 26, colors[optionIndex]);
        pixelRect(context, 13, 29, 26, 5, option.id === "santa" ? "#ffffff" : "#e0ad3d");
        if (["santa", "knit", "pom"].includes(option.id)) pixelEllipse(context, 34, 8, 6, 6, "#fff4df", null, 2);
      }
      return;
    }

    if (category.id === "arms") {
      const poses = [
        [[26, 32], [8, 23]],
        [[26, 32], [9, 8]],
        [[26, 32], [15, 18], [9, 6]],
        [[26, 32], [8, 20]],
        [[8, 25], [26, 34], [44, 25]],
      ];
      const points = poses[optionIndex] || poses[0];
      pixelLine(context, points, "#6b432d", 5);
      if (option.id === "mittens") pixelEllipse(context, 8, 20, 7, 7, "#c73346", null, 2);
      return;
    }

    if (category.id === "extra") {
      const colors = ["#e4b33e", "#c83243", "#c73346", "#d13b4c", "#f3c44e", "#45bca0", "#73899a"];
      if (option.id === "star") drawPixelStar(context, 26, 25, 14, colors[optionIndex]);
      else if (option.id === "candy") {
        pixelLine(context, [[20, 42], [20, 15], [27, 8], [36, 14]], "#f2f2e8", 9);
        pixelRect(context, 16, 27, 8, 7, colors[optionIndex]);
      } else if (option.id === "gift") {
        pixelRect(context, 11, 17, 30, 29, colors[optionIndex]);
        pixelRect(context, 24, 14, 6, 33, "#f1c34f");
      } else if (option.id === "none") {
        pixelLine(context, [[12, 40], [40, 12]], "#7c93a1", 5);
      } else {
        pixelEllipse(context, 26, 25, 13, 13, colors[optionIndex], "#6d4720", 2);
      }
    }
  }

  function renderOptions() {
    const category = categoryById(activeCategory);
    elements.categoryTitle.textContent = category.label;
    elements.optionCounter.textContent = `${category.options.length} opciones`;
    elements.options.replaceChildren();

    const fragment = document.createDocumentFragment();
    category.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option-button";
      button.type = "button";
      button.setAttribute("aria-pressed", String(state[category.id] === option.id));
      button.setAttribute("aria-label", `${category.label}: ${option.label}`);

      const thumbnail = document.createElement("canvas");
      thumbnail.width = 52;
      thumbnail.height = 52;
      thumbnail.setAttribute("aria-hidden", "true");
      drawOptionThumbnail(thumbnail, category, option, index);

      const label = document.createElement("span");
      label.textContent = option.label;
      button.append(thumbnail, label);

      button.addEventListener("click", () => {
        updateState(category.id, option.id);
        elements.options.querySelectorAll(".option-button").forEach((candidate) => candidate.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
      });
      fragment.appendChild(button);
    });
    elements.options.appendChild(fragment);
  }

  function randomize() {
    CATEGORIES.forEach((category) => {
      const choice = category.options[Math.floor(Math.random() * category.options.length)];
      state[category.id] = choice.id;
    });
    state.name = nameIdeas[Math.floor(Math.random() * nameIdeas.length)];
    elements.nameInput.value = state.name;
    updateNameCount();
    saveState();
    invalidateExport();
    renderOptions();
    requestRender();
    showToast(`¡Apareció ${displayName()}!`);
  }

  function resetDesign() {
    state = { ...DEFAULT_STATE };
    elements.nameInput.value = state.name;
    updateNameCount();
    saveState();
    invalidateExport();
    activeCategory = "body";
    selectCategory("body", elements.tabs.querySelector('[data-category="body"]'));
    requestRender();
    showToast("Diseño reiniciado");
  }

  function updateNameCount() {
    const length = Array.from(elements.nameInput.value).length;
    elements.nameCount.textContent = `${Math.min(length, NAME_LIMIT)}/${NAME_LIMIT}`;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 1800);
  }

  function createSnow() {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 30; index += 1) {
      const flake = document.createElement("span");
      flake.style.setProperty("--left", `${Math.random() * 100}%`);
      flake.style.setProperty("--size", `${2 + Math.random() * 4}px`);
      flake.style.setProperty("--alpha", String(0.25 + Math.random() * 0.65));
      flake.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
      flake.style.setProperty("--delay", `${-Math.random() * 16}s`);
      flake.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
      fragment.appendChild(flake);
    }
    elements.ambientSnow.appendChild(fragment);
  }

  function createCelebration() {
    elements.particles.replaceChildren();
    const colors = ["#ffe39a", "#ffffff", "#73d9bf", "#e95a68"];
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 34; index += 1) {
      const particle = document.createElement("span");
      particle.textContent = index % 4 === 0 ? "✦" : "•";
      particle.style.setProperty("--left", `${Math.random() * 100}%`);
      particle.style.setProperty("--color", colors[index % colors.length]);
      particle.style.setProperty("--size", `${8 + Math.random() * 11}px`);
      particle.style.setProperty("--duration", `${5 + Math.random() * 7}s`);
      particle.style.setProperty("--delay", `${-Math.random() * 8}s`);
      particle.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
      fragment.appendChild(particle);
    }
    elements.particles.appendChild(fragment);
  }

  function makeFileName() {
    const safe = displayName()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/ñ/g, "n")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 34);
    return `mi-muneco-${safe || "copito"}.png`;
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("No se pudo generar la imagen"));
      }, "image/png");
    });
  }

  async function buildExportAsset() {
    const version = stateVersion;
    const snapshot = { ...state, name: displayName() };
    const base = document.createElement("canvas");
    base.width = CARD_WIDTH;
    base.height = CARD_HEIGHT;
    drawPostcard(base.getContext("2d", { alpha: false }), snapshot);

    const output = document.createElement("canvas");
    output.width = EXPORT_WIDTH;
    output.height = EXPORT_HEIGHT;
    const context = output.getContext("2d", { alpha: false });
    context.imageSmoothingEnabled = false;
    context.drawImage(base, 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);
    const blob = await canvasToBlob(output);
    const fileName = makeFileName();
    const file = new File([blob], fileName, { type: "image/png", lastModified: Date.now() });

    if (version !== stateVersion) throw new Error("La postal cambió mientras se generaba");
    return { blob, file, fileName, width: output.width, height: output.height };
  }

  function prepareExport() {
    if (exportCache) return Promise.resolve(exportCache);
    if (exportPromise) return exportPromise;

    const targetVersion = stateVersion;
    elements.share.disabled = true;
    elements.shareStatus.textContent = "Preparando tu imagen en alta resolución…";
    exportPromise = buildExportAsset()
      .then((asset) => {
        if (targetVersion !== stateVersion) return prepareExport();
        exportCache = asset;
        exportPromise = null;
        elements.share.disabled = false;
        elements.shareStatus.textContent = "Postal lista: 1080 × 1920 px.";
        return asset;
      })
      .catch((error) => {
        exportPromise = null;
        elements.shareStatus.textContent = "No pudimos preparar la imagen. Inténtalo nuevamente.";
        throw error;
      });
    return exportPromise;
  }

  function triggerDownload(asset) {
    const url = URL.createObjectURL(asset.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = asset.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function openSavePreview(asset) {
    if (savePreviewUrl) URL.revokeObjectURL(savePreviewUrl);
    savePreviewUrl = URL.createObjectURL(asset.blob);
    elements.savePreview.src = savePreviewUrl;
    if (typeof elements.saveDialog.showModal === "function") elements.saveDialog.showModal();
    else window.open(savePreviewUrl, "_blank", "noopener");
  }

  async function downloadPostcard() {
    elements.download.disabled = true;
    elements.download.textContent = "Preparando PNG…";
    try {
      const asset = await prepareExport();
      if (isIOS()) {
        openSavePreview(asset);
        elements.shareStatus.textContent = "Mantén presionada la imagen para guardarla en Fotos.";
      } else {
        triggerDownload(asset);
        elements.shareStatus.textContent = `Descargamos ${asset.fileName}.`;
      }
    } catch (_error) {
      elements.shareStatus.textContent = "No se pudo descargar. Inténtalo de nuevo.";
    } finally {
      elements.download.disabled = false;
      elements.download.textContent = "Descargar mi muñeco ⬇️";
    }
  }

  async function sharePostcard() {
    if (elements.share.disabled) return;
    try {
      const asset = exportCache || (await prepareExport());
      const shareData = {
        files: [asset.file],
        title: `El muñeco de nieve de ${displayName()}`,
        text: "¡Feliz Navidad! Creé mi muñeco con ICC · UNICAH.",
      };

      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: shareData.files }))) {
        await navigator.share(shareData);
        elements.shareStatus.textContent = "Se abrió el menú para compartir tu postal.";
      } else {
        triggerDownload(asset);
        elements.shareStatus.textContent = "Tu navegador no comparte archivos. Descargamos la postal para que la subas manualmente.";
      }
    } catch (error) {
      if (error && error.name === "AbortError") {
        elements.shareStatus.textContent = "Compartir cancelado. Tu postal sigue lista.";
      } else {
        const asset = exportCache;
        if (asset) triggerDownload(asset);
        elements.shareStatus.textContent = "No se pudo abrir el menú. Descargamos la postal como alternativa.";
      }
    }
  }

  function openFinalScreen() {
    elements.finalScreen.hidden = false;
    document.body.style.overflow = "hidden";
    drawPostcard(elements.finalCanvas.getContext("2d", { alpha: false }));
    createCelebration();
    elements.finalBack.focus({ preventScroll: true });
    prepareExport().catch(() => {});
  }

  function closeFinalScreen() {
    elements.finalScreen.hidden = true;
    document.body.style.overflow = "";
    elements.finish.focus({ preventScroll: true });
  }

  function bindEvents() {
    elements.nameInput.value = state.name;
    updateNameCount();
    elements.nameInput.addEventListener("input", () => {
      const value = Array.from(elements.nameInput.value).slice(0, NAME_LIMIT).join("");
      if (elements.nameInput.value !== value) elements.nameInput.value = value;
      updateNameCount();
      updateState("name", value);
    });
    elements.randomize.addEventListener("click", randomize);
    elements.reset.addEventListener("click", resetDesign);
    elements.finish.addEventListener("click", openFinalScreen);
    elements.finalBack.addEventListener("click", closeFinalScreen);
    elements.download.addEventListener("click", downloadPostcard);
    elements.share.addEventListener("click", sharePostcard);
    elements.saveDialog.addEventListener("close", () => {
      if (savePreviewUrl) {
        URL.revokeObjectURL(savePreviewUrl);
        savePreviewUrl = "";
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !elements.finalScreen.hidden && !elements.saveDialog.open) closeFinalScreen();
    });
  }

  createTabs();
  renderOptions();
  bindEvents();
  createSnow();
  requestRender();
})();


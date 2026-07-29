document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("bg-gradient");
  const thumb = document.getElementById("scrollbar-thumb");
  const track = document.getElementById("scrollbar-track");

  const icons = {
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="#201B75" stroke-width="2">
      <circle cx="12" cy="12" r="4.5"/>
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke-linecap="round"/>
    </svg>`,
    sunset: `<svg viewBox="0 0 24 24" fill="none" stroke="#201B75" stroke-width="2">
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2 15h20M2 19h20" stroke-linecap="round"/>
      <path d="M12 3v4M5 8l1.5 1.5M19 8l-1.5 1.5" stroke-linecap="round"/>
    </svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="#201B75" stroke="none">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>
    </svg>`,
    star: `<svg viewBox="0 0 24 24" fill="#201B75" stroke="none">
      <path d="M9 8 L10.8 13.2 L16 15 L10.8 16.8 L9 22 L7.2 16.8 L2 15 L7.2 13.2 Z
               M18 3.5 L18.6 5.4 L20.5 6 L18.6 6.6 L18 8.5 L17.4 6.6 L15.5 6 L17.4 5.4 Z
               M20 15.2 L20.45 16.55 L21.8 17 L20.45 17.45 L20 18.8 L19.55 17.45 L18.2 17 L19.55 16.55 Z"/>
    </svg>`
  };

  thumb.innerHTML = '<div id="icon-wrap"></div>';
  const iconWrap = document.getElementById("icon-wrap");
  iconWrap.innerHTML = icons.sun;
  let currentIcon = "sun";

  function setIcon(newIcon) {
    if (newIcon === currentIcon) return;
    currentIcon = newIcon;
    iconWrap.innerHTML = icons[newIcon];
  }

  const hellblau = [168, 223, 240];
  const gelb = [246, 211, 101];
  const orange = [244, 162, 97];
  const pink = [232, 97, 140];
  const dunkelblau = [32, 27, 117];

  function absoluteTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  let colorStops = [];
  let iconStops = [];

  function calcBreakpoints() {
    const projekteEl = document.getElementById("projekte");
    const foodEl = document.getElementById("foodsharing");
    const weiteresEl = document.getElementById("weiteres");
    const aboutEl = document.getElementById("about");

    colorStops = [
      { pos: 0, color: hellblau },
      { pos: absoluteTop(projekteEl), color: gelb },
      { pos: absoluteTop(foodEl), color: orange },
      { pos: absoluteTop(weiteresEl), color: pink },
      { pos: absoluteTop(aboutEl), color: dunkelblau },
    ];

    iconStops = [
      { pos: 0, icon: "sun" },
      { pos: absoluteTop(projekteEl), icon: "sunset" },
      { pos: absoluteTop(weiteresEl), icon: "moon" },
      { pos: absoluteTop(aboutEl) - 320, icon: "star" },
    ];
  }

  function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
  }

  function getInterpolatedColor(y) {
    if (y <= colorStops[0].pos) return colorStops[0].color;
    for (let i = 0; i < colorStops.length - 1; i++) {
      const cur = colorStops[i];
      const next = colorStops[i + 1];
      if (y >= cur.pos && y <= next.pos) {
        const t = (y - cur.pos) / (next.pos - cur.pos || 1);
        return [
          lerp(cur.color[0], next.color[0], t),
          lerp(cur.color[1], next.color[1], t),
          lerp(cur.color[2], next.color[2], t),
        ];
      }
    }
    return colorStops[colorStops.length - 1].color;
  }

  function getCurrentIcon(y) {
    let active = iconStops[0].icon;
    for (const stop of iconStops) {
      if (y >= stop.pos) active = stop.icon;
    }
    return active;
  }

  let OFFSET = window.innerHeight * 0.25;

  function update() {
    const scrollY = window.scrollY;
    const refY = scrollY + OFFSET;

    const [r, g, b] = getInterpolatedColor(refY);
    const [r2, g2, b2] = getInterpolatedColor(refY + window.innerHeight * 0.5);
    bg.style.background = `linear-gradient(to bottom, rgb(${r},${g},${b}), rgb(${r2},${g2},${b2}))`;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    const trackRect = track.getBoundingClientRect();
    const top = trackRect.top + trackRect.height * progress;
    thumb.style.top = `${top}px`;

    const icon = getCurrentIcon(refY);
    setIcon(icon);
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", () => {
    OFFSET = window.innerHeight * 0.25;
    calcBreakpoints();
    update();
  });

  window.addEventListener("load", () => {
    calcBreakpoints();
    update();
  });

  calcBreakpoints();
  update();
});
// Dieser Code wurde vollständig mit Claude (Anthropic) generiert.
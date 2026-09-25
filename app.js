const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));
});

const bubbleLayer = document.querySelector(".bubbles");
if (bubbleLayer && !prefersReducedMotion) {
  for (let index = 0; index < 16; index += 1) {
    const bubble = document.createElement("span");
    bubble.className = "bubble";
    bubble.style.setProperty("--left", `${Math.random() * 100}%`);
    bubble.style.setProperty("--size", `${8 + Math.random() * 28}px`);
    bubble.style.setProperty("--duration", `${12 + Math.random() * 15}s`);
    bubble.style.setProperty("--delay", `${-Math.random() * 20}s`);
    bubble.style.setProperty("--drift", `${-45 + Math.random() * 90}px`);
    bubbleLayer.appendChild(bubble);
  }
}

const reflectionLayer = document.querySelector(".disco-reflections");
if (reflectionLayer && !prefersReducedMotion) {
  const tones = [
    "rgba(255, 229, 170, 0.92)",
    "rgba(255, 255, 255, 0.78)",
    "rgba(214, 75, 127, 0.72)",
    "rgba(156, 198, 255, 0.58)",
  ];

  for (let index = 0; index < 30; index += 1) {
    const reflection = document.createElement("span");
    reflection.style.setProperty("--x", `${3 + Math.random() * 94}%`);
    reflection.style.setProperty("--y", `${11 + Math.random() * 82}%`);
    reflection.style.setProperty("--size", `${4 + Math.random() * 10}px`);
    reflection.style.setProperty("--angle", `${-38 + Math.random() * 76}deg`);
    reflection.style.setProperty("--speed", `${4.5 + Math.random() * 5}s`);
    reflection.style.setProperty("--delay", `${-Math.random() * 8}s`);
    reflection.style.setProperty("--tone", tones[index % tones.length]);
    reflectionLayer.appendChild(reflection);
  }
}

const danceFloor = document.querySelector("[data-dance-floor]");
if (danceFloor) {
  const floorTones = ["gold", "rose", "blue", "cream"];

  for (let index = 0; index < 72; index += 1) {
    const tile = document.createElement("span");
    tile.className = `floor-tile floor-tile-${floorTones[index % floorTones.length]}`;
    tile.style.setProperty("--tile-index", index);
    danceFloor.appendChild(tile);
  }
}

if (!prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  }, { passive: true });
}

const tiltCard = document.querySelector("[data-tilt]");
if (tiltCard && !prefersReducedMotion) {
  tiltCard.addEventListener("pointermove", (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 8 - 4}deg) rotateX(${y * -6 + 1}deg) translateY(-4px)`;
  });

  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "rotateY(-4deg) rotateX(1deg)";
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

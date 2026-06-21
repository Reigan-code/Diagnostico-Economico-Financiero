const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}
const current = location.pathname.split("/").pop() || "home.html";
document.querySelectorAll(".nav-links a").forEach((a) => {
  if (
    a.getAttribute("href") === current ||
    (current === "index.html" && a.getAttribute("href") === "home.html")
  )
    a.classList.add("active");
});
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(btn.dataset.tab);
    if (panel) panel.classList.add("active");
  });
});
document.querySelectorAll(".carousel-wrap").forEach((wrap) => {
  const track = wrap.querySelector(".service-carousel");
  const prev = wrap.querySelector(".prev");
  const next = wrap.querySelector(".next");
  if (!track) return;
  const move = () => Math.min(360, track.clientWidth * 0.75);
  prev &&
    prev.addEventListener("click", () =>
      track.scrollBy({ left: -move(), behavior: "smooth" }),
    );
  next &&
    next.addEventListener("click", () =>
      track.scrollBy({ left: move(), behavior: "smooth" }),
    );
});
// --- LÓGICA PARA EL INPUT CONVERSOR DINÁMICO ---
const urlInput = document.getElementById('urlInput');
const reproductor = document.getElementById('reproductor');

// Se ejecuta solo si los elementos existen en la página actual
if (urlInput && reproductor) {
    urlInput.addEventListener('input', () => {
        // Obtenemos el valor y limpiamos espacios fantasmas con .trim()
        const urlCompleta = urlInput.value.trim();
        const videoId = obtenerYoutubeId(urlCompleta);

        if (videoId) {
            // Actualiza el src al instante con el formato correcto
            reproductor.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            // Si borran el texto o el link no es válido, vacía el iframe
            reproductor.src = "";
        }
    });
}

// Función que faltaba: extrae el ID de YouTube de cualquier formato de link
function obtenerYoutubeId(url) {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Convierte data-src -> src arreglando el formato a /embed/
document.querySelectorAll('.dinamico-youtube').forEach((iframe) => {
  const original = iframe.dataset.src?.trim();
  if (!original) return;
  const id = obtenerYoutubeId(original);
  if (id) {
    iframe.src = `https://www.youtube.com/embed/${id}`;
  }
});
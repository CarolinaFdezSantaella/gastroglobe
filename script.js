// Sesiones de pilates iniciales
const sessions = [
  { id:"1", title:"Pilates Básico para Principiantes", nivel:"Básico", img:"https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000", desc:"Una sesión perfecta para quienes se inician en pilates.", video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  { id:"2", title:"Pilates Intermedio – Core Fuerte", nivel:"Intermedio", img:"https://images.unsplash.com/photo-1594737625785-c0f3c9f5c4c7?q=80&w=1000", desc:"Fortalece abdomen y espalda con fluidez.", video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  { id:"3", title:"Estiramientos Avanzados", nivel:"Avanzado", img:"https://images.unsplash.com/photo-1594737625785-c0f3c9f5c4c7?q=80&w=1000", desc:"Mejora la flexibilidad y control corporal.", video:"https://www.w3schools.com/html/mov_bbb.mp4" }
];

let favoritos = JSON.parse(localStorage.getItem("favPilates") || "[]");
let plan = JSON.parse(localStorage.getItem("planPilates") || "[]");

const sessionList = document.getElementById("sessionList");
const favoritesList = document.getElementById("favoritesList");
const planList = document.getElementById("planList");
const searchInput = document.getElementById("searchInput");
const filterNivel = document.getElementById("filterNivel");

// Modal
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalNivel = document.getElementById("modalNivel");
const modalDesc = document.getElementById("modalDesc");

// Render sesiones
function renderSessions(list, container) {
  container.innerHTML = "";
  list.forEach(s => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${s.img}" alt="${s.title}">
      <div class="card-body">
        <div class="card-header">
          <h3>${s.title}</h3>
          <button class="star ${favoritos.includes(s.id)?"active":""}" data-id="${s.id}">★</button>
        </div>
        <p>${s.nivel}</p>
        <button class="btn ghost verDetalles">Ver sesión</button>
        <button class="btn ghost añadirPlan">+ Añadir al plan</button>
      </div>
    `;
    card.querySelector(".star").addEventListener("click",()=>toggleFavorito(s.id));
    card.querySelector(".verDetalles").addEventListener("click",()=>abrirModal(s));
    card.querySelector(".añadirPlan").addEventListener("click",()=>añadirAlPlan(s));
    container.appendChild(card);
  });
}

function toggleFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem("favPilates", JSON.stringify(favoritos));
  aplicarFiltros();
  renderFavoritos();
}

function renderFavoritos() {
  const favs = sessions.filter(s => favoritos.includes(s.id));
  renderSessions(favs, favoritesList);
}

function abrirModal(s) {
  modalVideo.src = s.video;
  modalTitle.textContent = s.title;
  modalNivel.textContent = s.nivel;
  modalDesc.textContent = s.desc;
  modal.showModal();
}
document.querySelector(".modalClose").addEventListener("click", ()=> modal.close());

function añadirAlPlan(s) {
  plan.push(s);
  localStorage.setItem("planPilates", JSON.stringify(plan));
  renderPlan();
}

function renderPlan() {
  planList.innerHTML = "";
  plan.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.title} – ${p.nivel}`;
    planList.appendChild(li);
  });
}

function aplicarFiltros() {
  const q = searchInput.value.toLowerCase();
  const nivel = filterNivel.value;
  const filtradas = sessions.filter(s => 
    (s.title.toLowerCase().includes(q) || s.nivel.toLowerCase().includes(q)) &&
    (nivel === "Todos" || s.nivel === nivel)
  );
  renderSessions(filtradas, sessionList);
}

// Tabs
document.querySelectorAll(".tabBtn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tabBtn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tabContent").forEach(t=>t.classList.remove("active"));
    document.getElementById(`${btn.dataset.tab}Tab`).classList.add("active");
  });
});

// Tema claro / oscuro
document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("light");
});

// Eventos
searchInput.addEventListener("input", aplicarFiltros);
filterNivel.addEventListener("change", aplicarFiltros);

// Inicial
aplicarFiltros();
renderFavoritos();
renderPlan();


// === Inicial ===
aplicarFiltros();
renderFavoritos();

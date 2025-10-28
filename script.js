// Datos simulados (puedes ampliar)
const restaurants = [
  { id: 1, name: "Sushi Saito", city: "Tokio", country: "Japón", cuisine: "Japonesa", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600", rating: 5 },
  { id: 2, name: "Disfrutar", city: "Barcelona", country: "España", cuisine: "Creativa", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600", rating: 5 },
  { id: 3, name: "Taquería El Güerro", city: "CDMX", country: "México", cuisine: "Mexicana", img: "https://images.unsplash.com/photo-1601924582971-b0c5be3b36c3?q=80&w=600", rating: 4 }
];

const listEl = document.getElementById("restaurantList");
const wishlistEl = document.getElementById("wishlist");
const searchInput = document.getElementById("searchInput");
const filterCuisine = document.getElementById("filterCuisine");
const filterCountry = document.getElementById("filterCountry");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Inicializar selectores dinámicos
const cuisines = ["Todos", ...new Set(restaurants.map(r => r.cuisine))];
const countries = ["Todos", ...new Set(restaurants.map(r => r.country))];

cuisines.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c;
  opt.textContent = c;
  filterCuisine.appendChild(opt);
});

countries.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c;
  opt.textContent = c;
  filterCountry.appendChild(opt);
});

// Renderizar lista
function renderRestaurants() {
  listEl.innerHTML = "";
  const q = searchInput.value.toLowerCase();
  const fc = filterCuisine.value;
  const fco = filterCountry.value;

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(q) &&
    (fc === "Todos" || r.cuisine === fc) &&
    (fco === "Todos" || r.country === fco)
  );

  if (filtered.length === 0) {
    listEl.innerHTML = "<p>No hay resultados.</p>";
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}">
      <div class="info">
        <h3>${r.name}</h3>
        <p>${r.city}, ${r.country}</p>
        <p>⭐ ${r.rating}</p>
        <button>${wishlist.includes(r.id) ? "Quitar de wishlist" : "Guardar en wishlist"}</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => toggleWishlist(r.id));
    listEl.appendChild(card);
  });
}

// Wishlist
function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(i => i !== id);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderRestaurants();
  renderWishlist();
}

function renderWishlist() {
  wishlistEl.innerHTML = "";
  if (wishlist.length === 0) {
    wishlistEl.innerHTML = "<li>Vacía</li>";
    return;
  }
  wishlist.forEach(id => {
    const r = restaurants.find(x => x.id === id);
    if (r) {
      const li = document.createElement("li");
      li.textContent = `${r.name} (${r.city})`;
      wishlistEl.appendChild(li);
    }
  });
}

// Modo oscuro
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Claro" : "🌙 Oscuro";
});

// Botón sorpresa
document.getElementById("randomBtn").addEventListener("click", () => {
  const random = restaurants[Math.floor(Math.random() * restaurants.length)];
  alert(`🎉 Prueba ${random.name} en ${random.city}, ${random.country}`);
});

// Eventos
searchInput.addEventListener("input", renderRestaurants);
filterCuisine.addEventListener("change", renderRestaurants);
filterCountry.addEventListener("change", renderRestaurants);

// Inicializar
renderRestaurants();
renderWishlist();

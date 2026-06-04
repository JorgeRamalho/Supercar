const formatPrice = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatKm = (km) =>
  new Intl.NumberFormat("pt-BR").format(km) + " km";

const catalogEl = document.getElementById("catalog");
const searchEl = document.getElementById("search");
const brandEl = document.getElementById("filter-brand");
const categoryEl = document.getElementById("filter-category");
const priceEl = document.getElementById("filter-price");
const priceOutputEl = document.getElementById("price-output");
const resultsCountEl = document.getElementById("results-count");
const modal = document.getElementById("car-modal");
const yearEl = document.getElementById("year");

const MARQUEE_ICON_BASE =
  "https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons";

/** Grandes marcas — logo + nome + link externo (site oficial) */
const MARQUEE_BRANDS = [
  { name: "BMW", icon: "bmw", url: "https://www.bmw.com.br" },
  { name: "Mercedes", icon: "mercedes", url: "https://www.mercedes-benz.com.br" },
  { name: "Audi", icon: "audi", url: "https://www.audi.com.br" },
  { name: "Porsche", icon: "porsche", url: "https://www.porsche.com/brazil/pt" },
  { name: "Ferrari", icon: "ferrari", url: "https://www.ferrari.com" },
  { name: "Lamborghini", icon: "lamborghini", url: "https://www.lamborghini.com" },
  { name: "Maserati", icon: "maserati", url: "https://www.maserati.com" },
  { name: "Bentley", icon: "bentley", url: "https://www.bentleymotors.com" },
  { name: "Rolls-Royce", icon: "rollsroyce", url: "https://www.rolls-roycemotorcars.com" },
  { name: "Toyota", icon: "toyota", url: "https://www.toyota.com.br" },
  { name: "Honda", icon: "honda", url: "https://www.honda.com.br" },
  { name: "Nissan", icon: "nissan", url: "https://www.nissan.com.br" },
  { name: "Hyundai", icon: "hyundai", url: "https://www.hyundai.com.br" },
  { name: "Kia", icon: "kia", url: "https://www.kia.com.br" },
  { name: "Ford", icon: "ford", url: "https://www.ford.com.br" },
  { name: "Chevrolet", icon: "chevrolet", url: "https://www.chevrolet.com.br" },
  { name: "Volkswagen", icon: "volkswagen", url: "https://www.vw.com.br" },
  { name: "Jeep", icon: "jeep", url: "https://www.jeep.com.br" },
  { name: "Land Rover", icon: "landrover", url: "https://www.landrover.com.br" },
  { name: "Volvo", icon: "volvo", url: "https://www.volvocars.com/br" },
  { name: "Lexus", src: "assets/logos/lexus.svg", local: true, url: "https://www.lexus.com.br" },
  { name: "Mazda", icon: "mazda", url: "https://www.mazda.com.br" },
  { name: "Subaru", icon: "subaru", url: "https://www.subaru.com.br" },
  { name: "Renault", icon: "renault", url: "https://www.renault.com.br" },
  { name: "Fiat", icon: "fiat", url: "https://www.fiat.com.br" },
  { name: "Peugeot", icon: "peugeot", url: "https://www.peugeot.com.br" },
  { name: "Citroën", icon: "citroen", url: "https://www.citroen.com.br" },
  { name: "Alfa Romeo", icon: "alfaromeo", url: "https://www.alfaromeo.com.br" },
];

function initBrands() {
  const brands = [...new Set(CARS.map((c) => c.brand))].sort();
  brands.forEach((brand) => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandEl.appendChild(opt);
  });
}

function initMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) return;

  const itemHtml = (brand) => {
    const src = brand.src || `${MARQUEE_ICON_BASE}/${brand.icon}.svg`;
    const logoClass = brand.local
      ? "marquee__logo marquee__logo--local"
      : "marquee__logo";
    const inner = `<figure class="marquee__brand">
      <div class="marquee__logo-wrap" aria-hidden="true">
        <img class="${logoClass}" src="${src}" alt="" width="56" height="56" loading="lazy" decoding="async" />
      </div>
      <figcaption class="marquee__caption">
        <span class="marquee__legend">Marca</span>
        <span class="marquee__name">${brand.name}</span>
      </figcaption>
    </figure>`;

    if (!brand.url) return inner;

    return `<a class="marquee__link" href="${brand.url}" target="_blank" rel="noopener noreferrer" title="Visitar site ${brand.name} (abre em nova aba)" aria-label="Visitar site oficial da ${brand.name}">${inner}</a>`;
  };

  const block = MARQUEE_BRANDS.map(itemHtml).join("");
  track.innerHTML = block + block;
}

function getFilters() {
  return {
    search: (searchEl?.value || "").trim().toLowerCase(),
    brand: brandEl?.value || "",
    category: categoryEl?.value || "",
    maxPrice: Number(priceEl?.value || Infinity),
  };
}

function filterCars() {
  const { search, brand, category, maxPrice } = getFilters();
  return CARS.filter((car) => {
    const haystack = `${car.brand} ${car.model}`.toLowerCase();
    if (search && !haystack.includes(search)) return false;
    if (brand && car.brand !== brand) return false;
    if (category && car.category !== category) return false;
    if (car.price > maxPrice) return false;
    return true;
  });
}

function setupCarImage(img, src) {
  const fallback =
    typeof CAR_IMAGE_FALLBACK !== "undefined" ? CAR_IMAGE_FALLBACK : src;
  img.addEventListener("error", () => {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "1";
    img.src = fallback;
  }, { once: true });
  img.src = src;
}

function renderCard(car) {
  const article = document.createElement("article");
  article.className = "car-card reveal";
  article.dataset.id = String(car.id);
  article.setAttribute("role", "button");
  article.setAttribute("tabindex", "0");
  article.setAttribute(
    "aria-label",
    `${car.brand} ${car.model}, ${formatPrice(car.price)}`
  );

  const divider = car.imageDivider
    ? '<div class="car-card__divider" aria-hidden="true"></div>'
    : "";

  article.innerHTML = `
    <div class="car-card__img-wrap">
      <span class="car-card__tag">${car.tag}</span>
      <img alt="${car.brand} ${car.model}" loading="lazy" width="800" height="500" data-src="${car.image}" />
    </div>
    ${divider}
    <div class="car-card__body">
      <span class="car-card__brand">${car.brand}</span>
      <h3>${car.model}</h3>
      <div class="car-card__meta">
        <span>${car.year}</span>
        <span>${formatKm(car.km)}</span>
        <span>${car.fuel}</span>
      </div>
      <p class="car-card__price">${formatPrice(car.price)}</p>
    </div>
  `;

  const img = article.querySelector("img[data-src]");
  if (img) setupCarImage(img, car.image);

  article.addEventListener("click", () => openModal(car));
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(car);
    }
  });

  return article;
}

function renderCatalog() {
  const list = filterCars();
  catalogEl.innerHTML = "";

  if (list.length === 0) {
    catalogEl.innerHTML =
      '<p class="catalog-empty">Nenhum veículo encontrado com esses filtros. Tente ampliar a busca.</p>';
    resultsCountEl.textContent = "0 veículos";
    return;
  }

  resultsCountEl.textContent =
    list.length === 1 ? "1 veículo encontrado" : `${list.length} veículos encontrados`;

  list.forEach((car) => catalogEl.appendChild(renderCard(car)));
  observeReveals();
}

function openModal(car) {
  document.getElementById("modal-title").textContent = `${car.brand} ${car.model}`;
  document.getElementById("modal-price").textContent = formatPrice(car.price);
  document.getElementById("modal-desc").textContent = car.description;
  const media = document.getElementById("modal-media");
  media.innerHTML = `<img alt="${car.brand} ${car.model}" />`;
  const modalImg = media.querySelector("img");
  if (modalImg) setupCarImage(modalImg, car.image);
  document.getElementById("modal-specs").innerHTML = `
    <li>${car.year}</li>
    <li>${formatKm(car.km)}</li>
    <li>${car.fuel}</li>
    <li>${car.transmission}</li>
    <li>${car.category.toUpperCase()}</li>
  `;
  modal.showModal();
}

function closeModal() {
  modal.close();
}

function initModal() {
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeModal();
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function initPriceRange() {
  const update = () => {
    priceOutputEl.textContent = formatPrice(Number(priceEl.value));
    renderCatalog();
  };
  priceEl?.addEventListener("input", update);
  update();
}

function initFilters() {
  [searchEl, brandEl, categoryEl].forEach((el) => {
    el?.addEventListener("input", renderCatalog);
    el?.addEventListener("change", renderCatalog);
  });
}

function initForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    feedback.hidden = false;
    feedback.textContent =
      "Mensagem enviada com sucesso! Em breve um consultor entrará em contato.";
    feedback.className = "form-feedback form-feedback--success";
    form.reset();
  });
}

function observeReveals() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".car-card.reveal:not(.is-visible)");

  if (prefersReduced) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initSectionReveals() {
  const sections = document.querySelectorAll(
    ".section__head, .feature-card, .timeline li, .testimonial"
  );
  sections.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((el) => observer.observe(el));
}

function init() {
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  initMarquee();
  initBrands();
  initFilters();
  initPriceRange();
  initModal();
  initNav();
  initForm();
  renderCatalog();
  initSectionReveals();
}

document.addEventListener("DOMContentLoaded", init);

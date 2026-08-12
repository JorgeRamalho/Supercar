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

/** Metadados só das marcas presentes no estoque (marquee enxuto). */
const BRAND_META = {
  Audi: { icon: "audi", url: "https://www.audi.com.br" },
  BMW: { icon: "bmw", url: "https://www.bmw.com.br" },
  Ford: { icon: "ford", url: "https://www.ford.com.br" },
  Honda: { icon: "honda", url: "https://www.honda.com.br" },
  Hyundai: { icon: "hyundai", url: "https://www.hyundai.com.br" },
  Jeep: { icon: "jeep", url: "https://www.jeep.com.br" },
  Lexus: {
    src: "assets/logos/lexus.svg",
    local: true,
    url: "https://www.lexus.com.br",
  },
  "Mercedes-Benz": {
    icon: "mercedes",
    url: "https://www.mercedes-benz.com.br",
  },
  Nissan: { icon: "nissan", url: "https://www.nissan.com.br" },
  Porsche: { icon: "porsche", url: "https://www.porsche.com/brazil/pt" },
  Toyota: { icon: "toyota", url: "https://www.toyota.com.br" },
};

function trackEvent(name, detail) {
  const payload = { name, detail, at: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (typeof SITE !== "undefined" && SITE.analyticsId) {
    console.info("[analytics]", SITE.analyticsId, payload);
  }
}

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

  const brands = [...new Set(CARS.map((c) => c.brand))]
    .sort()
    .map((name) => ({ name, ...(BRAND_META[name] || {}) }))
    .filter((brand) => brand.icon || brand.src);

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

  const block = brands.map(itemHtml).join("");
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
    if (src.endsWith(".webp") && !img.dataset.webpFailed) {
      img.dataset.webpFailed = "1";
      img.src = src.replace(/\.webp$/i, ".png");
      return;
    }
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "1";
    img.src = fallback.endsWith(".webp")
      ? fallback.replace(/\.webp$/i, ".png")
      : fallback;
  });
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
      <img alt="${car.brand} ${car.model}" loading="lazy" decoding="async" width="800" height="500" sizes="(max-width: 600px) 92vw, (max-width: 900px) 45vw, 360px" data-src="${car.image}" />
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

let lastFocusBeforeModal = null;

function openModal(car) {
  lastFocusBeforeModal = document.activeElement;
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
  modal.querySelector(".modal__close")?.focus();
}

function closeModal() {
  if (!modal.open) return;
  modal.close();
  if (lastFocusBeforeModal instanceof HTMLElement) {
    lastFocusBeforeModal.focus();
  }
  lastFocusBeforeModal = null;
}

function initModal() {
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeModal();
  });
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !modal.open) return;
    const focusable = [
      ...modal.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
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

function buildWhatsAppUrl(data) {
  const number =
    typeof SITE !== "undefined" && SITE.whatsappE164
      ? SITE.whatsappE164
      : "5511999990000";
  const brand = typeof SITE !== "undefined" && SITE.name ? SITE.name : "Super Car";
  const lines = [
    `Olá, ${brand}! Gostaria de agendar uma conversa.`,
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
  ];
  if (data.phone) lines.push(`Telefone: ${data.phone}`);
  lines.push("", "Mensagem:", data.message);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number}?text=${text}`;
}

function hydrateSiteInfo() {
  if (typeof SITE === "undefined") return;

  const address = document.getElementById("contact-address");
  if (address) {
    address.innerHTML = `${SITE.addressLine1}<br />${SITE.addressLine2}`;
  }

  const hours = document.getElementById("contact-hours");
  if (hours) {
    hours.innerHTML = `${SITE.hoursWeekday}<br />${SITE.hoursSaturday}`;
  }

  const phone = document.getElementById("contact-phone");
  if (phone) {
    phone.href = `tel:${SITE.phoneTel}`;
    phone.textContent = SITE.phoneDisplay;
  }

  const whatsapp = document.getElementById("contact-whatsapp");
  if (whatsapp) {
    whatsapp.href = `https://wa.me/${SITE.whatsappE164}`;
    whatsapp.textContent = SITE.whatsappDisplay;
  }

  const privacy = document.getElementById("privacy-email");
  if (privacy) {
    privacy.href = `mailto:${SITE.emailPrivacy}`;
    privacy.textContent = SITE.emailPrivacy;
  }

  const demo = document.getElementById("demo-banner");
  if (demo) demo.hidden = !SITE.demoNotice;

  const schemaEl = document.getElementById("structured-data");
  if (schemaEl) {
    const schema = {
      "@context": "https://schema.org",
      "@type": ["AutoDealer", "LocalBusiness"],
      name: SITE.name,
      description: SITE.tagline,
      url: SITE.url,
      image: SITE.image,
      telephone: SITE.phoneTel,
      email: SITE.emailPrivacy,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.streetAddress,
        addressLocality: SITE.addressLocality,
        addressRegion: SITE.addressRegion,
        addressCountry: SITE.addressCountry,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      areaServed: SITE.addressLocality,
      priceRange: "$$",
    };
    schemaEl.textContent = JSON.stringify(schema);
  }
}

async function postFormEndpoint(payload) {
  if (typeof SITE === "undefined" || !SITE.formEndpoint) return;
  try {
    await fetch(SITE.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Falha ao enviar para formEndpoint:", err);
  }
}

function initForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    trackEvent("lead_whatsapp", { brand: payload.name });
    await postFormEndpoint(payload);

    const url = buildWhatsAppUrl(payload);
    window.open(url, "_blank", "noopener,noreferrer");

    feedback.hidden = false;
    feedback.textContent =
      "Abrimos o WhatsApp com sua mensagem. Se nada abrir, use o número nos canais ao lado.";
    feedback.className = "form-feedback form-feedback--success";
    form.reset();
  });
}

function initCtaTracking() {
  document.querySelectorAll('a[href="#estoque"], a[href="#contato"], .nav__cta').forEach((el) => {
    el.addEventListener("click", () => {
      trackEvent("cta_click", { href: el.getAttribute("href"), text: el.textContent?.trim() });
    });
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
    ".section__head, .feature-card, .testimonial, .faq__item"
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
  hydrateSiteInfo();
  initMarquee();
  initBrands();
  initFilters();
  initPriceRange();
  initModal();
  initNav();
  initForm();
  initCtaTracking();
  renderCatalog();
  initSectionReveals();
}

document.addEventListener("DOMContentLoaded", init);

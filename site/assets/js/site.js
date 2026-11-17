const navigation = [
  ["Início", "index.html", "inicio"],
  ["Serviços", "servicos.html", "servicos"],
  ["Destinos", "destinos.html", "destinos"],
  ["Pacotes", "pacotes.html", "pacotes"],
  ["Sobre", "sobre.html", "sobre"],
  ["Contato", "contato.html", "contato"]
];

const page = document.body.dataset.page;
const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");

if (header) {
  header.innerHTML = `
    <div class="header-inner container">
      <a class="brand" href="index.html" aria-label="CVC PB – Sousa, início">
        <img src="assets/img/cvc-logo-sousa.jpeg" alt="Logo da CVC" width="56" height="56">
        <span class="brand__location">PB – SOUSA</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" id="main-nav" aria-label="Navegação principal">
        <ul>${navigation.map(([label, href, id]) => `<li><a href="${href}"${page === id ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul>
        <a class="header-cta" href="https://wa.me/5583991724057?text=Ol%C3%A1%2C%20CVC%20PB%20%E2%80%93%20Sousa!%20Gostaria%20de%20conversar%20sobre%20uma%20viagem." target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <span aria-hidden="true">↗</span></a>
      </nav>
    </div>`;
}

if (footer) {
  footer.innerHTML = `
    <div class="container footer-main">
      <div class="footer-about">
        <a class="brand brand--footer" href="index.html" aria-label="CVC PB – Sousa, início">
          <img src="assets/img/cvc-logo-sousa.jpeg" alt="Logo da CVC" width="56" height="56">
          <span class="brand__location">PB – SOUSA</span>
        </a>
        <p>Conheça nossos serviços, explore destinos e entre em contato para consultar possibilidades de viagem.</p>
      </div>
      <div class="footer-links">
        <h2>Explore</h2>
        <ul>${navigation.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
      </div>
      <div class="footer-contact">
        <h2>Fale com a unidade</h2>
        <a href="https://wa.me/5583991724057" target="_blank" rel="noopener noreferrer">WhatsApp · (83) 99172-4057</a>
        <a href="tel:+558335211737">Telefone · (83) 3521-1737</a>
        <a href="https://www.instagram.com/cvc.pb.sousa/" target="_blank" rel="noopener noreferrer">Instagram · @cvc.pb.sousa</a>
        <a href="https://maps.app.goo.gl/LP6PVKNEZLiqzqes5" target="_blank" rel="noopener noreferrer">Localização · Sousa, PB</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span data-current-year></span> CVC PB – Sousa</p>
      <p>Redesign acadêmico. Confirme horários, ofertas e disponibilidade diretamente com a unidade.</p>
    </div>`;
  footer.querySelector("[data-current-year]").textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function closeMenu() {
  if (!menuToggle || !mainNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  mainNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    mainNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (menuToggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

const destinationGrid = document.querySelector("#destination-grid");
if (destinationGrid) {
  const cards = [...destinationGrid.querySelectorAll(".destination-card")];
  const search = document.querySelector("#destination-search");
  const count = document.querySelector("#destination-count");
  const emptyState = document.querySelector("#destination-empty");
  const filters = [...document.querySelectorAll("[data-filter]")];
  let selectedRegion = "todos";

  function filterDestinations() {
    const query = search.value.trim().toLocaleLowerCase("pt-BR");
    let visible = 0;
    cards.forEach((card) => {
      const matchesRegion = selectedRegion === "todos" || card.dataset.region === selectedRegion;
      const matchesSearch = card.dataset.search.toLocaleLowerCase("pt-BR").includes(query);
      const show = matchesRegion && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? "destino encontrado" : "destinos encontrados"}`;
    emptyState.hidden = visible !== 0;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      selectedRegion = button.dataset.filter;
      filters.forEach((filter) => {
        const selected = filter === button;
        filter.classList.toggle("is-selected", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      filterDestinations();
    });
  });

  search.addEventListener("input", filterDestinations);
  filterDestinations();
}

const contactForm = document.querySelector("#whatsapp-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const message = [
      "Olá, CVC PB – Sousa!",
      "",
      `Meu nome é ${data.get("name").trim()}.`,
      `Gostaria de consultar: ${data.get("interest")}.`,
      data.get("destination").trim() ? `Destino ou local de interesse: ${data.get("destination").trim()}.` : "",
      "",
      data.get("message").trim()
    ].filter(Boolean).join("\n");

    window.location.assign(`https://wa.me/5583991724057?text=${encodeURIComponent(message)}`);
  });
}

if (page === "inicio") {
  const updateHomeHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", updateHomeHeader, { passive: true });
  updateHomeHeader();

  const flightHero = document.querySelector(".home-hero");
  const flightPath = document.querySelector("#home-flight-route");
  const arrivalMarker = document.querySelector(".home-flight-arrival");
  const planeMarker = document.querySelector(".home-plane-marker");
  const plane = document.querySelector(".home-plane");

  if (flightHero && flightPath && arrivalMarker && planeMarker && plane) {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speed = 48;
    const sampleCount = 240;
    const endpointPause = 1.35;
    const fadeDuration = .24;
    let routeLength = 0;
    let screenRouteLength = 0;
    let routeSamples = [];
    let routeMatrix = null;
    let heroBounds = null;
    let markerOriginX = 0;
    let markerOriginY = 0;
    let legDuration = 0;
    let elapsed = 0;
    let pauseElapsed = 0;
    let isPausedAtEnd = false;
    let isFadingIn = false;
    let previousFrameTime = null;
    let animationFrame = 0;
    let isInViewport = true;

    function getScreenPoint(pathDistance) {
      const pathPoint = flightPath.getPointAtLength(pathDistance);
      const svgPoint = flightPath.ownerSVGElement.createSVGPoint();
      svgPoint.x = pathPoint.x;
      svgPoint.y = pathPoint.y;
      const screenPoint = svgPoint.matrixTransform(routeMatrix);
      return {
        x: screenPoint.x - heroBounds.left,
        y: screenPoint.y - heroBounds.top
      };
    }

    function getPathDistance(screenDistance) {
      let low = 0;
      let high = routeSamples.length - 1;
      const target = Math.max(0, Math.min(screenRouteLength, screenDistance));

      while (high - low > 1) {
        const middle = Math.floor((low + high) / 2);
        if (routeSamples[middle].screenDistance < target) low = middle;
        else high = middle;
      }

      const start = routeSamples[low];
      const end = routeSamples[high];
      const segmentLength = end.screenDistance - start.screenDistance;
      const progress = segmentLength
        ? (target - start.screenDistance) / segmentLength
        : 0;
      return start.pathDistance + (end.pathDistance - start.pathDistance) * progress;
    }

    function getHeading(pathDistance) {
      const delta = Math.min(4, routeLength / 100);
      const before = getScreenPoint(Math.max(0, pathDistance - delta));
      const after = getScreenPoint(Math.min(routeLength, pathDistance + delta));
      return Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);
    }

    function getPlaneOpacity() {
      if (isPausedAtEnd) return Math.max(0, 1 - pauseElapsed / fadeDuration);
      return isFadingIn ? Math.min(elapsed / fadeDuration, 1) : 1;
    }

    function renderPlane(screenDistance, angle, opacity) {
      const pathDistance = getPathDistance(screenDistance);
      const point = getScreenPoint(pathDistance);
      planeMarker.style.transform = `translate3d(${point.x - markerOriginX}px, ${point.y - markerOriginY}px, 0)`;
      plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      plane.style.opacity = opacity;
    }

    function rebuildFlightRoute() {
      const previousProgress = legDuration ? Math.min(elapsed / legDuration, 1) : 0;
      routeLength = flightPath.getTotalLength();
      heroBounds = flightHero.getBoundingClientRect();
      routeMatrix = flightPath.getScreenCTM();

      if (!routeLength || !heroBounds.width || !heroBounds.height || !routeMatrix) return;

      markerOriginX = planeMarker.offsetLeft;
      markerOriginY = planeMarker.offsetTop;
      routeSamples = [];
      screenRouteLength = 0;
      let previousPoint = null;

      for (let index = 0; index <= sampleCount; index += 1) {
        const pathDistance = (routeLength * index) / sampleCount;
        const point = getScreenPoint(pathDistance);

        if (previousPoint) {
          screenRouteLength += Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
        }

        routeSamples.push({ pathDistance, screenDistance: screenRouteLength });
        previousPoint = point;
      }

      if (!screenRouteLength) return;

      legDuration = screenRouteLength / speed;
      elapsed = isPausedAtEnd ? legDuration : previousProgress * legDuration;
      const arrivalPoint = getScreenPoint(routeLength);
      arrivalMarker.style.left = `${arrivalPoint.x}px`;
      arrivalMarker.style.top = `${arrivalPoint.y}px`;
    }

    function renderFlightFrame(timestamp) {
      animationFrame = 0;
      if (motionPreference.matches || !isInViewport || document.visibilityState !== "visible") return;

      const frameDelta = previousFrameTime === null
        ? 0
        : Math.min((timestamp - previousFrameTime) / 1000, .1);
      previousFrameTime = timestamp;

      if (isPausedAtEnd) {
        pauseElapsed = Math.min(endpointPause, pauseElapsed + frameDelta);
        if (pauseElapsed >= endpointPause) {
          isPausedAtEnd = false;
          pauseElapsed = 0;
          elapsed = 0;
          isFadingIn = true;
        }
      } else {
        elapsed = Math.min(legDuration, elapsed + frameDelta);
        if (elapsed >= legDuration) {
          isPausedAtEnd = true;
          pauseElapsed = 0;
        }
      }

      if (isFadingIn && elapsed >= fadeDuration) isFadingIn = false;
      const distance = isPausedAtEnd ? screenRouteLength : elapsed * speed;
      renderPlane(distance, getHeading(getPathDistance(distance)), getPlaneOpacity());
      if (isPausedAtEnd || elapsed < legDuration) {
        animationFrame = window.requestAnimationFrame(renderFlightFrame);
      }
    }

    function syncFlightAnimation() {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      previousFrameTime = null;

      if (motionPreference.matches) {
        if (screenRouteLength) {
          const distance = isPausedAtEnd ? screenRouteLength : Math.min(screenRouteLength, elapsed * speed);
          renderPlane(distance, getHeading(getPathDistance(distance)), getPlaneOpacity());
        }
        return;
      }

      if (isInViewport && document.visibilityState === "visible" && legDuration) {
        animationFrame = window.requestAnimationFrame(renderFlightFrame);
      }
    }

    rebuildFlightRoute();
    syncFlightAnimation();

    if ("ResizeObserver" in window) {
      const flightResizeObserver = new ResizeObserver(() => {
        rebuildFlightRoute();
        syncFlightAnimation();
      });
      flightResizeObserver.observe(flightHero);
    } else {
      window.addEventListener("resize", () => {
        rebuildFlightRoute();
        syncFlightAnimation();
      });
    }

    if ("IntersectionObserver" in window) {
      const flightVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isInViewport = entry.isIntersecting;
          syncFlightAnimation();
        });
      });
      flightVisibilityObserver.observe(flightHero);
    }

    document.addEventListener("visibilitychange", syncFlightAnimation);
    if (typeof motionPreference.addEventListener === "function") {
      motionPreference.addEventListener("change", syncFlightAnimation);
    } else {
      motionPreference.addListener(syncFlightAnimation);
    }
  }

  const travelSearch = document.querySelector("#travel-search");
  if (travelSearch) {
    travelSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(travelSearch);
      const destination = data.get("destination").trim();
      const date = data.get("date");
      const travelers = data.get("travelers");
      const message = [
        "Olá, CVC PB – Sousa! Gostaria de consultar uma viagem.",
        destination ? `Destino de interesse: ${destination}.` : "",
        date ? `Data desejada: ${date}.` : "",
        travelers ? `Viajantes: ${travelers}.` : "",
        "Poderiam me informar as possibilidades?"
      ].filter(Boolean).join(" ");

      window.open(`https://wa.me/5583991724057?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    });
  }

  const revealTargets = [...document.querySelectorAll(".home-destination-card, .home-planning, .home-about")];
  if ("IntersectionObserver" in window) {
    document.body.classList.add("home-reveal-enabled");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => {
      element.classList.add("home-reveal");
      observer.observe(element);
    });
  }
}

if (page === "promocoes") {
  const promotionForm = document.querySelector("#promotion-consultation-form");

  if (promotionForm) {
    promotionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!promotionForm.reportValidity()) return;

      const data = new FormData(promotionForm);
      const destination = data.get("destination").trim();
      const choices = [
        "Olá, CVC PB – Sousa! Gostaria de consultar uma oportunidade de viagem.",
        destination ? `Destino: ${destination}` : "",
        `Interesse: ${data.get("interest")}`,
        `Período: ${data.get("period")}`
      ].filter(Boolean);

      window.location.assign(`https://wa.me/5583991724057?text=${encodeURIComponent(choices.join("\n"))}`);
    });
  }

  const flightHero = document.querySelector(".promotion-hero");
  const flightPath = document.querySelector("#promotion-flight-route");
  const plane = document.querySelector(".promotion-hero__aircraft");

  if (flightHero && flightPath && plane) {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speed = 48;
    const sampleCount = 160;
    let routeLength = 0;
    let screenRouteLength = 0;
    let routeSamples = [];
    let routeMatrix = null;
    let heroBounds = null;
    let planeOriginX = 0;
    let planeOriginY = 0;
    let flightDuration = 0;
    let elapsed = 0;
    let previousFrameTime = null;
    let animationFrame = 0;
    let isInViewport = true;

    function getScreenPoint(pathDistance) {
      const pathPoint = flightPath.getPointAtLength(pathDistance);
      const svgPoint = flightPath.ownerSVGElement.createSVGPoint();
      svgPoint.x = pathPoint.x;
      svgPoint.y = pathPoint.y;
      const screenPoint = svgPoint.matrixTransform(routeMatrix);
      return {
        x: screenPoint.x - heroBounds.left,
        y: screenPoint.y - heroBounds.top
      };
    }

    function getPathDistance(screenDistance) {
      let low = 0;
      let high = routeSamples.length - 1;
      const target = Math.max(0, Math.min(screenRouteLength, screenDistance));

      while (high - low > 1) {
        const middle = Math.floor((low + high) / 2);
        if (routeSamples[middle].screenDistance < target) low = middle;
        else high = middle;
      }

      const start = routeSamples[low];
      const end = routeSamples[high];
      const segmentLength = end.screenDistance - start.screenDistance;
      const progress = segmentLength
        ? (target - start.screenDistance) / segmentLength
        : 0;
      return start.pathDistance + (end.pathDistance - start.pathDistance) * progress;
    }

    function renderPlane(screenDistance) {
      const pathDistance = getPathDistance(screenDistance);
      const point = getScreenPoint(pathDistance);
      const before = getScreenPoint(Math.max(0, pathDistance - 4));
      const after = getScreenPoint(Math.min(routeLength, pathDistance + 4));
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);
      plane.style.transform = `translate3d(${point.x - planeOriginX}px, ${point.y - planeOriginY}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
    }

    function rebuildFlightRoute() {
      const previousProgress = flightDuration ? Math.min(elapsed / flightDuration, 1) : 0;
      routeLength = flightPath.getTotalLength();
      heroBounds = flightHero.getBoundingClientRect();
      routeMatrix = flightPath.getScreenCTM();

      if (!routeLength || !heroBounds.width || !heroBounds.height || !routeMatrix) return;

      planeOriginX = plane.offsetLeft;
      planeOriginY = plane.offsetTop;
      routeSamples = [];
      screenRouteLength = 0;
      let previousPoint = null;

      for (let index = 0; index <= sampleCount; index += 1) {
        const pathDistance = (routeLength * index) / sampleCount;
        const point = getScreenPoint(pathDistance);

        if (previousPoint) {
          screenRouteLength += Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
        }

        routeSamples.push({ pathDistance, screenDistance: screenRouteLength });
        previousPoint = point;
      }

      if (!screenRouteLength) return;

      flightDuration = screenRouteLength / speed;
      elapsed = previousProgress * flightDuration;
    }

    function renderFlightFrame(timestamp) {
      animationFrame = 0;
      if (motionPreference.matches || !isInViewport || document.visibilityState !== "visible") return;

      const frameDelta = previousFrameTime === null
        ? 0
        : Math.min((timestamp - previousFrameTime) / 1000, .1);
      previousFrameTime = timestamp;
      elapsed = Math.min(flightDuration, elapsed + frameDelta);
      renderPlane(elapsed * speed);
      if (elapsed < flightDuration) animationFrame = window.requestAnimationFrame(renderFlightFrame);
    }

    function syncFlightAnimation() {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      previousFrameTime = null;

      if (motionPreference.matches) {
        if (screenRouteLength) renderPlane(elapsed * speed);
        return;
      }

      if (isInViewport && document.visibilityState === "visible" && flightDuration && elapsed < flightDuration) {
        animationFrame = window.requestAnimationFrame(renderFlightFrame);
      }
    }

    rebuildFlightRoute();
    syncFlightAnimation();

    if ("ResizeObserver" in window) {
      const flightResizeObserver = new ResizeObserver(() => {
        rebuildFlightRoute();
        syncFlightAnimation();
      });
      flightResizeObserver.observe(flightHero);
    } else {
      window.addEventListener("resize", () => {
        rebuildFlightRoute();
        syncFlightAnimation();
      });
    }

    if ("IntersectionObserver" in window) {
      const flightVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isInViewport = entry.isIntersecting;
          syncFlightAnimation();
        });
      });
      flightVisibilityObserver.observe(flightHero);
    }

    document.addEventListener("visibilitychange", syncFlightAnimation);
    if (typeof motionPreference.addEventListener === "function") {
      motionPreference.addEventListener("change", syncFlightAnimation);
    } else {
      motionPreference.addListener(syncFlightAnimation);
    }
  }
}

const revealElements = [...document.querySelectorAll("[data-reveal]")];
if (revealElements.length && "IntersectionObserver" in window) {
  document.body.classList.add("scroll-reveal-enabled");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

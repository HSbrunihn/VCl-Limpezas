// ============================================================
// 1) CONFIGURAÇÕES — só mexa aqui para trocar dados
// ============================================================

// Número com DDI (55) + DDD (48) + número, sem espaços ou símbolos
const WHATSAPP_NUMBER = "5548999402268";

// Lista de serviços. Os preços abaixo são EXEMPLOS: troque pelos reais.
// "badge" é opcional: use para destacar um serviço (ou apague a linha).
const services = [
  {
    icon: "🏠",
    name: "Limpeza Residencial",
    description: "Limpeza completa de casas e apartamentos, com atenção a cada detalhe.",
    price: "R$ 150,00",
    badge: "Destaque",
  },
  {
    icon: "🧱",
    name: "Limpeza Pós-Obra",
    description: "Remoção de poeira fina, resíduos de tinta e massa para deixar tudo pronto.",
    price: "R$ 300,00",
  },
  {
    icon: "🛋️",
    name: "Higienização de Estofados",
    description: "Sofás, colchões e poltronas higienizados com produtos de qualidade.",
    price: "R$ 180,00",
  },
  {
    icon: "🪟",
    name: "Limpeza de Vidros",
    description: "Vidros e janelas sem manchas, com acabamento brilhante.",
    price: "R$ 120,00",
  },
  {
    icon: "🏢",
    name: "Limpeza Comercial",
    description: "Escritórios e lojas limpos para receber bem seus clientes.",
    price: "R$ 250,00",
  },
  {
    icon: "📦",
    name: "Limpeza Pré-Mudança",
    description: "Imóvel limpo e organizado para entrega ou para a sua chegada.",
    price: "R$ 200,00",
  },
];

// ============================================================
// 2) FUNÇÃO QUE MONTA O LINK DO WHATSAPP
// ============================================================

function buildWhatsAppLink(message) {
  // encodeURIComponent converte espaços, acentos e símbolos
  // para um formato seguro de URL
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ============================================================
// 3) FUNÇÃO QUE CRIA OS CARDS DE SERVIÇO
// ============================================================

function renderServices() {
  const grid = document.getElementById("servicos-grid");

  services.forEach((service, index) => {
    // A mensagem muda conforme o serviço do card
    const message = `Olá! Gostaria de solicitar um orçamento de ${service.name}.`;

    const card = document.createElement("article");
    card.className = "card reveal";

    // atraso escalonado: cada card aparece um pouco depois do anterior
    card.style.transitionDelay = `${(index % 3) * 120}ms`;

    // o selo só aparece se o serviço tiver "badge"
    const badge = service.badge
      ? `<span class="card__badge">${service.badge}</span>`
      : "";

    card.innerHTML = `
      ${badge}
      <span class="card__icon">${service.icon}</span>
      <h3 class="card__title">${service.name}</h3>
      <p class="card__desc">${service.description}</p>
      <p class="card__price">
        A partir de
        <strong>${service.price}</strong>
      </p>
      <a class="card__btn" href="${buildWhatsAppLink(message)}" target="_blank" rel="noopener">
        <svg class="icon"><use href="#i-whatsapp" /></svg>
        Solicitar orçamento
        <svg class="icon"><use href="#i-arrow" /></svg>
      </a>
    `;

    grid.appendChild(card);
  });
}

// ============================================================
// 4) LINKS GENÉRICOS (hero, botão final e botão flutuante)
// ============================================================

function setupGenericLinks() {
  const genericMessage = "Olá! Gostaria de solicitar um orçamento.";
  const link = buildWhatsAppLink(genericMessage);

  document.getElementById("hero-whatsapp").href = link;
  document.getElementById("cta-whatsapp").href = link;
  document.getElementById("float-whatsapp").href = link;
}

// ============================================================
// 5) EFEITO "APARECER AO ROLAR"
// ============================================================

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15 } // dispara quando 15% do elemento aparece
  );

  items.forEach((item) => observer.observe(item));
}

// ============================================================
// 6) CABEÇALHO GANHA SOMBRA AO ROLAR
// ============================================================

function setupHeaderShadow() {
  const header = document.getElementById("header");

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// ============================================================
// 7) INICIALIZAÇÃO
// ============================================================

renderServices();   // primeiro cria os cards...
setupGenericLinks();
setupReveal();      // ...depois observa (os cards já precisam existir)
setupHeaderShadow();
document.getElementById("ano").textContent = new Date().getFullYear();
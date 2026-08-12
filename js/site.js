/**
 * Dados operacionais da loja (NAP + canais).
 * Troque estes valores pelos reais antes de produção definitiva.
 * Usa `var` para ficar acessível a `data.js` / `app.js` no escopo global.
 */
var SITE = {
  name: "Super Car",
  tagline:
    "Seminovos premium com curadoria, certificação e financiamento ágil em São Paulo.",
  url: "https://jorgeramalho.github.io/Supercar/",
  image:
    "https://jorgeramalho.github.io/Supercar/assets/images/catalog/audi-tts-2023.webp",
  phoneDisplay: "(11) 4002-0300",
  phoneTel: "+551140020300",
  whatsappDisplay: "(11) 99999-0000",
  whatsappE164: "5511999990000",
  emailPrivacy: "privacidade@supercar.exemplo",
  addressLine1: "Av. das Nações, 1200 — Moema",
  addressLine2: "São Paulo, SP",
  streetAddress: "Av. das Nações, 1200",
  addressLocality: "São Paulo",
  addressRegion: "SP",
  addressCountry: "BR",
  hoursWeekday: "Seg–Sex: 9h às 19h",
  hoursSaturday: "Sáb: 9h às 14h",
  /** true = mostra aviso de dados demo no contato */
  demoNotice: true,
  /**
   * Opcional: endpoint Formspree/Getform (POST).
   * Se preenchido, o formulário envia JSON além de abrir o WhatsApp.
   */
  formEndpoint: "",
  /** Opcional: ID Plausible/Umami — deixe vazio para desligar */
  analyticsId: "",
};

// Gerador estático: sem dependências. Saída em /site (pronta para a Vercel).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, NAV, IMG, TEAM, SPECIALTIES, PRINCIPLES, AMBIENTES, GENERAL_FAQ } from './data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'site');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- helpers ----------
const half = (w) => Math.round(w / 2);
function img(key, base, { cls = '', sizes = '100vw', eager = false, alt } = {}) {
  const d = IMG[key];
  if (!d) throw new Error('imagem desconhecida: ' + key);
  const p = `${base}assets/img/${key}`;
  return `<img class="${cls}" src="${p}-${d.w}.webp" srcset="${p}-${half(d.w)}.webp ${half(d.w)}w, ${p}-${d.w}.webp ${d.w}w" sizes="${sizes}" width="${d.w}" height="${d.h}" alt="${esc(alt ?? d.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
}
const wa = (text = '') => `https://wa.me/${SITE.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;

const logo = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 24 A15 15 0 0 0 34 24" fill="currentColor" opacity=".9"/><circle cx="20" cy="15" r="3.4" fill="currentColor"/></svg>`;
const arrow = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const waIcon = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.6 8.4c.3 2.7 2.9 5.3 6 6.2l1.3-1.3-1.9-1-.9.7c-.9-.4-1.8-1.3-2.2-2.2l.7-.9-1-1.9Z" fill="currentColor"/></svg>`;

function btn(label, href, { kind = 'primary', icon = arrow, external = false, extra = '' } = {}) {
  return `<a class="btn btn-${kind}" data-press ${kind === 'primary' ? 'data-magnet' : ''} href="${href}" ${external ? 'target="_blank" rel="noopener"' : ''} ${extra}><span>${label}</span>${icon}</a>`;
}

function faqBlock(items, id = 'faq') {
  return `<div class="faq" id="${id}">${items
    .map(
      ([q, a], i) => `<div class="faq-item">
  <h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="${id}-a${i}" id="${id}-q${i}"><span>${esc(q)}</span><span class="faq-plus" aria-hidden="true"></span></button></h3>
  <div class="faq-a" id="${id}-a${i}" role="region" aria-labelledby="${id}-q${i}"><div><p>${esc(a)}</p></div></div>
</div>`
    )
    .join('')}</div>`;
}

// ---------- layout ----------
function layout({ base, file, title, description, body, current, ogImage = 'assets/img/og.jpg', hideDock = false }) {
  const fullTitle = file === '' ? `${SITE.name} · Odontologia sem pressa` : `${title} · ${SITE.name}`;
  const url = `${SITE.url}/${file}`;
  const nav = NAV.map(
    (n) => `<a href="${base}${n.href}" ${current === n.href ? 'aria-current="page"' : ''}>${n.label}</a>`
  ).join('');
  const menuLinks = [{ href: '', label: 'Início' }, ...NAV]
    .map((n, i) => `<a style="--i:${i}" href="${base}${n.href}" ${current === n.href ? 'aria-current="page"' : ''}><span>${n.label}</span></a>`)
    .join('');
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${SITE.demo ? '<meta name="robots" content="noindex, nofollow">' : ''}
<meta name="theme-color" content="#F4EEE3">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#586140"/><circle cx="20" cy="15" r="5" fill="#F4EEE3"/><path d="M8 25a12 12 0 0 0 24 0z" fill="#F4EEE3"/></svg>')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..500&family=Instrument+Sans:wght@400..600&display=swap">
<link rel="stylesheet" href="${base}assets/style.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#conteudo">Ir para o conteúdo</a>
<header class="site-header" id="top">
  <div class="header-bar glass">
    <a class="brand" href="${base}" aria-label="${SITE.name}, página inicial">${logo}<span class="brand-name">Orbe</span></a>
    <nav class="nav" aria-label="Principal">${nav}</nav>
    <a class="btn btn-sm btn-primary header-cta" data-press href="${base}contato/"><span>Agendar</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu" data-press><span></span><span></span></button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="Menu móvel">${menuLinks}</nav>
  <div class="menu-foot"><p>${SITE.address[0]}<br>${SITE.address[1]}</p>${btn('Falar no WhatsApp', wa('Olá! Gostaria de saber mais sobre a clínica.'), { kind: 'glass', icon: waIcon, external: true })}</div>
</div>
<main id="conteudo">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${base}">${logo}<span class="brand-name">Orbe</span></a>
      <p>Clínica odontológica com atendimento sem pressa.</p>
    </div>
    <div>
      <h2 class="eyebrow">Navegar</h2>
      <ul>${[{ href: '', label: 'Início' }, ...NAV].map((n) => `<li><a href="${base}${n.href}">${n.label}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="eyebrow">Especialidades</h2>
      <ul>${SPECIALTIES.map((s) => `<li><a href="${base}especialidades/${s.slug}/">${s.name}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="eyebrow">Contato</h2>
      <address>${SITE.address.join('<br>')}<br><a href="${wa()}" target="_blank" rel="noopener">${SITE.phoneDisplay}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></address>
    </div>
  </div>
  <div class="wrap footer-end">
    <p>© ${new Date().getFullYear()} ${SITE.name}. ${SITE.demo ? 'Projeto demonstrativo da <strong>VT Sites</strong>: a clínica, a equipe, os endereços e os contatos são fictícios.' : ''}</p>
  </div>
</footer>
${hideDock ? '' : `<div class="dock glass" role="region" aria-label="Ações rápidas"><a class="btn btn-primary btn-sm" data-press href="${base}contato/"><span>Agendar avaliação</span></a><a class="btn btn-glass btn-sm btn-icon" data-press href="${wa('Olá! Gostaria de agendar uma avaliação.')}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${waIcon}</a></div>`}
<dialog class="lightbox" id="lightbox" aria-label="Imagem ampliada"><form method="dialog"><button class="lb-close btn btn-glass btn-sm" data-press aria-label="Fechar">Fechar</button></form><img alt=""><p class="lb-cap"></p></dialog>
<script src="${base}assets/app.js" defer></script>
</body>
</html>`;
}

const pages = [];
function addPage(file, opts) {
  const depth = file ? file.split('/').filter(Boolean).length : 0;
  const base = depth === 0 ? './' : '../'.repeat(depth);
  pages.push({ file, html: layout({ base, file, ...opts(base) }) });
}

const pageHead = (eyebrow, h1, lead) => `<section class="page-head wrap">
  <p class="eyebrow rv">${eyebrow}</p>
  <h1 class="rv">${h1}</h1>
  ${lead ? `<p class="lead rv">${lead}</p>` : ''}
</section>`;

// ---------- INÍCIO ----------
addPage('', (base) => ({
  title: '',
  description: SITE.description,
  current: '',
  body: `
<section class="hero wrap">
  <div class="hero-copy">
    <p class="eyebrow rv">Odontologia · Clínica Orbe</p>
    <h1 class="rv">Odontologia em um espaço calmo, com tempo para conversar.</h1>
    <p class="lead rv">Ortodontia, implantes, estética, clareamento, endodontia e clínica geral, reunidos em um só lugar e conduzidos por um plano que você entende.</p>
    <div class="hero-actions rv">${btn('Marcar uma avaliação', base + 'contato/')}${btn('Conhecer a clínica', base + 'a-clinica/', { kind: 'ghost' })}</div>
  </div>
  <div class="hero-art rv">
    <div class="arch-frame">${img('hero', base, { eager: true, sizes: '(min-width: 900px) 40vw, 90vw' })}</div>
    <button class="orb" type="button" data-orb aria-label="Esfera decorativa. Arraste e solte para vê-la voltar" tabindex="-1"></button>
    <div class="hero-chip glass"><span class="dot"></span> Atendimento com hora marcada</div>
  </div>
</section>

<section class="manifesto wrap">
  <p class="manifesto-text rv">Uma clínica <span class="pill-img">${img('materiais', base, { sizes: '160px' })}</span> desenhada com materiais naturais, <em>pouca pressa</em> e a convicção de que explicar bem faz parte do tratamento.</p>
  <p class="manifesto-side rv">Aqui, a arquitetura, a agenda e o atendimento seguem a mesma lógica: reduzir o ruído para que você possa decidir com tranquilidade.</p>
</section>

<section class="spec-index wrap" aria-labelledby="esp-h">
  <div class="spec-head">
    <p class="eyebrow rv">Especialidades</p>
    <h2 id="esp-h" class="rv">Seis áreas, um mesmo plano de cuidado.</h2>
    <a class="link-arrow rv" href="${base}especialidades/">Ver todas${arrow}</a>
  </div>
  <ol class="spec-list" data-preview>
    ${SPECIALTIES.map(
      (s) => `<li class="rv"><a href="${base}especialidades/${s.slug}/" data-img="${base}assets/img/${s.img}-${half(IMG[s.img].w)}.webp"><span class="spec-num">${s.num}</span><span class="spec-name">${s.name}</span><span class="spec-short">${s.short}</span>${arrow}</a></li>`
    ).join('')}
  </ol>
  <div class="spec-preview" aria-hidden="true"><img alt="" width="360" height="260"></div>
</section>

<section class="ambiente">
  <div class="wrap amb-grid">
    <figure class="amb-a rv" data-lightbox>${img('recepcao', base, { sizes: '(min-width: 900px) 60vw, 100vw' })}<figcaption>Recepção</figcaption></figure>
    <figure class="amb-b rv" data-lightbox>${img('corredor', base, { sizes: '(min-width: 900px) 24vw, 60vw' })}<figcaption>Corredor</figcaption></figure>
    <div class="amb-text rv">
      <p class="eyebrow">O ambiente</p>
      <h2>Madeira, reboco e luz natural.</h2>
      <p>O projeto da clínica parte de poucos materiais e de curvas suaves. A ideia é que o espaço desacelere quem chega, e não que anuncie tecnologia.</p>
      <a class="link-arrow" href="${base}a-clinica/#ambientes">Ver os ambientes${arrow}</a>
    </div>
    <figure class="amb-c rv" data-lightbox>${img('detalhe', base, { sizes: '(min-width: 900px) 26vw, 70vw' })}<figcaption>Detalhe da parede curva</figcaption></figure>
  </div>
</section>

<section class="philosophy wrap" aria-labelledby="fil-h">
  <div class="phil-sticky">
    <p class="eyebrow rv">Filosofia de atendimento</p>
    <h2 id="fil-h" class="rv">Explicar antes de tratar.</h2>
    <p class="rv">Quatro princípios organizam como a equipe trabalha.</p>
  </div>
  <div class="phil-list">
    ${PRINCIPLES.map(([t, d], i) => `<article class="rv"><span class="phil-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
  </div>
</section>

<section class="team-teaser wrap" aria-labelledby="eq-h">
  <div class="tt-photos">
    <figure class="rv">${img('equipe-helena', base, { sizes: '(min-width: 900px) 24vw, 45vw' })}</figure>
    <figure class="rv">${img('equipe-marina', base, { sizes: '(min-width: 900px) 24vw, 45vw' })}</figure>
  </div>
  <div class="tt-text">
    <p class="eyebrow rv">Equipe</p>
    <h2 id="eq-h" class="rv">Profissionais que se falam entre si.</h2>
    <p class="rv">Cada especialista conhece o plano completo do paciente. Quando um caso passa por duas áreas, a conversa acontece antes, e não depois.</p>
    <p class="demo-note rv">Perfis demonstrativos, com retratos ilustrados.</p>
    <a class="link-arrow rv" href="${base}equipe/">Conhecer a equipe${arrow}</a>
  </div>
</section>

<section class="cta-band">
  <div class="cta-bg">${img('entrada', base, { sizes: '100vw' })}</div>
  <div class="cta-card glass-dark wrap-narrow rv">
    <h2>Quer conversar antes de decidir?</h2>
    <p>Envie uma mensagem com a especialidade de interesse. A equipe responde para combinar o melhor horário.</p>
    <div class="hero-actions">${btn('Preparar mensagem', base + 'contato/')}${btn('WhatsApp', wa('Olá! Gostaria de agendar uma avaliação.'), { kind: 'glass', icon: waIcon, external: true })}</div>
  </div>
</section>`,
}));

// ---------- A CLÍNICA ----------
addPage('a-clinica/', (base) => ({
  title: 'A clínica',
  description: 'Conheça a filosofia de atendimento e os ambientes da Clínica Orbe.',
  current: 'a-clinica/',
  body: `
${pageHead('A clínica', 'Um consultório que parece uma casa bem projetada.', 'A Orbe nasceu da ideia de que ir ao dentista pode ser menos tenso quando o espaço e o tempo de consulta são pensados com cuidado.')}
<section class="story wrap">
  <figure class="story-img rv" data-lightbox>${img('espera', base, { sizes: '(min-width: 900px) 55vw, 100vw' })}<figcaption>Sala de espera</figcaption></figure>
  <div class="story-text">
    <p class="rv">O nome vem da forma que se repete no projeto: o círculo. Aparece nas luminárias, nos arcos, na logomarca e na maneira de trabalhar, com um plano que fecha o ciclo entre avaliação, tratamento e manutenção.</p>
    <p class="rv">A equipe é pequena de propósito. Isso permite que os profissionais conheçam cada paciente e conversem entre si sobre cada caso, sem que informações se percam pelo caminho.</p>
    <p class="demo-note rv">Texto institucional demonstrativo.</p>
  </div>
</section>

<section class="values wrap" aria-labelledby="v-h">
  <h2 id="v-h" class="rv">Como trabalhamos</h2>
  <dl class="values-list">
    ${PRINCIPLES.map(([t, d]) => `<div class="rv"><dt>${t}</dt><dd>${d}</dd></div>`).join('')}
  </dl>
</section>

<section class="ambientes wrap" id="ambientes" aria-labelledby="a-h">
  <div class="amb-top"><p class="eyebrow rv">Ambientes</p><h2 id="a-h" class="rv">Três espaços, um mesmo ritmo.</h2></div>
  <div class="seg glass" role="tablist" aria-label="Ambientes" data-seg>
    <span class="seg-thumb" aria-hidden="true"></span>
    ${AMBIENTES.map((a, i) => `<button type="button" role="tab" id="tab-${a.id}" aria-controls="panel-${a.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${a.name}</button>`).join('')}
  </div>
  <div class="amb-panels">
    ${AMBIENTES.map(
      (a, i) => `<div class="amb-panel" role="tabpanel" id="panel-${a.id}" aria-labelledby="tab-${a.id}" ${i === 0 ? '' : 'hidden'}>
      <figure data-lightbox>${img(a.img, base, { sizes: '(min-width: 900px) 62vw, 100vw' })}<figcaption>${a.name}</figcaption></figure>
      <p>${a.text}</p>
    </div>`
    ).join('')}
  </div>
</section>

<section class="gallery wrap" aria-label="Detalhes do projeto">
  <figure class="g1 rv" data-lightbox>${img('materiais', base, { sizes: '(min-width: 900px) 34vw, 100vw' })}<figcaption>Materiais do projeto</figcaption></figure>
  <figure class="g2 rv" data-lightbox>${img('entrada', base, { sizes: '(min-width: 900px) 56vw, 100vw' })}<figcaption>Entrada</figcaption></figure>
  <figure class="g3 rv" data-lightbox>${img('corredor', base, { sizes: '(min-width: 900px) 30vw, 100vw' })}<figcaption>Corredor de arcos</figcaption></figure>
</section>
<section class="inline-cta wrap rv"><h2>Prefere conhecer pessoalmente?</h2>${btn('Combinar uma visita', base + 'contato/')}</section>`,
}));

// ---------- ESPECIALIDADES ----------
addPage('especialidades/', (base) => ({
  title: 'Especialidades',
  description: 'Ortodontia, implantodontia, estética dental, clareamento, endodontia e clínica geral na Clínica Orbe.',
  current: 'especialidades/',
  body: `
${pageHead('Especialidades', 'Seis áreas que conversam entre si.', 'Escolha uma para ver como funciona o acompanhamento, ou comece pela avaliação em clínica geral.')}
<section class="spec-mosaic wrap">
  ${SPECIALTIES.map(
    (s, i) => `<a class="mosaic m${i + 1} rv" data-press-soft href="${base}especialidades/${s.slug}/">
    <span class="mosaic-img">${img(s.img, base, { sizes: '(min-width: 900px) 40vw, 100vw' })}</span>
    <span class="mosaic-body"><span class="spec-num">${s.num}</span><strong>${s.name}</strong><span>${s.short}</span></span>
  </a>`
  ).join('')}
</section>
<section class="inline-cta wrap rv"><h2>Não sabe por onde começar?</h2>${btn('Agendar avaliação', base + 'contato/?esp=clinica-geral')}</section>`,
}));

SPECIALTIES.forEach((s, idx) => {
  const prev = SPECIALTIES[(idx + SPECIALTIES.length - 1) % SPECIALTIES.length];
  const next = SPECIALTIES[(idx + 1) % SPECIALTIES.length];
  addPage(`especialidades/${s.slug}/`, (base) => ({
    title: s.name,
    description: `${s.name} na Clínica Orbe: ${s.lead}`.slice(0, 200),
    current: 'especialidades/',
    ogImage: 'assets/img/og.jpg',
    body: `
<nav class="crumbs wrap" aria-label="Você está em"><a href="${base}">Início</a><span aria-hidden="true">/</span><a href="${base}especialidades/">Especialidades</a><span aria-hidden="true">/</span><span aria-current="page">${s.name}</span></nav>
<section class="spec-hero wrap">
  <div class="sh-copy">
    <p class="eyebrow rv">${s.num} · Especialidade</p>
    <h1 class="rv">${s.name}</h1>
    <p class="lead rv">${s.lead}</p>
    <div class="hero-actions rv">${btn('Agendar avaliação', `${base}contato/?esp=${s.slug}`)}</div>
  </div>
  <figure class="sh-img rv" data-lightbox>${img(s.img, base, { eager: true, sizes: '(min-width: 900px) 50vw, 100vw' })}</figure>
</section>
<section class="spec-body wrap">
  <div class="sb-text">${s.body.map((p) => `<p class="rv">${p}</p>`).join('')}<p class="demo-note rv">Conteúdo informativo e demonstrativo. Não substitui avaliação profissional nem garante resultado.</p></div>
  <aside class="sb-aside rv"><h2>Quando costuma ser indicada</h2><ul>${s.when.map((w) => `<li>${w}</li>`).join('')}</ul></aside>
</section>
<section class="steps wrap" aria-labelledby="st-h">
  <h2 id="st-h" class="rv">Como costuma ser o caminho</h2>
  <ol class="timeline">${s.steps.map(([t, d], i) => `<li class="rv"><span class="tl-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</section>
<section class="ask wrap">
  <div class="ask-card glass-soft rv"><h2>Para levar à primeira consulta</h2><ul>${s.ask.map((a) => `<li>${a}</li>`).join('')}</ul></div>
  <div class="ask-faq"><h2 class="rv">Perguntas frequentes</h2>${faqBlock(s.faq, 'faq')}</div>
</section>
<section class="pn wrap" aria-label="Outras especialidades">
  <a class="pn-link" data-press-soft href="${base}especialidades/${prev.slug}/"><small>Anterior</small><strong>${prev.name}</strong></a>
  <a class="pn-link pn-next" data-press-soft href="${base}especialidades/${next.slug}/"><small>Próxima</small><strong>${next.name}</strong></a>
</section>`,
  }));
});

// ---------- EQUIPE ----------
addPage('equipe/', (base) => ({
  title: 'Equipe',
  description: 'Conheça os profissionais da Clínica Orbe (perfis demonstrativos).',
  current: 'equipe/',
  body: `
${pageHead('Equipe', 'Pessoas que explicam o que fazem.', 'Perfis demonstrativos. Substitua nomes, formações e retratos pelos da equipe real antes de publicar.')}
<section class="team wrap">
  ${TEAM.map(
    (m, i) => `<article class="member m${i + 1} rv">
    <figure data-lightbox>${img(m.img, base, { sizes: '(min-width: 900px) 30vw, 90vw' })}<figcaption>${m.name}, retrato ilustrado demonstrativo</figcaption></figure>
    <div><p class="eyebrow">${m.role}</p><h2>${m.name}</h2><p>${m.bio}</p></div>
  </article>`
  ).join('')}
</section>
<section class="inline-cta wrap rv"><h2>Com quem faz sentido começar?</h2><p>A avaliação inicial em clínica geral define o caminho e os especialistas envolvidos.</p>${btn('Agendar avaliação', base + 'contato/')}</section>`,
}));

// ---------- CONTATO ----------
addPage('contato/', (base) => ({
  title: 'Contato e agendamento',
  description: 'Envie uma solicitação de avaliação para a Clínica Orbe pelo formulário ou pelo WhatsApp.',
  current: 'contato/',
  hideDock: true,
  body: `
${pageHead('Contato e agendamento', 'Conte o que você precisa.', 'O formulário prepara uma mensagem para a clínica. O horário só fica confirmado quando a equipe responder.')}
<section class="contact wrap">
  <div class="contact-info rv">
    <h2>Informações</h2>
    <p class="demo-note">Dados demonstrativos: substitua em <code>src/data.mjs</code>.</p>
    <dl>
      <dt>Endereço</dt><dd>${SITE.address.join('<br>')}</dd>
      <dt>Horário</dt><dd>${SITE.hours.map(([d, h]) => `${d}: ${h}`).join('<br>')}</dd>
      <dt>Telefone e WhatsApp</dt><dd><a href="${wa()}" target="_blank" rel="noopener">${SITE.phoneDisplay}</a></dd>
      <dt>E-mail</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
      <dt>Instagram</dt><dd>${SITE.instagram}</dd>
    </dl>
    ${btn('Abrir WhatsApp', wa('Olá! Gostaria de agendar uma avaliação.'), { kind: 'glass', icon: waIcon, external: true })}
  </div>
  <form class="form glass-soft rv" id="form" novalidate data-wa="${SITE.whatsapp}" data-clinic="${SITE.name}">
    <h2>Solicitar avaliação</h2>
    <fieldset class="field">
      <legend>Especialidade de interesse</legend>
      <div class="chips" role="radiogroup" aria-required="true">
        ${[...SPECIALTIES.map((s) => [s.slug, s.name]), ['nao-sei', 'Ainda não sei']]
          .map(([v, n]) => `<label class="chip" data-press-soft><input type="radio" name="esp" value="${v}" data-label="${n}"><span>${n}</span></label>`)
          .join('')}
      </div>
      <p class="err" id="err-esp" role="alert"></p>
    </fieldset>
    <div class="field"><label for="nome">Nome completo</label><input id="nome" name="nome" type="text" autocomplete="name" required aria-describedby="err-nome"><p class="err" id="err-nome" role="alert"></p></div>
    <div class="field-row">
      <div class="field"><label for="tel">Telefone com DDD</label><input id="tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="(00) 00000-0000" required aria-describedby="err-tel"><p class="err" id="err-tel" role="alert"></p></div>
      <div class="field"><label for="email">E-mail <span class="opt">(opcional)</span></label><input id="email" name="email" type="email" autocomplete="email" aria-describedby="err-email"><p class="err" id="err-email" role="alert"></p></div>
    </div>
    <div class="field"><label for="periodo">Período preferido</label>
      <select id="periodo" name="periodo"><option value="">Sem preferência</option><option>Manhã</option><option>Tarde</option><option>Início da noite</option><option>Sábado de manhã</option></select></div>
    <div class="field"><label for="msg">Mensagem <span class="opt">(opcional)</span></label><textarea id="msg" name="msg" rows="4" placeholder="Se houver dor ou urgência, conte aqui."></textarea></div>
    <div class="field check"><label><input type="checkbox" id="ok" name="ok" required aria-describedby="err-ok"><span>Concordo em enviar estes dados à clínica por WhatsApp para contato sobre a avaliação.</span></label><p class="err" id="err-ok" role="alert"></p></div>
    <button class="btn btn-primary" type="submit" data-press data-magnet><span>Preparar mensagem</span>${arrow}</button>
    <p class="fine">Nada é enviado por este site. Ao confirmar, abrimos o WhatsApp com a mensagem pronta para você revisar.</p>
    <div class="result" id="result" role="status" tabindex="-1" hidden>
      <h3>Mensagem pronta</h3>
      <p>Isto ainda <strong>não é um agendamento</strong>. A equipe confirma o horário respondendo no WhatsApp.</p>
      <pre id="preview"></pre>
      <div class="hero-actions"><a class="btn btn-primary" id="wa-link" data-press target="_blank" rel="noopener" href="#"><span>Abrir no WhatsApp</span>${waIcon}</a><button class="btn btn-glass" type="button" id="copy" data-press><span>Copiar texto</span></button></div>
    </div>
  </form>
</section>
<section class="wrap contact-faq" aria-labelledby="cf-h"><h2 id="cf-h" class="rv">Antes de escrever</h2>${faqBlock(GENERAL_FAQ, 'gfaq')}</section>`,
}));

// ---------- 404 ----------
const nf = layout({
  base: '/', file: '404.html', title: 'Página não encontrada', description: 'Página não encontrada.', current: '', hideDock: true,
  body: `<section class="page-head wrap nf"><p class="eyebrow">Erro 404</p><h1>Essa página não existe.</h1><p class="lead">O endereço pode ter mudado. Volte ao início ou escolha uma das seções.</p><div class="hero-actions"><a class="btn btn-primary" data-press href="/"><span>Início</span></a><a class="btn btn-glass" data-press href="/especialidades/"><span>Especialidades</span></a></div></section>`,
});

// ---------- escrita ----------
fs.mkdirSync(OUT, { recursive: true });
for (const f of ['style.css', 'app.js']) {
  fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'src', 'assets', f), path.join(OUT, 'assets', f));
}
for (const p of pages) {
  const dir = path.join(OUT, p.file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), p.html);
}
fs.writeFileSync(path.join(OUT, '404.html'), nf);
fs.writeFileSync(path.join(OUT, 'robots.txt'), SITE.demo ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE.url}/${p.file}</loc></url>`).join('\n')}\n</urlset>\n`
);
console.log(`ok: ${pages.length} páginas + 404`);

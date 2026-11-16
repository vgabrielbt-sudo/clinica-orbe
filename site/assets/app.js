/* Clínica Orbe · interações. Sem dependências: molas próprias (spring physics). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- mola: anima uma variável CSS numérica com rigidez/amortecimento ---- */
  function springVar(el, name, { k = 320, c = 20, unit = '', init = 0 } = {}) {
    let x = init, v = 0, target = init, raf = 0, last = 0;
    const write = () => el.style.setProperty(name, x.toFixed(4) + unit);
    function step(now) {
      let dt = Math.min((now - last) / 1000, 1 / 30); last = now;
      const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
      for (let i = 0; i < n; i++) { v += (-k * (x - target) - c * v) * h; x += v * h; }
      write();
      if (Math.abs(v) < 0.01 && Math.abs(x - target) < 0.002) { x = target; write(); raf = 0; return; }
      raf = requestAnimationFrame(step);
    }
    return {
      set(t, vel) {
        target = t; if (vel !== undefined) v = vel;
        if (reduce) { x = t; write(); return; }
        if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
      },
      jump(t) { x = target = t; v = 0; write(); },
      get: () => x,
    };
  }

  /* ---- revelação ao rolar ---- */
  const rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach((el, i) => { el.style.setProperty('--d', ((i % 3) * 70) + 'ms'); io.observe(el); });
  } else rv.forEach((el) => el.classList.add('in'));

  /* ---- header e dock ---- */
  const header = $('.site-header'), dock = $('.dock'), footer = $('.site-footer');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (dock) {
      dock.classList.toggle('show', y > 520);
      const nearFooter = footer && footer.getBoundingClientRect().top < innerHeight - 40;
      dock.classList.toggle('hide-near-footer', nearFooter);
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- menu móvel ---- */
  const toggle = $('.menu-toggle'), menu = $('#menu');
  if (toggle && menu) {
    const focusables = () => $$('a, button', menu).filter((e) => !e.disabled);
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', open);
      if (open) {
        menu.hidden = false; void menu.offsetWidth; menu.classList.add('open');
        setTimeout(() => focusables()[0]?.focus({ preventScroll: true }), 250);
      } else {
        menu.classList.remove('open');
        setTimeout(() => { if (!menu.classList.contains('open')) menu.hidden = true; }, reduce ? 0 : 800);
        toggle.focus({ preventScroll: true });
      }
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    addEventListener('keydown', (e) => {
      if (menu.hidden) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const f = [toggle, ...focusables()], i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches && !menu.hidden) { menu.classList.remove('open'); menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); } });
  }

  /* ---- compressão elástica ao pressionar ---- */
  $$('[data-press], [data-press-soft]').forEach((el) => {
    const s = springVar(el, '--press', { k: 520, c: 17, init: 1 });
    const soft = el.hasAttribute('data-press-soft');
    const down = soft ? 0.975 : 0.93;
    el.addEventListener('pointerdown', () => s.set(down, 0));
    ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((ev) => el.addEventListener(ev, () => s.set(1)));
  });

  /* ---- atração magnética nos botões primários (só com mouse) ---- */
  if (fine && !reduce) {
    $$('[data-magnet]').forEach((el) => {
      const sx = springVar(el, '--tx', { k: 180, c: 14, unit: 'px' }), sy = springVar(el, '--ty', { k: 180, c: 14, unit: 'px' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        sx.set((e.clientX - (r.left + r.width / 2)) * 0.18); sy.set((e.clientY - (r.top + r.height / 2)) * 0.28);
      });
      el.addEventListener('pointerleave', () => { sx.set(0); sy.set(0); });
    });
  }

  /* ---- brilho que acompanha o ponteiro no vidro ---- */
  if (fine) $$('.glass').forEach((el) => el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* ---- esfera arrastável com resistência e retorno ---- */
  const orb = $('[data-orb]');
  if (orb) {
    const sx = springVar(orb, '--dx', { k: 90, c: 7, unit: 'px' }), sy = springVar(orb, '--dy', { k: 90, c: 7, unit: 'px' });
    const LIMIT = 90, rubber = (d) => LIMIT * Math.tanh(d / LIMIT);
    let sxp = 0, syp = 0, dragging = false, ox = 0, oy = 0, hist = [];
    orb.addEventListener('pointerdown', (e) => { dragging = true; orb.setPointerCapture(e.pointerId); sxp = e.clientX; syp = e.clientY; hist = []; });
    orb.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      ox = rubber(e.clientX - sxp); oy = rubber(e.clientY - syp);
      sx.jump(ox); sy.jump(oy);
      hist.push([performance.now(), ox, oy]); if (hist.length > 5) hist.shift();
    });
    const end = () => {
      if (!dragging) return; dragging = false;
      let vx = 0, vy = 0;
      if (hist.length > 1) { const a = hist[0], b = hist[hist.length - 1], dt = (b[0] - a[0]) / 1000 || 1; vx = (b[1] - a[1]) / dt; vy = (b[2] - a[2]) / dt; }
      sx.set(0, vx); sy.set(0, vy);
    };
    orb.addEventListener('pointerup', end); orb.addEventListener('pointercancel', end);
  }

  /* ---- prévia flutuante da lista de especialidades ---- */
  const list = $('[data-preview]'), prev = $('.spec-preview');
  if (list && prev && fine) {
    const pimg = $('img', prev);
    const px = springVar(prev, '--px', { k: 120, c: 16, unit: 'px' }), py = springVar(prev, '--py', { k: 120, c: 16, unit: 'px' }), pr = springVar(prev, '--pr', { k: 140, c: 14, unit: 'deg' });
    let lastX = 0;
    list.addEventListener('pointermove', (e) => {
      px.set(e.clientX + 24); py.set(e.clientY - 110); pr.set(Math.max(-8, Math.min(8, (e.clientX - lastX) * 0.6))); lastX = e.clientX;
    });
    $$('a', list).forEach((a) => {
      a.addEventListener('pointerenter', (e) => { pimg.src = a.dataset.img; px.jump(e.clientX + 24); py.jump(e.clientY - 110); prev.classList.add('on'); });
      a.addEventListener('pointerleave', () => prev.classList.remove('on'));
    });
  }

  /* ---- FAQ ---- */
  $$('.faq-q').forEach((b) => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', !open);
    b.closest('.faq-item').classList.toggle('open', !open);
  }));

  /* ---- abas de ambientes com indicador de mola ---- */
  const seg = $('[data-seg]');
  if (seg) {
    const thumb = $('.seg-thumb', seg), tabs = $$('[role=tab]', seg);
    const sx = springVar(seg, '--sx', { k: 260, c: 20, unit: 'px', init: 4 }), sw = springVar(seg, '--sw', { k: 260, c: 22, unit: 'px', init: 100 });
    const place = (t, instant) => { const x = t.offsetLeft, w = t.offsetWidth; if (instant) { sx.jump(x); sw.jump(w); } else { sx.set(x); sw.set(w); } };
    const select = (t, focus) => {
      tabs.forEach((b) => { const on = b === t; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; $('#' + b.getAttribute('aria-controls')).hidden = !on; });
      place(t); if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); } if (e.key === 'End') { e.preventDefault(); select(tabs.at(-1), true); }
      });
    });
    const init = () => place(tabs.find((t) => t.getAttribute('aria-selected') === 'true'), true);
    init(); document.fonts?.ready.then(init); addEventListener('resize', init);
  }

  /* ---- lightbox ---- */
  const lb = $('#lightbox');
  if (lb && lb.showModal) {
    const lbImg = $('img', lb), lbCap = $('.lb-cap', lb);
    $$('[data-lightbox]').forEach((f) => {
      f.tabIndex = 0; f.setAttribute('role', 'button'); f.setAttribute('aria-label', 'Ampliar imagem');
      const open = () => {
        const i = $('img', f), set = i.srcset.split(',').map((s) => s.trim().split(' ')).sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
        lbImg.src = set[0][0]; lbImg.alt = i.alt; lbCap.textContent = i.alt; lb.showModal();
      };
      f.addEventListener('click', open);
      f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  }

  /* ---- formulário ---- */
  const form = $('#form');
  if (form) {
    const q = new URLSearchParams(location.search).get('esp');
    if (q) { const r = $(`input[name=esp][value="${CSS.escape(q)}"]`, form); if (r) r.checked = true; }

    const tel = $('#tel');
    tel.addEventListener('input', () => {
      const d = tel.value.replace(/\D/g, '').slice(0, 11);
      tel.value = d.length > 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    });

    const setErr = (id, msg, field) => {
      const p = $('#err-' + id); p.textContent = msg || '';
      if (field) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    };
    const checks = {
      esp: () => setErr('esp', form.esp.value ? '' : 'Escolha uma especialidade ou “Ainda não sei”.'),
      nome: () => setErr('nome', $('#nome').value.trim().split(/\s+/).filter(Boolean).length >= 2 && $('#nome').value.trim().length >= 5 ? '' : 'Informe nome e sobrenome.', $('#nome')),
      tel: () => setErr('tel', /^\d{10,11}$/.test(tel.value.replace(/\D/g, '')) ? '' : 'Informe um telefone com DDD, por exemplo (00) 00000-0000.', tel),
      email: () => { const v = $('#email').value.trim(); return setErr('email', !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Esse e-mail parece incompleto.', $('#email')); },
      ok: () => setErr('ok', $('#ok').checked ? '' : 'Precisamos do seu consentimento para preparar a mensagem.', $('#ok')),
    };
    ['nome', 'tel', 'email'].forEach((k) => $('#' + k).addEventListener('blur', checks[k]));
    form.addEventListener('change', (e) => { if (e.target.name === 'esp') checks.esp(); if (e.target.id === 'ok') checks.ok(); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const order = ['esp', 'nome', 'tel', 'email', 'ok'];
      const bad = order.filter((k) => !checks[k]());
      if (bad.length) {
        const first = { esp: $('input[name=esp]', form), nome: $('#nome'), tel: tel, email: $('#email'), ok: $('#ok') }[bad[0]];
        first.focus(); return;
      }
      const esp = $('input[name=esp]:checked', form).dataset.label;
      const lines = [
        `Olá, ${form.dataset.clinic}! Gostaria de solicitar uma avaliação.`,
        `Nome: ${$('#nome').value.trim()}`,
        `Telefone: ${tel.value}`,
        $('#email').value.trim() && `E-mail: ${$('#email').value.trim()}`,
        `Interesse: ${esp}`,
        $('#periodo').value && `Período preferido: ${$('#periodo').value}`,
        $('#msg').value.trim() && `Mensagem: ${$('#msg').value.trim()}`,
      ].filter(Boolean);
      const text = lines.join('\n');
      const res = $('#result');
      $('#preview').textContent = text;
      $('#wa-link').href = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`;
      res.hidden = false; res.focus(); res.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      $('#copy').onclick = async (ev) => {
        const span = $('span', ev.currentTarget);
        try { await navigator.clipboard.writeText(text); span.textContent = 'Copiado'; } catch { span.textContent = 'Selecione e copie acima'; }
        setTimeout(() => (span.textContent = 'Copiar texto'), 2200);
      };
    });
  }
})();

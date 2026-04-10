// ═══════════════════════════════════════════════════════════
//  CARROSSEL SHOPEE — O Foco da Vila Mariana
//  Arquivo: carrossel-shopee.js
//  Coloque este arquivo na raiz do jornal (junto com index.html)
// ═══════════════════════════════════════════════════════════

(function () {

  // ── CONFIGURAÇÃO ────────────────────────────────────────
  // 🔧 Troque pela URL do seu site de produtos no Vercel:
  var PRODUTOS_URL = 'https://SEU-SITE-PRODUTOS.vercel.app/produtos.json';

  // Velocidade do scroll automático (pixels por frame ~60fps)
  // Aumente para mais rápido, diminua para mais lento
  var VELOCIDADE = 0.55;

  // Quantas cópias duplicar para loop infinito (não precisa mexer)
  var COPIAS = 4;
  // ────────────────────────────────────────────────────────

  // Injeta o CSS do carrossel no <head>
  var style = document.createElement('style');
  style.textContent = [
    '#shopee-ticker-wrap{',
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;',
      'background:#fff;',
      'border-top:2px solid #ee4d2d;',
      'box-shadow:0 -2px 16px rgba(0,0,0,0.13);',
      'padding:8px 0 6px;',
      'user-select:none;',
    '}',

    '[data-theme="dark"] #shopee-ticker-wrap{',
      'background:#1a1816;',
      'border-top-color:#ee4d2d;',
    '}',

    '#shopee-ticker-inner{',
      'position:relative;',
      'overflow:hidden;',
    '}',

    '#shopee-ticker-fade-left{',
      'position:absolute;left:0;top:0;bottom:0;width:110px;',
      'background:linear-gradient(90deg,#fff 55%,transparent);',
      'z-index:2;pointer-events:none;',
      'display:flex;align-items:center;padding-left:12px;gap:8px;',
    '}',

    '[data-theme="dark"] #shopee-ticker-fade-left{',
      'background:linear-gradient(90deg,#1a1816 55%,transparent);',
    '}',

    '#shopee-ticker-fade-right{',
      'position:absolute;right:0;top:0;bottom:0;width:80px;',
      'background:linear-gradient(270deg,#fff 50%,transparent);',
      'z-index:2;pointer-events:none;',
    '}',

    '[data-theme="dark"] #shopee-ticker-fade-right{',
      'background:linear-gradient(270deg,#1a1816 50%,transparent);',
    '}',

    '.shopee-label-logo{',
      'display:flex;flex-direction:column;align-items:flex-start;flex-shrink:0;',
    '}',

    '.shopee-label-text{',
      'font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;',
      'color:#ee4d2d;font-family:\'Source Serif 4\',Georgia,serif;line-height:1;',
    '}',

    '.shopee-label-sub{',
      'font-size:8px;color:#999;letter-spacing:0.06em;text-transform:uppercase;',
      'font-family:\'Source Serif 4\',Georgia,serif;margin-top:1px;',
    '}',

    '#shopee-ticker-track{',
      'display:flex;gap:10px;',
      'width:max-content;',
      'cursor:grab;',
      'padding:2px 100px 2px 120px;',
    '}',

    '#shopee-ticker-track:active{cursor:grabbing;}',

    '.sp-card{',
      'display:flex;align-items:center;gap:8px;',
      'background:#fff;',
      'border:1px solid #f0ece4;',
      'border-radius:8px;',
      'padding:5px 10px 5px 5px;',
      'flex-shrink:0;',
      'text-decoration:none;',
      'transition:box-shadow 0.2s,transform 0.2s;',
      'min-width:200px;max-width:240px;',
      'cursor:pointer;',
    '}',

    '[data-theme="dark"] .sp-card{',
      'background:#222220;border-color:#2e2b26;',
    '}',

    '.sp-card:hover{',
      'box-shadow:0 4px 16px rgba(238,77,45,0.18);',
      'transform:translateY(-2px);',
      'border-color:#ee4d2d;',
    '}',

    '.sp-img{',
      'width:52px;height:52px;border-radius:6px;',
      'object-fit:cover;flex-shrink:0;',
      'background:#f9f7f4;',
      'border:1px solid #f0ece4;',
    '}',

    '.sp-img-placeholder{',
      'width:52px;height:52px;border-radius:6px;',
      'background:#f9f7f4;border:1px solid #f0ece4;',
      'display:flex;align-items:center;justify-content:center;',
      'font-size:24px;flex-shrink:0;',
    '}',

    '.sp-info{display:flex;flex-direction:column;gap:2px;min-width:0;}',

    '.sp-nome{',
      'font-size:11px;font-weight:600;',
      'color:#1a1a1a;',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;',
      'font-family:\'Source Serif 4\',Georgia,serif;',
    '}',

    '[data-theme="dark"] .sp-nome{color:#f0ece4;}',

    '.sp-desc{',
      'font-size:10px;color:#888;',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;',
      'font-family:\'Source Serif 4\',Georgia,serif;',
    '}',

    '.sp-preco-row{display:flex;align-items:center;gap:5px;margin-top:1px;}',

    '.sp-preco{',
      'font-size:12px;font-weight:700;color:#ee4d2d;',
      'font-family:\'Source Serif 4\',Georgia,serif;',
    '}',

    '.sp-preco-original{',
      'font-size:10px;color:#bbb;text-decoration:line-through;',
      'font-family:\'Source Serif 4\',Georgia,serif;',
    '}',

    '.sp-desconto{',
      'font-size:9px;font-weight:700;',
      'background:#ee4d2d;color:#fff;',
      'border-radius:3px;padding:1px 4px;',
      'letter-spacing:0.04em;',
    '}',

    '#shopee-close-btn{',
      'position:absolute;top:4px;right:8px;',
      'background:transparent;border:none;',
      'font-size:14px;color:#bbb;cursor:pointer;',
      'z-index:10;line-height:1;padding:4px;',
      'transition:color 0.2s;',
    '}',

    '#shopee-close-btn:hover{color:#ee4d2d;}',

    // Empurra o conteúdo da página para cima para não ficar atrás do ticker
    'body{padding-bottom:92px !important;}',
  ].join('');
  document.head.appendChild(style);

  // ── ESTRUTURA HTML DO TICKER ─────────────────────────────
  var wrapper = document.createElement('div');
  wrapper.id = 'shopee-ticker-wrap';
  wrapper.innerHTML =
    '<button id="shopee-close-btn" title="Fechar">✕</button>' +
    '<div id="shopee-ticker-inner">' +
      '<div id="shopee-ticker-fade-left">' +
        '<div class="shopee-label-logo">' +
          '<span class="shopee-label-text">🛍 Shopee</span>' +
          '<span class="shopee-label-sub">Ofertas</span>' +
        '</div>' +
      '</div>' +
      '<div id="shopee-ticker-fade-right"></div>' +
      '<div id="shopee-ticker-track"></div>' +
    '</div>';
  document.body.appendChild(wrapper);

  var track = document.getElementById('shopee-ticker-track');

  // ── FECHAR ───────────────────────────────────────────────
  document.getElementById('shopee-close-btn').addEventListener('click', function () {
    wrapper.style.display = 'none';
    document.body.style.paddingBottom = '';
    cancelAnimationFrame(raf);
  });

  // ── BUSCAR PRODUTOS DO JSON ──────────────────────────────
  fetch(PRODUTOS_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      iniciarCarrossel(data.produtos || []);
    })
    .catch(function (err) {
      console.warn('[Carrossel Shopee] Erro ao carregar produtos.json:', err);
      wrapper.style.display = 'none';
      document.body.style.paddingBottom = '';
    });

  // ── MONTAR E ANIMAR ──────────────────────────────────────
  function iniciarCarrossel(produtos) {
    if (!produtos.length) { wrapper.style.display = 'none'; return; }

    // Duplicar para loop infinito
    var todos = [];
    for (var c = 0; c < COPIAS; c++) todos = todos.concat(produtos);

    track.innerHTML = todos.map(function (p) {
      var imgHtml = p.imagem
        ? '<img class="sp-img" src="' + p.imagem + '" alt="' + escHtml(p.nome) + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="sp-img-placeholder" style="display:none">🛒</div>'
        : '<div class="sp-img-placeholder">🛒</div>';

      return '<a class="sp-card" href="' + escHtml(p.link) + '" target="_blank" rel="noopener sponsored">' +
        imgHtml +
        '<div class="sp-info">' +
          '<span class="sp-nome">' + escHtml(p.nome) + '</span>' +
          '<span class="sp-desc">' + escHtml(p.descricao || '') + '</span>' +
          '<div class="sp-preco-row">' +
            '<span class="sp-preco">' + escHtml(p.preco) + '</span>' +
            (p.preco_original ? '<span class="sp-preco-original">' + escHtml(p.preco_original) + '</span>' : '') +
            (p.desconto ? '<span class="sp-desconto">-' + p.desconto + '%</span>' : '') +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');

    // Largura de uma unidade (1 set de produtos)
    var UNIT = 0;
    setTimeout(function () {
      // Calcula após render
      var cards = track.querySelectorAll('.sp-card');
      var unitCards = Math.floor(cards.length / COPIAS);
      var totalW = 0;
      for (var i = 0; i < unitCards; i++) {
        totalW += cards[i].offsetWidth + 10; // gap
      }
      UNIT = totalW;
      iniciarAnimacao(UNIT);
    }, 100);
  }

  // ── ANIMAÇÃO + DRAG ──────────────────────────────────────
  var pos = 0;
  var dragging = false;
  var dragStartX = 0;
  var dragStartPos = 0;
  var resumeTimer = null;
  var lastT = null;
  var raf = null;
  var isDragging = false; // flag para evitar click após drag

  function iniciarAnimacao(UNIT) {
    function clamp() {
      if (pos > UNIT * (COPIAS - 2)) pos -= UNIT;
      if (pos < 0) pos += UNIT;
    }

    function tick(t) {
      if (!dragging) {
        if (lastT !== null) pos += VELOCIDADE * (t - lastT) / 16.67;
        lastT = t;
        clamp();
        track.style.transform = 'translateX(' + Math.round(-pos) + 'px)';
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    // ── Mouse drag ──
    track.addEventListener('mousedown', function (e) {
      dragging = true;
      isDragging = false;
      dragStartX = e.clientX;
      dragStartPos = pos;
      lastT = null;
      clearTimeout(resumeTimer);
      e.preventDefault();
    });

    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var dx = dragStartX - e.clientX;
      if (Math.abs(dx) > 4) isDragging = true;
      pos = dragStartPos + dx;
      if (pos > UNIT * (COPIAS - 2)) pos -= UNIT;
      if (pos < 0) pos += UNIT;
      track.style.transform = 'translateX(' + Math.round(-pos) + 'px)';
    });

    window.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      resumeTimer = setTimeout(function () { lastT = null; }, 500);
    });

    // Bloqueia clique após drag
    track.addEventListener('click', function (e) {
      if (isDragging) { e.preventDefault(); e.stopPropagation(); isDragging = false; }
    }, true);

    // ── Touch drag ──
    track.addEventListener('touchstart', function (e) {
      dragging = true;
      isDragging = false;
      dragStartX = e.touches[0].clientX;
      dragStartPos = pos;
      lastT = null;
      clearTimeout(resumeTimer);
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      var dx = dragStartX - e.touches[0].clientX;
      if (Math.abs(dx) > 4) isDragging = true;
      pos = dragStartPos + dx;
      if (pos > UNIT * (COPIAS - 2)) pos -= UNIT;
      if (pos < 0) pos += UNIT;
      track.style.transform = 'translateX(' + Math.round(-pos) + 'px)';
    }, { passive: true });

    track.addEventListener('touchend', function () {
      dragging = false;
      resumeTimer = setTimeout(function () { lastT = null; }, 500);
    });
  }

  // ── UTILITÁRIO ───────────────────────────────────────────
  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();

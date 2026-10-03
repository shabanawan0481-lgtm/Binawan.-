(function () {
  var panel = document.getElementById('chat');
  if (!panel) return;
  var body = document.getElementById('chatBody'), form = document.getElementById('chatForm'),
      input = document.getElementById('chatInput'), quick = document.getElementById('chatQuick');
  var csrf = document.querySelector('meta[name=csrf]').content, last = 0, timer = null, loaded = false;

  function bubble(m) {
    var d = document.createElement('div');
    d.className = 'cm ' + m.role;
    d.textContent = m.text;
    body.appendChild(d);
    if (m.products && m.products.length) {
      var wrap = document.createElement('div'); wrap.className = 'cprods';
      m.products.forEach(function (p) {
        var a = document.createElement('a'); a.href = p.url; a.className = 'cprod';
        if (p.image) { var i = document.createElement('img'); i.src = p.image; i.alt = ''; a.appendChild(i); }
        var s = document.createElement('span'); s.innerHTML = '<b></b><em></em>';
        s.firstChild.textContent = p.name; s.lastChild.textContent = p.price; a.appendChild(s); wrap.appendChild(a);
      });
      body.appendChild(wrap);
    }
    if (m.id && m.id > last) last = m.id;
    body.scrollTop = body.scrollHeight;
  }
  function add(list) { (list || []).forEach(bubble); }
  function post(url, data) {
    var fd = new FormData(); fd.append('_csrf', csrf);
    Object.keys(data || {}).forEach(function (k) { fd.append(k, data[k]); });
    return fetch(url, { method: 'POST', body: fd }).then(function (r) { return r.json(); });
  }
  function load() {
    if (loaded) return; loaded = true;
    fetch('/chat/history').then(function (r) { return r.json(); }).then(function (d) {
      if (!d.messages.length) bubble({ role: 'ai', text: d.welcome || 'Hello! How can I help?' });
      add(d.messages);
      if (d.messages.length) quick.style.display = 'none';
    });
  }
  function poll() {
    fetch('/chat/poll?after=' + last).then(function (r) { return r.json(); }).then(function (d) { add(d.messages); }).catch(function () {});
  }
  function open() { panel.hidden = false; document.body.classList.add('chat-open'); load(); input.focus(); timer = setInterval(poll, 6000); }
  function close() { panel.hidden = true; document.body.classList.remove('chat-open'); clearInterval(timer); }
  document.querySelectorAll('[data-chat-open]').forEach(function (b) { b.addEventListener('click', open); });
  document.querySelectorAll('[data-chat-close]').forEach(function (b) { b.addEventListener('click', close); });

  function send(text) {
    text = (text || '').trim(); if (!text) return;
    bubble({ role: 'user', text: text }); input.value = ''; quick.style.display = 'none';
    var typing = document.createElement('div'); typing.className = 'cm ai typing'; typing.textContent = '...'; body.appendChild(typing);
    post('/chat/send', { message: text }).then(function (d) { typing.remove(); add(d.messages); })
      .catch(function () { typing.remove(); bubble({ role: 'system', text: 'Something went wrong. Please try again or WhatsApp us.' }); });
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });
  quick.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { send(b.textContent); }); });
  document.getElementById('chatHuman').addEventListener('click', function () {
    post('/chat/human').then(function (d) { add(d.messages); });
  });
})();

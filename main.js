(function () {
  var btn = document.querySelector('[data-menu]');
  var drawer = document.querySelector('.drawer');
  function setDrawer(open) {
    document.body.classList.toggle('drawer-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (drawer) drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  if (btn) btn.addEventListener('click', function () { setDrawer(!document.body.classList.contains('drawer-open')); });
  document.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', function () { setDrawer(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
  var radios = document.querySelectorAll('[data-pay]');
  function sync() {
    var chosen = document.querySelector('[data-pay]:checked');
    var val = chosen ? chosen.value : '';
    document.querySelectorAll('[data-box]').forEach(function (box) {
      box.hidden = box.getAttribute('data-box').split(' ').indexOf(val) === -1;
    });
  }
  radios.forEach(function (r) { r.addEventListener('change', sync); });
  if (radios.length) sync();

  var main = document.getElementById('mainimg');
  document.querySelectorAll('.thumbs button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (main) main.src = b.getAttribute('data-full');
      document.querySelectorAll('.thumbs button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
    });
  });
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.querySelector(b.getAttribute('data-copy'));
      if (el && navigator.clipboard) {
        navigator.clipboard.writeText(el.textContent.trim());
        b.textContent = 'Copied';
      }
    });
  });
})();

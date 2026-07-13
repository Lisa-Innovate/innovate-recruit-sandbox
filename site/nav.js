(function () {
  var placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  fetch('/nav.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      var tmp = document.createElement('div');
      tmp.innerHTML = html;
      placeholder.replaceWith(tmp.firstElementChild);
      initDropdowns();
      markActive();
    });

  function initDropdowns() {
    document.querySelectorAll('.nav__item--dropdown').forEach(function (item) {
      var btn = item.querySelector('.nav__link');
      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        // close all
        document.querySelectorAll('.nav__item--dropdown').forEach(function (i) {
          i.classList.remove('is-open');
          i.querySelector('.nav__link').setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // close on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav__item--dropdown')) {
        document.querySelectorAll('.nav__item--dropdown').forEach(function (i) {
          i.classList.remove('is-open');
          i.querySelector('.nav__link').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function markActive() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav__dropdown a').forEach(function (a) {
      var href = a.getAttribute('href').split('#')[0];
      if (href === path) {
        a.classList.add('nav__active');
        var parent = a.closest('.nav__item--dropdown');
        if (parent) parent.querySelector('.nav__link').classList.add('nav__active');
      }
    });
    document.querySelectorAll('.nav__item:not(.nav__item--dropdown) .nav__link').forEach(function (a) {
      if (a.getAttribute('href') === path) a.classList.add('nav__active');
    });
  }
})();

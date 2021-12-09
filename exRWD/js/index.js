var app_header = null;
var menu_open_btn = null;
var app_navigation = null;
var menu_close_btn = null;
var app_main = null;
var sihoonKim_menu = null;
var menu_items = null;

function init() {
  accessingDOMElements();
  a11yOffCanvasMenu(app_navigation);
  bindEvents();
}

function accessingDOMElements() {
  app_header = el(".app-header");
  menu_open_btn = el(".button.is-open-menu", app_header);
  app_navigation = el(".app-navigation", app_header);
  menu_close_btn = el(".button.is-close-menu", app_navigation);
  app_main = el(".app-main");
  sihoonKim_menu = el(".sihoonKim-menu");
  menu_items = els(".sihoonKim-menu__item", sihoonKim_menu);
}

function bindEvents() {
  for (var i = 0, l = menu_items.length; i < l; ++i) {
    var menu_item = menu_items[i];
    var link = el("a", menu_item);
    var close_panel_btn = el(".button.is-close-panel", menu_item);
    link.addEventListener("click", openDetailPanel.bind(link, i));
    close_panel_btn.addEventListener("click", closeDetailPanel);
  }

  menu_open_btn.addEventListener("click", openNavMenu);
  menu_close_btn.addEventListener("click", closeNavMenu);
}

function openNavMenu() {
  app_navigation.hidden = false;
  window.setTimeout(function () {
    app_navigation.classList.add("is-active");
  }, 10);
}

function closeNavMenu() {
  app_navigation.classList.remove("is-active");
  window.setTimeout(function () {
    app_navigation.hidden = true;
  }, 600);
}

function openDetailPanel(index, e) {
  e.preventDefault();
  var detail = el(".sihoonKim-menu__item--detail", menu_items[index]);
  detail.hidden = false;
  window.setTimeout(function () {
    detail.classList.add("is-active");
  }, 10);
}

function closeDetailPanel() {
  var parent = this.parentNode;
  parent.classList.remove("is-active");
  window.setTimeout(function () {
    parent.hidden = true;
  }, 600);
}

init();

function a11yOffCanvasMenu(app_navigation) {
  var nav_focusables = els("a, button", app_navigation);
  var nav_focusable_first = nav_focusables[0];
  var nav_focusable_last = nav_focusables[nav_focusables.length - 1];

  window.addEventListener("keyup", escCloseMenu);
  nav_focusable_first.addEventListener("keydown", navLastFocus);
  nav_focusable_last.addEventListener("keydown", navFirstFocus);

  function escCloseMenu(e) {
    if (e.keyCode === 27) {
      closeNavMenu();
    }
  }

  function navFirstFocus(e) {
    if (!e.shiftKey && e.keyCode === 9) {
      window.setTimeout(function () {
        nav_focusable_first.focus();
      }, 10);
    }
  }

  function navLastFocus(e) {
    if (document.activeElement === e.target && e.shiftKey && e.keyCode === 9) {
      nav_focusable_last.removeEventListener("keydown", navFirstFocus);
      window.setTimeout(function () {
        nav_focusable_last.focus();
        nav_focusable_last.addEventListener("keydown", navFirstFocus);
      }, 10);
    }
  }
}

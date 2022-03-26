$(document).ready(() => {
  $("#fullpage").fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
  });

  $.fn.fullpage.setAllowScrolling(false);
});

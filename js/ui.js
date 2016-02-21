window.DropTracker = window.DropTracker || {}
window.DropTracker.UI = window.DropTracker.UI || {}
window.DropTracker.STATE = window.DropTracker.STATE || {}

/**
 * @description Clears content area
 * @description Called after section change
 */
function clearContentContainer () {
  $('#content').empty()
}


/**
 * @description Selects specified menu item
 * @description Deselects all others
 * @param  {jQuery object} el Navbar a<jQuery>
 */
function selectMenuItem(el) {
  // set new active state menu item
  window.DropTracker.STATE.menu = $(el).data('menu')
  $('.navbar-nav li').removeClass('active')
  $(el).parent().addClass('active')
}

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
  $('.navbar-nav li').removeClass('active')
  $(el).parent().addClass('active')
}

function displayHome(deviceName) {
  clearContentContainer()
  $('.navbar-nav li').removeClass('active')
  $('#content').append('<div id="content-home"><h3>You are viewing device ID:#' + deviceName + '</h3><p>Select section in top menu to view device data.</p></div>')
}

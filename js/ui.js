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

function attachShellForm() {
  $('#content-shell').append(
    '<form class="form-inline" id="shell-form">\
      <div class="form-group">\
        <div class="input-group">\
          <input id="shell-form-input" type="text" class="form-control" placeholder="uname -a">\
        </div>\
      </div>\
      <button id="shell-button" class="btn btn-primary">Execute</button>\
    </form>'
  )
}

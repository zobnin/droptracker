window.DropTracker = window.DropTracker || {}
window.DropTracker.UI = window.DropTracker.UI || {}
window.DropTracker.STATE = window.DropTracker.STATE || {}

/**
 * Router emulation
 */

// device selector
$(document).on('click', '.device_list-device', function(e) {
  e.preventDefault()
  var deviceName = $(this).data('device')
  setActiveDevice(deviceName)
});

function navigateSection(slug) {
  clearContentContainer()
  switch (slug) {
    case 'logs':
      $('#content').append('<h2>Logs for device #' + window.DropTracker.STATE.activeDevice +'</h2><div id="content-logs"></div>')
      $('#content').append('<h2>Logs</h2><div id="content-logs"></div>')
      $('#content-logs').append('<h3>Main</h3>')
      getLastLocation(window.DropTracker.STATE.activeDevice, "main")
      $('#content-logs').append('<h3>Calls</h3>')
      getLastLocation(window.DropTracker.STATE.activeDevice, "calls")
      break
    case 'screenshots':
      $('#content').append('<h2>Screenshots for device #' + window.DropTracker.STATE.activeDevice +'</h2><div id="content-screenshots"></div>')
      break
    case 'photos':
      $('#content').append('<h2>Photos for device #' + window.DropTracker.STATE.activeDevice +'</h2><div id="content-photos"></div>')
      break
    case 'map':
    default:
      $('#content').append('<h2>Map for device #' + window.DropTracker.STATE.activeDevice +'</h2><div id="content-map"><img src="img/ajax-loader.gif"></div>')
      getLastLocation(window.DropTracker.STATE.activeDevice)
  }
}

// section selectors
$('#menu-map').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  navigateSection('map')
})
$('#menu-logs').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  navigateSection('logs')
})
$('#menu-screenshots').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  navigateSection('screenshots')
})
$('#menu-photos').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  navigateSection('photos')
})

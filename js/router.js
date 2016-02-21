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

// section selectors
$('#menu-map').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  clearContentContainer()
  $('#content').append('<h2>Map</h2><div id="content-map"></div>')
  getLastLocation(window.DropTracker.STATE.activeDevice)
})
$('#menu-logs').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  clearContentContainer()
  $('#content').append('<h2>Logs</h2><div id="content-logs"></div>')
})
$('#menu-screenshots').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  clearContentContainer()
  $('#content').append('<h2>Screenshots</h2><div id="content-screenshots"></div>')
})
$('#menu-photos').click(function(e){
  e.preventDefault()
  selectMenuItem(this)
  clearContentContainer()
  $('#content').append('<h2>Photos</h2><div id="content-photos"></div>')
})

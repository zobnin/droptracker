window.DropTracker = window.DropTracker || {}
window.DropTracker.UI = window.DropTracker.UI || {}
window.DropTracker.STATE = window.DropTracker.STATE || {}

/**
 * @description Adds device to devices list
 * @param {String} deviceName Device name
 */
function addDevice(deviceName) {
  // prevent multiple DOM search
  var $menuDevices = (function(){
    if (!window.DropTracker.UI.menuDevices) window.DropTracker.UI.menuDevices = $('#menu_devices')
    return window.DropTracker.UI.menuDevices
  })()
  // construct element
  $menuDevices.append('<li><a href="#" class="device device_list-device" data-device="' + deviceName + '">' + deviceName + '</a></li>')
}

/**
 * @description Fetches info for provided device
 * @param {String} deviceName Device name
 */
function setActiveDevice(deviceName) {
  // set state
  window.DropTracker.STATE.activeDevice = deviceName
  // fetch data
  getInfo(deviceName)
  getStatus(deviceName)
  getLastLocation(deviceName)
  // update selected device UI
  $('#navbar_devices').html(deviceName + ' <span class="caret"></span>')
}

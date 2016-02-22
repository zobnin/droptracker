
/**
 * @private
 * @description Gets promised call logs object from Dropbox
 * @param  {String} deviceName Device name
 * @param  {String} logfile    Call types to retrieve, 'main'||'calls'
 * @return {Promise}           Promise<String|Error>
 */
function _getCalls(deviceName, logfile) {
  // dont use Promisify cause add params
  return new Promise(function(resolve, reject) {
    dboxClient.readFile("/" + deviceName + "/logs/" + logfile, function(err, data) {
      err? reject(err): resolve(data)
    })
  })
}


function _parseData(data) {
  return new Promise(function(resolve, reject) {
    var calls = []
    try {
      calls = data.split(/\n/g)
      resolve(calls)
    } catch (err) {
      reject(err)
    }
  })
}


function _buildMarkup(calls) {
  return new Promise(function(resolve, reject) {
    try {
      var html = '<ul>'
      // filter empty lines
      calls = calls.filter(function (call) {
        if (call != '') {
          return true
        } else {
          return false
        }
      })
      // wrap every el as ul point
      calls = calls.map(function(call) {
        return '<li>' + call + '</li>'
      })
      html += calls.join('')
      html += '</ul>'
      resolve(html)
    } catch (err) {
      reject(err)
    }
  })
}


function _appendMarkup(sections) {
  return new Promise(function(resolve, reject) {
    // remove ajax preloader
    $('#content-logs').empty()
    if (sections.length > 0) {
      var $container = $('#content-logs')
      $container.append('<h3>Main logs</h3>')
      $container.append(sections[0])
      $container.append('<h3>Call logs</h3>')
      $container.append(sections[1])
    }
  })
}


/**
 * @public
 * @description
 * @param  {String} deviceName [description]
 * @return {[type]}            [description]
 */
function getLogs(deviceName) {
  return Promise.all([
    _getCalls(deviceName, 'main')
      .then(_parseData)
      .then(_buildMarkup),
    _getCalls(deviceName, 'calls')
      .then(_parseData)
      .then(_buildMarkup)
  ])
  .then(_appendMarkup)
}

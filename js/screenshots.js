window.DropTracker = window.DropTracker || {}
window.DropTracker.UI = window.DropTracker.UI || {}
window.DropTracker.STATE = window.DropTracker.STATE || {}

/**
 * @public
 * @description
 * @param  {[type]} deviceName [description]
 * @return {[type]}            [description]
 */
function getScreenshots(deviceName) {
  _readScreenshots(deviceName)
    .then(_getScreenshotsURLs(window.DropTracker.STATE.activeDevice))
    .then(_appendScreenshotsHTML)
}

function _readScreenshots(deviceName){
  return new Promise(function(resolve, reject) {
    dboxClient
      .readdir("/" + deviceName + '/screenshots', function(err, screenshots) {
      if (err) {
        reject(err)
      } else {
        resolve(screenshots)
      }
    })
  });
}

function _getScreenshotsURLsPromiseConstructor(deviceName, fileNames) {
  var tasks = fileNames.map(function (filename) {
    return new Promise(function(resolve, reject) {
      dboxClient
        .makeUrl("/" + deviceName + '/screenshots/' + filename, {
          download: true
        }, function (err, url) {
          if(err) {
            reject(err)
          } else {
            resolve(url)
          }
        })
    })
  })
  return tasks
}

function _getScreenshotsURLs(deviceName) {
  return function (fileNames) {
    return Promise.all(
      _getScreenshotsURLsPromiseConstructor(deviceName, fileNames)
    )
  }
}

function _appendScreenshotsHTML(photos) {
  $('#content-screenshots').empty()
  var html = '<div class="row hidden">'
  photos.forEach(function (photo) {
    html += '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\
      <img class="img-thumbnail img-responsive img-content-screenshots-screenshot" src="' + photo.url + '">\
    </div>'
  })
  $('#content-screenshots').append(html)
  $('#content-screenshots .row').removeClass('hidden')
}

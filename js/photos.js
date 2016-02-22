window.DropTracker = window.DropTracker || {}
window.DropTracker.UI = window.DropTracker.UI || {}
window.DropTracker.STATE = window.DropTracker.STATE || {}

/**
 * @public
 * @description
 * @param  {[type]} deviceName [description]
 * @return {[type]}            [description]
 */
function getPhotos(deviceName) {
  _readPhotos(deviceName)
    .then(_getURLs(window.DropTracker.STATE.activeDevice))
    .then(_appendHTML)
}

function _readPhotos(deviceName){
  return new Promise(function(resolve, reject) {
    dboxClient
      .readdir("/" + deviceName + '/camera', function(err, photos) {
      if (err) {
        reject(err)
      } else {
        resolve(photos)
      }
    })
  });
}

function _getURLsPromiseConstructor(deviceName, fileNames) {
  var tasks = fileNames.map(function (filename) {
    return new Promise(function(resolve, reject) {
      dboxClient
        .makeUrl("/" + deviceName + '/camera/' + filename, {
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

function _getURLs(deviceName) {
  return function (fileNames) {
    return Promise.all(
      _getURLsPromiseConstructor(deviceName, fileNames)
    )
  }
}

function _appendHTML(photos) {
  $('#content-photos').empty()
  var html = '<div class="row hidden">'
  console.log(photos);
  photos.forEach(function (photo) {
    html += '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\
      <img class="img-thumbnail img-responsive img-content-photos-photo" src="' + photo.url + '">\
    </div>'
  })
  $('#content-photos').append(html)
  $('#content-photos .row').removeClass('hidden')
}

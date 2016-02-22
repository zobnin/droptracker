window.DropTracker = window.DropTracker || {}
window.DropTracker.UI = window.DropTracker.UI || {}
window.DropTracker.STATE = window.DropTracker.STATE || {}

/**
 * @public
 * @description
 * @param  {Object<Event>} e jQuery click event
 * @return {[type]}   [description]
 */
function runShellCommand(e) {
  $('#shell-output').text('')
  $('#shell-output-container').fadeOut(100)
  $(e.currentTarget).addClass('disabled','')
  $(e.currentTarget).text('Executing command..')
  var command = $('#shell-form-input').val()
  // execute
  _sendCommand(window.DropTracker.STATE.activeDevice, command)
    .then(_waitForChanges)
    .then(_getResult(window.DropTracker.STATE.activeDevice))
    .then(_appendResult)
    .catch(function (err) {
      console.log(err)
    })
}

function _sendCommand(name, cmd) {
  return new Promise(function(resolve, reject) {
    dboxClient.writeFile("/" + name + "/control", cmd + "\n", function(err, stat) {
      if (err) {
        reject(err)
      } else {
        resolve(stat)
      }
    })
  })
}

function _waitForChanges() {
  return new Promise(function(resolve, reject) {
    // TODO: promisify callback hell
    dboxClient.pullChanges(function(err, cursor) {
      if (err) {
        reject(err)
      } else {
        dboxClient.pollForChanges(cursor, { timeout: 300 }, function(err, result) {
          if (err) {
            reject(err)
          } else {
            if (result.hasChanges == true) {
              dboxClient.pullChanges(cursor, function(error, cursor) {
                 resolve(cursor)
              })
            }
          }
        })
      }
    })
  })
}

function _getResult(name) {
  return function(cursor) {
    return new Promise(function(resolve, reject) {
      dboxClient.readFile("/" + name + "/result", function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    });
  }
}

function _appendResult(result) {
  $('#shell-output').text(result)
  $('#shell-output-container').fadeIn(300)
  $('#shell-button').removeClass('disabled','')
  $('#shell-button').text('Execute')
}

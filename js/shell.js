function sendCommand(name, cmd) {
  dboxClient.writeFile("/" + name + "/control", cmd + "\n", function(error, stat) {
    if (error) {
      return alert(error);
    }
  });
}

function getResult(name) {
  dboxClient.readFile("/" + name + "/result", function(error, data) {
    if (error) {
      return alert(error);
    }

    data = data.replace(/\n/g, '<br />');

    $('#shell-output').empty();
    $('#shell-output').append(data);
  });
}

function makeShellInput(name) {
  $('#shell-input').append('<form class="form-inline" id="shell-form"></form>');
  $('#shell-form').append('<div class="form-group"><div class="input-group"><input id="shell-form-input" type="text" class="form-control" placeholder="uname -a"></div></div>');
  $('#shell-form').append('<button id="shell-button" type="submit" class="btn btn-primary">Execute</button>');

  $('#shell-form').submit(function () {
    var cmd = $('#shell-form-input').val()
    sendCommand(window.DropTracker.STATE.activeDevice, cmd);
  });
}

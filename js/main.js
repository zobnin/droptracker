var dboxClient = new Dropbox.Client({
  key: 'otyoz3pz5z9rtmn'
});

dboxClient.authenticate({
  interactive: false
}, function(err, client) {
  if (err) return alert(err)

  if (client.isAuthenticated()) {
    client
      .readdir("/", function(err, devices) {
        if (err) return alert(err)

        if (devices.length > 0) {
          devices.forEach(function(device) {
            addDevice(device)
          })
          setActiveDevice(devices[0])
        }

        // var button_lost = document.getElementById("button_lost");
        // button_lost.removeAttribute("disabled");
        // button_lost.addEventListener("click", function() {
        //   // FIXME PIN!!!
        //   sendCommand(device, "lost 1234");
        // });
        //
        // var button_wipe = document.getElementById("button_wipe");
        // button_wipe.removeAttribute("disabled");
        // button_wipe.addEventListener("click", function() {
        //   sendCommand(device, "wipe");
        // });
      });
  } else {
    $('#modal_auth').modal();
    var button = document.getElementById("auth_button");
    button.addEventListener("click", function() {
      dboxClient.authenticate(function(error, client) {
        if (error) {
          return alert(error);
        }
      });
    });
  }
});

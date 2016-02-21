function getLastLocation(name) {
  dboxClient.readFile("/" + name + "/location", function(error, data) {
    if (error) {
      return alert(error);
    }
    if (!data || data.length == 0) {
      return null;
    }

    var lines = data.split("\n");
    var line = lines[lines.length - 2];

    var locs = line.split(" ");
    var map = new GMaps({
      div: '#map',
      lat: locs[2],
      lng: locs[3]
    });

    map.addMarker({
      lat: locs[2],
      lng: locs[3],
      title: locs[0] + " " + locs[1]
    });
  });
}

function getInfo(name) {
  dboxClient.readFile("/" + name + "/info", function(error, data) {
    if (error) {
      return alert(error);
    }
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br />');
    data = data.replace(/([A-Za-z\s]+:)/g, '<b>$1</b>');
    document.getElementById("device_info").innerHTML = data;
  });
}

function getStatus(name) {
  dboxClient.readFile("/" + name + "/status", function(error, data) {
    if (error) {
      return alert(error);
    }
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br />');
    data = data.replace(/([A-Za-z\s]+:)/g, '<b>$1</b>');
    document.getElementById("device_status").innerHTML = data;
  });
}

function sendCommand(name, cmd) {
  dboxClient.writeFile("/" + name + "/control", cmd + "\n", function(error, stat) {
    if (error) {
      return alert(error);
    }
  });
}

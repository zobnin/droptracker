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
      el: '#content-map',
      lat: locs[2],
      lng: locs[3]
    });
    debugger
    map.addMarker({
      lat: locs[2],
      lng: locs[3],
      title: locs[0] + " " + locs[1]
    });
  });
}

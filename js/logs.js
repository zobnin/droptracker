function getLogs(deviceName, logfile) {
  dboxClient.readFile("/" + deviceName + "/logs/" + logfile, function(error, data) {
    if (error) return alert(error)

    data = data.replace(/\n/g, '<br />');

    if (logfile == "main") {
      $('#content-logs').append("<h3>Main</h3");
    } else {
      $('#content-logs').append("<h3>Calls</h3>");
    }
    $('#content-logs').append(data);
  });
}

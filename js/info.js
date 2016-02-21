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

function getLogs(name, logfile) {
  dboxClient.readFile("/" + name + "/logs/" + logfile, function(error, data) {
    if (error) {
      return alert(error);
    }
    data = data.replace(/\n/g, '<br />');
    $("content-logs").append(data);
  });
}

function sendCommand(name, cmd) {
  dboxClient.writeFile("/" + name + "/control", cmd + "\n", function(error, stat) {
    if (error) {
      return alert(error);
    }
  });
}

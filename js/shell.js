function runShellCommand(e) {
  $(e.currentTarget).addClass('disabled','')
  $(e.currentTarget).text('Executing command..')
  var command = $('#shell-form-input').val()
}

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

// function waitForChanges() {
//   dboxClient.pullChanges(function(error, cursor) {
//     if (error) {
//       return alert(error)
//     }
//     dboxClient.pollForChanges(cursor, { timeout: 300 }, function(error, result) {
//       if (result.hasChanges == true) {
//         dboxClient.pullChanges(cursor, function(error, cursor) {
// 	         // TODO
//         })
//       }
//     });
//   }
// }

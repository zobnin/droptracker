var dboxClient = new Dropbox.Client({ key: 'otyoz3pz5z9rtmn' });

dboxClient.authenticate({interactive: false}, function(error, client) {
    if (error) {
	return alert(error);
    }
    if (client.isAuthenticated()) {
	client.readdir("/", function(error, entries) {
	    if (error) {
		return showError(error);
	    }

	    entries.forEach(function(entry) {
		var menu = document.getElementById("menu_devices");
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.href = "#";
		a.className = "device";
		a.id = entry;
		a.innerHTML = entry;
		li.appendChild(a);
		menu.appendChild(li);
	    });
		    
	    var device = document.getElementsByClassName("device")[0].innerHTML;
	    document.getElementById("navbar_devices").innerHTML = device + '<span class="caret"></span>';

	    getInfo(device);
	    getStatus(device);
	    getLastLocation(device);

	    var button_lost = document.getElementById("button_lost");
	    button_lost.removeAttribute("disabled");
	    button_lost.addEventListener("click", function() {
		// FIXME PIN!!!
		sendCommand(device, "lost 1234");
	    });
	    
	    var button_lost = document.getElementById("button_lost");
	    button_lost.removeAttribute("disabled");
	    button_lost.addEventListener("click", function() {
		sendCommand(device, "wipe");
	    });
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

function getLastLocation(name) {
    dboxClient.readFile("/" + name + "/location", function(error, data) {
	if (error) {
	    return alert(error);
	}
	if (!data || data.length == 0) {
	    return null;
	}

	var return_index = data.lastIndexOf("\n");
		
	// Only one string or more?
	if (return_index != data.length-1) {
	    data = data.substr(data.lastIndexOf("\n")+1);
	}
	
	var locs = data.split(" ");
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

var Ajax = {};

Ajax.get = (url, callback) => {
	var xhr = new XMLHttpRequest();
/*	xhr.onload = function() {
	    if (xhr.status === 200) {
	        console.log(xhr.responseText);
	    }
	    else {
	        console.log('Request failed.  Returned status of ' + xhr.status);
	    }
	};
*/
	xhr.onreadystatechange = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				callback(xhr.responseText);
			};
	};
	xhr.open('GET', url, true);
	xhr.send();
};
/*


Ajax.post = () => {
	var newName = 'John Smith',
    xhr = new XMLHttpRequest();

	xhr.open('POST', 'myservice/username?id=some-unique-id');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200 && xhr.responseText !== newName) {
	        alert('Something went wrong.  Name is now ' + xhr.responseText);
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send(encodeURI('name=' + newName));
};


ajax.param = function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
};

ajax.put = (json, url) => {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        var userInfo = JSON.parse(xhr.responseText);
	    }
	};
	xhr.send(JSON.stringify(url));
};
*/


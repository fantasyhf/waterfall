function ajax (method, url, flag, data, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback && callback(xhr.responseText);
            }else {
                throw 'Error: Failed to load response data.';
            }
        }
    }

    if (method == 'GET') {
        xhr.open(method, url+'?'+data, flag);
        xhr.send();
    }
    if (method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}
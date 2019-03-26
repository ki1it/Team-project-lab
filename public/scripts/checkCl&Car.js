function checkClient() {
    // checkCL.innerHTML = ' ... ';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'checkClient?DLN='+inputClient.value, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }
        if(xhr.response)
        // обработать результат
        clientText.innerHTML = xhr.responseText;
    }

    xhr.send(null);

}
function checkCar() {
    // checkCL.innerHTML = ' ... ';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'checkCar?VIN='+inputCar.value, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }
        if(xhr.response)
        // обработать результат
            carText.innerHTML = xhr.responseText;
    }

    xhr.send(null);

}
// Get the <datalist> and <input> elements.
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();
request.open('GET', 'getBrand', true);
request.send();

// Handle state changes for the request.
request.onreadystatechange = function (response) {
    if (request.readyState === 4) {
        if (request.status === 200) {
            // Parse the JSON
            var jsonOptions = JSON.parse(request.responseText);
            console.log(request.responseText)
            // Loop over the JSON array.
            jsonOptions.forEach(function (item) {
                // Create a new <option> element.
                var option = document.createElement('option');
                // Set the value using the item in the JSON array.
                option.value = item;
                // Add the <option> element to the <datalist>.
                dataList.appendChild(option);
            });

            // Update the placeholder text.
            input.placeholder = "e.g. datalist";
        } else {
            // An error occured :(
            input.placeholder = "Couldn't load datalist options :(";
        }
    }
};


// Set up and make the request.
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

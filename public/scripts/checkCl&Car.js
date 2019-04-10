// Get the <datalist> and <input> elements.
let dataList = document.getElementById('json-datalist1');
var input = document.getElementById('ajax1');

//Получить марки автомобилей
var request = new XMLHttpRequest();
request.open('GET', 'getBrand', true);
request.send();

// Handle state changes for the request.
request.onreadystatechange = function (response) {
    if (request.readyState === 4) {
        if (request.status === 200) {
            // Parse the JSON
            var jsonOptions = JSON.parse(request.responseText)
            // Loop over the JSON array.
            jsonOptions.forEach(function (item) {
                // Create a new <option> element.
                var option = document.createElement('option')
                // Set the value using the item in the JSON array.
                option.value = item.Brand;
                // Add the <option> element to the <datalist>.
                dataList.appendChild(option);
            });

            // Update the placeholder text.
            input.placeholder = "Начните вводить";
        } else {
            // An error occured :(
            input.placeholder = "Ошибка"
        }
    }
};
request = new XMLHttpRequest();
request.open('GET', 'getServiceType', true);
request.send();
let dataListST = document.getElementById('json-datalistUslType');
var inputST = document.getElementById('inpSerType');
// Handle state changes for the request.
request.onreadystatechange = function (response) {
    if (request.readyState === 4) {
        if (request.status === 200) {
            // Parse the JSON
            var jsonOptions = JSON.parse(request.responseText)
            // Loop over the JSON array.
            jsonOptions.forEach(function (item) {
                // Create a new <option> element.
                var option = document.createElement('option')
                // Set the value using the item in the JSON array.
                option.value = item.Name;
                // Add the <option> element to the <datalist>.
                dataListST.appendChild(option);
            });

            // Update the placeholder text.
            inputST.placeholder = "Начните вводить";
        } else {
            // An error occured :(
            inputST.placeholder = "Ошибка"
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
function getModels() {

    var dataList = document.getElementById('json-datalist2');
    var input = document.getElementById('ajax2');

// Create a new XMLHttpRequest.
    var request = new XMLHttpRequest();
    request.open('GET', 'getModel?Brand='+ajax1.value, true);
    request.send();

// Handle state changes for the request.
    request.onreadystatechange = function (response) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // Parse the JSON
                var jsonOptions = JSON.parse(request.responseText)
                // dataList.options.length = 0;
                while (dataList.firstChild){
                    dataList.removeChild(dataList.firstChild)
                }
                // Loop over the JSON array.
                jsonOptions.forEach(function (item) {

                    // Create a new <option> element.
                    var option = document.createElement('option')
                    // Set the value using the item in the JSON array.
                    option.value = item.Model.Model;
                    // Add the <option> element to the <datalist>.
                    dataList.appendChild(option);
                });

                // Update the placeholder text.
                input.placeholder = "Начните вводить";
            } else {
                // An error occured :(
                input.placeholder = "Ошибка"
            }
        }
    };
}

function getServices() {

    const dataList = document.getElementById('json-datalistUsl');
    const input = document.getElementById('inpSer');

// Create a new XMLHttpRequest.
    const request = new XMLHttpRequest();
    request.open('GET', 'getService?Type='+inpSerType.value, true);
    request.send();

// Handle state changes for the request.
    request.onreadystatechange = function (response) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // Parse the JSON
                var jsonOptions = JSON.parse(request.responseText)
                // dataList.options.length = 0;
                while (dataList.firstChild){
                    dataList.removeChild(dataList.firstChild)
                }
                // Loop over the JSON array.
                jsonOptions.forEach(function (item) {

                    // Create a new <option> element.
                    var option = document.createElement('option')
                    // Set the value using the item in the JSON array.
                    option.value = item.Name;
                    // Add the <option> element to the <datalist>.
                    dataList.appendChild(option);
                });

                // Update the placeholder text.
                input.placeholder = "Начните вводить";
            } else {
                // An error occured :(
                input.placeholder = "Ошибка"
            }
        }
    };
}

$("#ajax2").change(function() {
    //alert('ddddd');
    var model = document.getElementById('ajax2');
    var request = new XMLHttpRequest();
    request.open('GET', 'getYar?model='+model.value, true);
    request.send();

// Handle state changes for the request.
    request.onreadystatechange = function (response) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // Parse the JSON
                var jsonOptions = JSON.parse(request.responseText)
                var year = document.getElementById('inputYear');
                year.min = jsonOptions.StartYear;
                if (jsonOptions.finishYear !== null)
                    year.max = jsonOptions.finishYear;
                else
                    year.max = 2019

                // Update the placeholder text.
                //input.placeholder = "Начните вводить";
            } else {
                // An error occured :(
                //input.placeholder = "Ошибка"
            }
        }
    };
});

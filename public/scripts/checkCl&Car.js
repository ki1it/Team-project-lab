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

//Получить типы услуг
let request1 = new XMLHttpRequest();
request1.open('GET', 'getServiceType', true);
request1.send();
let dataListST = document.getElementById('json-datalistUslType');
var inputST = document.getElementById('inpSerType');
// Handle state changes for the request.
request1.onreadystatechange = function (response) {
    if (request1.readyState === 4) {
        if (request1.status === 200) {

            // Parse the JSON
            var jsonOptions = JSON.parse(request1.responseText)
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

//Получить типы поломок
request2 = new XMLHttpRequest();
request2.open('GET', 'getBreakType', true);
request2.send();
let dataListBT = document.getElementById('json-datalisttiB');
var inputBT = document.getElementById('tiB');
// Handle state changes for the request.
request2.onreadystatechange = function (response) {
    if (request2.readyState === 4) {
        if (request2.status === 200) {
            // Parse the JSON
            var jsonOptions = JSON.parse(request2.responseText)
            // Loop over the JSON array.
            jsonOptions.forEach(function (item) {
                // Create a new <option> element.
                var option = document.createElement('option')
                // Set the value using the item in the JSON array.
                option.value = item.Name;
                // Add the <option> element to the <datalist>.
                dataListBT.appendChild(option);
            });

            // Update the placeholder text.
            inputBT.placeholder = "Начните вводить";
        } else {
            // An error occured :(
            inputBT.placeholder = "Ошибка"
        }
    }
};

//Проверка Физ клиента
$("#inputClient").change(function() {
    checkClient()
});

// Set up and make the request.
function checkClient() {
    // checkCL.innerHTML = ' ... ';
    const cli = document.getElementById('inputClient');
    const txt = document.getElementById('clientText');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'checkClient?DLN='+cli.value, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }
        if(xhr.response)
        // обработать результат
        txt.innerHTML = xhr.responseText;

        if (xhr.responseText === "Клиент не найден" )
            cli.dataValues = '';
    }

    xhr.send(null);

}
//Проверка Юр клиента
$("#inputUrClient").change(function() {
    checkUrClient()
});

// Set up and make the request.
function checkUrClient() {
    // checkCL.innerHTML = ' ... ';
    const cli = document.getElementById('inputUrClient');
    const txt = document.getElementById('clientText');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'checkUrClient?INN='+cli.value, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }
        if(xhr.response)
        // обработать результат
            txt.innerHTML = xhr.responseText;

        if (xhr.responseText === "Клиент не найден" )
            cli.dataValues = '';
    }

    xhr.send(null);

}

//Проверка атомобиля
$("#inputCar").change(function() {
    checkCar()
});



function checkCar() {
    // checkCL.innerHTML = ' ... ';

    const car = document.getElementById('inputCar');
    const txt = document.getElementById('carText');

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'checkCar?NUM='+car.value, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }
        if(xhr.response)
        // обработать результат
            txt.innerHTML = xhr.responseText;
        if (xhr.responseText === "Автомобиль не найден" )
            car.dataValues = '';
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

function getBreaks() {

    const dataList = document.getElementById('json-datalistbre');
    const input = document.getElementById('bre');

// Create a new XMLHttpRequest.
    const request = new XMLHttpRequest();
    request.open('GET', 'getBreak?Type='+tiB.value, true);
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
    chekMod();
});


function chekMod() {
    var brend = document.getElementById('ajax1');
    var model = document.getElementById('ajax2');
    var request = new XMLHttpRequest();
    request.open('GET', 'getYear?model='+model.value, true);
    request.send();
    request.onreadystatechange = function (response) {



        if (request.readyState === 4) {
            if (request.status === 200) {
                if ( request.responseText == "null"){
                    alert('Такой модели не существует. Введите другую');
                    model.value = "";
                }
                else {
                    // Parse the JSON
                    var jsonOptions = JSON.parse(request.responseText)

                    if (jsonOptions.Brand.Brand === brend.value) {

                        var year = document.getElementById('inputYear');
                        year.min = jsonOptions.StartYear;
                        if (jsonOptions.finishYear !== null)
                            year.max = jsonOptions.finishYear;
                        else
                            year.max = 2019
                    }
                    else {
                        alert('Такой модели не существует. Введите другую');
                        model.value = "";
                    }
                }

                // Update the placeholder text.
                //input.placeholder = "Начните вводить";
            } else {
                alert('Такой модели не существует. Введите другую');
                model.value = "";
                // An error occured :(
                //input.placeholder = "Ошибка"
            }


        }
    };
}


function chekYear() {
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
}

$("#ajax1").change(function() {
    //alert('ddddd');
    chekBr();
});

function chekBr()
{
    var brend = document.getElementById('ajax1');
    var request = new XMLHttpRequest();
    request.open('GET', 'getBr?brand='+brend.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такого бренда не существует. Введите другой');
            brend.value = "";
        }
    }
}

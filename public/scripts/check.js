$("#ei").change(function() {
    var ob = document.getElementById('ei');
    var request = new XMLHttpRequest();
    request.open('GET', 'getEI?text='+ob.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такой единицы измерения не существует. Введите другую');
            ob.value = "";
        }
    }
});

$("#tiB").change(function() {
    var ob = document.getElementById('tiB');
    var request = new XMLHttpRequest();
    request.open('GET', 'getTIB?text='+ob.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такого типа не существует. Введите другой');
            ob.value = "";
        }
    }
});


$("#bre").change(function() {
    var ob = document.getElementById('bre');
    var Tob = document.getElementById('tiB');
    var request = new XMLHttpRequest();
    request.open('GET', 'getBre?text='+ob.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такой поломки не существует. Введите другую');
            ob.value = "";
        }
        else
        {
            var jsonOptions = JSON.parse(request.responseText)
            if (jsonOptions.BreakdownType.Name !== Tob.value) {
                alert('Такой поломки не существует. Введите другую');
                ob.value = "";
            }
        }
    }
});


$("#inpSerType").change(function() {
    var ob = document.getElementById('inpSerType');
    var request = new XMLHttpRequest();
    request.open('GET', 'getTIS?text='+ob.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такого типа не существует. Введите другой');
            ob.value = "";
        }
    }
});


$("#inpSer").change(function() {
    var ob = document.getElementById('inpSer');
    var Tob = document.getElementById('inpSerType');
    var request = new XMLHttpRequest();
    request.open('GET', 'getSe?text='+ob.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такой услуги не существует. Введите другую');
            ob.value = "";
        }
        else
        {
            var jsonOptions = JSON.parse(request.responseText)
            if (jsonOptions.ServiceType.Name !== Tob.value) {
                alert('Такой услуги не существует. Введите другую');
                ob.value = "";
            }
        }
    }
});


$("#detail").change(function() {
    var ob = document.getElementById('detail');
    var request = new XMLHttpRequest();
    request.open('GET', 'getDetail?text='+ob.value, true);
    request.send();
    request.onreadystatechange = function (response) {
        if ( request.responseText == "null"){
            alert('Такого запчасти не существует. Введите другую');
            ob.value = "";
        }
    }
});
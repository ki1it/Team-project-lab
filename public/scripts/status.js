$("#st").change(function() {
    chan();
});


chan();
function chan()
{
    var text = document.getElementById("st");
    if (text.value === "Приём")
    {

        $("#nol").show();
        $("#dataCl").hide();
        $("#br").hide();
        $("#det").hide();
    }
    else
    if(text.value === "Осмотр")
    {
        $("#nol").show();
        $("#dataCl").hide();
        $("#br").show();
        $("#det").show();

    }
    else
    if(text.value === "В работе")
    {
        $("#nol").show();
        $("#dataCl").hide();
        $("#br").show();
        $("#det").show();
    }
    else
    if(text.value === "Закрыт")
    {
        $("#nol").hide();
        $("#dataCl").show();
        $("#br").show();
        $("#det").show();
    }
}


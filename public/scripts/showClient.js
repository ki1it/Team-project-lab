$("#URclient").hide();
$('#showClient').change(function() {
    if(this.checked === true){
        $("#client").hide();
        $("#URclient").show();
    }
    else{
        $("#client").show();
        $("#URclient").hide();
    }
});
$("#ur").hide();
$('#customToggle12').change(function() {
    if(this.checked === true){
        $("#cl").hide();
        $("#ur").show();
    }
    else{
        $("#cl").show();
        $("#ur").hide();
    }
});
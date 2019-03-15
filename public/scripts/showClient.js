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
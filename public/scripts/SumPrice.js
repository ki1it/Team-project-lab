sum();
function sum()
{
    var totalSum = 0;
    var table = document.getElementById("tab1");
    for (var i = 1, row; row = table.rows[i]; i++) {
        // итерирование по столбцам
        col = row.cells[3];
        totalSum += parseFloat(col.firstChild.nodeValue);
    }
    var table2 = document.getElementById("tab2");
    for (var i = 1, row; row = table2.rows[i]; i++) {
        // итерирование по столбцам
        col = row.cells[3];
        totalSum += parseFloat(col.firstChild.nodeValue);
    }
    var table3 = document.getElementById("tab3");
    for (var i = 1, row; row = table3.rows[i]; i++) {
        // итерирование по столбцам
        col = row.cells[3];
        totalSum += parseFloat(col.firstChild.nodeValue);
    }
    //console.log('итоговая сумма: ' + totalSum);
    var el = document.getElementById('pr');
    el.value = totalSum;
    return totalSum
}
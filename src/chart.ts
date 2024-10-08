let saveAccounts = [];

// Google chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    saveAccounts = JSON.parse(localStorage.getItem('accounts'));

    let luz: number = 0;
    let agua: number = 0;
    let fixo: number = 0;
    let pix: number = 0;
    let compras: number = 0;
    for (let i:number = 0; i < saveAccounts.length; i++) {

        switch (saveAccounts[i].type) {
            case 'Luz':
                luz += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                break
            case 'Água':
                agua += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                break
            case 'Fixo':
                fixo += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                break
            case 'Pix':
                pix += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                break
            case 'Compras':
                compras += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                break
            default:
                console.error('Error');
        }
    }
    // Data
    const data = google.visualization.arrayToDataTable([
        ['type', 'value'],
        ['Luz', luz],
        ['Água', agua],
        ['Conta Fixa', fixo],
        ['Pix', pix],
        ['Compras', compras]
      ]);

      const options = {
        title:'Gastos',
        is3D:true,
        borderRadius: 10,
        titleTextStyle: {
            fontSize: 20,
            bold: true
        }
      };

    // Draw
    const chart = new google.visualization.PieChart($('#myChart'));
    chart.draw(data, options);
}
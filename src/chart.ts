let saveAccounts = [];

// Google chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    if (localStorage.getItem('accounts')) {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));

        let luz: number = 0;
        let agua: number = 0;
        let fixo: number = 0;
        let pix: number = 0;
        let compras: number = 0;
        let internet: number = 0;
        let cartao: number = 0;
        let mercado: number = 0;
        let telefone: number = 0;
        let aluguel: number = 0;
        let outros: number = 0;
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
                case 'Internet':
                    internet += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                    break
                case 'Cartão':
                    cartao += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                    break
                case 'Mercado':
                    mercado += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                    break
                case 'Telefone':
                    telefone += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                    break
                case 'Aluguel':
                    aluguel += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
                    break
                case 'Outro':
                    outros += Number(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));
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
            ['Compras', compras],
            ['Internet', internet],
            ['Cartão', cartao],
            ['Mercado', mercado],
            ['Telefone', telefone],
            ['Aluguel', aluguel],
            ['Outros', outros],
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
        const chart = new google.visualization.PieChart(document.getElementById('myChart'));
        chart.draw(data, options);
    } else {
        
    }
}
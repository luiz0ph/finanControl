// Function to load the tables.
function loadAccounts() {
    // Clear the entire table and add the titles.
    $('#pay').html(`
        <tr>
            <th>
                Tipo
            </th>
            <th>
                Valor
            </th>
            <th>
                Venc
            </th>
            <th>
                Parcelas
            </th>
            <th>
                Pagar
            </th>
        </tr>`);
    $('#accounts').html(`
        <tr>
            <th>
                Tipo
            </th>
            <th>
                Valor
            </th>
            <th>
                Venc
            </th>
            <th>
                Parcelas
            </th>
            <th>
                Status
            </th>
            <th>
                Edit
            </th>
        </tr>`);
    // String JSON
    const accountsJson = localStorage.getItem('accounts');
    // If the variable accountsJson exists
    if (accountsJson) {
        // To convert a JSON string to an object
        saveAccounts = JSON.parse(accountsJson);
        // Loop to load the table rows
        for (let i = 0; i < saveAccounts.length; i++) {
            // If the account has not been paid yet.
            if (!saveAccounts[i].paid) {
                $('#pay').append(`
                    <tr>
                        <td>${saveAccounts[i].type}</td>
                        <td>${saveAccounts[i].value}</td>
                        <td>${saveAccounts[i].due}</td>
                        <td>${saveAccounts[i].installments}X</td>
                        <td><button class="btn-pay" data-index="${i}">Pagar</button></td>
                    </tr>`);
            }
            let status;
            let color;
            if (saveAccounts[i].paid) {
                color = "#00ff00";
                status = "Pago";
            }
            else {
                color = "#ff0000";
                status = "A Pagar";
            }
            $('#accounts').append(`
                <tr>
                    <td>${saveAccounts[i].type}</td>
                    <td>${saveAccounts[i].value}</td>
                    <td>${saveAccounts[i].due}</td>
                    <td>${saveAccounts[i].installments}X</td>
                    <td style="color: ${color};">${status}</td>
                    <td>
                        <button class="btn-edit" data-index="${i}">
                            <img src="/public/img/icons/config-icon.svg" alt="">
                        </button>
                    </td>
                </tr>`);
        }
    }
    else {
        // Error
        console.error('Nenhuma conta encontrada no localStorage.');
    }
}
function save() {
    saveAccounts = saveAccounts.sort((a, b) => {
        const dateA = parseDate(a.due);
        const dateB = parseDate(b.due);
        return dateB.getTime() - dateA.getTime();
    });
    // Transform into a JSON string.
    const accounts = JSON.stringify(saveAccounts, null, 2);
    if (localStorage) {
        // Store the accounts locally.
        localStorage.setItem('accounts', accounts);
        loadAccounts();
        loadDashboard();
        console.log('Contas salvas com sucesso');
    }
    else {
        // Alert if the user's device is not compatible with localStorage
        alert('Seu dispositivo não é compativel com o salvamento local');
    }
}

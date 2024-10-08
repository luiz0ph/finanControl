$(document).ready(() => {
    let saveAccounts = [];
    let salary = {
        salary: '0',
        date: 0,
        balance: '0',
        lastUpdate: {
            month: getCurrentDate().month,
            year: getCurrentDate().year
        }
    };
    // Load the tables when the window is reloaded.
    $(window).on('load', () => {
        salary = JSON.parse(localStorage.getItem('salary'));
        loadAccounts();
    });
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
            console.log('Contas salvas com sucesso');
        }
        else {
            // Alert if the user's device is not compatible with localStorage
            alert('Seu dispositivo não é compativel com o salvamento local');
        }
    }
    // Mask input
    $('#value').mask('000.000.000.000.000,00', { reverse: true }); // Mask money index
    $('#value-pay').mask('000.000.000.000.000,00', { reverse: true }); // Mask money pay
    $('#venc').mask('00/00/0000'); // Mask date
    $('#venc-pay').mask('00/00/0000'); // Mask date
    // Modal
    // Open Modal
    function openModal() {
        // if on the todos page
        if (window.location.href.indexOf('todos') > -1) {
            const date = new Date();
            const formattedDate = [
                String(date.getDate()).padStart(2, '0'),
                String(date.getMonth() + 1).padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            $('#venc').val(formattedDate);
            // Open Modal 
            $('#modal-add').show(400);
            $('body').css('overflow', 'hidden');
        }
        else {
            const date = new Date();
            const formattedDate = [
                String(date.getDate()).padStart(2, '0'),
                String(date.getMonth() + 1).padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            $('#venc-pay').val(formattedDate);
            // open Modal  
            $('#modal-add-pay').show(400);
            $('body').css('overflow', 'hidden');
        }
    }
    // Close Modal
    function closeModal() {
        if (window.location.href.indexOf('todos') > -1) {
            $('#modal-add').hide(400);
            $('body').css('overflow', 'auto');
        }
        else {
            $('#modal-add-pay').hide(400);
            $('body').css('overflow', 'auto');
        }
    }
    // Open modal add
    $(document).on('click', '#add-account-area', function () {
        openModal();
    });
    $(document).on('click', '#add-account-area-pay', function () {
        openModal();
    });
    // close modal Index
    $(document).on('click', '#btn-close-add', function () {
        closeModal();
    });
    $(window).on('click', (event) => {
        if (event.target === $('#modal-add').get(0)) {
            closeModal();
        }
    });
    // Close modal pay
    $(document).on('click', '#btn-close-add-pay', function () {
        closeModal();
    });
    $(window).on('click', (event) => {
        if (event.target === $('#modal-add-pay').get(0)) {
            closeModal();
        }
    });
    // Modal end
    // Add new account
    function addNewAccount() {
        // Index
        if (window.location.href.indexOf('todos') > -1) {
            // If all fields have been filled out
            if ($('#value').val() === '' || $('#venc').val() === '' || $('#parcelas').val() === '') {
                alert('Preencha Todos os campos');
            }
            else {
                // Values taken from the inputs
                const type = String($('#type').val());
                const value = String($('#value').val());
                const venc = String($('#venc').val());
                const parcelas = Number($('#parcelas').val());
                // Check if it has been paid or not.
                let pago;
                if ($('#pago').val() === 'true') {
                    pago = true;
                }
                else {
                    pago = false;
                }
                // Create an object with the retrieved values
                const newAccount = new account(type, value, venc, parcelas, pago);
                // Store the object in an array to create the table.
                saveAccounts.push(newAccount);
                save();
                $('#modal-add').toggle(400);
                $('body').css('overflow', 'auto');
                // Clear modal inputs after adding
                $('#value').val('');
                $('#venc').val('');
                $('#parcelas').val('');
                $('#pago').val('false');
                location.reload();
            }
        }
        else {
            // If all fields have been filled out
            if ($('#value-pay').val() === '' || $('#venc-pay').val() === '' || $('#parcelas-pay').val() === '') {
                alert('Preencha Todos os campos');
            }
            else {
                // Values taken from the inputs
                const type = String($('#type-pay').val());
                const value = String($('#value-pay').val());
                const venc = String($('#venc-pay').val());
                const parcelas = Number($('#parcelas-pay').val());
                // Check if it has been paid or not.
                let pago;
                if ($('#pago-pay').val() === 'true') {
                    pago = true;
                }
                else {
                    pago = false;
                }
                // Create an object with the retrieved values
                const newAccount = new account(type, value, venc, parcelas, pago);
                // Store the object in an array to create the table.
                saveAccounts.push(newAccount);
                save();
                $('#modal-add-pay').toggle(400);
                $('body').css('overflow', 'auto');
                // Clear modal inputs after adding
                $('#value-pay').val('');
                $('#venc-pay').val('');
                $('#parcelas-pay').val('');
                $('#pago-pay').val('false');
            }
        }
    }
    // Submit add account index
    $(document).on('click', '#btn-submit-add', function () {
        addNewAccount();
    });
    // Submit add account pay
    $(document).on('click', '#btn-submit-add-pay', function () {
        addNewAccount();
    });
    // Table
    // Function to load the tables.
    function loadAccounts() {
        // Index
        if (window.location.href.indexOf('todos') > -1) {
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
                }
            }
            else {
                // Error
                console.error('Nenhuma conta encontrada no localStorage.');
            }
        }
        else {
            // Clear the entire table and add the titles.
            $('#pay-pay').html(`
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
                        $('#pay-pay').append(`
                            <tr>
                                <td>${saveAccounts[i].type}</td>
                                <td>${saveAccounts[i].value}</td>
                                <td>${saveAccounts[i].due}</td>
                                <td>${saveAccounts[i].installments}X</td>
                                <td><button class="btn-pay-pay" data-index="${i}">Pagar</button></td>
                            </tr>`);
                    }
                }
            }
            else {
                // Error
                console.error('Nenhuma conta encontrada no localStorage.');
            }
        }
    }
    // Table end
    // Function to pay the account
    $(document).on('click', '.btn-pay', function () {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        salary = JSON.parse(localStorage.getItem('salary'));
        const index = $(this).data('index');
        saveAccounts[index].paid = true;
        let currentBalance = parseFloat(salary.balance.replace(/\./g, '').replace(',', '.'));
        let value = parseFloat(saveAccounts[index].value.replace(/\./g, '').replace(',', '.'));
        currentBalance -= value;
        salary.balance = String(currentBalance);
        salary.balance = currentBalance.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const salaryJSON = JSON.stringify(salary);
        localStorage.setItem('salary', salaryJSON);
        save();
        location.reload();
    });
    $(document).on('click', '.btn-pay-pay', function () {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        salary = JSON.parse(localStorage.getItem('salary'));
        const index = $(this).data('index');
        saveAccounts[index].paid = true;
        let currentBalance = parseFloat(salary.balance.replace(/\./g, '').replace(',', '.'));
        let value = parseFloat(saveAccounts[index].value.replace(/\./g, '').replace(',', '.'));
        currentBalance -= value;
        salary.balance = String(currentBalance);
        salary.balance = currentBalance.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const salaryJSON = JSON.stringify(salary);
        localStorage.setItem('salary', salaryJSON);
        save();
        location.reload();
    });
    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }
    function getCurrentDate() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        return { day, month, year };
    }
    class account {
        constructor(type, value, due, installments, paid) {
            this.type = type;
            this.value = value;
            this.due = due;
            this.installments = installments;
            this.paid = paid;
        }
    }
});

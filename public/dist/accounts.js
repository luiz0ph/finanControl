$(document).ready(() => {
    let saveAccounts = [];
    // Load the tables when the window is reloaded.
    $(window).on('load', () => {
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
    $('#value-edit').mask('000.000.000.000.000,00', { reverse: true }); // Mask money index
    $('#value-edit-account').mask('000.000.000.000.000,00', { reverse: true }); // Mask money pay
    $('#due-edit').mask('00/00/0000'); // Mask date
    $('#due-edit-account').mask('00/00/0000'); // Mask date
    // Modal
    // Modal index
    $(document).on('click', '.btn-edit', function () {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        const index = $(this).data('index');
        // Modal edit
        $('#modal-edit').show(400);
        $('body').css('overflow', 'hidden');
        $('#type-edit').val(saveAccounts[index].type);
        $('#value-edit').val(saveAccounts[index].value);
        $('#due-edit').val(saveAccounts[index].due);
        $('#installments-edit').val(saveAccounts[index].installments);
        $('#paid-edit').val(String(saveAccounts[index].paid));
        $('#btn-submit-edit').off('click').on('click', () => {
            saveAccounts[index].type = String($('#type-edit').val());
            saveAccounts[index].value = String($('#value-edit').val());
            saveAccounts[index].due = String($('#due-edit').val());
            saveAccounts[index].installments = Number($('#installments-edit').val());
            saveAccounts[index].paid = $('#paid-edit').val() === 'true';
            save();
            $('#modal-edit').hide(400);
            $('body').css('overflow', 'auto');
            location.reload();
        });
        $('#btn-delete').off('click').on('click', () => {
            saveAccounts.splice(index, 1);
            save();
            $('#modal-edit').hide(400);
            $('body').css('overflow', 'auto');
            location.reload();
        });
    });
    // Modal accounts
    $(document).on('click', '.btn-edit-account', function () {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        const index = $(this).data('index');
        // Modal edit
        $('#modal-edit-account').show(400);
        $('body').css('overflow', 'hidden');
        $('#type-edit-account').val(saveAccounts[index].type);
        $('#value-edit-account').val(saveAccounts[index].value);
        $('#due-edit-account').val(saveAccounts[index].due);
        $('#installments-edit-account').val(saveAccounts[index].installments);
        $('#paid-edit-account').val(String(saveAccounts[index].paid));
        $('#btn-submit-edit-account').off('click').on('click', () => {
            saveAccounts[index].type = String($('#type-edit-account').val());
            saveAccounts[index].value = String($('#value-edit-account').val());
            saveAccounts[index].due = String($('#due-edit-account').val());
            saveAccounts[index].installments = Number($('#installments-edit-account').val());
            saveAccounts[index].paid = $('#paid-edit-account').val() === 'true';
            save();
            $('#modal-edit-account').hide(400);
            $('body').css('overflow', 'auto');
            location.reload();
        });
        $('#btn-delete-account').off('click').on('click', () => {
            saveAccounts.splice(index, 1);
            save();
            $('#modal-edit-account').hide(400);
            $('body').css('overflow', 'auto');
            location.reload();
        });
    });
    function closeModal() {
        $('#modal-edit').hide(400);
        $('#modal-edit-account').hide(400);
        $('body').css('overflow', 'auto');
    }
    // Close Modal
    $(document).on('click', '#btn-close-edit', function () {
        closeModal();
    });
    $(document).on('click', '#btn-close-edit-account', function () {
        closeModal();
    });
    $(window).on('click', (event) => {
        if (event.target === $('#modal-edit').get(0)) {
            closeModal();
        }
    });
    $(window).on('click', (event) => {
        if (event.target === $('#modal-edit-account').get(0)) {
            closeModal();
        }
    });
    // Function to load the tables.
    function loadAccounts() {
        if (window.location.href.indexOf('todos') > -1) {
            // Clear the entire table and add the titles.
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
        else {
            // Clear the entire table and add the titles.
            $('#accounts-account').html(`
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
                    $('#accounts-account').append(`
                        <tr>
                            <td>${saveAccounts[i].type}</td>
                            <td>${saveAccounts[i].value}</td>
                            <td>${saveAccounts[i].due}</td>
                            <td>${saveAccounts[i].installments}X</td>
                            <td style="color: ${color};">${status}</td>
                            <td>
                                <button class="btn-edit-account" data-index="${i}">
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
    }
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

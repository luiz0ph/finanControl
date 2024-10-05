$(document).ready(function () {
    var saveAccounts = [];
    function save() {
        // Transform into a JSON string.
        var accounts = JSON.stringify(saveAccounts, null, 2);
        if (localStorage) {
            // Store the accounts locally.
            localStorage.setItem('accounts', accounts);
            loadAccounts();
            console.log('Contas salvas com sucesso');
            $('#modal-add').toggle(400); // Close the modal
            $('body').css('overflow', 'auto');
        }
        else {
            // Alert if the user's device is not compatible with localStorage
            alert('Seu dispositivo não é compativel com o salvamento local');
        }
    }
    // Open modal config
    $('#btn-config').on('click', function () {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'hidden');
    });
    // Close modal btn
    $('#btn-close-config').on('click', function () {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'auto');
    });
    // Close modal on click in document
    $(window).on('click', function (event) {
        // I don't know why, but Visual Studio Code is showing an error when there isn't any error.
        if (event.target === $('#modal-config').get(0)) {
            $('#modal-config').toggle(400);
            $('body').css('overflow', 'auto');
        }
    });
    var account = /** @class */ (function () {
        function account(type, value, due, installments, paid) {
            this.type = type;
            this.value = value;
            this.due = due;
            this.installments = installments;
            this.paid = paid;
        }
        return account;
    }());
    // Mask input
    $('.input-money').mask('000.000.000.000.000,00', { reverse: true }); // Mask money
    $('.input-date').mask('00'); // Mask date
    // Open modal add
    $('#add-account-area').on('click', function () {
        $('#modal-add').toggle(400);
        $('body').css('overflow', 'hidden');
    });
    // close modal
    $('#btn-close-add').on('click', function () {
        $('#modal-add').toggle(400);
        $('body').css('overflow', 'auto');
    });
    // Close modal on click in document
    $(window).on('click', function (event) {
        if (event.target === $('#modal-add').get(0)) {
            $('#modal-add').toggle(400);
            $('body').css('overflow', 'auto');
        }
    });
    // Submit add account 
    $('#btn-submit-add').on('click', function () {
        // If all fields have been filled out
        if ($('#value').val() === '' || $('#venc').val() === '' || $('#parcelas').val() === '') {
            alert('Preencha Todos os campos');
        }
        else {
            // Values taken from the inputs
            var type = String($('#type').val());
            var value = String($('#value').val());
            var venc = String($('#venc').val());
            var parcelas = Number($('#parcelas').val());
            // Check if it has been paid or not.
            var pago = void 0;
            if ($('#pago').val() === 'true') {
                pago = true;
            }
            else {
                pago = false;
            }
            // Create an object with the retrieved values
            var newAccount = new account(type, value, venc, parcelas, pago);
            // Store the object in an array to create the table.
            saveAccounts.push(newAccount);
            save();
        }
    });
    // Load the tables when the window is reloaded.
    $(window).on('load', function () {
        loadAccounts();
    });
    // Function to load the tables.
    function loadAccounts() {
        // Clear the entire table and add the titles.
        $('#pay').html("\n            <tr>\n                <th>\n                    Tipo\n                </th>\n                <th>\n                    Valor\n                </th>\n                <th>\n                    Venc\n                </th>\n                <th>\n                    Parcelas\n                </th>\n                <th>\n                    Pagar\n                </th>\n            </tr>");
        $('#accounts').html("\n            <tr>\n                <th>\n                    Tipo\n                </th>\n                <th>\n                    Valor\n                </th>\n                <th>\n                    Venc\n                </th>\n                <th>\n                    Parcelas\n                </th>\n                <th>\n                    Status\n                </th>\n                <th>\n                    Edit\n                </th>\n            </tr>");
        // String JSON
        var accountsJson = localStorage.getItem('accounts');
        // If the variable accountsJson exists
        if (accountsJson) {
            // To convert a JSON string to an object
            saveAccounts = JSON.parse(accountsJson);
            saveAccounts = saveAccounts.sort(function (a, b) {
                var dateA = parseDate(a.due);
                var dateB = parseDate(b.due);
                return dateB.getTime() - dateA.getTime();
            });
            // Loop to load the table rows
            for (var i = 0; i < saveAccounts.length; i++) {
                // If the account has not been paid yet.
                if (!saveAccounts[i].paid) {
                    $('#pay').append("\n                        <tr>\n                            <td>".concat(saveAccounts[i].type, "</td>\n                            <td>").concat(saveAccounts[i].value, "</td>\n                            <td>").concat(saveAccounts[i].due, "</td>\n                            <td>").concat(saveAccounts[i].installments, "X</td>\n                            <td><button class=\"btn-pay\" data-index=\"").concat(i, "\">Pagar</button></td>\n                        </tr>"));
                }
                var status_1 = void 0;
                var color = void 0;
                if (saveAccounts[i].paid) {
                    color = "#00ff00";
                    status_1 = "Pago";
                }
                else {
                    color = "#ff0000";
                    status_1 = "A Pagar";
                }
                $('#accounts').append("\n                    <tr>\n                        <td>".concat(saveAccounts[i].type, "</td>\n                        <td>").concat(saveAccounts[i].value, "</td>\n                        <td>").concat(saveAccounts[i].due, "</td>\n                        <td>").concat(saveAccounts[i].installments, "X</td>\n                        <td style=\"color: ").concat(color, ";\">").concat(status_1, "</td>\n                        <td>\n                            <button class=\"btn-edit\" data-index=\"").concat(i, "\">\n                                <img src=\"/public/img/icons/config-icon.svg\" alt=\"\">\n                            </button>\n                        </td>\n                    </tr>"));
            }
        }
        else {
            // Error
            console.error('Nenhuma conta encontrada no localStorage.');
        }
    }
    // Function to pay the account
    $(document).on('click', '.btn-pay', function () {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        // Get the stored data from the HTML tag.
        var index = $(this).data('index');
        // Access by the index retrieved from the HTML tag.
        saveAccounts[index].paid = true;
        // Store locally and reload the table.
        var accounts = JSON.stringify(saveAccounts, null, 2);
        localStorage.setItem('accounts', accounts);
        loadAccounts();
    });
    $(document).on('click', '.btn-edit', function () {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        var index = $(this).data('index');
        // Modal edit
        $('#modal-edit').toggle(400);
        $('body').css('overflow', 'hidden');
        var type = saveAccounts[index].type;
        var value = saveAccounts[index].value;
        var due = saveAccounts[index].due;
        var installments = saveAccounts[index].installments;
        var paid = String(saveAccounts[index].paid);
        $('#type-edit').val(type);
        $('#value-edit').val(value);
        $('#due-edit').val(due);
        $('#installments-edit').val(installments);
        $('#paid-edit').val(paid);
        $('#btn-submit-edit').on('click', function () {
            saveAccounts[index].type = String($('#type-edit').val());
            saveAccounts[index].value = String($('#value-edit').val());
            saveAccounts[index].due = String($('#due-edit').val());
            saveAccounts[index].installments = Number($('#installments-edit').val());
            saveAccounts[index].paid = Boolean($('#paid-edit').val());
            $('#modal-edit').toggle(400);
            $('body').css('overflow', 'auto');
        });
    });
    function parseDate(dateStr) {
        var _a = dateStr.split('/').map(Number), day = _a[0], month = _a[1], year = _a[2];
        return new Date(year, month - 1, day);
    }
    $('#btn-close-edit').on('click', function () {
        $('#modal-edit').toggle(400);
        $('body').css('overflow', 'auto');
    });
    $(window).on('click', function (event) {
        if (event.target === $('#modal-edit').get(0)) {
            $('#modal-edit').toggle(400);
            $('body').css('overflow', 'auto');
        }
    });
    // Mask input
    $('#venc').mask('00/00/0000');
});

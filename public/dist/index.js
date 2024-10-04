$(document).ready(function () {
    var saveAccounts = [];
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
        if ($('#value').val() === '' || $('#venc').val() === '' || $('#parcelas').val() === '') {
            alert('Preencha Todos os campos');
        }
        else {
            var type = String($('#type').val());
            var value = Number($('#value').val());
            var venc = String($('#venc').val());
            var parcelas = Number($('#parcelas').val());
            var pago = void 0;
            if ($('#pago').val() === 'true') {
                pago = true;
            }
            else {
                pago = false;
            }
            var newAccount = new account(type, value, venc, parcelas, pago);
            saveAccounts.push(newAccount);
            var accounts = JSON.stringify(saveAccounts, null, 2);
            if (localStorage) {
                localStorage.setItem('accounts', accounts);
                loadAccounts();
                console.log('Contas salvas com sucesso');
                $('#modal-add').toggle(400);
                $('body').css('overflow', 'auto');
            }
            else {
                alert('Seu dispositivo não é compativel com o salvamento local');
            }
        }
    });
    $(window).on('load', function () {
        loadAccounts();
    });
    function loadAccounts() {
        $('#pay').html("\n            <tr>\n                <th>\n                    Tipo\n                </th>\n                <th>\n                    Valor\n                </th>\n                <th>\n                    Venc\n                </th>\n                <th>\n                    Parcelas\n                </th>\n                <th>\n                    Pagar\n                </th>\n            </tr>");
        // String JSON
        var accountsJson = localStorage.getItem('accounts');
        if (accountsJson) {
            // To convert a JSON string to an object.
            saveAccounts = JSON.parse(accountsJson);
            for (var i = 0; i < saveAccounts.length; i++) {
                if (!saveAccounts[i].paid) {
                    $('#pay').append("\n                        <tr>\n                            <td>".concat(saveAccounts[i].type, "</td>\n                            <td>").concat(saveAccounts[i].value, "</td>\n                            <td>").concat(saveAccounts[i].due, "</td>\n                            <td>").concat(saveAccounts[i].installments, "</td>\n                            <td><button>Pagar</button></td>\n                        </tr>"));
                }
            }
        }
        else {
            console.error('Nenhuma conta encontrada no localStorage.');
        }
    }
    // Mask input
    $('#venc').mask('00/00/0000');
});

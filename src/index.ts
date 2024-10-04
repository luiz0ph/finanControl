$(document).ready(() => {
    let saveAccounts: account[] = [];
    // Open modal config
    $('#btn-config').on('click', () => {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'hidden');
    })

    // Close modal btn
    $('#btn-close-config').on('click', () => {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'auto');
    })

    // Close modal on click in document
    $(window).on('click', (event) => {
        // I don't know why, but Visual Studio Code is showing an error when there isn't any error.
        if (event.target === $('#modal-config').get(0)) {
            $('#modal-config').toggle(400);
            $('body').css('overflow', 'auto');
        }
    })

    interface Account {
        type:string 
        value:number
        due:string // Due date
        installments:number
        paid:boolean
    }

    class account implements Account {
        type: string;
        value: number;
        due: string;
        installments: number;
        paid: boolean;
        constructor(type: string, value: number, due: string, installments: number, paid: boolean) {
            this.type = type;
            this.value = value;
            this.due = due;
            this.installments = installments;
            this.paid = paid;
        }
    }

    // Mask input
    $('.input-money').mask('000.000.000.000.000,00', {reverse: true}); // Mask money
    $('.input-date').mask('00'); // Mask date


    // Open modal add
    $('#add-account-area').on('click', () => {
        $('#modal-add').toggle(400);
        $('body').css('overflow', 'hidden');
    })

    // close modal
    $('#btn-close-add').on('click', () => {
        $('#modal-add').toggle(400);
        $('body').css('overflow', 'auto');
    })

    // Close modal on click in document
    $(window).on('click', (event) => {
        if (event.target === $('#modal-add').get(0)) {
            $('#modal-add').toggle(400);
            $('body').css('overflow', 'auto');
        }
    })

    // Submit add account 
    $('#btn-submit-add').on('click', () => {
        // If all fields have been filled out
        if ($('#value').val() === '' || $('#venc').val() === '' || $('#parcelas').val() === '' ) {
            alert('Preencha Todos os campos');
        } else {
            // Values taken from the inputs
            const type = String($('#type').val());
            const value = Number($('#value').val()); // Fix the error of value being null
            const venc = String($('#venc').val());
            const parcelas = Number($('#parcelas').val());

            // Check if it has been paid or not.
            let pago:boolean;
            if ($('#pago').val() === 'true') {
                pago = true;
            } else {
                pago = false;
            }

            // Create an object with the retrieved values
            const newAccount = new account(type, value, venc, parcelas, pago);

            // Store the object in an array to create the table.
            saveAccounts.push(newAccount);

            // Transform into a JSON string.
            const accounts = JSON.stringify(saveAccounts, null, 2); 
            
            if (localStorage) {
                // Store the accounts locally.
                localStorage.setItem('accounts', accounts);
                loadAccounts();
                console.log('Contas salvas com sucesso');
                $('#modal-add').toggle(400); // Close the modal
                $('body').css('overflow', 'auto');
            } else {
                // Alert if the user's device is not compatible with localStorage
                alert('Seu dispositivo não é compativel com o salvamento local');
            }
        }
    })

    // Load the tables when the window is reloaded.
    $(window).on('load', () => {
        loadAccounts();
    })

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
            </tr>`)

        // String JSON
        const accountsJson = localStorage.getItem('accounts');

        // If the variable accountsJson exists
        if (accountsJson) {
            // To convert a JSON string to an object
            saveAccounts = JSON.parse(accountsJson);
            
            // Loop to load the table rows
            for (let i: number = 0; i < saveAccounts.length; i++) {
                // If the account has not been paid yet.
                if (!saveAccounts[i].paid) {
                    $('#pay').append(`
                        <tr>
                            <td>${saveAccounts[i].type}</td>
                            <td>${saveAccounts[i].value}</td>
                            <td>${saveAccounts[i].due}</td>
                            <td>${saveAccounts[i].installments}</td>
                            <td><button>Pagar</button></td>
                        </tr>`);
                }
            }
        } else {
            // Error
            console.error('Nenhuma conta encontrada no localStorage.');
        }
    }

    // Mask input
    $('#venc').mask('00/00/0000')
})
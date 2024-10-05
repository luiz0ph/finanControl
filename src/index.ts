$(document).ready(() => {
    let saveAccounts: account[] = [];
    function save() {
        saveAccounts = saveAccounts.sort((a, b) => {
            const dateA = parseDate(a.due);
            const dateB = parseDate(b.due);
            return dateB.getTime() - dateA.getTime();
        })
        // Transform into a JSON string.
        const accounts = JSON.stringify(saveAccounts, null, 2); 
        
        if (localStorage) {
            // Store the accounts locally.
            localStorage.setItem('accounts', accounts);
            loadAccounts();
            console.log('Contas salvas com sucesso');
        } else {
            // Alert if the user's device is not compatible with localStorage
            alert('Seu dispositivo não é compativel com o salvamento local');
        }
    }
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
        value:string
        due:string // Due date
        installments:number
        paid:boolean
    }

    class account implements Account {
        type: string;
        value: string;
        due: string;
        installments: number;
        paid: boolean;
        constructor(type: string, value: string, due: string, installments: number, paid: boolean) {
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
        $('#venc').val(getCurrentDate());

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
            const value = String($('#value').val());
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

            save();

            $('#modal-add').toggle(400);
            $('body').css('overflow', 'auto');

             // Clear modal inputs after adding
             $('#type').val('');
             $('#value').val('');
             $('#venc').val('');
             $('#parcelas').val('');
             $('#pago').val('false');
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
                            <td>${saveAccounts[i].installments}X</td>
                            <td><button class="btn-pay" data-index="${i}">Pagar</button></td>
                        </tr>`);
                }

                let status:string;
                let color:string;
                if (saveAccounts[i].paid) {
                    color = "#00ff00"
                    status = "Pago"
                } else {
                    color = "#ff0000"
                    status = "A Pagar"
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
                    </tr>`)
            }
        } else {
            // Error
            console.error('Nenhuma conta encontrada no localStorage.');
        }
    }

    // Function to pay the account
    $(document).on('click', '.btn-pay', function() { // Do not replace with an arrow function because it causes an error.
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));

        // Get the stored data from the HTML tag.
        const index = $(this).data('index');
        // Access by the index retrieved from the HTML tag.
        saveAccounts[index].paid = true; 

        // Store locally and reload the table.
        const accounts = JSON.stringify(saveAccounts, null, 2);
        localStorage.setItem('accounts', accounts);
        loadAccounts();
    })

    $(document).on('click', '.btn-edit', function() {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        const index = $(this).data('index');

        // Modal edit
        $('#modal-edit').toggle(400);
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

            $('#modal-edit').toggle(400);
            $('body').css('overflow', 'auto');
        });

        $('#btn-delete').off('click').on('click', () => {
            saveAccounts.splice(index, 1);
            save();

            $('#modal-edit').toggle(400);
            $('body').css('overflow', 'auto');            
        })
    });

    function parseDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    function getCurrentDate(): string {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    $('#btn-close-edit').on('click', () => {
        $('#modal-edit').toggle(400);
        $('body').css('overflow', 'auto');   
    })

    $(window).on('click', (event) => {
        if (event.target === $('#modal-edit').get(0)) {
            $('#modal-edit').toggle(400);
            $('body').css('overflow', 'auto');
        }
    })

    // Mask input
    $('#venc').mask('00/00/0000')
})
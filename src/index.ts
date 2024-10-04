$(document).ready(() => {
    const accounts: account[] = [];
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
        if ($('#value').val() === '' || $('#venc').val() === '' || $('#parcelas').val() === '' ) {
            alert('Preencha Todos os campos');
        } else {
            const type = String($('#type').val());
            const value = Number($('#value').val());
            const venc = String($('#venc').val());
            const parcelas = Number($('#parcelas').val());
            let pago:boolean;
            if ($('#pago').val() === 'true') {
                pago = true;
            } else {
                pago = false;
            }
            const newAccount = new account(type, value, venc, parcelas, pago);
            accounts.push(newAccount);

            alert(JSON.stringify(accounts, null, 2));
        }
    })

    // Mask input
    $('#venc').mask('00/00/0000')
})
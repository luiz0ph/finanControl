$(document).ready(() => {
    let saveAccounts: account[] = [];

    let salary = {
        salary: '0',
        date: 0,
        balance: '0',
        lastUpdate: {
            month: getCurrentDate().month,
            year: getCurrentDate().year
        }
    }

    function getCurrentDate() {
        const today = new Date();
        const day = today.getDate(); 
        const month = today.getMonth(); 
        const year = today.getFullYear(); 
        return { day, month, year };
    }

    if (!localStorage.getItem('salary')) {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'hidden');
    }

    $('#btn-submit-config').on('click', () => {

        salary.salary = String($('#earnings').val());
        salary.date = Number($('#salary-date').val());
        salary.balance = String($('#current-balance').val());

        const salaryJSON = JSON.stringify(salary);
        localStorage.setItem('salary', salaryJSON);

        loadDashboard();

        $('#modal-config').toggle(400);
        $('body').css('overflow', 'auto');
    })

    // Load the tables when the window is reloaded.
    $(window).on('load', () => {
        salary = JSON.parse(localStorage.getItem('salary'));
        checkBalance();
        loadDashboard();
    })

    // Dashboard
    function loadDashboard(): void {
        saveAccounts = JSON.parse(localStorage.getItem('accounts'));
        salary = JSON.parse(localStorage.getItem('salary'));

        let toPay:number = 0;
        for (let i:number = 0; i < saveAccounts.length; i++) {
            let value = parseFloat(saveAccounts[i].value.replace(/\./g, '').replace(',', '.'));

            if (!saveAccounts[i].paid) {
                toPay += value;
            }
        }

        const valueBr:string = toPay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let Earnings = parseFloat(salary.salary.replace(/\./g, '').replace(',', '.'));
        Earnings -= toPay;
        const earningsBr: string = Earnings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
        const balance = Number(salary.balance.replace(/\./g, '').replace(',', '.')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
        $('#value-to-pay').text(valueBr);
        $('#value-earnings').text(earningsBr);
        $('#balance').text(balance);
    }

    const savedDay = parseInt(salary.date.toString());
    let lastUpdate = salary.lastUpdate;

    function addBalance() {
        let balance = parseFloat(salary.balance.replace(/\./g, '').replace(',', '.')) || 0;
        const add = parseFloat(salary.salary.replace(/\./g, '').replace(',', '.'));

        balance += add;
        salary.balance = String(balance);

        const currentDate = getCurrentDate();
        lastUpdate = { month: currentDate.month, year: currentDate.year };
        salary.lastUpdate = lastUpdate;

        const salaryJSON = JSON.stringify(salary);
        localStorage.setItem('salary', salaryJSON);
    }

    function checkBalance() {
        const currentDate = getCurrentDate();
        if (currentDate.day === savedDay && (lastUpdate.month !== currentDate.month || lastUpdate.year !== currentDate.year)) {
            addBalance();
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

    // Mask input
    $('.input-money').mask('000.000.000.000.000,00', {reverse: true}); // Mask money
    $('.input-date').mask('00'); // Mask date

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
})
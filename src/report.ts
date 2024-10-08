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

    // Load the tables when the window is reloaded.
    $(window).on('load', () => {
        const savedSalary = localStorage.getItem('salary');
        salary = savedSalary ? JSON.parse(savedSalary) : salary;
        checkBalance();
        loadDashboard();
    })

    if (!localStorage.getItem('salary')) {
        $('#modal-config').show(400);
        $('#modal-config-report').show(400);
        $('body').css('overflow', 'hidden');
    }

    $('#btn-submit-config').on('click', function() {

        salary.salary = String($('#earnings').val());
        salary.date = Number($('#salary-date').val());
        salary.balance = String($('#current-balance').val());

        const salaryJSON = JSON.stringify(salary);
        localStorage.setItem('salary', salaryJSON);

        loadDashboard();

        $('#modal-config').hide(400);
        $('body').css('overflow', 'auto');
    });

    $('#btn-submit-config-report').on('click',  function() {

        salary.salary = String($('#earnings-report').val());
        salary.date = Number($('#salary-date-report').val());
        salary.balance = String($('#current-balance-report').val());

        const salaryJSON = JSON.stringify(salary);
        localStorage.setItem('salary', salaryJSON);

        loadDashboard();

        $('#modal-config-report').hide(400);
        $('body').css('overflow', 'auto');
    });

    // Dashboard
    function loadDashboard(): void {
        if (window.location.href.indexOf('todos') > -1) {
            if (localStorage.getItem('salary')) {
                if (localStorage.getItem('accounts')) {
                    saveAccounts = JSON.parse(localStorage.getItem('accounts'));
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
                    $('#value-to-pay').text(valueBr);
                    $('#value-earnings').text(earningsBr);
                }

                salary = JSON.parse(localStorage.getItem('salary'));
                const balance = Number(salary.balance.replace(/\./g, '').replace(',', '.')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
                $('#balance').text(balance);
            } else {
                console.log('Nenhuma Conta encontrada');
            }
        } else {
            if (localStorage.getItem('salary')) {
                if (localStorage.getItem('accounts')) {
                    saveAccounts = JSON.parse(localStorage.getItem('accounts'));
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

                    $('#value-to-pay-account').text(valueBr);
                    $('#value-earnings-account').text(earningsBr);
                }
                
                salary = JSON.parse(localStorage.getItem('salary'));
                const balance = Number(salary.balance.replace(/\./g, '').replace(',', '.')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
                $('#balance-account').text(balance);
            } else {
                console.log('Nenhuma conta encontrada');
            }
        }
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


    // Modal
    // Open modal config
    $(document).on('click', '#btn-config', function() {
        $('#modal-config').show(400);
        $('body').css('overflow', 'hidden');
    });
    $(document).on('click', '#btn-config-account', function() {
        $('#modal-config-account').show(400);
        $('body').css('overflow', 'hidden');
    });
    // Close modal btn
    $(document).on('click', '#btn-close-config' , function() {
        $('#modal-config').hide(400);
        $('body').css('overflow', 'auto');
    });
    $(document).on('click', '#btn-close-config-account' , function() {
        $('#modal-config-account').hide(400);
        $('body').css('overflow', 'auto');
    });
    // Close modal on click in document
    $(window).on('click', (event) => {
        // I don't know why, but Visual Studio Code is showing an error when there isn't any error.
        if (event.target === $('#modal-config').get(0)) {
            $('#modal-config').hide(400);
            $('body').css('overflow', 'auto');
        }
    });
    $(window).on('click', (event) => {
        // I don't know why, but Visual Studio Code is showing an error when there isn't any error.
        if (event.target === $('#modal-config-account').get(0)) {
            $('#modal-config-account').hide(400);
            $('body').css('overflow', 'auto');
        }
    });

    // Mask input
    $('#earnings-account').mask('000.000.000.000.000,00', {reverse: true}); // Mask money
    $('#earnings').mask('000.000.000.000.000,00', {reverse: true}); // Mask money
    $('#current-balance').mask('000.000.000.000.000,00', {reverse: true}); // Mask money
    $('#current-balance-account').mask('000.000.000.000.000,00', {reverse: true}); // Mask money
    $('#salary-date-account').mask('00'); // Mask date
    $('#salary-date').mask('00'); // Mask date


    function parseDate(dateStr: string): Date {
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
});
const Modal = {
    open(){
        //Open modal
        //Adiction the class active to modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        //Close modal
        //Remove the class active from modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
    //Search about toggle function
}


const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '12/04/2021'
        }, 
        
        {
            description: 'Website',
            amount: 500000,
            date: '12/04/2021'
        },
        
        {
            description: 'Internet',
            amount: -20000,
            date: '12/04/2021'
        },
    
        {
            description: 'App',
            amount: 200000,
            date: '12/04/2021'
        },
    ],
    
    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0
        // pegar todas as transações
        // para cada transação se ela for maior do que zero
        Transaction.all.forEach(transaction => {
            // se for maior que zero
            if (transaction.amount > 0) {
                // somar a uma variável e retorná-la 
                income += transaction.amount;
            }
        })
        return income
    },

    expenses() {
        let expense = 0
        // pegar todas as transações
        // para cada transação se ela for menor do que zero
        Transaction.all.forEach(transaction => {
            // se for menor que zero
            if (transaction.amount < 0) {
                // somar a uma variável e retorná-la 
                expense += transaction.amount;
            }
        })
        return expense 
    },

    total() {
        return Transaction.incomes() + Transaction.expenses() 
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>            
        `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    
    formatCurrency(value) {
        // Aqui pegamos o valor e trabalhamos o sinal 
        const signal = Number(value) < 0 ? "-" : ""
        // Regex ou expressão regular para remoção de qualquer caractere especial
        value = String(value).replace(/\D/g, "")
        // Como ele é guardado multiplicado por 100, aqui o valor volta ao "estado original"
        value = Number(value) / 100
        // Formata como dinheiro
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        // Devolve o valor formatado com o respectivo sinal 
        return signal + value
    }
}

const Form = {
    //elemento inteiro do html
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    //só os valores para verificar se eles estarão ou não vazios
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)
    },

    submit(event) {
        event.preventDefault()


        try {
            // verificar se todas as informações foram preenchidas
            Form.validateFields()
            // formatar os dados para salvar
            Form.formatValues()
            // salvar
            // apagar os dados do formulário
            // modal feche
            // atualizar a aplicação

        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
}
 
App.init()


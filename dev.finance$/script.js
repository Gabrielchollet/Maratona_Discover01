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

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '12/04/2021'
    }, 
    
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '12/04/2021'
    },
    
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '12/04/2021'
    }
]

const Transactions = {
    incomes() {
        //Add the intakes
    },

    expenses() {
        //Add the outputs
    },

    total() {

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
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>            
        `

        return html
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "+"
    }
}

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})
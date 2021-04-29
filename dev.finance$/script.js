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
}
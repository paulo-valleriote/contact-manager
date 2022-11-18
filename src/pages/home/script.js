const exitPage = document.querySelector('.exit')
exitPage.onclick = () => window.location = '../../../index.html'

const closeModalButton = document.querySelectorAll('.close-modal')

const openModalButton = document.querySelector('.open-modal-button')
const addUserModal = document.querySelector('.add-user-modal')

openModalButton
    .addEventListener('click', () => addUserModal.showModal()) // open addUser Modal

closeModalButton[0]
    .addEventListener('click', () => addUserModal.close()) // close addUser Modal

const openDeleteModalButton = document.querySelector('.open-delete-modal')
const deleteUserModal = document.querySelector('.delete-contact-modal')

// openDeleteModalButton
//     .addEventListener('click', () => deleteUserModal.showModal()) // open deleteUser Modal

closeModalButton[1]
    .addEventListener('click', () => deleteUserModal.close()) // close deleteUser Modal

const addNewUser = document.querySelector('.submit-form')
const clearAddUserForm = document.querySelector('.clean-inputs')


addNewUser.addEventListener('click', (e) => { // Adiciona o novo contato na tabela
    const inputs = document.querySelectorAll('dialog input')
    const table = document.querySelector('#contacts')

    const row = table.insertRow()

    if (inputs[0].value && inputs[1].value && inputs[2].value) {
        let cell0 = row.insertCell(0)
        let cell1 = row.insertCell(1)
        let cell2 = row.insertCell(2)
        let cell3 = row.insertCell(3)

        cell0.innerHTML = inputs[0].value
        cell1.innerHTML = inputs[1].value
        cell2.innerHTML = inputs[2].value
        cell3.innerHTML = `<img src="../assets/trash-icon.svg" alt="Botão para excluir a linha"
                         class="open-delete-modal" onclick="(goToQueue(this.parentNode))">`

        clearInputs(inputs)
    }

    addUserModal.close()
})

clearAddUserForm.addEventListener('click', (e) => { // Limpa o form
    const inputs = document.querySelectorAll('dialog input')
    clearInputs(inputs)
})

const clearInputs = (inputs) => { // Limpa os inputs
    let i = 0
    while (i < 3) {
        inputs[i].value = ''
        i++
    }
}

const deleteContact = document.querySelector('.delete-contact-button')
const cancelBtn = document.querySelector('.cancel-process')

const selectedRow = { // Vai receber a row que abriu o modal
    row: null
}

goToQueue = (target) => { // Abre o modal e deixa a row que abriu selecionada
    selectedRow.row = target

    deleteUserModal.showModal()
}

deleteContact.addEventListener('click', () => { // Exclui a row que abriu o modal
    const table = document.querySelector('#contacts')
    const rowToDelete = selectedRow.row

    table.deleteRow(rowToDelete.parentNode.rowIndex)

    deleteUserModal.close()
})

cancelBtn.addEventListener('click', () => {
    deleteUserModal.close()
})
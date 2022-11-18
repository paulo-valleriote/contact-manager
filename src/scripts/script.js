const inputEmail = document.querySelector('input#userEmail')
const inputPassword = document.querySelector('input#userPassword')

const account = { // Vai receber 'true' caso os inputs passem nas verificações
    email: false,
    password: false
}

const readInput = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.target.type === 'email') { // recebe o que está sendo digitado nos inputs
        if (checkEmail(event.target)) return account[event.target.type] = true

        return account[event.target.type] = false
    }

    if (checkPassword(event.target)) return account[event.target.type] = true

    return account[event.target.type] = false
}

const checkEmail = (email) => { // Verifica se o email fornecido pode ser utilizado
    if (checkLength(email.value) && checkEmailDomain(email.value)) {
        return visualReturn(email, true)
    }

    return visualReturn(email, false)
}

const checkEmailDomain = (target) => { // Verifica se o email fornecido bate com os dominios aceitos
    const acceptedEmails = ['gmail.com', 'outlook.com', 'yahoo.com']

    return (
        acceptedEmails
            .some(domain => target.includes(domain))
    )
}

const checkPassword = (password) => { // Verifica se a senha fornecida pode ser utilizada
    if (checkLength(password.value) && checkSecurity(password.value)) {
        return visualReturn(password, true)
    }

    return visualReturn(password, false)
}

const checkLength = (target) => { // Verifica quantos characteres o valor do input possui
    return (
        target.length >= 4 ? true :
            false
    )
}

const checkSecurity = (target) => { // Verifica se a senha tem pelo menos *um numero && *uma letra maiscula
    const uppercaseLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'S', 'R', 'T', 'W', 'X', 'Y', 'Z']
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    const hasUppercase = uppercaseLetter
        .some(letter => target.includes(letter))

    const hasNumber = numbers
        .some(number => target.includes(number))

    if (hasUppercase && hasNumber) {
        return true
    }

    return false
}

const visualReturn = (target, state) => { //muda as cores das bordas
    if (state) {
        target.style.border = '1px solid lightgreen'
        target.style.outline = '2px solid lightgreen'
        return true
    }

    target.style.border = '1px solid red'
    target.style.outline = '2px solid red'
    return false
}

inputEmail.addEventListener('keyup', readInput)
inputPassword.addEventListener('keyup', readInput)

document.querySelector('.finish-form')
    .addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (account.email && account.password) {
            return window.location = 'src/pages/home'
        }

        return window.alert('Entre com suas credênciais.')
    })
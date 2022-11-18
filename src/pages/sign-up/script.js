const inputEmail = document.querySelector('input#userEmail')
const inputPassword = document.querySelector('input#userPassword')
const inputName = document.querySelector('input#userName')

const account = { // Vai receber 'true' caso os inputs passem nas verificações
    name: false,
    email: false,
    password: false
}

const readInput = (event) => { // recebe o que está sendo digitado nos inputs
    event.preventDefault()
    event.stopPropagation()

    if (event.target.type === 'text') { // verifica o nome

        if (checkLength(event.target.value, 3)) {

            visualReturn(event.target, true)
            return account.name = true
        }

        visualReturn(event.target, false)
        return account[event.target.type] = false

    } else if (event.target.type === 'email') { // verifica o email

        if (checkEmail(event.target)) return account[event.target.type] = true

        return account[event.target.type] = false
    }

    if (checkPassword(event.target)) return account[event.target.type] = true // verifica a senha

    return account[event.target.type] = false
}

const checkEmail = (email) => { // Verifica se o email fornecido pode ser utilizado
    if (checkLength(email.value, 6) && checkEmailDomain(email.value)) {
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
    const hint = document.querySelector('.password-hint')
    if (checkLength(password.value, 4) && checkSecurity(password.value)) {
        hint.style.display = 'none'
        return visualReturn(password, true)
    }
    hint.style.display = 'inline-block'
    return visualReturn(password, false)
}

const checkLength = (target, minLength) => { // Verifica quantos characteres o valor do input possui
    return (
        target.length >= minLength ? true :
            false
    )
}

const checkSecurity = (target) => { // Verifica se a senha tem pelo menos *um numero && *uma letra maiscula
    const uppercaseLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'T', 'V', 'W', 'X', 'Y', 'Z']
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    const hasUppercase = uppercaseLetter
        .some(letter => target.includes(letter)) // Verifica se a senha tem pelo menos uma letra maiuscula

    const hasNumber = numbers
        .some(number => target.includes(number)) // verifica se a senha tem pelo menos um numero

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
inputName.addEventListener('keyup', readInput)

document.querySelector('.finish-form')
    .addEventListener('click', (e) => { // Envia o form, se tiver tudo ok vai pra pagina de login, se nao avisa ao usuário
        e.preventDefault()
        e.stopPropagation()

        if (account.email && account.password) {
            return window.location = './../../../index.html'
        }

        return window.alert('Verifique as informações inseridas!')
    })

document.querySelector('.clean-inputs')
    .addEventListener('click', (e) => { // limpa os inputs do form
        e.preventDefault()
        e.stopPropagation()

        const inputs = [inputName, inputEmail, inputPassword]
        let i = 0
        while (i < inputs.length) {
            inputs[i].value = ''
            inputs[i].style.border = '1px solid #E8E8E8'
            inputs[i].style.outline = '2px solid #E8E8E8'

            i++
        }

        document.querySelector('.password-hint').style.display = 'none'
    })

import '../src/styles/errorMessage.scss'

const fio = /(^[A-Z]{1}[a-z-]*$)|(^[А-Я]{1}[а-я-]*$)/
// eslint-disable-next-line
const email = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/
const phone = /^[+]?[0-9]{10,15}$/
const login = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/
const password = /^(?=.*[A-ZА-Я])(?=.*[0-9]).{8,40}$/

const errorMessages = {
    fio: 'Первая буква должна быть заглавной, без пробелов и без цифр, из спецсимволов допустим только дефис',
    email: 'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть @ и точка после неё, но перед точкой обязательно должны быть буквы',
    phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
    login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, из спецсимволов могут быть дефис и подчеркивание',
    password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    message: 'Поле не должно быть пустым'
}

function appendErrorMessage(name: string, errorName: string) {
    const input = document.querySelector(`[validationName=${name}]`)
    const error = document.createElement('div')
    error.innerHTML = errorMessages[errorName as keyof typeof errorMessages] 
    error.classList.add('error-message')
    input?.append(error)
}

function deleteErrorMessage(name: string) {
    const input = document.querySelector(`[validationName=${name}]`)
    const errorMessage = input?.querySelector('.error-message')
    errorMessage?.remove()
}

export function validate(name: string, value: string): boolean | null {
    let result: boolean | null = null
    let errorName: string = ''
    switch(name) {
        case 'second_name':
        case 'first_name':
            result = fio.test(value)
            if(!result) {
                errorName = 'fio'
            }
            break
        case 'email':
            result = email.test(value)
            if(!result) {
                errorName = 'email'
            }
            break
        case 'phone':
            result = phone.test(value)
            if(!result) {
                errorName = 'phone'
            }
            break
        case 'login':
        case 'display_name':
            result = login.test(value)
            if(!result) {
                errorName = 'login'
            }
            break
        case 'password' :
        case 'oldPassword':
        case 'newPassword':
        case 'repeat_new_password':
        case 'password_repeat':
            result = password.test(value)
            if(!result) {
                errorName = 'password'
            }
            break
        case 'message':
        case 'chatName':
        case 'userId':
        case 'deleteUserId':
            result = !!value.trim().length
            if(!result) {
                errorName = 'message'
            }
            break
    }

    deleteErrorMessage(name)

    if(!result) {
        appendErrorMessage(name, errorName)
    }

    return result 
}

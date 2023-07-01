const fio: RegExp = /(^[A-Z]{1}[a-z-]*$)|(^[А-Я]{1}[а-я-]*$)/
const email: RegExp = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/
const phone: RegExp = /^[+]?[0-9]{10,15}$/
const login: RegExp = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/
const password: RegExp = /^(?=.*[A-ZА-Я])(?=.*[0-9])\w{8,40}$/

export function validate(name: string, value: string): boolean | null {
    let result: boolean | null = null
    switch(name) {
        case 'first_name' || 'second_name':
            result = fio.test(value)
            break
        case 'email':
            result = email.test(value)
            break
        case 'phone':
            result = phone.test(value)
            break
        case 'login' || 'display_name':
            result = login.test(value)
            break
        case 'password' || 'old_password' || 'new_password' || 'repeat_new_password':
            result = password.test(value)
            break
        case 'message':
            result = !!value.trim().length
            break
    }

    return result 
}


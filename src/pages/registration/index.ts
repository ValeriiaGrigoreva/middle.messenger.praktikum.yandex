import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './registration.scss'
import { validate } from '../../../utils/validation'

type RegistrationPageProps = {
    title: string,
}

export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
        super('main', props)
    }

    init() {
        this.children.enterButton = new Button({
            text: 'Войти',
            attributes: {
                class: 'button button--background-none'
            }
        })

        this.children.registrationButton = new Button({
            text: 'Зарегистрироваться',
            attributes: {
                class: 'button button--background-blue registration-auth-button'
            }
        })

        this.children.emailInput = new InputBlock({
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            attributes: {
                class: 'input-container',
                validationName: 'email'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('email', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.loginInput = new InputBlock({
            id: 'login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            attributes: {
                class: 'input-container',
                validationName: 'login'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('login', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.firstNameInput = new InputBlock({
            id: 'first_name',
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            attributes: {
                class: 'input-container',
                validationName: 'first_name'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('first_name', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.secondNameInput = new InputBlock({
            id: 'second_name',
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            attributes: {
                class: 'input-container',
                validationName: 'second_name'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('second_name', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.phoneInput = new InputBlock({
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            attributes: {
                class: 'input-container',
                validationName: 'phone'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('phone', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.passwordInput = new InputBlock({
            id: 'password',
            label: 'Пароль',
            type: 'password',
            name: 'password',
            attributes: {
                class: 'input-container',
                validationName: 'password'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('password', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.passwordSecondInput = new InputBlock({
            id: 'password_repeat',
            label: 'Пароль (еще раз)',
            type: 'password',
            name: 'password_repeat',
            attributes: {
                class: 'input-container',
                validationName: 'password_repeat'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('password_repeat', (<HTMLInputElement>e.target).value)
                }
            }
        })
    }

    render() {
        return this.compile(`
        <div class="grid--container">
            <div class="registration-content grid--content">
                <div class="grid--block">
                    <h1 class="registration-header">{{title}}</h1>

                    <form>
                        {{{emailInput}}}
                        {{{loginInput}}}
                        {{{firstNameInput}}}
                        {{{secondNameInput}}}
                        {{{phoneInput}}}
                        {{{passwordInput}}}
                        {{{passwordSecondInput}}}

                        <div class="registration-buttons">
                            {{{registrationButton}}}
                            <a class="registration-account-button" href="chats">
                                {{{enterButton}}}
                            </a>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        `, this.props)
    }

    addOtherListeners() {
        const form = this.getContent()!.querySelector('form')
        form?.addEventListener('submit', (e) => {
            e.preventDefault()

            const data = new FormData(form)
            let result: Record<string, string> = {}
            let validation: boolean = true

            for(let [name, value] of data) {
                const valueString: string = value.toString()
                const nameString: string = name.toString()
                const validationResult = validate(nameString, valueString)

                if (!validationResult) {
                    validation = false
                }

                result[nameString] = valueString
            }

            console.log(validation)
            console.log(result)
        })
    }
}

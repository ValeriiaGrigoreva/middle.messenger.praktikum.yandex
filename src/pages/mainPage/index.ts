import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './mainPage.scss'
import { validate } from '../../../utils/validation'

interface MainPageProps {
    title: string,
}

export class MainPage extends Block<MainPageProps> {
    constructor(props: MainPageProps) {
        super('main', props)
    }

    init() {
        this.children.authButton = new Button({
            text: 'Авторизоваться',
            attributes: {
                class: 'button button--background-blue main-page-auth-button',
                type: 'submit',
            }
        })

        this.children.registrationButton = new Button({
            text: 'Нет аккаунта?',
            attributes: {
                class: 'button button--background-none'
            }
        })

        this.children.loginInput = new InputBlock({
            id: 'login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            attributes: {
                class: 'input-container',
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('login', (<HTMLInputElement>e.target).value))
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
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('password', (<HTMLInputElement>e.target).value))
                }
            }
        })
    }

    render() {
        return this.compile(`
            <div class="grid--container">
                <div class="main-page-content grid--content">
                    <div class="grid--block">
                        <h1 class="main-page-header">{{title}}</h1>

                        <form>
                            {{{loginInput}}}
                            {{{passwordInput}}}

                            <div class="main-page-buttons">
                                {{{authButton}}}
                            </div>
                        </form>
                        <div class="main-page-buttons">
                            <a class="main-page-account-button" href="registration">
                                {{{registrationButton}}}
                            </a>
                        </div>
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

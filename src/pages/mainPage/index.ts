import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './mainPage.scss'
import { validate } from '../../../utils/validation'
import router from '../../../utils/Router'
import AuthController from "../../controllers/AuthController";
import { ISignInData } from "../../api/AuthApi";
import { withStore } from "../../../utils/Store";

function validateAllFields(thisWord: any): {validation: boolean, data: ISignInData } {
    const form: HTMLFormElement = thisWord.getContent()!.querySelector('form')
    const data = new FormData(form)
    let result: ISignInData = {
        login: '',
        password: ''
    }
    let validation: boolean = true

    for(let [name, value] of data) {
        const valueString: string = value.toString()
        const nameString: string = name.toString()
        const validationResult = validate(nameString, valueString)

        if (!validationResult) {
            validation = false
        }

        result[nameString as keyof typeof result] = valueString
    }

    return { validation, data: result }
}

export class BaseMainPage extends Block {
    constructor(props: any) {
        super('main', props)
    }

    init() {
        this.children.authButton = new Button({
            text: 'Авторизоваться',
            attributes: {
                class: 'button button--background-blue main-page-auth-button',
                type: 'submit',
            },
            events: {
                'click': () => {
                    const validationResult = validateAllFields(this)
                    if (validationResult.validation) {
                        AuthController.signin(validationResult.data)
                    }
                }
            }
        })

        this.children.registrationButton = new Button({
            text: 'Нет аккаунта?',
            attributes: {
                class: 'button button--background-none'
            },
            events: {
                'click': () => {
                    router.go('/sign-up')
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
    }

    render() {
        return this.compile(`
            <div class="grid--container">
                <div class="main-page-content grid--content">
                    <div class="grid--block">
                        <h1 class="main-page-header">Вход</h1>

                        <form>
                            {{{loginInput}}}
                            {{{passwordInput}}}

                            <div class="main-page-buttons">
                                {{{authButton}}}
                            </div>
                        </form>
                        <div class="main-page-buttons">
                            <div class="main-page-account-button">
                                {{{registrationButton}}}
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        `, this.props)
    }
}

function mapStateToProps(state: any) {
    return { ...state.user };
}

export const MainPage = withStore(mapStateToProps)(BaseMainPage)

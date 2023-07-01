import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './profile.scss'
import { validate } from '../../../utils/validation'

interface ProfilePageProps {
    name: string,
}

export class ProfilePage extends Block<ProfilePageProps> {
    constructor(props: ProfilePageProps) {
        super('main', props)
    }

    init() {
        this.children.exitButton = new Button({
            text: 'Выйти',
            attributes: {
                class: 'button button--background-orange profile-exit-button'
            }
        })

        this.children.changeDataButton = new Button({
            text: 'Изменить данные',
            attributes: {
                class: 'button button--background-blue'
            }
        })

        this.children.changePasswordButton = new Button({
            text: 'Изменить пароль',
            attributes: {
                class: 'button button--background-blue'
            }
        })

        this.children.emailInput = new InputBlock({
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            attributes: {
                class: 'input-container',
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('email', (<HTMLInputElement>e.target).value))
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
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('login', (<HTMLInputElement>e.target).value))
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
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('first_name', (<HTMLInputElement>e.target).value))
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
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('second_name', (<HTMLInputElement>e.target).value))
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
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('phone', (<HTMLInputElement>e.target).value))
                }
            }
        })

        this.children.chatNameInput = new InputBlock({
            id: 'display_name',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            attributes: {
                class: 'input-container',
            }, 
            events: {
                'blur': (e: Event) => {
                    console.log(validate('display_name', (<HTMLInputElement>e.target).value))
                }
            }
        })
    }

    render() {
        return this.compile(`
        <div class="grid--container">
            <div class="profile-content grid--content">
                <div class="grid--block">
                    <div class="profile-photo"></div>
                    <h3 class="color--blue">{{name}}</h3>
                    <form class="profile-form">
                        {{{emailInput}}}
                        {{{loginInput}}}
                        {{{firstNameInput}}}
                        {{{secondNameInput}}}
                        {{{chatNameInput}}}
                        {{{phoneInput}}}

                        <div class="w--full grid--flex grid--flex-column">
                            <div class="grid--flex grid--justify-between">
                                {{{changeDataButton}}}
                                {{{changePasswordButton}}}
                            </div>
                            {{{exitButton}}}
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

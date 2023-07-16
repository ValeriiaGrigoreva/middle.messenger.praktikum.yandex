import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './profile.scss'
import { validate } from '../../../utils/validation'

type ChangePasswordPageProps = {
    name: string,
}

export class ChangePasswordPage extends Block<ChangePasswordPageProps> {
    constructor(props: ChangePasswordPageProps) {
        super('main', props)
    }

    init() {
        this.children.saveButton = new Button({
            text: 'Сохранить',
            attributes: {
                class: 'button button--background-orange profile-exit-button'
            }
        })

        this.children.oldPasswordInput = new InputBlock({
            id: 'old_password',
            label: 'Старый пароль',
            type: 'password',
            name: 'old_password',
            attributes: {
                class: 'input-container',
                validationName: 'old_password'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('old_password', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.newPasswordInput = new InputBlock({
            id: 'new_password',
            label: 'Новый пароль',
            type: 'password',
            name: 'new_password',
            attributes: {
                class: 'input-container',
                validationName: 'new_password'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('new_password', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.newPasswordSecondInput = new InputBlock({
            id: 'repeat_new_password',
            label: 'Повторите новый пароль',
            type: 'password',
            name: 'repeat_new_password',
            attributes: {
                class: 'input-container',
                validationName: 'repeat_new_password'
                
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('repeat_new_password', (<HTMLInputElement>e.target).value)
                }
            }
        })
    }

    render() {
        return this.compile(`
        <div class="grid--container">
            <div class="profile-change-password-content grid--content">
                <div class="grid--block">
                    <div class="profile-photo"></div>
                    <h3 class="color--blue">{{name}}</h3>
                    <form class="profile-form">
                        {{{oldPasswordInput}}}
                        {{{newPasswordInput}}}
                        {{{newPasswordSecondInput}}}
                        {{{saveButton}}}
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

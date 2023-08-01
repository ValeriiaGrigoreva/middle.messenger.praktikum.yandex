import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './profile.scss'
import { validate } from '../../../utils/validation'
import { IUserChangePassword } from "../../api/UserApi";
import UserController from "../../controllers/UserController";
import store from "../../../utils/Store";
import { withStore } from "../../../utils/Store";
import { InputFile } from "../../components/input/inputFile";

type ChangePasswordPageProps = {
    name: string,
}

function validateAllFields(thisWord: any): {validation: boolean, data: IUserChangePassword } {
    const form: HTMLFormElement = thisWord.getContent()!.querySelector('form')
    const data = new FormData(form)
    let result: IUserChangePassword = {
        oldPassword: '',
        newPassword: '',
    }
    let validation: boolean = true

    for(let [name, value] of data) {
        const valueString: string = value.toString()
        const nameString: string = name.toString()
        const validationResult = validate(nameString, valueString)

        if (nameString === 'repeat_new_password' && data.get(name) !== data.get('newPassword')) {
            validation = false
        }

        if (!validationResult) {
            validation = false
        }
        
        if(nameString !== 'repeat_new_password') {
            result[nameString as keyof typeof result] = valueString
        }
    }

    return { validation, data: result }
}

export class BaseChangePasswordPage extends Block<ChangePasswordPageProps> {
    constructor(props: ChangePasswordPageProps) {
        super('main', props)
    }

    init() {
        this.children.avatarInput = new InputFile({
            id: 'avatar',
            name: 'avatar',
            disabled: 'disabled',
        })

        this.children.saveButton = new Button({
            text: 'Сохранить',
            attributes: {
                class: 'button button--background-orange profile-exit-button'
            },
            events: {
                'click': () => {
                    const validationResult = validateAllFields(this)
                    if (validationResult.validation) {
                        UserController.changePassword(validationResult.data)
                    }
                }
            }
        })

        this.children.oldPasswordInput = new InputBlock({
            id: 'oldPassword',
            label: 'Старый пароль',
            type: 'password',
            name: 'oldPassword',
            attributes: {
                class: 'input-container',
                validationName: 'oldPassword'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('oldPassword', (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.newPasswordInput = new InputBlock({
            id: 'newPassword',
            label: 'Новый пароль',
            type: 'password',
            name: 'newPassword',
            attributes: {
                class: 'input-container',
                validationName: 'newPassword'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('newPassword', (<HTMLInputElement>e.target).value)
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
                    {{{avatarInput}}}
                    <h3 class="color--blue">{{first_name}}</h3>
                    <form class="profile-form">
                        {{{oldPasswordInput}}}
                        {{{newPasswordInput}}}
                        {{{newPasswordSecondInput}}}

                        <div class="grid--flex-all-center">
                            {{{saveButton}}}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `, { name: store.getState().user?.first_name })
    }
}

function mapStateToProps(state: any) {
    return { ...state.user };
}

export const ChangePasswordPage = withStore(mapStateToProps)(BaseChangePasswordPage)

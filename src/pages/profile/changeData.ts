import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './profile.scss'
import { validate } from '../../../utils/validation'
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import store, { withStore } from "../../../utils/Store";
import { IUserChangeData } from "../../api/UserApi";
import { InputFile } from "../../components/input/inputFile";

type ChangeDataPageProps = {
    name: string,
}

function validateAllFields(thisWord: any): {validation: boolean, data: IUserChangeData } {
    const form: HTMLFormElement = thisWord.getContent()!.querySelector('.profile-form')
    const data = new FormData(form)
    let result: IUserChangeData = {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        display_name: '',
        phone: '',
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


class BaseChangeDataPage extends Block<ChangeDataPageProps> {

    constructor(props: ChangeDataPageProps) {
        super('main', props)
    }

    init() {
        this.children.avatarInput = new InputFile({
            id: 'avatar',
            name: 'avatar',
            events: {
                'change': (e: any) => {
                    const {files} = e.target
                    const [file] = files

                    if (!file) {
                        return
                    }

                    const form = new FormData()
                    form.append('avatar', file)
                    UserController.changeAvatar(form)
                }
            }
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
                        UserController.changeProfile(validationResult.data)
                    }
                }
            }
        })

        this.children.emailInput = new InputBlock({
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            value: store.getState().user?.email,
            attributes: {
                class: 'input-container',
                validationName: 'email',
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
            value: store.getState().user?.login,
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
            value: store.getState().user?.first_name,
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
            value: store.getState().user?.second_name,
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
            value: store.getState().user?.phone,
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

        this.children.chatNameInput = new InputBlock({
            id: 'display_name',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            value: store.getState().user?.display_name ? store.getState().user?.display_name : '',
            attributes: {
                class: 'input-container',
                validationName: 'display_name'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('display_name', (<HTMLInputElement>e.target).value)
                }
            }
        })
    }

    componentDidMount(): void {
        AuthController.fetchUser();
    }

    render() {
        return this.compile(`
        <div class="grid--container">
            <div class="profile-content grid--content">
                <div class="grid--block">
                    <form class="grid--flex-all-center" id="avatar-form">
                        {{{avatarInput}}}
                    </form>
                    <h3 class="color--blue">{{{first_name}}}</h3>
                    <form class="profile-form">
                        {{{emailInput}}}
                        {{{loginInput}}}
                        {{{firstNameInput}}}
                        {{{secondNameInput}}}
                        {{{chatNameInput}}}
                        {{{phoneInput}}}

                        <div class="grid--flex-all-center">
                            {{{saveButton}}}
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
        `, this.props)
    }
}

function mapStateToProps(state: any) {
    return { ...state.user };
}

export const ChangeDataPage = withStore(mapStateToProps)(BaseChangeDataPage)

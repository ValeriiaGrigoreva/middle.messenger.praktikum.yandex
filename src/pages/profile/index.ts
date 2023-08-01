import { Block } from "../../../utils/Block";
import { Button } from "../../components/button";
import { InputBlock } from "../../components/input/inputBlock";
import './profile.scss'
import router from '../../../utils/Router'
import AuthController from "../../controllers/AuthController";
import store from "../../../utils/Store";
import { InputFile } from "../../components/input/inputFile";
import { withStore } from "../../../utils/Store";

type ProfilePageProps = {
    name: string,
}


export class BaseProfilePage extends Block<ProfilePageProps> {
    constructor(props: ProfilePageProps) {
        super('main', props)
    }

    init() {
        this.children.messengerButton = new Button({
            text: 'Чаты',
            attributes: {
                class: 'button button--background-orange',
            },
            events: {
                'click': () => {
                    router.go('/messenger')
                }
            }
        })

        this.children.avatarInput = new InputFile({
            id: 'avatar',
            name: 'avatar',
            disabled: 'disabled',
        })


        this.children.exitButton = new Button({
            text: 'Выйти',
            attributes: {
                class: 'button button--background-orange profile-exit-button'
            },
            events: {
                'click': () => {
                    AuthController.logout()
                }
            }
        })

        this.children.changeDataButton = new Button({
            text: 'Изменить данные',
            attributes: {
                class: 'button button--background-blue'
            },
            events: {
                'click': () => {
                    router.go('/settings/change-data')
                }
            }
        })

        this.children.changePasswordButton = new Button({
            text: 'Изменить пароль',
            attributes: {
                class: 'button button--background-blue'
            },
            events: {
                'click': () => {
                    router.go('/settings/change-password')
                }
            }
        })

        this.children.emailInput = new InputBlock({
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            value: store.getState().user?.email,
            readonly: 'readonly',
            attributes: {
                class: 'input-container',
                validationName: 'email',
            }, 
        })

        this.children.loginInput = new InputBlock({
            id: 'login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            value: store.getState().user?.login,
            readonly: 'readonly',
            attributes: {
                class: 'input-container',
                validationName: 'login'
            }, 
        })

        this.children.firstNameInput = new InputBlock({
            id: 'first_name',
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            value: store.getState().user?.first_name,
            readonly: 'readonly',
            attributes: {
                class: 'input-container',
                validationName: 'first_name'
            }, 
        })

        this.children.secondNameInput = new InputBlock({
            id: 'second_name',
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            value: store.getState().user?.second_name,
            readonly: 'readonly',
            attributes: {
                class: 'input-container',
                validationName: 'second_name'
            }, 
        })

        this.children.phoneInput = new InputBlock({
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            value: store.getState().user?.phone,
            readonly: 'readonly',
            attributes: {
                class: 'input-container',
                validationName: 'phone'
            }, 
        })

        this.children.chatNameInput = new InputBlock({
            id: 'display_name',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            readonly: 'readonly',
            value: store.getState().user?.display_name ? store.getState().user?.display_name : '',
            attributes: {
                class: 'input-container',
                validationName: 'display_name'
            }, 
        })
    }

    render() {
        return this.compile(`
        <div class="grid--container">
            <div class="profile-content grid--content">
                <div class="grid--block">
                    {{{avatarInput}}}
                    <h3 class="color--blue">{{{first_name}}}</h3>
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
                        </div>
                    </form>
                    {{{exitButton}}}
                    <div class="profile-messenger-button">
                        {{{messengerButton}}}
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

export const ProfilePage = withStore(mapStateToProps)(BaseProfilePage)

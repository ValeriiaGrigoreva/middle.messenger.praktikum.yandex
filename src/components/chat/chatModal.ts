import { Block } from '../../../utils/Block'
import './chat.scss'
import { InputBlock } from '../input/inputBlock'
import { validate } from '../../../utils/validation'
import { Button } from '../button'
import ChatsController from '../../controllers/ChatsController'
import store from '../../../utils/Store'

type ChatModalProps = {
    title: string,
    buttonText: string,
    inputLabel: string,
    inputId: string,
    attributes?: Record<string, string>
    buttonEvents?: Record<string, Function>  
    eventType?: string,
}

export class ChatModal extends Block<ChatModalProps> {
    constructor(props: ChatModalProps) {
        super('div', props)
    }

    init() {
        this.children.closeButton = new Button({
            text: 'Закрыть',
            attributes: {
                class: 'button button--background-none',
            },
            events: {
                'click': () => {
                    this.hide()
                }
            }
        })

        this.children.chatNameInput = new InputBlock({
            id: this.props.inputId,
            label: this.props.inputLabel,
            type: 'text',
            name: this.props.inputId,
            attributes: {
                class: 'input-container',
                validationName: this.props.inputId
            }, 
            events: {
                'blur': (e: Event) => {
                    validate(this.props.inputId, (<HTMLInputElement>e.target).value)
                }
            }
        })

        this.children.createChatButton = new Button({
            text: this.props.buttonText,
            attributes: {
                class: 'button button--background-blue',
                type: 'submit',
            },
            events: {
                'click': (e: Event) => {
                    e.preventDefault()
                    const input: HTMLInputElement | null = this.getContent()!.querySelector(`input[id="${this.props.inputId}"]`)
                    const validationResult = validate(this.props.inputId, input!.value)

                    if(validationResult && this.props.eventType === 'newChat') {
                        try {
                            ChatsController.createChat({title: input!.value})
                            this.hide()
                        } catch(error) {
                            console.log(error)
                        }
                    }

                    if(validationResult && this.props.eventType === 'newUser') {
                        try {
                            ChatsController.addUsersToChat({users: [Number(input!.value)], chatId: store.getState().activeChat?.id})
                            this.hide()
                        } catch(error) {
                            console.log(error)
                        }
                    }

                    if(validationResult && this.props.eventType === 'deleteUser') {
                        try {
                            ChatsController.deleteUsersFromChat({users: [Number(input!.value)], chatId: store.getState().activeChat?.id})
                            this.hide()
                        } catch(error) {
                            console.log(error)
                        }
                    }
                }
            }
        })
    }

    render() {
        return this.compile(`
            <div class="chat--new-chat-modal-wrapper">
                <div class="chat--new-chat-modal">
                    <div class="chat--new-chat-modal-close">
                        {{{closeButton}}}
                    </div>
                    <div class="chat--new-chat-modal-main">
                        <p class="chat--new-chat-modal-header">{{title}}</p>
                        <form class="w--full">
                            {{{chatNameInput}}}
                            <div class="grid--flex-all-center">
                                {{{createChatButton}}}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `, this.props)
    }
}

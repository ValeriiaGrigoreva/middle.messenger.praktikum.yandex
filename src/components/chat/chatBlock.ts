import { Block } from '../../../utils/Block'
import './chat.scss'
import { InputBlock } from '../input/inputBlock'
import { validate } from '../../../utils/validation'
import { Button } from '../button'
import { withStore } from '../../../utils/Store'
import { ChatModal } from './chatModal'
import store from '../../../utils/Store'
import { MessageBlock } from './messageBlock'

type ChatBlockProps = {
    attributes?: Record<string, string>,
    events?: Record<string, Function>
    activeChatMessages: {content: string, user_id: number}[],
}

export class BaseChatBlock extends Block<ChatBlockProps> {
    constructor(props: ChatBlockProps) {
        super('div', props)
    }

    init() {
        let messagesResult: MessageBlock[] = []
        this.props.activeChatMessages?.forEach((item) => {
            if (item.content !== '') {
                const message = new MessageBlock({
                    message: item.content,
                    class: `${item.user_id === store.getState().user?.id ? 'background--my-message' : 'background--friend-message'}`,
                    attributes: {
                        class: `grid--flex ${item.user_id === store.getState().user?.id ? 'grid--justify-end' : 'grid--justify-start'}`,
                    }
                })
                

                messagesResult.push(message)
            }
        })

        this.children.messages = messagesResult.reverse()

        this.children.addUserToChatModal = new ChatModal({
            title: 'Новый пользователь',
            buttonText: 'Добавить в чат',
            inputLabel: 'ID пользователя',
            inputId: 'userId',
            eventType: 'newUser',
            attributes: {
                style: 'display: none;'
            }
        })

        this.children.deleteUserFromChatModal = new ChatModal({
            title: 'Удалить пользователя',
            buttonText: 'Удалить',
            inputLabel: 'ID пользователя',
            inputId: 'deleteUserId',
            eventType: 'deleteUser',
            attributes: {
                style: 'display: none;'
            }
        })

        this.children.addNewChatMemberButton = new Button({
            text: 'Добавить в чат',
            attributes: {
                class: 'button button--background-blue',
            },
            events: {
                'click': () => {
                    this.children.addUserToChatModal.show()
                }
            }
        })

        this.children.sendMessageButton = new Button({
            text: 'Отправить',
            attributes: {
                class: 'button button--background-blue',
                type: 'submit'
            },
            events: {
                'click': (e: Event) => {
                    e.preventDefault()
                    const input: HTMLInputElement | null = this.getContent()!.querySelector(`input[id="message"]`)
                    
                    const message = input!.value
                    const validationResult = validate('message', message)

                    if(validationResult) {
                        const socketObject = store.getState().sockets?.find(item => item.id === store.getState().activeChat?.id)
                        socketObject?.socket.sendMessage(message)
                    }
                }
            }
        })

        this.children.deleteChatMemberButton = new Button({
            text: 'Удалить из чата',
            attributes: {
                class: 'button button--background-orange',
            },
            events: {
                'click': () => {
                    this.children.deleteUserFromChatModal.show()
                }
            }
        })


        this.children.messageInput = new InputBlock({
            id: 'message',
            label: 'Введите сообщение',
            type: 'text',
            name: 'message',
            attributes: {
                class: 'input-container',
                validationName: 'message'
            }, 
            events: {
                'blur': (e: Event) => {
                    validate('message', (<HTMLInputElement>e.target).value)
                }
            }
        })
    }

    render() {
        return this.compile(`
            <div class="grid--flex-center grid--justify-between">
                <p class="color--orange">{{title}}</p>
                <div>
                    {{#if title}}
                        {{{deleteChatMemberButton}}}
                        {{{addNewChatMemberButton}}}
                        {{else}}
                        <p class="color--orange">Выберите чат</p>
                    {{/if}}
                </div>
            </div>

            {{#if title}}
                <div class="messages-container">
                    {{{messages}}}
                </div>
                
            {{/if}}
            {{{addUserToChatModal}}}
            {{{deleteUserFromChatModal}}}

            {{#if title}}
                <form>
                    {{{messageInput}}}
                    {{{sendMessageButton}}}
                </form>
            {{/if}}
        `, this.props)
    }
}

function mapStateToProps(state: any) {
    return { ...state.activeChat, activeChatMessages: state.activeChatMessages };
}

export const ChatBlock = withStore(mapStateToProps)(BaseChatBlock)

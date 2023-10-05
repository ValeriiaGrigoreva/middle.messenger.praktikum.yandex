import { Block } from "../../../utils/Block";
import { Chat } from "../../components/chat";
import { InputBlock } from "../../components/input/inputBlock";
import { Button } from "../../components/button";
import './chats.scss'
import { validate } from '../../../utils/validation'
import { ChatModal } from "../../components/chat/chatModal";
import store from "../../../utils/Store";
import { ChatBlock } from "../../components/chat/chatBlock";
import { withStore } from "../../../utils/Store";
import router from '../../../utils/Router'

type ChatsPageProps = {
    name?: string,
    chats?: {
        title: string, 
        last_message: {
            content: string,
            time: string,
        },
        unread_count: number,
        id: number
    }[]
    unreadMessages: Record<string, number>
}

export class BaseChatsPage extends Block<ChatsPageProps> {
    constructor(props: ChatsPageProps) {
        super('main', props)
    }

    init() {
        this.children.chatBlock = new ChatBlock({
            attributes: {
                class: 'grid--flex grid--flex-column grid--justify-between w--full chat-block',
            }
        })

        this.children.newChatModal = new ChatModal({
            title: 'Новый чат',
            buttonText: 'Создать чат',
            inputLabel: 'Название чата',
            inputId: 'chatName',
            eventType: 'newChat',
            attributes: {
                style: 'display: none;'
            }
        })

        this.children.newChatButton = new Button({
            text: 'Новый чат',
            attributes: {
                class: 'button button--background-blue chats-new-chat-button',
            },
            events: {
                'click': () => {
                    this.children.newChatModal.show()
                }
            }
        })

        this.children.profileButton = new Button({
            text: 'В профиль',
            attributes: {
                class: 'button button--background-orange chats-new-chat-button',
            },
            events: {
                'click': () => {
                    router.go('/settings')
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
        let chatsResult: Chat[] = []
        this.props.chats?.forEach((item) => {
            let lastMessageTime = null
            if (item.last_message) {
                const date = new Date(item.last_message.time)
                const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                lastMessageTime = date.getHours() + ':' + minutes
            }
            const chat  = new Chat({
                name: item.title,
                message: `${item.last_message ? item.last_message.content : ''}`,
                time: `${lastMessageTime ? lastMessageTime : ''}`,
                unreadMessages: this.props.unreadMessages[item.id],
                events: {
                    'click': async () => {
                        store.set('activeChat', item)
                        const socketObject = store.getState().sockets?.find(item => item.id === store.getState().activeChat?.id)
                        socketObject?.socket.getMessages()
                        
                        const unreadMessages = store.getState().unreadMessages
                        if (unreadMessages && unreadMessages[item.id as keyof typeof unreadMessages]) {
                            unreadMessages[item.id as keyof typeof unreadMessages] = 0
                        }
                    }
                }
            })

            chatsResult.push(chat)
        })

        this.children.chats = chatsResult

        return this.compile(`
        <div class="h--full grid--flex">
            <div class="chats--messages-block">
                {{{profileButton}}}
                {{{newChatButton}}}
                {{{chats}}}
            </div>
            {{{chatBlock}}}
            {{{newChatModal}}}
        </div>
        `, this.props)
    }
}

function mapStateToProps(state: any) {
    return { chats: state.chats, unreadMessages: state.unreadMessages };
}

export const ChatsPage = withStore(mapStateToProps)(BaseChatsPage)

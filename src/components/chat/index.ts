import { Block } from '../../../utils/Block'
import './chat.scss'

type ChatProps = {
    name: string,
    message: string,
    time: string,
    unreadMessages?: string,
    attributes?: Record<string, string>
    events?: Record<string, Function>
}

export class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super('div', props)
    }

    render() {
        return this.compile(`
            <div class="chat--container">
                <div class="grid--flex">
                    <div class="chat--img"></div>
                    <div>
                        <p class="chat--name">{{name}}</p>
                        <p class="chat--message">{{message}}</p>
                    </div>
                </div>
                <div class="grid--flex grid--flex-column grid--justify-between">
                    <p class="chat--time">{{time}}</p>
                    <div class="chat--unread-messages">
                        <p class="chat--unread-messages-number">{{unreadMessages}}</p>
                    </div>
                </div>
            </div>
        `, this.props)
    }
}

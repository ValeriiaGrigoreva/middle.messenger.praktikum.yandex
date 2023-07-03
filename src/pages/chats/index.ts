import { Block } from "../../../utils/Block";
import { Chat } from "../../components/chat";
import { InputBlock } from "../../components/input/inputBlock";
import './chats.scss'
import { validate } from '../../../utils/validation'

type ChatsPageProps = {
    name?: string,
}

export class ChatsPage extends Block<ChatsPageProps> {
    constructor(props: ChatsPageProps) {
        super('main', props)
    }

    init() {
        this.children.chat1 = new Chat({
            name: 'Евгений',
            message: 'Привет! Как дела?',
            time: '11:57',
            unreadMessages: '1',
        })

        this.children.chat2 = new Chat({
            name: 'Сергей',
            message: 'Пойду завтра',
            time: '11:53',
            unreadMessages: '1',
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
        <div class="h--full grid--flex">
            <div class="chats--messages-block">
                {{{chat1}}}
                {{{chat2}}}
            </div>
            <div class="grid--flex grid--align-end w--full">
                <form>
                    {{{messageInput}}}
                </form>
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

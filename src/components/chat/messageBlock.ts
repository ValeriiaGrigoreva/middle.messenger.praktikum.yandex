import { Block } from "../../../utils/Block"

type MessageBlockProps = {
    message: string,
    class?: string,
    attributes?: Record<string,string>
}


export class MessageBlock extends Block<MessageBlockProps> {
    constructor(props: MessageBlockProps) {
        super('div', props)
    }

    render() {
        return this.compile(`
            <div class="message-block {{class}}">
                {{message}}
            </div>
        `, this.props)
    }
}

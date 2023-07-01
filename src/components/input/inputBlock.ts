import { Block } from '../../../utils/Block'
import { Input} from './index'
import './input.scss'

interface InputBlockProps {
    id: string,
    label: string,
    type: string,
    name: string,
    attributes?: Record<string, string>
    events?: Record<string, Function>
}

export class InputBlock extends Block<InputBlockProps> {
    constructor(props: InputBlockProps) {
        super('div', props)
    }

    init() {
        this.children.input = new Input({
            attributes: {
                class: 'input',
                id: this.props.id,
                type: this.props.type,
                name: this.props.name,
            },
            events: {...this.props.events},
        })
    }

    render() {
        return this.compile(`
            <label class="input-label" for={{id}}>{{label}}</label>
            {{{input}}}
        `, this.props)
    }
}

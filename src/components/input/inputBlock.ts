import { Block } from '../../../utils/Block'
import { Input} from './index'
import './input.scss'

type InputBlockProps = {
    id: string,
    label: string,
    type: string,
    name: string,
    readonly?: string,
    value?: string,
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
                value: this.props.value ? this.props.value : '',
            },
            events: {...this.props.events},
        })

        if (this.props.readonly) {
            this.children.input.props.attributes = {...this.children.input.props.attributes, readonly: this.props.readonly}
        }
    }

    render() {
        return this.compile(`
            <label class="input-label" for={{id}}>{{label}}</label>
            {{{input}}}
        `, this.props)
    }
}

import { Block } from '../../../utils/Block'
import { Input} from './index'
import './input.scss'
import { withStore } from '../../../utils/Store'

type InputFileProps = {
    id: string,
    name: string,
    disabled?: string,
    value?: string,
    attributes?: Record<string, string>
    events?: Record<string, Function>
}

export class BaseInputFile extends Block<InputFileProps> {
    constructor(props: InputFileProps) {
        super('div', props)
    }

    init() {
        this.children.input = new Input({
            attributes: {
                class: 'input-file',
                id: this.props.id,
                type: 'file',
                name: this.props.name,  
                value: this.props.value ? this.props.value : '',
                title: '',
            },
            events: {...this.props.events},
        })

        if (this.props.disabled) {
            this.children.input.props.attributes = {...this.children.input.props.attributes, disabled: this.props.disabled}
        }
    }

    render() {
        return this.compile(`
            <div class="input-file-block" style="background-image: url(https://ya-praktikum.tech/api/v2/resources{{avatar}});">
                {{{input}}}
            </div>
        `, this.props)
    }
}

function mapStateToProps(state: any) {
    return { ...state.user };
  }

export const InputFile = withStore(mapStateToProps)(BaseInputFile)

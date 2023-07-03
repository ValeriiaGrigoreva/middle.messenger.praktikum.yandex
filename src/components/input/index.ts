import { Block } from '../../../utils/Block'
import './input.scss'

type InputProps = {
    attributes?: Record<string, string>
    events?: Record<string, Function>
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super('input', props)
    }
}

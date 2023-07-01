import { Block } from '../../../utils/Block'
import './button.scss'

interface ButtonProps {
    text: string,
    attributes?: Record<string, string>
    events?: Record<string, Function>
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super('button', props)
    }

    render() {
        return this.compile(`{{text}}`, this.props)
    }
}

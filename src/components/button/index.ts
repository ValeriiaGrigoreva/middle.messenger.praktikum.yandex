import { Block } from '../../../utils/Block'
import './button.scss'
import { ButtonProps } from './types'

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super('button', props)
    }

    render() {
        return this.compile(`{{text}}`, this.props)
    }
}

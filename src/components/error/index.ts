import { Block } from '../../../utils/Block'
import './error.scss'

interface ErrorProps {
    number: string,
    text: string,
    link: string,
}

export class Error extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super('div', props)
    }

    render() {
        return this.compile(`
            <p class="error-number">{{number}}</p>
            <p class="error-text">{{text}}</p>
            <a href={{link}}>
                <p class="error-back">Назад к чатам</p>
            </a>
        `, this.props)
    }
}

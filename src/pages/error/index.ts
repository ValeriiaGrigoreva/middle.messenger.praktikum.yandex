import { Block } from "../../../utils/Block";
import { Error } from "../../components/error";
import './error.scss'

interface ErrorPageProps {
    number: string,
    text: string,
    link: string,
}

export class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super('main', props)
    }

    init() {
        this.children.error = new Error({
            number: this.props.number,
            text: this.props.text,
            link: this.props.link,
        })
    }

    render() {
        return this.compile(`
        <div class="grid--container">
            <div class="error-content grid--content">
                <div class="grid--block">
                    {{{error}}}
                </div>
            </div>
        </div>
        `, this.props)
    }
}

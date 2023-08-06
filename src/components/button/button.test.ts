import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Block } from '../../../utils/Block';

describe('Button test', () => {
    class Button extends Block {
        constructor(props: object) {
            super('button', props)
        }
    
        render() {
            return this.compile(`{{text}}`, this.props)
        }
    }

    it('Props are correctly added', () => {
        const button = new Button({text: 'button'})

        expect(button.props.text).to.be.equal('button')
        
    })

    it('Props are correctly changing', () => {
        const button = new Button({text: 'button'})
        const div = document.getElementById('app')
        //@ts-expect-error
        div?.append(button.getContent())

        const buttonElement = document.querySelector('button')

        expect(buttonElement?.innerHTML).to.be.equal('button')

        button.props.text = 'changedButton'

        expect(buttonElement?.innerHTML).to.be.equal('changedButton')
        
    })
})

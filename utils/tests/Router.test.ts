import { expect } from 'chai';
import { describe, it } from 'mocha';
import router from '../Router';
import { Block } from '../Block';
import sinon from 'sinon';

describe('Router test', () => {
    class LoginPage extends Block {
        constructor(props: object) {
            super('div', props)
        }
    
        render() {
            return this.compile(`<p>login</p>`, this.props)
        }
    }

    it('Method go makes correct redirect', () => {
        router.use('/login', LoginPage, {})
        router.start()
        router.go('/login')
        expect(window.location.pathname).to.equal('/login')
        
    })

    it('Method back calls back window method', () => {
        const spy = sinon.spy(window.history, "back")
        router.back()
        expect(spy.callCount).to.be.equal(1)
    })

    it('Method forward calls forward window method', () => {
        const spy = sinon.spy(window.history, "forward")
        router.forward()
        expect(spy.callCount).to.be.equal(1)
    })
})

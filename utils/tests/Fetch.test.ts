import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { HTTPTransport } from '../Fetch';

describe('Fetch test', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        
        (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();

        xhr.onCreate = (req) => {
            requests.push(req);
        }

        instance = new HTTPTransport('');
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    it('Method get() should be called with GET method', () => {
        instance.get('/');

        const [request] = requests;

        expect(request.method).to.equal('GET');
    })

    it('Method post() should be called with POST method', () => {
        instance.post('/');

        const [request] = requests;

        expect(request.method).to.equal('POST');
    })

    it('Method put() should be called with PUT method', () => {
        instance.put('/');

        const [request] = requests;

        expect(request.method).to.equal('PUT');
    })

    it('Method delete() should be called with DELETE method', () => {
        instance.delete('/');

        const [request] = requests;

        expect(request.method).to.equal('DELETE');
    })

    it('If method is GET data is not send', () => {
        instance.get('/');

        const [request] = requests;

        expect(request.requestBody).to.equal(undefined);
    })

    it('If method is not GET data is send', () => {
        let requestData = { data: { user: 'name'} }

        instance.post('/', requestData);

        const [request] = requests;

        expect(request.requestBody).to.equal(JSON.stringify(requestData.data));
    })

    it('If data is FormData no JSON.stringify', () => {
        let requestData = { data: new FormData() }

        instance.post('/', requestData);

        const [request] = requests;

        expect(request.requestBody).to.equal(requestData.data);
    })

    it('If data is not FormData header content-type is json', () => {
        let requestData = { data: { user: 'name'} }

        instance.post('/', requestData);

        const [request] = requests;

        expect(request.requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8');
    })
})

import crypto from 'crypto';
import { Check } from './Check';
import { Request } from './Request';

export class Komtet {
    private method = 'POST';
    private apiHost = 'https://kassa.komtet.ru';
    private apiPath = '/api/shop/v1/queues/';
    private key: string;
    private secret: string;
    private queue: string;

    constructor (key: string, secret: string, queue: string) {
        this.key = key;
        this.secret = secret;
        this.queue = queue;
    }

    public async sendCheck(check: Check): Promise<boolean> {
        const signature = this.getSignature(check);

        const options = {
            hostname: this.apiHost,
            path: this.apiPath + this.queue,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.key,
                'X-HMAC-Signature': signature
            },
            data: JSON.stringify(check),
        }

        const request = new Request();
        request.send(options, check);

        return false;
    }

    private getSignature(data: Check) {
    //   signature = hmac.new(secret.encode('utf-8'), msg.encode('utf-8'), digestmod=hashlib.md5).hexdigest()
        // # msg = method + uri + body
        // msg = 'GET' + 'https://kassa.komtet.ru/api/shop/v1/queues/125' + ''
        const msg = this.method + this.apiHost + this.apiPath + this.queue + JSON.stringify(data);
        return crypto.createHmac('md5', this.secret)
            .update(msg)
            .digest('hex');
    }
}

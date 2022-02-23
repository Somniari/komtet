import crypto from 'crypto';
import axios from 'axios';

import { Check } from './Check';

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

        const result = await axios({
            method: 'POST',
            url: this.apiHost + this.apiPath + this.queue,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.key,
                'X-HMAC-Signature': signature
            },
            data: check,
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            if (error.response) {
                console.log(`Komtet error: ${error.response.status} - ${error.response.statusText}`);
                console.log('Response data: ', error.response.data);
            }
            return false;
        });

        return result;
    }

    private getSignature(data: Check) {
        // signature = hmac.new(secret.encode('utf-8'), msg.encode('utf-8'), digestmod=hashlib.md5).hexdigest()
        // # msg = method + uri + body
        // msg = 'GET' + 'https://kassa.komtet.ru/api/shop/v1/queues/125' + ''
        const msg = this.method + this.apiHost + this.apiPath + this.queue + JSON.stringify(data);
        return crypto.createHmac('md5', this.secret)
            .update(msg)
            .digest('hex');
    }
}

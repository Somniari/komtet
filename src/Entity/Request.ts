import https from 'https';
import { Check } from './Check';

export class Request {
    public async send(options: any, data: Check) {
        https.request(options, (resp: any) => {
          let data = '';

          // A chunk of data has been received.
          resp.on('data', (chunk: string) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
          });

        })
        .on("error", (err: Error) => {
          console.log("Error: " + err.message);
        });
    }
}

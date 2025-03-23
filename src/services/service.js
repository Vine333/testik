import config from "../config/config";

class Service {

    constructor() {
        this.base = config.api.url;
    }

    async request(path, data) {

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        };

        const token = localStorage.getItem('AUTH_TOKEN');

        if (token) {
            headers = {
                ...headers,
                'X-Auth-Token': token,
            }
        }

        if (data?.headers) {
            headers = {
                ...headers,
                ...data.headers
            }
        }

        let httpCode = 200;
        return fetch(`${this.base}${path}`, {
            headers: headers,
            ...data
        }).then(res => {
            httpCode = res.status;
            return res.json()
        }).then(res => {


            if (httpCode === 401) {

                throw 'Http error';
            }
            return res;
        }).catch(error => ({
            error: true,
            details: error
        }));
    }
}


export default Service;

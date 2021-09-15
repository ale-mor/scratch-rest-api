import fetch from 'node-fetch';

const checkResponse = (res) => {
    if (res.ok) {
        return res;
    }
    throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
}

export const fetchClinics = async () => {
    return fetch('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json')
        .then(checkResponse)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            throw new Error(err.message)
        });
};
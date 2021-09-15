import fetch from 'node-fetch';

const checkResponse = (res) => {
    if (res.ok) {
        return res;
    }
    throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
}

export const fetchClinics = async () => {
    return Promise.all([
        fetch('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json'),
        fetch('https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json')
    ]).then( responses => {
        return Promise.all(responses.map( response => {
            checkResponse(response);
            return response.json();
        }));
    }).catch(err => {
        throw new Error(err.message)
    });
};
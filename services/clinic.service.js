import { fetchClinics } from "../api/clinic.api.js";

const clinicEndpoints = [
    'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
    'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json'
];

export const searchClinics = async (query) => {
    try{
        const clinics = await fetchClinics();
        return clinics;
    } catch(e) {
        throw new Error(e.message);
    }
};
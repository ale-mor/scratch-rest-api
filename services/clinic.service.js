import { fetchClinics } from "../api/clinic.api.js";

export const searchClinics = async (query) => {
    try{
        const clinicsArray = await fetchClinics();

        const clinics = [];
        clinicsArray.map(c => clinics.push(...c));

        const filteredClinics = clinics.filter(clinic => {
            let isValid = true;
            Object.keys(query).forEach(key => isValid = isValid && clinic[key] === query[key]);
            return isValid;
          });
        return filteredClinics;
    } catch(e) {
        throw new Error(e.message);
    }
};
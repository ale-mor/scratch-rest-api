import { fetchClinics } from "../api/clinic.api.js";

export const searchClinics = async (query) => {
    try{
        const clinics = await fetchClinics();
        return clinics;
    } catch(e) {
        throw new Error(e.message);
    }
};
import { fetchClinics } from "../api/clinic.api.js";

const getIsValidString = (clinic, fields, queryValue) => {
    let isValid = false;
    for (const field of fields) {
        if (!clinic[field]) {
            continue;
        }
        isValid = clinic[field].toLowerCase().indexOf(queryValue.toLowerCase()) >= 0;
        if (isValid) {
            break;
        }
    }
    return isValid;
}

const getTime = (hours, minutes) => {
    const time = new Date();

    time.setHours(hours);
    time.setMinutes(minutes);

    return time;
};

const getIsValidTime = (clinic, fields, queryValue) => {
    let isValid = false;
    for (const field of fields) {
        if (!clinic[field]) {
            continue;
        }
        if (queryValue.indexOf(':') === -1 || clinic[field].to.indexOf(':') === -1 || clinic[field].from.indexOf(':') === -1) {
            continue;
        }

        // change 24 to 0 for better resolving if clinic is open
        const queryHours = queryValue.split(':')[0] === '24' ? '00' : queryValue.split(':')[0];
        const queryTime = getTime(queryHours, queryValue.split(':')[1]);
        const toTime = getTime(clinic[field].to.split(':')[0], clinic[field].to.split(':')[1]);
        const fromTime = getTime(clinic[field].from.split(':')[0], clinic[field].from.split(':')[1]);

        // don't match query time with closing time
        isValid = fromTime <= queryTime &&  queryTime < toTime;

        if (isValid) {
            break;
        }
    }
    return isValid;
}

export const searchClinics = async (query) => {
    try{
        const clinicsArray = await fetchClinics();

        const clinics = [];
        clinicsArray.map(c => clinics.push(...c));

        if (!query) {
            return clinics;
        }

        const filteredClinics = clinics.filter(clinic => {
            let isValid = true;
            for (const key of Object.keys(query)){

                if (!query[key]) {
                    isValid = false;
                    continue;
                }

                // for example if user types twice the same search parameter
                if (typeof query[key] !== 'string') {
                    isValid = false;
                    continue;
                }

                switch (key) {
                    case 'state':
                        isValid = isValid && getIsValidString(clinic, ['stateName', 'stateCode'], query[key]);
                    break;
                    case 'name':
                        isValid = isValid && getIsValidString(clinic, ['name', 'clinicName'], query[key]);
                    break;
                    case 'open':
                        isValid = isValid && getIsValidTime(clinic, ['availability', 'opening'], query[key]);
                    break;
                    default:
                        isValid = isValid && clinic[key] === query[key];
                    break;
                }
            };
            return isValid;
          });
        return filteredClinics;

    } catch(e) {
        throw new Error(e.message);
    }
};
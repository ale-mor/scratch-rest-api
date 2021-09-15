import { searchClinics } from "../services/clinic.service.js";

export const getClinics = async (req, res) => {
    const query = req.query;

    try {
      const list = await searchClinics(query);
      res.send(list);
    } catch(e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  };
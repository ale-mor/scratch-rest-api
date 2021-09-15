export const getClinics = async (req, res) => {
    try {
      const list = [];
      res.send(list);
    } catch(e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  };
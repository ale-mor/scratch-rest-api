import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Use route /clinics to search for clinics'));

app.listen(3000, () => console.log('Clinic search app listening on port 3000'));

export default app;
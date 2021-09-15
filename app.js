import express from 'express';
import clinics from './routes/clinic.route.js'

const app = express();

app.get('/', (req, res) => res.send('Use route /clinics to search for clinics'));
app.use('/clinics', clinics);

app.listen(3000, () => console.log('Clinic search app listening on port 3000'));

export default app;
import { Router } from 'express';
import physioRouter from './physio.routes';
import patientRouter from './patient.routes';

const routes = Router();

routes.use('/physio', physioRouter);

routes.use('/patient', patientRouter);

export default routes;

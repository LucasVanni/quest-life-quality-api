import { Router } from 'express';

import CreatePatientService from '../services/CreatePatientService';

const patientRouter = Router();

patientRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const patientService = new CreatePatientService();

    const patient = await patientService.execute({ name, email, password });

    return response.json(patient);
});

export default patientRouter;

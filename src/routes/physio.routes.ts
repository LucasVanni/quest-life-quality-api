import { Router } from 'express';
import { getRepository } from 'typeorm';

import Physio from '../models/physio';
import CreatePhysioService from '../services/CreatePhysioService';

const physioRouter = Router();

physioRouter.get('/', async (_request, response) => {
    const physioRepository = getRepository(Physio);

    const physio = await physioRepository.find();

    return response.json(physio);
});

physioRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const physio = new CreatePhysioService();

    const createdPhysio = await physio.execute({ name, email, password });

    return response.json(createdPhysio);
});

export default physioRouter;

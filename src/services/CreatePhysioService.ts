import { getRepository } from 'typeorm';

import Physio from '../models/physio';

import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreatePhysioService {
    public async execute({ name, email, password }: Request): Promise<Physio> {
        const physioRepository = getRepository(Physio);

        const physioEmailExists = await physioRepository.findOne({
            where: { email },
        });

        if (physioEmailExists) {
            throw new AppError('Email address already used.');
        }

        const physioCreated = physioRepository.create({
            name,
            email,
            password,
        });

        await physioRepository.save(physioCreated);

        return physioCreated;
    }
}

export default CreatePhysioService;

import { getRepository } from 'typeorm';

import Patients from '../models/patients';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreatePatientService {
    public async execute({
        name,
        email,
        password,
    }: Request): Promise<Patients> {
        const patientRepository = getRepository(Patients);

        const patientCreated = patientRepository.create({
            name,
            email,
            password,
        });

        const patient = await patientRepository.save(patientCreated);

        return patient;
    }
}

export default CreatePatientService;

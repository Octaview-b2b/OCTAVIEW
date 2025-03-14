import express from 'express';
import { CandidateRepository } from '../../../infrastructure/repositories/CandidateRepository';
import { CandidateUseCase } from '../../../core/use-cases/user/CandidateUseCase';
import { Candidate_Controller } from '../../controllers/user/candidate_Controllers';
import { uploadResume } from '../../middlewares/MulterSetup';
import { checkApiKey } from '../../middlewares/ApikeyValidation';
import { authenticateUser } from '../../middlewares/AuthMIddleware';

const candidateRepositery = new CandidateRepository();
const candidateUseCase = new CandidateUseCase(candidateRepositery);
const candidate_Controllers = new Candidate_Controller(candidateUseCase);

const candidateExtRouter = express.Router();
const candidateRouter = express.Router();

candidateRouter.get('/:jobId/',authenticateUser,(req,res)=>candidate_Controllers.getCandidate(req,res))

// external from/to npm
candidateExtRouter.post('/:referenceId/:jobId',checkApiKey,uploadResume, (req, res) => {
    candidate_Controllers.apply4Job(req, res);
});

export { candidateExtRouter, candidateRouter };

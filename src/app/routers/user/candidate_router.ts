import express from 'express';
import { CandidateRepository } from '../../../infrastructure/repositories/CandidateRepository';
import { CandidateUseCase } from '../../../core/use-cases/user/CandidateUseCase';
import { Candidate_Controller } from '../../controllers/user/candidate_Controllers';
import { uploadResume } from '../../middlewares/MulterSetup';

const candidateRepositery = new CandidateRepository();
const candidateUseCase = new CandidateUseCase(candidateRepositery);
const candidate_Controllers = new Candidate_Controller(candidateUseCase);

const candidateExtRouter = express.Router();
const candidateRouter = express.Router();

candidateRouter.get('/:jobId/',(req,res)=>candidate_Controllers.getCandidate(req,res))

// external from/to npm
candidateExtRouter.post('/:jobId/', uploadResume, (req, res) => {
    candidate_Controllers.apply4Job(req, res);
});

export { candidateExtRouter, candidateRouter };

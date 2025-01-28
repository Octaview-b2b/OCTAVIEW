import crypto from 'crypto';

export const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const roomIdGenerater =()=>{
  return crypto.randomBytes(5).toString('hex');
}
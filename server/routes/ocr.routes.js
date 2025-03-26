import express from 'express';
import { OcrController } from '../controllers/ocr.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();
const middleware=((req,res,next)=>{
  console.log("req.header",req.headers)
  const role=req.headers['role'];
  if(!role){
    res.send(401,{message:'un authorised'})
  }
  else{
    next()
  }
})
router.post(
  '/',
  upload.fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 }
  ]),
  OcrController.processAadhaarCard
);
router.get(
  '/',
  middleware,
 (req,res)=>{
  res.json({message:'api called'})
 }
);
export default router;


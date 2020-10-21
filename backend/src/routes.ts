import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import OrphanageController from './controllers/Orphanages.controller';

const routes = Router();
const upload = multer(uploadConfig);

routes.route('/').get((req: Request, res: Response) => {
  res.send(
    'It looks like you are trying to access Happy over HTTP on the native driver port.'
  );
});

routes
  .route('/orphanages')
  .get(OrphanageController.index)
  .post(upload.array('images'), OrphanageController.store);

routes.route('/orphanages/:id').get(OrphanageController.show);

export default routes;

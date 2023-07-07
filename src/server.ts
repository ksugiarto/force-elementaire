// @ts-nocheck
global.id = 0;

import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import Hotel from './models/hotel/hotel.model';
import dbInit from './models/db-init';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';

// import indexRouter from './routes/index';
// import usersRouter from '../routes/users';
import Activity, { ActivityInput } from './models/activity/activity.model';
import HotelCategory from './models/hotel-category/hotel-category.model';

const app: Express = express();
const PORT = 3003;

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dbInit();

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/createHotelCategory', async (req: Request, res: Response, next: NextFunction) => {
  console.log('== Hotel.sequelize.id:', Hotel.sequelize.id);

  await new HotelCategory({ isActive:true, name: 'test' }).save();

  const hotelCategories = await HotelCategory.findAll();
  res.json(hotelCategories);
})

app.post('/createHotel', async (req: Request, res: Response, next: NextFunction) => {
  console.log('== Hotel.sequelize.id:', Hotel.sequelize.id);

  await new Hotel(req.body).save();
  const hotels = await Hotel.findAll();
  res.json(hotels);
});

app.post('/createActivity', async (req: Request<{}, ActivityInput, {}, {}>, res: Response, next: NextFunction) => {
  console.log('== Activity.sequelize.id:', Activity.sequelize.id);

  // await new Activity({ isActive: true, name: 'test' }).save();
  const activityEntry = req.body as ActivityInput;
  await new Activity(activityEntry).save();
  const activities = await Activity.findAll();
  res.json(activities);
})

// https://stackoverflow.com/a/73089957/1272973
app.get('/getActivity/:id', async (req: Request<{id:number}, {}, {}, {id: number}>, res: Response, next: NextFunction) => {
  console.log('== Activity.sequelize.id:', Activity.sequelize.id);

  const {id} = req.params;
  const activity = await Activity.findByPkOrDie(id);
  res.json(activity);
})

app.use((e: Error, req: Request, res:Response, next: NextFunction) => {
  console.error(e.stack);
  res.status(500).json({
    error: e,
    message: e.message,
    stack: e.stack
  });
})

app.listen(PORT, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
// export default app;
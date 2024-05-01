import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express, {Application} from 'express';

import authRoute from './routes/auth.routes';
import errorHandler from './errors/errorHandler';
import {NODE_ENV, PORT, ALLOW_ORIGIN} from './configs/keys';

const app: Application = express();
const isLocal = NODE_ENV === 'development';

const corsOptions = {
  origin: isLocal ? ALLOW_ORIGIN : undefined,
  credentials: isLocal ? true : false,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(isLocal == true ? 'dev' : 'tiny'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoute);

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'))
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `\nctrl + click http://localhost:${PORT}\nctrl + c to stop server`
  );
});

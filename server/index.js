import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user.js';

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const corsOptions = {
    origin: true,
    credentials: true,
  };
app.use(cors(corsOptions));

app.use('/project', userRoutes);

const CONNECTION_URL = "mongodb+srv://admin:admin@lab3.uxvq8.mongodb.net/Project?authSource=admin&replicaSet=atlas-l7cxlf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
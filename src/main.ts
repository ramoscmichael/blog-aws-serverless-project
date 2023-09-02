import bodyParser from 'body-parser';
import express, { Application } from "express";
import serverless from "serverless-http";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerJson from './swagger.json';
import { Logger } from "./util";

const app: Application = express();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api", routes);

app.use('/apiDocs', swaggerUi.serve);
app.get('/apiDocs', swaggerUi.setup(swaggerJson));

module.exports.handler = serverless(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.default.info("start listening to port" + port)
});
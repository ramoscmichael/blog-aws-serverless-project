import express, { Application } from "express";
import serverless from "serverless-http";
import bodyParser from 'body-parser';
import routes from "./routes";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Logger } from "./util";

const app: Application = express();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ["**/*.{ts,js"] // Specify the file that contains your route definitions
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", routes);

module.exports.handler = serverless(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.default.info("start listening to port" + port)
});
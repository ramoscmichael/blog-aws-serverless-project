import swaggerJSDoc from "swagger-jsdoc";
import { version } from '../package.json';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "abc project",
            version
        }
    },
    apis: ["**/*.{ts,js"]
};

export default options;

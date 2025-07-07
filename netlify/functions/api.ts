import serverless from "serverless-http";
import { createServer } from "../../server/app"; // Updated import path

export const handler = serverless(createServer());

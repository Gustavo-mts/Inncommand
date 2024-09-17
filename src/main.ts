import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from 'serverless-http';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

let cachedServer: any;

async function bootstrap(expressInstance: any) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  return app.init();
}

async function setup() {
  const expressApp = express();
  await bootstrap(expressApp);
  return serverless(expressApp);
}

export const handler = async (event: any, context: any, callback: Function) => {
  if (!cachedServer) {
    cachedServer = await setup();
  }
  return cachedServer(event, context, callback);
};

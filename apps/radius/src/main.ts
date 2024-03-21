import { NestApplication, NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { SocketType, UdpServer } from '@silicia/core';
import { ConfigService } from '@nestjs/config';
import { RadiusModule } from './radius.module';

async function bootstrap() {
  const logger: Logger = new Logger('radius');
  const app = await NestFactory.create<NestApplication>(RadiusModule);
  const config = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new UdpServer({
      bindOptions: {
        address: config.get('radius_address_bind'),
        port: config.get('radius_port_bind'),
      },
      socketOptions: {
        type: SocketType.UDP4,
      },
    }),
  });
  logger.verbose(`Start MicroService`);
  app.startAllMicroservices();
}
bootstrap();

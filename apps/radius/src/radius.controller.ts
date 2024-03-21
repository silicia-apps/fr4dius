import { Controller, Logger, UseGuards } from '@nestjs/common';

import { RadiusService } from './radius.service';
import { IncomingMessage, UDPGateWay } from '@silicia/core';
import { Payload, Ctx } from '@nestjs/microservices';
import { RadiusGuard } from './radius.guard';
import { RemoteInfo } from 'dgram';
import { RadiusPipe } from './radius.pipe';

@UDPGateWay()
@Controller('auth')
export class RadiusController {
  private logger: Logger;
  private secret: string;

  constructor(private readonly radiusService: RadiusService) {
    this.logger = new Logger(RadiusController.name);
    this.logger.debug('Start Radius Controller');
  }

  @IncomingMessage()
  @UseGuards(RadiusGuard)
  public async message(
    @Payload('packet', RadiusPipe) packet: any,
    @Ctx() rinfo: RemoteInfo,
  ): Promise<any> {
    this.logger.verbose(`Receveid message from ${rinfo.address}:${rinfo.port}`);

    if (packet.code != 'Access-Request') {
      this.logger.debug('unknown packet type: ', packet.code);
      return;
    }
    this.radiusService.auth(
      packet.attributes['User-Name'],
      packet.attributes['User-Password'],
    );
  }
}

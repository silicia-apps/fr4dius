import { Controller, Get, Inject, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IncomingMessage, UDPGateWay } from './udp-server';
import { Payload, ClientProxy } from '@nestjs/microservices';
import * as radius from 'radius';

@UDPGateWay()
@Controller()
export class AppController {
  private secret = '1234';
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  auth(@Req() request: Request): string {
   this.client.send<string>('login', {
      username: 'username',
      password: 'password',
    });
    console.log('start get');
    return 'This action returns all cats';
  }

  @IncomingMessage()
  public async message(
    @Payload() data,
    //@Ctx() rinfo: RemoteInfo,
  ): Promise<any> {
    const packet = radius.decode({ packet: data, secret: this.secret });
    console.log(JSON.stringify(packet));
    if (packet.code != 'Access-Request') {
      console.log('unknown packet type: ', packet.code);
      return;
    }

    const username = packet.attributes['User-Name'];
    const password = packet.attributes['User-Password'];

    const pattern = { cmd: 'login' };
    const code = this.client.send<string>(pattern, {
      username: username,
      password: password,
    });
    return radius.encode_response({
      packet: packet,
      code: code,
      secret: this.secret,
    });
  }
}

import { BindOptions, SocketOptions } from 'dgram';

export interface UdpServerOption {
  bindOptions: BindOptions;
  socketOptions: SocketOptions;
}

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Databases } from 'node-appwrite';

@Injectable()
export class NestAppwriteService {
  private client: Client;
  private database: Databases;
  private logger = new Logger('SiliciaAppwriteService');

  constructor(private configService: ConfigService) {
    this.logger.log('connect to apprite');
    this.client = new Client()
      .setEndpoint(configService.get('appwrite_endpoint'))
      .setProject(configService.get('appwrite_project'))
      .setKey(configService.get('appwrite_key'));
    this.database = new Databases(this.client);
  }

  async getDocuments(
    database: string,
    collection: string,
    query: string[],
  ): Promise<any> {
    try {
      return await this.database.listDocuments(database, collection, query);
    } catch (e) {
      this.logger.error(e);
    }
  }
}

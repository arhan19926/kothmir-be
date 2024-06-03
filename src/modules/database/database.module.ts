import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

const URI = process.env.MONGO_URI;

@Module({
  imports: [
    MongooseModule.forRoot(URI, {
      connectionFactory: (connection) => {
        connection.once('open', () => {
          console.log('Database connection established', 'MongoDB');
        });
        connection.on('error', (error) => {
          console.error(`Database connection error: ${error}`, 'MongoDB');
        });
        connection.on('disconnected', () => {
          console.warn('Database connection lost', 'MongoDB');
        });
        return connection;
      },
    }),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

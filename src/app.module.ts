import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CheckpointsModule } from './checkpoints/checkpoints.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: parseInt(<string>process.env.POSTGRE_PORT),
      username: process.env.POSTGRE_USER,
      password: process.env.POSTGRE_PASSWORD,
      database: process.env.POSTGRE_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CheckpointsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

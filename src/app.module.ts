import { Module } from '@nestjs/common';
import {AuthenticationController} from "./controllers/authentication.controller";
import {AuthService} from "./services/auth.service";
import {AuthProvider} from "./providers/auth.provider";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./model/entities/user.entity";
import {AuthenticatedUserGuard} from "./guards/authenticated-user.guard";
import {UserRepository} from "./model/repositories/user.repository";
import {AcademyController} from "./controllers/academy.controller";

console.log(process.env.DB_HOST)
@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRoot({ // credentials hardcoded as mock
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'sean',
      password: '5528469',
      database: 'academy',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AuthenticationController, AcademyController],
  providers: [
      // Providers

      AuthProvider,

      // Services

      AuthService,

      // Guards

      AuthenticatedUserGuard,

      // Repositories

      UserRepository,

  ]
})
export class AppModule {}

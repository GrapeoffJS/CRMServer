import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from './models/Task.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserTasksModule } from './current-user-tasks/current-user-tasks.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Task,
                schemaOptions: { collection: 'Tasks' }
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_LIFETIME')
                    }
                };
            }
        }),
        ConfigModule,
        CurrentUserTasksModule
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}

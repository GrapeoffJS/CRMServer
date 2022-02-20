import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StatusModel } from './models/status.model';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StatusModel
            }
        ])
    ],
    controllers: [StatusesController],
    providers: [StatusesService]
})
export class StatusesModule {}

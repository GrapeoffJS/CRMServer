import { Module } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { StatusModel } from './models/status.model';

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

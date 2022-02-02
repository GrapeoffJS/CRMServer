import { Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionController } from './composition.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from '../crud/models/Group.model';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: GroupModel }])],
    providers: [CompositionService],
    controllers: [CompositionController]
})
export class CompositionModule {}

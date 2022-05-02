import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { GroupModel } from '../crud/models/group.model';
import { CompositionController } from './composition.controller';
import { CompositionService } from './composition.service';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: GroupModel }])],
    providers: [CompositionService],
    controllers: [CompositionController]
})
export class CompositionModule {}

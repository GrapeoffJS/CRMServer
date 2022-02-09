import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TaskTagModel } from './models/task-tag.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TaskTagModel
            }
        ])
    ],
    controllers: [TagsController],
    providers: [TagsService]
})
export class TagsModule {}

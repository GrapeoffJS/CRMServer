import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskTagModel } from './models/task-tag.model';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

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

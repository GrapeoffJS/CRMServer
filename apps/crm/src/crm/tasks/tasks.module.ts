import { Module } from '@nestjs/common';

import { CrudModule } from './crud/crud.module';
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [TagsModule, CrudModule],
    controllers: [],
    providers: []
})
export class TasksModule {}

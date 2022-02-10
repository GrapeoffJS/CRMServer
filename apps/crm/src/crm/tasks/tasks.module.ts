import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';

import { CrudModule } from './crud/crud.module';

@Module({
    imports: [TagsModule, CrudModule],
    controllers: [],
    providers: []
})
export class TasksModule {}

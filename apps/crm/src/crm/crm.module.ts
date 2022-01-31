import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';
import { SearchModule } from './search/search.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from '../authentication/auth.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        GroupsModule,
        SearchModule,
        StudentsModule,
        StatusesModule
    ]
})
export class CrmModule {}

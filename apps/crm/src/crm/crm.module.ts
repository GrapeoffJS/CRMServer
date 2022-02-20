import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../authentication/auth.module';
import { GroupsModule } from './groups/groups.module';
import { SearchModule } from './search/search.module';
import { StatusesModule } from './statuses/statuses.module';
import { StudentsModule } from './students/students.module';
import { TutorsModule } from './tutors/tutors.module';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        GroupsModule,
        SearchModule,
        StudentsModule,
        StatusesModule,
        TutorsModule
    ]
})
export class CrmModule {}

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';
import { StudentCreatedOrUpdatedEvent } from './types/student-created-or-updated-event';
import { StudentDeletedEvent } from './types/student-deleted-event';

@Injectable()
export class StudentIndexerService implements OnModuleInit {
    constructor(
        @Inject('STUDENTS_INDEX_NAME')
        private readonly studentsIndexName: string,
        private readonly esService: ElasticsearchService
    ) {}

    async onModuleInit(): Promise<any> {
        if (
            (
                await this.esService.indices.exists({
                    index: this.studentsIndexName
                })
            ).statusCode === 404
        ) {
            await this.esService.indices.create({
                index: this.studentsIndexName,
                body: {
                    mappings: {
                        properties: {
                            id: { type: 'keyword', index: false },
                            type: { type: 'keyword', index: false },
                            name: {
                                type: 'text'
                            },
                            surname: {
                                type: 'text'
                            },
                            middleName: {
                                type: 'text'
                            },
                            phone: {
                                type: 'text'
                            },
                            parentPhone: {
                                type: 'text'
                            },
                            discord: {
                                type: 'keyword'
                            }
                        }
                    }
                }
            });
        }
    }

    @OnEvent('student.created')
    async create(payload: StudentCreatedOrUpdatedEvent) {
        await this.esService.create({
            index: this.studentsIndexName,
            id: payload.id,
            body: {
                type: 'student',
                ...payload
            }
        });
    }

    @OnEvent('student.updated')
    async update(payload: StudentCreatedOrUpdatedEvent) {
        await this.esService.update({
            index: this.studentsIndexName,
            id: payload.id,
            body: { doc: { type: 'student', ...payload } }
        });
    }

    @OnEvent('student.deleted')
    async delete(payload: StudentDeletedEvent) {
        await this.esService.delete({
            index: this.studentsIndexName,
            id: payload.id
        });
    }
}

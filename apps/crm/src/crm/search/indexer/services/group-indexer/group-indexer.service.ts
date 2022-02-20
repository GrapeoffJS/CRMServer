import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';

import { GroupCreatedOrUpdatedEvent } from './types/group-created-or-updated-event';
import { GroupDeletedEvent } from './types/group-deleted-event';
import { GroupDeletedManyEvent } from './types/group-deleted-many-event';

@Injectable()
export class GroupIndexerService implements OnModuleInit {
    constructor(
        @Inject('GROUPS_INDEX_NAME') private readonly groupsIndexName: string,
        private readonly esService: ElasticsearchService
    ) {}

    async onModuleInit(): Promise<any> {
        if (
            (
                await this.esService.indices.exists({
                    index: this.groupsIndexName
                })
            ).statusCode === 404
        ) {
            await this.esService.indices.create({
                index: this.groupsIndexName,
                body: {
                    mappings: {
                        properties: {
                            id: { type: 'keyword', index: false },
                            type: { type: 'keyword', index: false },
                            name: { type: 'text' }
                        }
                    }
                }
            });
        }
    }

    @OnEvent('group.created')
    async create(payload: GroupCreatedOrUpdatedEvent) {
        await this.esService.create({
            index: this.groupsIndexName,
            id: payload.id,
            body: { type: 'group', ...payload }
        });
    }

    @OnEvent('group.updated')
    async update(payload: GroupCreatedOrUpdatedEvent) {
        await this.esService.update({
            index: this.groupsIndexName,
            id: payload.id,
            body: {
                doc: { type: 'group', ...payload }
            }
        });
    }

    @OnEvent('group.deleted')
    async delete(payload: GroupDeletedEvent) {
        await this.esService.delete({
            index: this.groupsIndexName,
            id: payload.id
        });
    }

    @OnEvent('group.deletedMany')
    async deleteMany(payload: GroupDeletedManyEvent) {
        await this.esService.deleteByQuery({
            index: this.groupsIndexName,
            body: {
                bool: {
                    should: {
                        id: payload.ids
                    }
                }
            }
        });
    }
}

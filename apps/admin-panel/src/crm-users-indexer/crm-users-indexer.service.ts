import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';
import { CrmUserCreatedOrUpdatedEvent } from './types/crm-user-created-or-updated-event';
import { CrmUserDeletedEvent } from './types/crm-user-deleted-event';

@Injectable()
export class CrmUsersIndexerService implements OnModuleInit {
    constructor(
        @Inject('CRM_USERS_INDEX_NAME')
        private readonly crmUsersIndexName: string,
        private readonly esService: ElasticsearchService
    ) {}

    async onModuleInit(): Promise<any> {
        if (
            (
                await this.esService.indices.exists({
                    index: this.crmUsersIndexName
                })
            ).statusCode === 404
        ) {
            await this.esService.indices.create({
                index: this.crmUsersIndexName,
                body: {
                    mappings: {
                        properties: {
                            type: { type: 'keyword', index: false },
                            id: { type: 'keyword', index: false },
                            name: { type: 'text' },
                            surname: { type: 'text' },
                            middleName: { type: 'text' },
                            accountType: { type: 'keyword', index: false }
                        }
                    }
                }
            });
        }
    }

    @OnEvent('crmuser.created')
    async create(payload: CrmUserCreatedOrUpdatedEvent) {
        await this.esService.create({
            index: this.crmUsersIndexName,
            id: payload.id,
            body: payload
        });
    }

    @OnEvent('crmuser.updated')
    async update(payload: CrmUserCreatedOrUpdatedEvent) {
        await this.esService.update({
            index: this.crmUsersIndexName,
            id: payload.id,
            body: {
                doc: payload
            }
        });
    }

    @OnEvent('crmuser.deleted')
    async delete(payload: CrmUserDeletedEvent) {
        await this.esService.delete({
            index: this.crmUsersIndexName,
            id: payload.id
        });
    }
}

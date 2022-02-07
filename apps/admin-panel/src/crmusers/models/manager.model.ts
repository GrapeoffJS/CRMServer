import { CrmUserModel } from './crm-user.model';
import { plugin } from '@typegoose/typegoose';
import { ElasticClientInstance } from '../../../../crm/src/crm/search/ElasticClientInstance';

export class ManagerModel extends CrmUserModel {}

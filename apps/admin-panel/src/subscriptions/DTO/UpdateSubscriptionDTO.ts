import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDTO } from './CreateSubscriptionDTO';

export class UpdateSubscriptionDTO extends PartialType(CreateSubscriptionDTO) {}

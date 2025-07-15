import { PartialType } from '@nestjs/swagger';
import { CreateVotingResultDto } from './create-voting-result.dto';

export class UpdateVotingResultDto extends PartialType(CreateVotingResultDto) {}

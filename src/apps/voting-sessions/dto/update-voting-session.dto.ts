import { PartialType } from '@nestjs/swagger';
import { CreateVotingSessionDto } from './create-voting-session.dto';

export class UpdateVotingSessionDto extends PartialType(CreateVotingSessionDto) {}

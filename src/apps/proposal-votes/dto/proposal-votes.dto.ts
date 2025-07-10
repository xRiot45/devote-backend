import { IsOptional } from 'class-validator';

export class LogVoteDto {
    proposalId: number;
    optionId: number;
    voterAddress: string;
    txHash: string;

    @IsOptional()
    votedAt?: Date;
}

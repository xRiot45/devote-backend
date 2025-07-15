import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LogVoteDto {
    @IsNumber()
    proposalId: number;

    @IsNumber()
    optionId: number;

    @IsString()
    @IsNotEmpty()
    voterAddress: string;

    @IsString()
    @IsNotEmpty()
    txHash: string;

    @IsNumber()
    votedAt: number;
}

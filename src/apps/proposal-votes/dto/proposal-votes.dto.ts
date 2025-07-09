export class LogVoteDto {
    proposalId: number;
    optionId: number;
    voterAddress: string;
    txHash: string;
    votedAt: Date;
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import votingAbi from '../../../abi/VotingAbi.json';
import { ProposalVotesService } from '../proposal-votes.service';

@Injectable()
export class VotingListenerService implements OnModuleInit {
    constructor(private readonly proposalVotesService: ProposalVotesService) {}

    async onModuleInit() {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, votingAbi, provider);

        contract.on('Voted', async (voter, proposalId, optionId, txHash, votedAt, event) => {
            const realTxHash = event.transactionHash;

            try {
                await this.proposalVotesService.logVoteFromSmartContract({
                    voterAddress: voter,
                    proposalId: proposalId.toNumber(),
                    optionId: optionId.toNumber(),
                    txHash: realTxHash,
                    votedAt: new Date(Number(votedAt) * 1000),
                });
            } catch (error) {
                throw new Error(error);
            }
        });
    }
}

import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

@Injectable()
export class ProposalsService {
    create(createProposalDto: CreateProposalDto) {
        console.log(createProposalDto);
    }

    findAll() {
        return `This action returns all proposals`;
    }

    findOne(id: number) {
        return `This action returns a #${id} proposal`;
    }

    update(id: number, updateProposalDto: UpdateProposalDto) {
        console.log(updateProposalDto);
    }

    remove(id: number) {
        return `This action removes a #${id} proposal`;
    }
}

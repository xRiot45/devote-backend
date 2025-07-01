import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalOption } from 'src/databases/entities/proposal-option.entity';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { ProposalDto } from './dto/proposal.dto';

@Injectable()
export class ProposalsService {
    constructor(
        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>,
        @InjectRepository(ProposalOption)
        private readonly proposalOptionRepository: Repository<ProposalOption>,
    ) {}

    public async findAll(page: number = 1, limit: number = 2): Promise<ApiResponse<Proposal>> {
        const [items, total] = await this.proposalRepository.findAndCount({
            relations: ['proposalOptions'],
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            success: true,
            message: 'Proposals fetched successfully',
            data: {
                items,
                meta: {
                    totalItems: total,
                    itemCount: items.length,
                    itemsPerPage: limit,
                    totalPages,
                    currentPage: page,
                },
                links: {
                    first: `?page=1&limit=${limit}`,
                    previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
                    next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
                    last: `?page=${totalPages}&limit=${limit}`,
                },
            },
        };
    }

    public async create(
        proposalDto: ProposalDto,
        user: User,
        files: Express.Multer.File[],
    ): Promise<ApiResponse<Proposal>> {
        const proposal = this.proposalRepository.create({
            ...proposalDto,
            creatorWallet: user.walletAddress,
        });

        const savedProposal = await this.proposalRepository.save(proposal);

        const options = proposalDto.options.map((option, index) => {
            const file = files.find((f) => f.fieldname === `image_${index}`);
            return this.proposalOptionRepository.create({
                ...option,
                image: file?.filename,
                proposal: savedProposal,
            });
        });

        await this.proposalOptionRepository.save(options);

        const fullProposal = await this.proposalRepository.findOne({
            where: { id: savedProposal.id },
            relations: ['proposalOptions'],
        });

        return {
            success: true,
            message: 'Proposal created successfully',
            data: fullProposal,
        };
    }
}

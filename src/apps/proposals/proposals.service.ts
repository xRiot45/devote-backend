import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ProposalOption } from 'src/databases/entities/proposal-option.entity';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { User } from 'src/databases/entities/user.entity';
import { StatusEnum } from 'src/enums/status.enum';
import { In, Repository } from 'typeorm';
import { ProposalDto, ReorderProposalOptionsDto } from './dto/proposal.dto';

@Injectable()
export class ProposalsService {
    constructor(
        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>,
        @InjectRepository(ProposalOption)
        private readonly proposalOptionRepository: Repository<ProposalOption>,
    ) {}

    // TODO: Find All With Pagination
    // public async findAll(page: number = 1, limit: number = 2): Promise<ApiResponse<Proposal>> {
    //     const [items, total] = await this.proposalRepository.findAndCount({
    //         relations: ['proposalOptions'],
    //         skip: (page - 1) * limit,
    //         take: limit,
    //         order: { createdAt: 'DESC' },
    //     });

    //     const totalPages = Math.ceil(total / limit);

    //     return {
    //         success: true,
    //         message: 'Proposals fetched successfully',
    //         data: {
    //             items,
    //             meta: {
    //                 totalItems: total,
    //                 itemCount: items.length,
    //                 itemsPerPage: limit,
    //                 totalPages,
    //                 currentPage: page,
    //             },
    //             links: {
    //                 first: `?page=1&limit=${limit}`,
    //                 previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
    //                 next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
    //                 last: `?page=${totalPages}&limit=${limit}`,
    //             },
    //         },
    //     };
    // }

    public async findAll(): Promise<ApiResponse<Proposal[]>> {
        const proposals = await this.proposalRepository.find({
            where: { status: In([StatusEnum.DRAFT, StatusEnum.CANCELLED]) },
            relations: ['proposalOptions'],
            order: { createdAt: 'DESC' },
        });

        return {
            success: true,
            message: 'Proposals fetched successfully',
            data: proposals,
        };
    }

    public async findById(proposalId: number): Promise<ApiResponse<Proposal>> {
        const proposal = await this.proposalRepository.findOne({
            where: { id: proposalId },
            relations: ['proposalOptions'],
        });

        if (!proposal) {
            throw new NotFoundException('Proposal not found');
        }

        return {
            success: true,
            message: 'Proposal fetched by id successfully',
            data: proposal,
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

    public async update(
        proposalId: number,
        proposalDto: ProposalDto,
        files: Express.Multer.File[],
    ): Promise<ApiResponse<Proposal>> {
        const proposal = await this.proposalRepository.findOne({
            where: { id: proposalId },
            relations: ['proposalOptions'],
        });

        if (!proposal) {
            throw new NotFoundException('Proposal not found');
        }

        if (proposal?.status !== StatusEnum.DRAFT) {
            throw new BadRequestException('Only draft proposals can be updated');
        }

        // Update data proposal utama
        proposal.title = proposalDto.title;
        proposal.description = proposalDto.description;
        proposal.category = proposalDto.category;
        proposal.startTime = proposalDto.startTime;
        proposal.endTime = proposalDto.endTime;
        await this.proposalRepository.save(proposal);

        for (let i = 0; i < proposalDto.options.length; i++) {
            const dtoOption = proposalDto.options[i];
            const existingOption = proposal.proposalOptions[i];
            const file = files.find((f) => f.fieldname === `image_${i}`);

            // Jika ada file baru, hapus file lama (jika ada)
            if (file && existingOption?.image) {
                const imageFullPath = path.join(process.cwd(), 'uploads', 'proposal-images', existingOption.image);
                if (fs.existsSync(imageFullPath)) {
                    fs.unlinkSync(imageFullPath);
                }
            }

            // Jika option sudah ada, update
            if (existingOption) {
                existingOption.label = dtoOption.label;
                existingOption.description = dtoOption.description;
                existingOption.order = dtoOption.order;
                if (file) {
                    existingOption.image = file.filename;
                }

                await this.proposalOptionRepository.save(existingOption);
            } else {
                const newOption = this.proposalOptionRepository.create({
                    ...dtoOption,
                    image: file?.filename,
                    proposal,
                });
                await this.proposalOptionRepository.save(newOption);
            }
        }

        const fullProposal = await this.proposalRepository.findOne({
            where: { id: proposalId },
            relations: ['proposalOptions'],
        });

        return {
            success: true,
            message: 'Proposal updated successfully',
            data: fullProposal,
        };
    }

    public async remove(proposalId: number): Promise<BaseResponse> {
        const options = await this.proposalOptionRepository.find({
            where: { proposal: { id: proposalId } },
        });

        for (const option of options) {
            if (option.image) {
                const imageFullPath = path.join(process.cwd(), 'uploads', 'proposal-images', option.image);
                if (fs.existsSync(imageFullPath)) {
                    fs.unlinkSync(imageFullPath);
                }
            }
        }

        await this.proposalOptionRepository.delete({ proposal: { id: proposalId } });
        const result = await this.proposalRepository.delete(proposalId);
        return {
            success: result.affected > 0,
            message: result.affected > 0 ? 'Proposal deleted successfully' : 'Proposal not found',
        };
    }

    public async reorderOptions(proposalId: number, dto: ReorderProposalOptionsDto): Promise<ApiResponse<Proposal>> {
        const proposal = await this.proposalRepository.findOne({
            where: { id: proposalId },
            relations: ['proposalOptions'],
        });

        if (!proposal) {
            throw new NotFoundException('Proposal not found');
        }

        const proposalOptionIds = proposal.proposalOptions.map((option) => option.id);
        const isValid = dto.options.every((opt) => proposalOptionIds.includes(opt.id));

        if (!isValid) {
            throw new BadRequestException('One or more proposal options are invalid');
        }

        const updatePromises = dto.options.map((opt) =>
            this.proposalOptionRepository.update(opt.id, { order: opt.order }),
        );

        await Promise.all(updatePromises);

        const fullProposal = await this.proposalRepository.findOne({
            where: { id: proposalId },
            relations: ['proposalOptions'],
        });

        return {
            success: true,
            message: 'Proposal options reordered successfully',
            data: fullProposal,
        };
    }

    public async updateStatus(proposalId: number, status: StatusEnum): Promise<ApiResponse<Proposal>> {
        const proposal = await this.proposalRepository.findOne({
            where: { id: proposalId },
            relations: ['proposalOptions'],
        });

        if (!proposal) {
            throw new NotFoundException('Proposal not found');
        }

        proposal.status = status;
        await this.proposalRepository.save(proposal);

        return {
            success: true,
            message: 'Proposal status updated successfully',
            data: proposal,
        };
    }
}

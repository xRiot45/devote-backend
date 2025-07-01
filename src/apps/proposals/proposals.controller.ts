import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { createMulterConfig } from 'src/configs/multer.config';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { User } from 'src/databases/entities/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProposalDto, ReorderProposalOptionsDto } from './dto/proposal.dto';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {
    constructor(private readonly proposalsService: ProposalsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    public async findAll(@Query() query: PaginationQueryDto): Promise<ApiResponse<Proposal>> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;

        return await this.proposalsService.findAll(page, limit);
    }

    @Get('/:proposalId')
    @UseGuards(JwtAuthGuard)
    public async findById(@Param('proposalId', ParseIntPipe) proposalId: number): Promise<ApiResponse<Proposal>> {
        return await this.proposalsService.findById(proposalId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AnyFilesInterceptor(createMulterConfig('proposal-images')))
    public async create(
        @UploadedFiles() files: Express.Multer.File[],
        @Req() req: Request,
        @CurrentUser() user: User,
    ): Promise<ApiResponse<Proposal>> {
        const body = req.body;

        const parsedOptions = Object.keys(body)
            .filter((key) => key.startsWith('options['))
            .reduce((acc, key) => {
                const match = key.match(/options\[(\d+)\]\.(\w+)/);
                if (match) {
                    const index = Number(match[1]);
                    const field = match[2];
                    acc[index] = acc[index] || {};
                    acc[index][field] = body[key];
                }
                return acc;
            }, []);

        const proposalDto: ProposalDto = {
            title: body.title,
            description: body.description,
            category: body.category,
            startTime: new Date(body.startTime),
            endTime: new Date(body.endTime),
            options: parsedOptions.map((opt, i) => ({
                ...opt,
                order: Number(opt.order),
                image: files.find((f) => f.fieldname === `image_${i}`)?.filename,
            })),
        };

        return this.proposalsService.create(proposalDto, user, files);
    }

    @Patch('/:proposalId')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AnyFilesInterceptor(createMulterConfig('proposal-images')))
    public async update(
        @UploadedFiles() files: Express.Multer.File[],
        @Req() req: Request,
        @Param('proposalId', ParseIntPipe) proposalId: number,
    ): Promise<ApiResponse<Proposal>> {
        const body = req.body;

        const parsedOptions = Object.keys(body)
            .filter((key) => key.startsWith('options['))
            .reduce((acc, key) => {
                const match = key.match(/options\[(\d+)\]\.(\w+)/);
                if (match) {
                    const index = Number(match[1]);
                    const field = match[2];
                    acc[index] = acc[index] || {};
                    acc[index][field] = body[key];
                }
                return acc;
            }, []);

        const proposalDto: ProposalDto = {
            title: body.title,
            description: body.description,
            category: body.category,
            startTime: new Date(body.startTime),
            endTime: new Date(body.endTime),
            options: parsedOptions.map((opt, i) => ({
                ...opt,
                order: Number(opt.order),
                image: files.find((f) => f.fieldname === `image_${i}`)?.filename,
            })),
        };

        return this.proposalsService.update(proposalId, proposalDto, files);
    }

    @Delete('/:proposalId')
    @UseGuards(JwtAuthGuard)
    public async remove(@Param('proposalId', ParseIntPipe) proposalId: number): Promise<BaseResponse> {
        return await this.proposalsService.remove(proposalId);
    }

    @Patch('/:proposalId/reorder-options')
    @UseGuards(JwtAuthGuard)
    async reorderProposalOptions(
        @Param('proposalId', ParseIntPipe) proposalId: number,
        @Body() dto: ReorderProposalOptionsDto,
    ): Promise<BaseResponse> {
        return await this.proposalsService.reorderOptions(proposalId, dto);
    }
}

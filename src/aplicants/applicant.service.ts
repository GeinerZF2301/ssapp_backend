import { InjectRepository } from "@nestjs/typeorm";
import { Applicant } from "./applicant.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm/repository/Repository";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { PostHiringsService } from "src/post-hirings/post-hiring.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { StatusAplicant } from "./helpers/statusAplicant";

import { UpdateApplicantDto } from "./dto/update-applicant.dto";


export class ApplicantService {
    constructor(
        @InjectRepository(Applicant)
        private applicantRepository: Repository<Applicant>,
        private userService: UsersService,
        private postHiringService: PostHiringsService
    ) { }

    async createApplicant(newApplicant: CreateApplicantDto) {
        try {
            const applicantMusician = await this.userService.getUser(newApplicant.applicantMusicianId);
            const postHiringFound = await this.postHiringService.getPostHiringById(newApplicant.postId);

            if (applicantMusician instanceof HttpException) {
                throw applicantMusician;
            } else if (postHiringFound instanceof HttpException) {
                throw postHiringFound;
            } else {
                const newApplicantMusician = await this.applicantRepository.create({
                    post: postHiringFound,
                    applicantMusician: applicantMusician,
                    status: StatusAplicant.status.OPEN,
                });
                await this.applicantRepository.save(newApplicantMusician);
            }
        } catch (error) {
            console.error(error);
            throw new HttpException("Ha ocurrido un error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateStatusApplicant(id: number, updateApplicant: UpdateApplicantDto){
        const applicantFound = await this.applicantRepository.findOne({
            where:{
                id,
            },
        });
        if(!applicantFound){
            throw new HttpException("La solicitud a la oferta no fue encontrada", HttpStatus.NOT_FOUND);
        }
        applicantFound.status = updateApplicant.status;
        await this.applicantRepository.save(applicantFound); 
    }
}

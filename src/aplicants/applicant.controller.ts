import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApplicantService } from "./applicant.service";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";
import { ApplicantQueries } from "src/queries/applicants/applicant.queries";


@Controller('applicants')
export class ApplicantController{
    constructor(private applicantService : ApplicantService,
        private applicantQueriesService : ApplicantQueries){}

    @Post()
    createApplicant(@Body() newPostHiring: CreateApplicantDto){
        return this.applicantService.createApplicant(newPostHiring);
    }
    @Patch(':id')
    updateStatusApplicant(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateApplicant: UpdateApplicantDto){
        return this.applicantService.updateStatusApplicant(id, updateApplicant)
    }
    //Espera el id del usuario del que se quiere consultar las aplicaciones a ofertas
    @Get('user/:id')
    QueryApplicantDataByUserId(@Param('id', ParseIntPipe) id: number){
        return this.applicantQueriesService.getApplicantDataByUserId(id);
    }
    @Get('post/:postId')
    QueryApplicantDataByPostId(@Param('postId', ParseIntPipe) postId: number){
        return this.applicantQueriesService.getApplicantDataByPostId(postId);
    }

    
}
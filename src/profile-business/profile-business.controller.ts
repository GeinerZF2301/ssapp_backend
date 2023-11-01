import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { ProfileBusinessService } from './profile-business.service';
import { CreateProfileBusinessDto } from './dto/create-profile-business.dto';
import { UpdateProfileBusinessDto } from './dto/update-profile-business.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('profile-businesses')
@Controller('profile-businesses')
export class ProfileBusinessController {
  constructor(private readonly profileBusinessService: ProfileBusinessService) { }

  @Get()
  getProfileBusinesses() {
    return this.profileBusinessService.getProfileBusinesses();
  }

  @Get(':id')
  getProfileBusiness(@Param('id', ParseIntPipe) id: number) {
    return this.profileBusinessService.getProfileBusiness(id);
  }

  @Post()
  createProfileBusiness(@Body() newProfileBusiness: CreateProfileBusinessDto) {
    return this.profileBusinessService.createProfileBusiness(newProfileBusiness);
  }

  @Delete(':id')
  deleteProfileBusiness(@Param('id', ParseIntPipe) id: number) {
    return this.profileBusinessService.deleteProfileBusiness(id);
  }

  @Patch(':id')
  updateProfileBusiness(@Param('id', ParseIntPipe) id: number, @Body() profileBusiness: UpdateProfileBusinessDto) {
    return this.profileBusinessService.updateProfileBusiness(id, profileBusiness);
  }
}

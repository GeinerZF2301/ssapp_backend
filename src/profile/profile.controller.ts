import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfiles() {
    return this.profileService.getProfiles();
  }
  @Post()
  createProfile(@Body() newProfile: CreateProfileDto) {
    return this.profileService.createProfile(newProfile);
  }
  @Get(':id')
  getProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getProfileById(id);
  }
  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfile: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, updateProfile);
  }
  
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileBusiness } from './profile-business.entity';
import { ProfileBusinessController } from './profile-business.controller';
import { ProfileBusinessService } from './profile-business.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileBusiness])],
  controllers: [ProfileBusinessController],
  providers: [ProfileBusinessService],
})
export class ProfileBusinessModule {}

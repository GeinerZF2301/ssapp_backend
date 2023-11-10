import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostHiring } from './post-hiring.entity';
import { PostHiringsController } from './post-hiring.controller';
import { PostHiringsService } from './post-hiring.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


@Module({
    imports: [TypeOrmModule.forFeature([PostHiring, User])],
    controllers: [PostHiringsController],
    providers: [PostHiringsService, UsersService]
})
export class PostHiringsModule {
}

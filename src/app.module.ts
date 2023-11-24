
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { CategoryBusinessModule } from './category-business/category-business.module';
import { ProfileBusinessModule } from './profile-business/profile-business.module';
import { CategorySkillsModule } from './category-skills/category-skills.module';
import { PostHiringsModule } from './post-hirings/post-hirings.module';
import { AplicantsModule } from './aplicants/applicants.module';
import { ProfileModule } from './profile/profile.module';
import { PostSkillsModule} from './post-skills/post-skills.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      imports: [ConfigModule],
    }),
    UsersModule,
    SkillsModule,
    AuthModule,
    ReviewsModule,
    RecruitmentsModule,
    CategoryBusinessModule,
    ProfileBusinessModule,

    CategorySkillsModule,
    PostHiringsModule,
    AplicantsModule,
    ProfileModule,
    PostHiringsModule,
    PostSkillsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
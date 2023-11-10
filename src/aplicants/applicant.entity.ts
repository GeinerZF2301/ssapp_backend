import { PostHiring } from "src/post-hirings/post-hiring.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'applicants'})

export class Applicant{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => PostHiring)
    @JoinColumn({ name: 'postId' })
    post: PostHiring;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'applicantMusicianId' })
    applicantMusician: User;

    @Column({name:'status'})
    status: string

   
}
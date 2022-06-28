import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CheckpointDto } from './dto/checkpoint.dto';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private data;
  private statusCode = 400;
  private success = false;
  private message;

  async update(id: string, checkpointDto: CheckpointDto, res) {
    let isSuccess = false;
    let successCount = 0;
    let waitingCount = 0;
    try {
      const update = await this.userRepository.update(id, checkpointDto)
      const user = await this.userRepository.findOne({
        where: {
          uid: id,
        },
      });

      for(const result in user) {       
        if(user[result] === true) {
          successCount++;
        } else {
          waitingCount++;
        }
      }

      if(successCount === 10) {
        isSuccess = true;
      }

      if(update) {
        this.statusCode = 200;
        this.success = true;
        this.message = "Checkpoint successfully."
        this.data = {
          isSuccess: isSuccess,
          successCount: successCount,
          waitingCount: (waitingCount - 4),
          result: await update
        };
      } else {
        this.message = "Checkpoint field!";
      }
    } catch (error) {
      this.message = error;
    }

    return res.status(this.statusCode).send({
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

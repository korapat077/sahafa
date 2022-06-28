import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private data;
  private statusCode = 400;
  private success = false;
  private message;

  async create(userDto: UserDto, res) {
    try {
      const save = this.userRepository.save(userDto)
      if(save) {
        this.statusCode = 201;
        this.success = true;
        this.message = "Create user successfully."
        this.data = await save;
      } else {
        this.message = "Create user field!";
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

  async findOne(id: string, res): Promise<User> {
    let isSuccess = false;
    let successCount = 0;
    let waitingCount = 0;
    try {
      this.statusCode = 200;
      this.success = true;
      
      const result = await this.userRepository.findOne({
        where: {
          uid: id,
        },
      });
      
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

      this.data = {
        isSuccess: isSuccess,
        successCount: successCount,
        waitingCount: (waitingCount - 4),
        result: result
      }
    } catch (error) {}

    return res.status(this.statusCode).send({
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

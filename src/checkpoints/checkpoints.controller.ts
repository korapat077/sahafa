import { Controller, Body, Patch, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointDto } from './dto/checkpoint.dto';

@ApiTags('CheckPoints')
@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckpointDto: CheckpointDto, @Res() res) {
    return this.checkpointsService.update(id, updateCheckpointDto, res);
  }
}
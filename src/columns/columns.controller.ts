import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';
import { ColumnDto } from './dto/create.column.dto';
import { UserVerification } from 'src/guard/verification.guard';
import { IParamsData } from 'src/types/global.type';



@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  addColumn(@Body(new ValidationPipe()) data: ColumnDto, @Req() req: Request) {
    const { userId } = req.cookies;
    return this.columnsService.createColumn(data.title, userId);
  }

  @Delete('delete/:userId/:id')
  @UseGuards(AuthGuard, UserVerification)
  removeColumn(@Req() req: Request) {
    const id = req.params.id;   
    return this.columnsService.deleteColumnById(+id);
  }

  @Get(':id')
  getColumn(@Param('id') id: number) {
    return this.columnsService.getColumnById(id)
  }

  @Get()
  getColumns() {
    return this.columnsService.getAllColumns();
  }

  @Patch('update/:userId/:id')
  @UseGuards(AuthGuard, UserVerification)
  updateColumn(@Body(new ValidationPipe()) data: ColumnDto, @Param() params: IParamsData) {
    
    return  this.columnsService.updateColumnTitle(+params.id, data.title)
  }
 }

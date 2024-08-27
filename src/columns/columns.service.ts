import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ColumnModel } from './entities/column.entity';

@Injectable()
export class ColumnsService {

    constructor(@Inject('COLUMNS_REPOSITORY') private useRepository: typeof ColumnModel ) {}

  async createColumn(title: string, userId: number) {
        const column = await this.useRepository.create({
            title,
            userId
        })

        return column
    }

    async deleteColumnById(columnId: number): Promise<number> {
        const column = await this.useRepository.findOne({where: {id: columnId}})
        if (!column) {
             throw new BadRequestException('')
        }
       const data = await this.useRepository.destroy({where: {id: columnId}})
       console.log(data);
       return data
       
    } 

    async getColumnById(columnId: number): Promise<ColumnModel> {
       const column = await this.useRepository.findOne({where: {id: columnId}})

       if(!column) {
        throw new BadRequestException(`Колонка с ${columnId} не найдена`)
       } 

       return column
    }

    async getAllColumns(): Promise<ColumnModel[]> { 
        return await this.useRepository.findAll()
    }

    async updateColumnTitle(columnId: number, newTitle: string): Promise<ColumnModel> { 
       const column = await this.useRepository.findOne({where: {id: columnId}})

       if(!column) { 
        throw new BadRequestException(`Колонка с ${columnId} не найдена`)
       }

       await  column.update({title: newTitle})

       await   column.save()
       return column
       
    }
        
}

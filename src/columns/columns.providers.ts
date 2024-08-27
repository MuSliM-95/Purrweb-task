import { ColumnModel } from "./entities/column.entity";


export const columnProviders = [
    {
        provide: 'COLUMNS_REPOSITORY',
        useValue: ColumnModel
    }
]
import { StyleModel } from './StyleModel';


export class TableSetting {
    columnsCount: number;
    rowsCount: number;
    color: string;
    backgroundColor: string;
    columnWidth: string;
    cellHeight: string;
    borderSize: string;
    borderColor: string;
    borderStyle: string;
    tableHeight: string;
    tableWidth: string;



    constructor() {
        this.columnsCount = 1;
        this.rowsCount = 1;
        this.color = '';
        this.backgroundColor = '';
        this.columnWidth = '';
        this.cellHeight = '';
        this.borderSize = '';
        this.borderColor = '';
        this.borderStyle = '';
        this.tableHeight = '';
        this.tableWidth = '';
    }


    static getColumns(): { [key: string]: any } {
        return {
            columnsCount: 0,
            columnsStyle: 'columnsStyle',
            columnsStyleIsTheSame: 'columnsStyleIsTheSame',
            rowsCount: 'rowsCount',
            rowsStyle: 'rowsStyle',
            rowsStyleIsTheSame: 'rowsStyleIsTheSame',
        }
    }
}
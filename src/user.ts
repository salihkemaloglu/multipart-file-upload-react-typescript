export class UserInfo {
    constructor() {
        this.Publisher = '';
        this.FileName = '';
        this.FileHash = '';
        this.FileOpenedDate = '';
        this.UnitAmount = 0;
        this.RemaningDate = [];
    }
    Publisher: string;
    FileName: string;
    FileHash: string;
    FileOpenedDate: string;
    UnitAmount: number;
    RemaningDate: any[];
}

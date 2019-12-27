import { IdbService } from "./idb.service";
import { IDataBase, DATA_TYPE, ITable } from "jsstore";
export class BaseService {
  dbname = "Task_Board";
  constructor() {
    // turn on jsstore log status - help you to debug
    // turn off it in production or when you dont need
    //this.connection.setLogStatus(true);
    this.initJsStore();
  }
  get connection() {
    return IdbService.idbCon;
  }

  initJsStore() {
    this.connection
      .isDbExist(this.dbname)
      .then(isExist => {
        if (isExist) {
          this.connection.openDb(this.dbname);
        } else {
          const dataBase = this.getDatabase();
          this.connection.initDb(dataBase);
        }
      })
      .catch(err => {
        // this will be fired when indexedDB is not supported.
        alert(err.message);
      });
  }
  private getDatabase() {
    const tblTasks: ITable = {
      name: "tasks",
      columns: {
        id: { primaryKey: true, autoIncrement: true },
        task_name: { notNull: true, dataType: DATA_TYPE.String },
        task_date: { notNull: true, dataType: DATA_TYPE.DateTime },
        description: { dataType: DATA_TYPE.String }
      }
    };
    const dataBase: IDataBase = {
      name: this.dbname,
      tables: [tblTasks]
    };
    return dataBase;
  }
}

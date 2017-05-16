import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  constructor(private sql: SQLite, private platform: Platform) {
    console.log('Hello Database Provider');
  }

  private db: SQLiteObject;
  static DATABASE_NAME = '_happyhourdb';

  private getDb(): Observable<SQLiteObject> {
    return Observable.create((observer: Observer<any>) => {
      if (this.db) {
        observer.next(this.db);
        observer.complete();
      } else {
        this.sql.create({
          name: Database.DATABASE_NAME,
          location: 'default'
        }).then((db) => {
          this.db = db;
          observer.next(this.db);
          observer.complete();
        });
      }
    });
  }

  executeSql(sql: string, params: Array<any> = []): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.platform.ready().then(() => {
        this.getDb().subscribe((db) => {
          db.executeSql(sql, params).then((rs) => {
            observer.next(rs);
            observer.complete();
          }, (err) => {
            console.error(`Erro SQL: ${sql}\nParametros: ${JSON.stringify(params)}\nErro: ${JSON.stringify(err)}`);
            observer.error(err);
            observer.complete();
          });
        });
      });
    });
  }

}

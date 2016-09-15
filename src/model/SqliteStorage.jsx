const app = window.require('electron').remote.app;
const fs = window.require('electron').remote.fs;
const sqlite3  = window.require('electron').remote.require('sqlite3');

const DB_FILE = "D:\\MWriter\\data.db"



let withDb = (callback) => {
   let db = new sqlite3.Database(DB_FILE);
   callback(db)
   db.close
}

export default class SqliteStorage{
   construct(){

   }

   getNotebooks(callback){
      withDb( (db) => {
         db.serialize( () => {
            db.all("SELECT id, name FROM notebooks", function(err, rows) {
               callback(err, rows)
           });
         })
      })
   }

   getNotebook(id, callback){
      withDb( (db) => {
         db.serialize( () => {
            db.all("SELECT id, title, subtitle, text FROM pages ORDER BY order", function(err, rows) {
               callback(err, rows)
           });
         })
      })
   }

   saveNotebook(notebook){
   }

   savePage(page){

   }
}

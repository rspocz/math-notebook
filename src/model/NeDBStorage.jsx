const app = window.require('electron').remote.app;
const fs = window.require('electron').remote.fs;
const Datastore  = window.require('electron').remote.require('nedb')

const DB_PATH = "D:\\MWriter"

let notebooks = new Datastore({ filename: DB_PATH + "/notebooks.json", autoload: true })
/**
* name, pages: [id, id, id, id, id] */
let pages = new Datastore({ filename: DB_PATH + "/pages.json", autoload: true })
/* title, subititle, text */

//notebooks.persistence.setAutocompactionInterval(10*1000)
//pages.persistence.setAutocompactionInterval(10*1000)

export default class NeDBStorage{
   constructor(){
   }

   getNotebooks(){
      return new Promise( (resolve, reject) => {
         notebooks.find({}, function (err, docs) {
            if(err){
               reject(err)
            } else {
               resolve(docs)
            }
         });
      })
   }

   getNotebook(id){
      return new Promise( (resolve, reject) => {
         notebooks.findOne({_id: id}, function (err, ntb) {
            console.log(ntb)
            if(err){
               reject(err)
            } else {
               Promise.all( ntb.pages.map( function(pageId){
                     console.log(pageId)
                     return this.getPage(pageId)
                  }.bind(this))
               ).then( function (pages){
                  console.log(pages)
                  ntb.pages = pages
                  resolve(ntb)
               })
            }
         }.bind(this))
      })
   }

   saveNotebook(notebook){

      return Promise.all( notebook.pages.map( (page) => {
         if(page._id){
            return page._id
         } else{
            return new Promise( (resolve, reject) => {
                  this.savePage(page).then( (page) => {
                     resolve(page._id)
                  })
            })
         }
      } ) ).then( (pages) => {
         notebook.pages = pages

         return new Promise( (resolve, reject) => {
            notebooks.insert(notebook, function (err, newDoc) {
               if(err){
                  reject(err)
               } else {
                  resolve(newDoc)
               }
            })
         })
      })
   }

   updateNotebook(id, query){
      return new Promise( (resolve, reject) => {
         notebooks.update({_id: id}, query, {}, function (err, newDoc) {
            if(err){
               reject(err)
            } else {
               resolve(newDoc)
            }
         })
      })
   }

   getPage(id){
      return new Promise( (resolve, reject) => {
         pages.findOne({_id: id}, function (err, page) {
            if(err){
               reject(err)
            } else {
               resolve(page)
            }
         })
      })
   }

   savePage(page){
      return new Promise( (resolve, reject) => {
         pages.insert(page, function (err, newDoc) {
            if(err){
               reject(err)
            } else {
               resolve(newDoc)
            }
         });
      })
   }

   updatePage(id, query){
      return new Promise( (resolve, reject) => {
         pages.update({_id: id}, query, {}, function (err, newDoc) {
            if(err){
               reject(err)
            } else {
               resolve(newDoc)
            }
         })
      })
   }
}

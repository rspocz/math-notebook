const app = window.require('electron').remote.app;
const fs = window.require('electron').remote.fs;

const TEST_FILE = "D:\\MWriter\\data-notebook.json"

export default class FileStorage{
   constructor(){
   }

   getNotebooks(){
      return [{
         id: "1",
         name: "test-1"
      },
      {
         id: "2",
         name: "test-2"
      }];
   }

   getNotebook(id){
      return {
         id: "1",
         name: "test-1",
         pages: [
            {
               id: "1",
               title: "Věta 1",
               subtitle: "Vety s lehčím důkazem",
               text: "tdasd $x_1$ :))"
            },
            {
               id: "2",
               title: "Věta 2",
               subtitle: "Vety s lehčím důkazem",
               text: "tdasd $$x_1$$ :))"
            },
            {
               id: "3",
               title: "Rostoucí posloupnost",
               subtitle: "Definice",
               text: "$$\\forall n \\in \\mathbb{R} : a_n > a_{n-1}$$"
            }
         ]
      }
      //return JSON.parse(fs.readFileSync(TEST_FILE, 'utf8'))
   }

   saveNotebook(notebook){
      let json = JSON.stringify(notebook)
      fs.writeFileSync(TEST_FILE, json, 'utf8');
   }
}

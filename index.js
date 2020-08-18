const log = console.log
const App = require('./App')
const Model = require("./Model")
const Vcs = require('./Vcs')

let app = new App();
let blogs = new Model();
let git = new Vcs();

git.checkFiles();
// git.untracked();
// git.uncommited();


// blogs.store('some data 2')
// blogs.store(
//     'some data 3',
//     {
//         hooks: {
//             afterStore(data) {
//                 log('destroy', data)
//             },
//             beforeStore: (data) => {
//                 return data+'1212'
//             }
//         }
//     }
// );
// let b = blogs.finish()
// log(b)

// app.get('/user/id', (req, res, dirname, app) => {

//     console.log(req)
//     console.log(res)
//     console.log(dirname)

// })



// app.store({

//     beforeStoreFn: () => {
//         log("validating some data")
//     },
//     afterStoreFn: () => {
//         log("observe after store")
//     },
//     storeData: () => {
//         log("save some data 1")
//     },

// }
// )

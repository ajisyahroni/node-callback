const log = console.log
class App {
    constructor() {

    }
    beforeStore(callback) {
        callback()
    }
    get(path, callback) {

        let req = "req " + path;
        let res = "res";
        let instance = this;


        callback(req, res, __dirname, instance)
    }
    storeFactory(callback) {
        callback()
    }

    store({ beforeStoreFn, afterStoreFn, storeData }) {
        this.beforeStore(beforeStoreFn);
        // this.storeFactory()
        storeData()
        this.afterStore(afterStoreFn);
        return this;
    }
    afterStore(callback) {
        callback()
    }
}

module.exports = App
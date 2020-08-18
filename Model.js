class Model {
    constructor() {
        this.data = [];
    }
    sanitizeString(data) { 
        return String(data)
    }
    firing(data, { call: { init, destroy } }) {
        init();
        console.log(data)
        destroy();
    }
    store(
        data,
        {
            hooks: { beforeStore, afterStore }
        } = { hooks: { beforeStore: () => { }, afterStore: () => { } } }
    ) {
        if (!data) console.log('please insert data');
        var parseData = null
        if (beforeStore) {
            parseData = beforeStore(data) || data
        }

        this.data.push(parseData)

        if (afterStore) afterStore(parseData || data)

        return this;
    }
    finish() {
        return this.data;
    }
}

module.exports = Model
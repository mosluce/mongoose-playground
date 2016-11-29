const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        let url = process.env.MONGODB_URI || 'mongodb://localhost/mongoose-playground';
        let conn = mongoose.connection;

        conn.on('error', reject);

        conn.once('open', () => {
            console.log('Mongoose default connection open to ' + url);

            resolve()
        });

        // When the connection is disconnected
        conn.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', () => {
            conn.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        mongoose.connect(url);
    });
};

module.exports.plugin = (schema) => {
    schema.add({
        created: {
            type: Date,
            default: new Date()
        },
        updated: {
            type: Date,
            default: new Date()
        }
    });

    schema.pre('save', function (next) {
        if (!this.created) this.created = new Date();
        this.updated = new Date();
        next();
    });

    if (!schema.options.toObject) schema.options.toObject = {};
    if (!schema.options.toJSON) schema.options.toJSON = {};

    let transform = (doc, ret, options) => {
        ret.id = ret._id.toString()

        delete ret._id;
        delete ret.__v;

        return ret;
    };

    schema.options.toObject.transform = transform;
    schema.options.toJSON.transform = transform;
};
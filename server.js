global.Promise = require('bluebird');

const database = require('./libs/database');
const {User} = require('./models/user');
const {Post} = require('./models/post');

const wrapper = (fn) => (req, res, next) => fn(req, res, next).catch(next);

(wrapper(async () => {

    await database.connect();

    let username = "mosluce";
    let password = "12345678";
    let displayName = "默司";

    let user = await User.findOne({ username, password });
    await user.save();
    let userJson = user.toJSON();
    let posts = await Post.find().populate('user');

    console.log(posts);

    // if (!user) {
    //     user = await User.create({ username, password, displayName });
    // }

    // let title = "FF XV 上市啦！";
    // let content = "今天不用睡覺啦啦啦啦啦";

    // await Post.create({ title, content, user });
    // await Post.create({ title, content, user });
    // await Post.create({ title, content, user });
    // await Post.create({ title, content, user });
}))();


import User from "../models/user.js";

// Cria e já exporta a classe
export default new (class userService {
    async getOne(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async create(name, email, password) {
        try {
            const user = new User({
                name,
                email,
                password,
            });
            await user.save();
        } catch (error) {
            console.log(error);
        }
    }
})();

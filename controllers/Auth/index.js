const {UserInfl, SocialMediaAccount} = require('../../models/Users/index')
const bcrypt = require('bcrypt');
const {Role} = require('../Role/index')

class Auth extends Role {
    constructor(role) {
        super(role)
        this.validate = this.validate.bind(this)
        this.register = this.register.bind(this)
    }

   async validate(req, res, next) {
        const { email, password } = req.body;
        try {
            // Check if user exists
        const user = await UserInfl.findOne({ where: { email } });
        // console.log('user', user)

        if(!user) return res.status(404).json({ error: 'You are not registered. Please create an account' });

        const isPasswordValid = user && await bcrypt.compare(password, user.password) 
        
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Password is not correct'})
        }

        res.status(200).json({ message: 'Login successful' });  

        } catch (err) {
            res.status(500).json({ error: 'Login failed' });
        }
    }

    async register(req, res, next) {
        const {name, username, email, password, socialMediaAccounts} = req.body
        const role = this.role
        try {
            // Create the influencer
            const user = await UserInfl.create({
              name,
              email,
              username,
              password,
              userRole: role
            });

        
            // Create social media accounts
            const createdSocialMediaAccounts = await Promise.all(
              socialMediaAccounts.map(account => SocialMediaAccount.create({
                platform: account.platform,
                handle: account.handle,
                UserInflId: user.id // Associate with the influencer
              }))
            );
        
            res.status(201).json({ user, 
              socialMediaAccounts: createdSocialMediaAccounts
             });
          } catch (error) {
            res.status(500).json({ message: 'Failed to register influencer', err: error
        });
          }
    }
}

module.exports = {
    Auth
}
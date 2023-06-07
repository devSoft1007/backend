const {Role} = require('../Role/index')
const {UserInfl, SocialMediaAccount} = require('../../models/Users/index')

class Profile extends Role {
    constructor(role) {
     super(role)
     this.getProfile = this.getProfile.bind(this)
    }

    async getProfile(req, res) {
        try {
            // Get the currently logged-in influencer's ID from the authentication middleware or session
            // const influencerId = req.user.id; // Assuming you have the influencer ID available in the request object
            const influencerId = req.query.id
            // Fetch the influencer profile from the database
            const influencer = await UserInfl.findOne({
              where: { id: influencerId },
              attributes: ['id', 'name', 'email', 'username'],
              include: [{
                model: SocialMediaAccount,
                attributes: ['id', 'platform', 'handle']
              }]
            });
        
            if (!influencer) {
              // Influencer not found
              return res.status(404).json({ error: 'Influencer not found' });
            }
        
            // Return the influencer profile
            res.json(influencer);
          } catch (error) {
            // Handle error
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch influencer profile' });
          }
    }

    async updateProfile(req, res) {
      try {
        // Get the currently logged-in influencer's ID from the authentication middleware or session
        // const influencerId = req.user.id; // Assuming you have the influencer ID available in the request object
        const {id, socialId} = req.query
        // Fetch the influencer profile from the database
        const account = await UserInfl.findOne({
          where: { id: id },
          include: [{
            model: SocialMediaAccount,
            attributes: ['id', 'platform', 'handle']
          }]
        });
    
        if (!account) {
          // Influencer not found
          return res.status(404).json({ error: 'Social media account not found' });
        }
        console.log(account)
        // account.platform = platform;
        // account.handle = handle;
        await account.save();
    
        // Return the influencer profile
        res.json(account);
      } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: 'Failed to update social media account', err: error.message });
      }
    }
}

module.exports = {
    Profile
}
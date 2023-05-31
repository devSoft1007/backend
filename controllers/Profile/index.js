const {Role} = require('../Role/index')
const {UserInfl, SocialMediaAccount} = require('../../models/Users/index')

class Profile extends Role {
    constructor(role) {
     super(role)
     this.getProfile = this.getProfile.bind(this)
    }

    async getProfile(req, res, next) {
        try {
            // Get the currently logged-in influencer's ID from the authentication middleware or session
            // const influencerId = req.user.id; // Assuming you have the influencer ID available in the request object
            const influencerId = req.query.id
            // Fetch the influencer profile from the database
            const influencer = await UserInfl.findOne({
              where: { id: influencerId },
              attributes: ['id', 'name', 'email'],
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
}

module.exports = {
    Profile
}
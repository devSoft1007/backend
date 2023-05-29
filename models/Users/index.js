const {sequelize} = require('../../DBclient/DBclient')
const Sequelize = require('sequelize');

const infl = sequelize.define('UserInfluencers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User name is required" },
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            message: 'Please enter valid email address'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userRole: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      // Add more influencer-specific columns as needed
},{
    freezeTableName: true
});

const SocialMediaAccount = sequelize.define('SocialMediaAccount', {
  platform: {
    type: Sequelize.STRING,
    allowNull: false
  },
  handle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Other fields...
});

// Define the association between Influencer and SocialMediaAccount
infl.hasMany(SocialMediaAccount);
SocialMediaAccount.belongsTo(infl);

const brnd = sequelize.define('UserBrands', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userRole: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    // Add more influencer-specific columns as needed
},{
  freezeTableName: true
});

sequelize.sync().then(res => {
  console.log('All models synced')
}).catch(e  => {
  console.error(e)
})
module.exports= {
    infl,
    brnd,
    SocialMediaAccount
}
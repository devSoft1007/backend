const {sequelize} = require('../../DBclient/DBclient')
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const UserInfl = sequelize.define('UserInfl', {
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
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Password is required" },
        }
      },
      userRole: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      // Add more influencer-specific columns as needed
},{
    freezeTableName: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    }
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
UserInfl.hasMany(SocialMediaAccount);
SocialMediaAccount.belongsTo(UserInfl);

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
    UserInfl,
    brnd,
    SocialMediaAccount
}
"use strict";
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    getResetPasswordToken() {
      const resetToken = crypto.randomBytes(32).toString("hex");
      this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      this.save();

      return resetToken;
    }

     tokenToDefault() {
      this.resetPasswordExpire = null;
      this.resetPasswordToken = null;
      this.save();
      return this;
    }
     setpassword(value) {
       const hashValue =   bcrypt.hashSync(value, 10)
      this.password = hashValue
      this.resetPasswordExpire = null;
      this.resetPasswordToken = null;
      this.save();
    }


    async comparePassword(
      candidatePassword,
      userPassword
    ) {
      return await bcrypt.compare(candidatePassword, userPassword);
    };
    static associate(models) {
      // define association here
      User.hasOne(models.Email);
      User.hasMany(models.Post, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
          min:8
        }

      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          min: 7,
        },
      },
      user_plan: DataTypes.ENUM("planA", "planB"),
      resetPasswordToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      resetPasswordExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: [""],
        },
      },
    }
  );
  return User;
};

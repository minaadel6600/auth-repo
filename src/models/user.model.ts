import * as mongoose from 'mongoose';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  roles:[role];
  password: string;
  address?: {
    street: string,
    city: string,
  };
}

const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
});

export enum role{
  admin='admin', agent ='agent', end_user = 'end_user'
}

const userSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    refreshToken: String,
    roles: {
      type: [String],
      enum: [role],
      default: ['end_user'],
    },
    password: {
      type: String
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// userSchema.virtual('posts', {
//   ref: 'Post',
//   localField: '_id',
//   foreignField: 'author',
// });

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;

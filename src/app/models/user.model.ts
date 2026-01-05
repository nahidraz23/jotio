import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: function (props) {
          return `${props.value} is not a valid email`;
        },
      },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [5, "Last name should be minimum 5 charecters long"],
      maxLength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be 18, got {VALUE}"],
      max: 60,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "Role is not valid",
      },
      uppercase: true,
      default: "USER",
    },
    address: addressSchema,
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// Pre hook and post hook middleware

// pre hook - document middleware
userSchema.pre("save", async function (next: any) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// pre hook - query middleware
userSchema.pre("find", function (doc) {
  console.log(doc);
//   next()
});

// post hook - query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

// post hook - query middleware
userSchema.post("save", function (doc, next) {
  console.log(`${doc.email} has been saved`);
  next();
});

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

export const User = model<IUser, UserStaticMethods>("User", userSchema);

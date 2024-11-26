import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    profile: { type: String, default: "" },
    phoneNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (value: string) {
          return value ? true : true;
        },
        message: "Phone number is already in use",
      },
      required: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "moderator"],
      default: "customer",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ phoneNumber: 1 }, { unique: true, sparse: true });

export const UserModel = model("User", userSchema);

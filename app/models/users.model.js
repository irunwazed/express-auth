import mongoose from "mongoose";

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      username: String,
      password: String,
      level: Number,
      profil: {
        name: String,
        nik: String,
      }
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model('users', schema);

  return Users
}
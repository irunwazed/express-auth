import mongoose from "mongoose";

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      username: {
				type: String,
				required: true,
        unique: true,
			},
      level: {
				type: Number,
				required: true,
			},
      password: {
				type: String,
				required: true,
			},
      profil: {
        name: String,
        nik: String,
      }
    },
    { timestamps: true }
  );

  // schema.method('toJSON', function() {
  //   const {__v, _id, ...object} = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const Login = mongoose.model('login', schema);

  return Login
}
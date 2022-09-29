import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      login_id: {type: Schema.Types.ObjectId, ref: 'Login', unique: true},
    },
    { timestamps: true }
  );

  // schema.method('toJSON', function() {
  //   const {__v, _id, ...object} = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const Pegawai = mongoose.model('pegawai', schema);

  return Pegawai
}
import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      opd_id: [
				{type: Schema.Types.ObjectId, ref: 'opd'}
			],
      pegawai_id: [
				{type: Schema.Types.ObjectId, ref: 'pegawai'}
			],
			level: {
				type: Number,
				required: true,
			}
    },
    { timestamps: true }
  );

  // schema.method('toJSON', function() {
  //   const {__v, _id, ...object} = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const Pegawai = mongoose.model('pegawai_opd', schema);

  return Pegawai
}
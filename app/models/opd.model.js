import mongoose from "mongoose";

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      opd_nama: {
				type: String,
				required: true,
			},
      pimpinan: {
        nama: String,
        nip: String,
      }
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
  });

  const Opd = mongoose.model('opd', schema);

  return Opd
}
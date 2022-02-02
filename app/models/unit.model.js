import assetModel from "./asset.model";

module.exports = mongo => {
  var schema = mongo.Schema(
    {
      assets: assetModel
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Unit = mongo.model("unit", schema);
  return Unit;
};

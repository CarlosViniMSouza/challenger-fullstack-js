import assetModel from "./asset.model";
import unitModel from "./unit.model";
import userModel from "./user.model";

module.exports = mongo => {
  var schema = mongo.Schema(
    {
      name: String,
      assets: assetModel,
      users: userModel,
      units: unitModel
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Company = mongo.model("company", schema);
  return Company
};

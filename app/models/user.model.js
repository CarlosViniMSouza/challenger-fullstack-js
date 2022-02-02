module.exports = mongo => {
  var schema = mongo.Schema(
    {
      username: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongo.model("user", schema);
  return User;
};
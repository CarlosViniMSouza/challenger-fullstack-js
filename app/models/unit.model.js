module.exports = mongo => {
  var schema = mongo.Schema(
    {
      assetsLot: Number,
      published: Boolean
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

// each asset must have: image, name, description, model, owner, status and health_level
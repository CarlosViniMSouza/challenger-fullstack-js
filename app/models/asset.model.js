module.exports = mongo => {
  var schema = mongo.Schema(
    {
      // image: Image, -> how to resolve?
      name: String,
      description: String,
      model: String,
      owner: String,
      status: String,
      heath_level: Number,
      published: Boolean,
      unit_lot: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Asset = mongo.model("asset", schema);
  return Asset;
};

// each asset must have: image, name, description, model, owner, status and health_level
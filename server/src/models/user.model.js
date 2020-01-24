module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    name: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    tokens: [
      {
        device: { type: String, enum: ['ios', 'android'] },
        type: { type: String, enum: ['fcm', 'app'] },
        token: { type: String },
        active: { type: Boolean, default: true }
      }
    ],
    gender: { type: String, enum: ['female', 'male'], default: 'male' },
    role: { type: String, enum: ['customer', 'instructor', 'admin', 'superadmin'], default: 'customer' },
    active: {
      type: String,
      enum: ['enabled', 'disabled', 'deleted'],
      default: 'enabled'
    },
    programs: [{ type: Schema.ObjectId, ref: 'programs' }]
  }, {
      timestamps: true
    })

  return mongooseClient.model('users', users);
};
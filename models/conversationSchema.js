const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    participent: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'message',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('conversation', conversationSchema);

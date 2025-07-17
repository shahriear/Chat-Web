const conversationSchema = require('../models/conversationSchema');
const userSchema = require('../models/userSchema');

const createConversation = async (req, res) => {
  try {
    const { participentEmail } = req.body;
    if (!participentEmail) {
      return res.status(400).send({ error: 'Participent Email is Required!' });
    }
    if (participentEmail === req.user.email) {
      return res.status(400).send({ error: 'Try With Another Email!' });
    }
    const participentData = await userSchema.findOne({
      email: participentEmail,
    });
    if (!participentData) {
      return res.status(400).send({ error: 'No User Found!' });
    }
    const conversation = new conversationSchema({
      creator: req.user.id,
      participent: participentData._id,
    });
    conversation.save();
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const conversationList = async (req, res) => {
  console.log(req.user);

  try {
    const conversation = await conversationSchema
      .find({
        $or: [{ creator: req.user.id }, { participent: req.user.id }],
      })
      .populate('creator', 'fullName avatar email')
      .populate('participent', 'fullName avatar email')
      .populate('lastMessage');
    if (!conversation) {
      return res.status(400).send({ error: 'No Conversation Found !' });
    }
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
module.exports = { createConversation, conversationList };

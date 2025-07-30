const { emailValidators } = require('../helpers/emailValidators');
const conversationSchema = require('../models/conversationSchema');
const userSchema = require('../models/userSchema');

const createConversation = async (req, res) => {
  try {
    const { participentEmail } = req.body;
    if (!participentEmail) {
      return res.status(400).send({ error: 'Participent Email is Required!' });
    }
    if (emailValidators(participentEmail))
      return res.status(400).send({ error: 'Email is not Valid!' });
    if (participentEmail === req.user.email) {
      return res.status(400).send({ error: 'Try With Another Email!' });
    }
    const participentData = await userSchema.findOne({
      email: participentEmail,
    });
    if (!participentData) {
      return res.status(400).send({ error: 'No User Found!' });
    }
    const existingParticipent = await conversationSchema.findOne({
      $or: [
        { creator: req.user.id, participent: participentData._id },
        { participent: req.user.id, creator: participentData._id },
      ],
    });
    if (existingParticipent)
      return res.status(400).send({ error: 'Already exist' });

    const conversation = new conversationSchema({
      creator: req.user.id,
      participent: participentData._id,
    });
    await conversation.save();
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const conversationList = async (req, res) => {
  // console.log(req.user);
  // const all = await conversationSchema.find();
  // console.log('All Conversations in DB:', all);

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

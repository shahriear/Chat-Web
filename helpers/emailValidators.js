const emailValidators = mail => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(mail)) {
    return false;
  } else {
    return true;
  }
};

module.exports = { emailValidators };

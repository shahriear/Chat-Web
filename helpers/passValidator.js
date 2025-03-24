function validatePassword(password) {
  // Check if password length is between 8 and 16 characters
  if (password.length < 8 || password.length > 16) {
    return 'Password must be between 8 and 16 characters.';
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  // Check if password contains at least one number
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }

  // If all checks pass
  return false;
}
module.exports = validatePassword;

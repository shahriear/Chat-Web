const verifyEmailTemplate = otp => {
  return `
  <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #4CAF50;">Welcome to ChatWeb</h2>
        
        <p style="font-size: 16px; line-height: 1.5; text-align: center;">
           ,
        </p>
         
        <p style="font-size: 16px; line-height: 1.5; text-align: center;">
            Thank you for signing up with <strong>ChatWeb LTD</strong>! To complete your registration and activate your account, please verify your email address by clicking the button below:
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <p  style="background-color: #4CAF50; color: #ffffff; padding: 12px 30px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block;">
                ${otp}
            </p>
        </div>

        <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">
            If you did not sign up for an account, please ignore this email.
        </p>
        
        <p style="font-size: 14px; color: #777777; text-align: center;">
            If you need any assistance, feel free to reach out to our support team at <a href="mailto:[Support Email]" style="color: #4CAF50;">[Support Email]</a>.
        </p>

        <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 30px;">
            Best regards,<br>
            The <strong>ChatWeb</strong> Team
        </p>
    </div>

</div>
  `;
};
const resetPassTemplate = (randomString, email) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="width: 100%; background-color: #ffffff; padding: 20px;">
        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="text-align: center;">
                    <h2 style="color: #333333;">Forgot Your Password?</h2>
                    <p style="color: #555555; font-size: 16px; line-height: 1.5;">We received a request to reset the password for your account. Click the button below to reset your password.</p>
                    <p style="text-align: center; margin-top: 20px;">
                        <a href="${process.env.BASE_URL}/api/v1/auth/resetpassword/${randomString}?email=${email}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Reset Your Password</a>
                    </p>
                    <p style="color: #555555; font-size: 14px; margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
                    <p style="color: #555555; font-size: 14px;">Thanks,</p>
                    <p style="color: #555555; font-size: 14px;">The ChatWeb Team</p>
                </td>
            </tr>
        </table>
    </div>
</div>
    `;
};

module.exports = { verifyEmailTemplate, resetPassTemplate };

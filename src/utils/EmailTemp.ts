export const emailTemplates = {
    interviewInvite: (candidateName: string, jobTitle: string, interviewDate: string, interviewTime: any, meetingUrl: string, companyName: string) => `
        <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; background: #111; color: #E5E7EB;">
            <h2 style="color: #F3F4F6; text-align: center;">Interview Invitation</h2>
            <p>Hello <strong style="color: #FFFFFF;">${candidateName}</strong>,</p>
            <p>We are pleased to invite you for an interview for the <strong style="color: #FFFFFF;">${jobTitle}</strong> position at <strong style="color: #FFFFFF;">${companyName}</strong>.</p>
            <p><strong>Date:</strong> ${interviewDate}</p>
            <p><strong>Time:</strong> ${interviewTime}</p>
            <p>Please click the button below to join the interview:</p>
            <p style="text-align: center;">
                <a href="${meetingUrl}" style="display: inline-block; background: #6366F1; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Join Interview</a>
            </p>
            <hr style="border-color: #374151; margin: 20px 0;">
            <p>If you have any questions, feel free to reach out.</p>
            <p>Best regards,<br/><strong style="color: #FFFFFF;">${companyName} Team</strong></p>
        </div>
    `,

    otpEmail: (otpCode:any) => `
        <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; background: #111; color: #E5E7EB;">
            <h2 style="color: #F3F4F6; text-align: center;">Your OTP Code</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for secure access is:</p>
            <h3 style="text-align: center; color: #10B981; background: #1F2937; padding: 12px; border-radius: 6px;">${otpCode}</h3>
            <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</p>
            <hr style="border-color: #374151; margin: 20px 0;">
            <p>Best regards,<br/><strong style="color: #FFFFFF;">Security Team</strong></p>
        </div>
    `,

    // paymentConfirmation: (username, amount, paymentDate, companyName) => `
    //     <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; background: #111; color: #E5E7EB;">
    //         <h2 style="color: #10B981; text-align: center;">Payment Confirmation</h2>
    //         <p>Dear <strong style="color: #FFFFFF;">${username}</strong>,</p>
    //         <p>We have successfully received your payment of <strong style="color: #FFFFFF;">$${amount}</strong> on <strong style="color: #FFFFFF;">${paymentDate}</strong>. Thank you for your trust in <strong style="color: #FFFFFF;">${companyName}</strong>.</p>
    //         <p>Your transaction details are securely recorded. If you need any assistance, feel free to contact us.</p>
    //         <hr style="border-color: #374151; margin: 20px 0;">
    //         <p>Best regards,<br/><strong style="color: #FFFFFF;">${companyName} Billing Team</strong></p>
    //     </div>
    // `,
};
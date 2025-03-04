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
    shortlisted: (candidateName: string, jobTitle: string, companyName: string) => `
    <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; background: #000; color: #FFFFFF;">
        <h2 style="color: #FFFFFF; text-align: center;">Congratulations! You've Been Shortlisted</h2>
        <p>Hello <strong>${candidateName}</strong>,</p>
        <p>We are pleased to inform you that you have been <strong>shortlisted</strong> for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
        <p>Our team will reach out soon with the next steps. Please check your email regularly for updates.</p>
        <hr style="border-color: #FFFFFF; margin: 20px 0;">
        <p>If you have any questions, feel free to reach out.</p>
        <p>Best regards,<br/><strong>${companyName} Hiring Team</strong></p>
    </div>
`,

rejected: (candidateName: string, jobTitle: string, companyName: string) => `
    <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; background: #000; color: #FFFFFF;">
        <h2 style="color: #FFFFFF; text-align: center;">Application Update</h2>
        <p>Hello <strong>${candidateName}</strong>,</p>
        <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
        <p>After careful consideration, we regret to inform you that we have decided to move forward with other candidates. Please know that this decision was not easy, and we truly appreciate the time and effort you invested in the process.</p>
        <p>We encourage you to stay connected with us for future opportunities that match your skills and experience.</p>
        <hr style="border-color: #FFFFFF; margin: 20px 0;">
        <p>Best wishes in your career journey!</p>
        <p>Best regards,<br/><strong>${companyName} Hiring Team</strong></p>
    </div>
`,

interviewScheduled: (candidateName: string, jobTitle: string, companyName: string, interviewDate: string, interviewTime: string) => `
    <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; background: #000; color: #FFFFFF;">
        <h2 style="color: #FFFFFF; text-align: center;">Interview Scheduled</h2>
        <p>Hello <strong>${candidateName}</strong>,</p>
        <p>We are excited to inform you that your interview for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong> has been scheduled.</p>
        <p><strong>Date:</strong> ${interviewDate}</p>
        <p><strong>Time:</strong> ${interviewTime}</p>
        <p>Please be prepared and join the interview on time. Our team will provide further details if necessary.</p>
        <hr style="border-color: #FFFFFF; margin: 20px 0;">
        <p>If you have any questions or need to reschedule, please reach out.</p>
        <p>Best regards,<br/><strong>${companyName} Hiring Team</strong></p>
    </div>
`

};
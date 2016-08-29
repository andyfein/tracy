import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = 'Phoenix Tracy';
Accounts.emailTemplates.from = 'Phoenix Tracy Accounts <accounts@gotracy.org>';

Accounts.emailTemplates.resetPassword = {
  subject() {
	return 'Reset your password on Phoenix Tracy';
  },
  text(user, url) {
	return `Hello!
	
	Click the link below to reset your password on Phoenix Tracy.
  
  ${url}

If you didn't request this email, please ignore it.

Thanks,
The Phoenix Tracy team
`;
  },
};

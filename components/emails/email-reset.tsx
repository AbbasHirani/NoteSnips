import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface PasswordResetProps {
  userName: string;
  resetUrl: string;
  companyName: string;
  requestTime: string;
}

const PasswordReset = ({userName, resetUrl, companyName, requestTime}: PasswordResetProps) => {


  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password to regain access to your account</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[16px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password for your {companyName} account.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Someone requested a password reset for your <strong>{companyName}</strong> account associated with <strong>{userName}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                If this was you, click the button below to create a new password. This link will expire in 1 hour for your security.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px] mt-[32px]">
                <Button
                  href={resetUrl}
                  className="bg-red-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn't work, you can also copy and paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all mb-[32px] m-0">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="bg-yellow-50 border border-yellow-200 rounded-[8px] p-[20px] mb-[24px]">
                <Heading className="text-[18px] font-bold text-yellow-800 m-0 mb-[12px]">
                  Security Notice
                </Heading>
                <Text className="text-[14px] text-yellow-700 mb-[8px] m-0">
                  • If you didn't request this password reset, please ignore this email
                </Text>
                <Text className="text-[14px] text-yellow-700 mb-[8px] m-0">
                  • Your current password will remain unchanged until you create a new one
                </Text>
                <Text className="text-[14px] text-yellow-700 m-0">
                  • This reset link will expire in 1 hour for your protection
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-[8px] m-0">
                If you're having trouble accessing your account or didn't request this reset, please contact our support team immediately.
              </Text>
              <Text className="text-[16px] text-gray-700 m-0">
                Stay safe and secure!
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] mt-[32px]">
              <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                © 2025 {companyName}. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                123 Business Street, Suite 100, Chennai, Tamil Nadu 600001, India
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                <Link href="#" className="text-gray-500 underline mr-[16px]">
                  Unsubscribe
                </Link>
                <Link href="#" className="text-gray-500 underline mr-[16px]">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-500 underline">
                  Support
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordReset;
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

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string; 
  companyName: string
}

const VerificationEmail = (props: VerificationEmailProps) => {
  const { userName, verificationUrl, companyName } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your account setup</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[16px]">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Welcome to {companyName}! Please verify your email to get started.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Thanks for signing up with <strong>{companyName}</strong>! To complete your account setup and start using our services, please verify your email address by clicking the button below.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                This verification link will expire in 24 hours for security purposes.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-[24px] mt-[32px]">
                <Button
                  href={verificationUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn't work, you can also copy and paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all mb-[24px] m-0">
                <Link href={verificationUrl} className="text-blue-600 underline">
                  {verificationUrl}
                </Link>
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[8px] m-0">
                If you didn't create an account with us, you can safely ignore this email.
              </Text>
              <Text className="text-[16px] text-gray-700 m-0">
                Need help? Contact our support team - we're here to assist you!
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

// VerificationEmail.PreviewProps = {
//   userEmail: "abbashirani154@gmail.com",
//   verificationUrl: "https://yourapp.com/verify?token=abc123xyz789",
//   companyName: "NoteSnips",
// };

export default VerificationEmail;
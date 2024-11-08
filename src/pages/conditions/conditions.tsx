import React from 'react';
import { Button, Collapse, CollapseProps, Flex, Layout } from 'antd';
import { useNavigation } from '@refinedev/core';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Eventeak web application',
    children: (
      <>
        <p>
          This web application (hereinafter referred to as the "Application") is
          developed by Daniel Jírovec (Eventeak) (hereinafter referred to as
          "Developer", "we", "us" or "our"). We respect your privacy and are
          committed to protecting your personal information data. This privacy
          policy (hereinafter referred to as the "Policy") describes how how we
          collect, use and share information about our users Application.
        </p>{' '}
        <h4>1. Information we collect</h4>
        <p>
          The Application collects the following types of personal information:
          name, email address, birth date and place of residence if provided by
          the user.
        </p>
        <h4> 2. How we use the collected data </h4>
        <p>
          We use the collected data for the following purposes: user management
          accounts and providing personalized services; communication with users
          (eg. sending notifications, e-mails); application security and
          protection of user accounts; compliance with legal obligations and
          protection of rights.
        </p>{' '}
        <h4>3. Sharing of data with third parties</h4>
        <p>
          Your data may be shared only under the following conditions: in the
          case of legal requests or legal proceedings if required by law.
        </p>
        <h4>4. Data security</h4>
        <p>
          {' '}
          We use technical and organizational measures to protect personal data
          against unauthorized access, change, disclosure or destruction.
        </p>
        <h4>5. Your rights</h4>
        <p>
          You have the following rights under applicable legal regulations:
          access to personal data we hold about you; correcting or updating
          personal information; request to delete your personal data (to request
          removal of your personal data please contact us through email).
        </p>
        <h4>6. Policy changes</h4>
        <p>
          We reserve the right to modify this Policy at any time and we will
          keep you informed of any changes in appropriate way (eg. e-mail).
        </p>
        <h4>7. Contact</h4>
        <p>
          If you have any questions about this Policy or the way we process your
          personal data, please contact us at{' '}
          <span style={{ fontWeight: 500 }}>dan@eventeak.com</span>
        </p>
      </>
    ),
  },
  {
    key: '2',
    label: 'Business mobile Android & iOS applications',
    children: (
      <>
        <p>
          Our mobile applications (hereinafter referred to as the
          "Applications") are developed by Daniel Jírovec (Eventeak)
          (hereinafter referred to as "Developer", "we", "us" or "our"). We
          respect your privacy and are committed to protecting your personal
          information data. This privacy policy (hereinafter referred to as the
          "Policy") describes how how we collect, use and share information
          about our users Application.
        </p>{' '}
        <h4>1. Information we collect</h4>
        <p>
          The Applications collect the following types of personal information:
          name, email address, birth date and place of residence if provided by
          the user.
        </p>
        <h4> 2. How we use the collected data </h4>
        <p>
          We use the collected data for the following purposes: user management
          accounts and providing personalized services; communication with users
          (eg. sending notifications, e-mails); applications security and
          protection of user accounts; compliance with legal obligations and
          protection of rights.
        </p>{' '}
        <h4>3. Sharing of data with third parties</h4>
        <p>
          Your data may be shared only under the following conditions: in the
          case of legal requests or legal proceedings if required by law.
        </p>
        <h4>4. Data security</h4>
        <p>
          {' '}
          We use technical and organizational measures to protect personal data
          against unauthorized access, change, disclosure or destruction.
        </p>
        <h4>5. Your rights</h4>
        <p>
          You have the following rights under applicable legal regulations:
          access to personal data we hold about you; correcting or updating
          personal information; request to delete your personal data (to request
          removal of your personal data please contact us through email or
          contact the relevant business for which the application was created).
        </p>
        <h4>6. Policy changes</h4>
        <p>
          We reserve the right to modify this Policy at any time and we will
          keep you informed of any changes in appropriate way (eg. e-mail).
        </p>
        <h4>7. Contact</h4>
        <p>
          If you have any questions about this Policy or the way we process your
          personal data, please contact us at{' '}
          <span style={{ fontWeight: 500 }}>dan@eventeak.com</span>
        </p>
      </>
    ),
  },
];

const Conditions = () => {
  const { replace } = useNavigation();
  return (
    <Layout
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f1f4f3',
      }}
    >
      <Flex
        vertical
        style={{ width: '80%', marginTop: 20 }}
        align="flex-start"
        gap={10}
      >
        <Flex style={{ width: '100%' }} justify="space-between">
          <h2>Privacy Policy</h2>
          <Button onClick={() => replace('/login')}>Go Back</Button>
        </Flex>
        <Flex style={{ width: '100%' }}>
          <Collapse style={{ width: '100%' }} items={items}></Collapse>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Conditions;

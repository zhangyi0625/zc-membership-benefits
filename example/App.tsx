import React, { useState } from 'react';
import { Button } from '../src/Button';
import { Input } from 'antd';
import { MembershipBenefits } from '../src/MembershipBenefits/index';

const App: React.FC = () => {
  const UserInfo = {
    level: 5,
    affiliateLevel: null,
    balance: 12000,
  };

  const MembershipBenefitsInfo = {
    visible: false,
    module: 'REALTIME_RATE',
    priceAmount: 10,
    soureType: 'memberUser',
  };

  const [form, setForm] = useState<any>(MembershipBenefitsInfo);

  return (
    <>
      <div className="text-blue-500">example</div>
      <Button
        label="Button"
        primary={true}
        onClick={() => setForm({ ...MembershipBenefitsInfo, visible: true })}
      />
      <Input placeholder="Input" style={{ width: '200px' }} />
      <div>test-测试</div>
      <div>{form.visible}</div>
      {form.visible && (
        <MembershipBenefits
          membershipBenefitsInfo={form}
          paymentType="ACCOUNT_FUND"
          isWeeklyPass={false}
          userInfo={UserInfo}
          onCancel={() => setForm({ ...MembershipBenefitsInfo, visible: true })}
          jumpEquity={() => {}}
          onPayment={() => {}}
        />
      )}
    </>
  );
};

export default App;

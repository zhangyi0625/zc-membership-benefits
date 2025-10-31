export type MembershipBenefitsDetailType = {
  url: string;
  options: MembershipBenefitsDetailOptionsType[];
  // [key: string]: string;
};

export type MembershipBenefitsDetailOptionsType = {
  text: string;
  status?: boolean;
};

export type MembershipBenefitsTitleType = {
  domesticConsumer: string;
  memberUser: string;
  affiliateUser: string;
};

export type MembershipBenefitsModuleType = 'REALTIME_RATE' | 'RATE_SUBSCRIBE';

export type MembershipBenefitsComboOptionsType = {
  text: string | null;
  type: 'once' | 'count' | 'weeklyPass' | 'member' | 'qrcode';
  hidden: boolean;
  price: string | number | null;
  count?: number;
  isChecked: boolean;
};

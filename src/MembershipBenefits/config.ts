import Level7 from '../assets/Level7.png';
import Level13 from '../assets/Level13.png';
import type {
  MembershipBenefitsDetailType,
  MembershipBenefitsTitleType,
  MembershipBenefitsModuleType,
  MembershipBenefitsComboOptionsType,
} from './type';

export const MembershipBenefitsTitle: Record<
  MembershipBenefitsModuleType,
  MembershipBenefitsTitleType
> = {
  REALTIME_RATE: {
    domesticConsumer: '你今日查询次数已用尽，开通会员畅享实时运',
    memberUser: '你今日查询次数已用尽，开通企业会员畅享实',
    affiliateUser: '你今日查询次数已用尽，联系客服获得更多使',
  },
  RATE_SUBSCRIBE: {
    domesticConsumer: '你暂无订阅权限，开通会员获得更多特权',
    memberUser: '你的订阅次数已用尽，开通企业会员获得更多特权',
    affiliateUser: '你的订阅次数已用尽，联系客服获得更多使用次数',
  },
};

export const MembershipBenefitsDetail: MembershipBenefitsDetailType[] = [
  {
    url: Level7,
    options: [
      { text: '实时查询 50次/天' },
      { text: '拍舱，舱位捡漏' },
      { text: '套餐外查询优惠购买' },
      { text: '运价订阅 1条' },
      { text: '箱货跟踪 1/天' },
      { text: '船舶计划 1/天' },
      { text: '国内卡车轨迹 1/天' },
      { text: '美国清关放行查询 1/天' },
      { text: '北美卡车实时运价 不限制' },
      { text: '美国清关HTS Code 不限制' },
    ],
  },
  {
    url: Level13,
    options: [
      { text: '实时查询 50000次/年' },
      { text: '拍舱，抢舱，舱位捡漏' },
      { text: '企业管理和销售支持' },
      { text: '刷箱优惠' },
      { text: '套餐外查询低价购买' },
      { text: '运价订阅 5条' },
      { text: '箱货跟踪 10/天' },
      { text: '船舶计划 10/天' },
      { text: '国内卡车轨迹 10/天' },
      { text: '美国清关放行查询 10/天' },
      { text: '北美卡车实时运价 不限制' },
      { text: '美国清关HTS Code 不限制' },
    ],
  },
];

export const MembershipBenefitsComboOptions: MembershipBenefitsComboOptionsType[] =
  [
    {
      text: '1次实时运价',
      type: 'once',
      hidden: false,
      price: '',
      isChecked: true,
    },
    {
      text: '10次起购',
      type: 'count',
      hidden: false,
      price: '',
      count: 10,
      isChecked: true,
    },
    {
      text: '个人用户周卡',
      type: 'weeklyPass',
      hidden: false,
      price: '',
      isChecked: true,
    },
    {
      text: '企业会员',
      type: 'member',
      hidden: false,
      price: '',
      isChecked: false,
    },
    {
      text: null,
      type: 'qrcode',
      hidden: false,
      price: '0.3',
      isChecked: false,
    },
  ];

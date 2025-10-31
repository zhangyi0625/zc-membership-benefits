import './membershipBenefits.scss';
import CloseIcon from './../assets/icons/close.svg';
import CorrectIcon from './../assets/icons/correct.svg';
import BalanceIcon from './../assets/icons/balance.svg';
import WxIcon from './../assets/icons/wx.svg';
import EmptyIcon from './../assets/icons/empty.svg';
import QrcodeIcon from './../assets/qrcode.png';
import MemberIcon from './../assets/icons/member.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Radio, Input, Spin } from 'antd';
import type {
  MembershipBenefitsComboOptionsType,
  MembershipBenefitsDetailType,
  MembershipBenefitsModuleType,
} from './type';
import {
  MembershipBenefitsDetail,
  MembershipBenefitsTitle,
  MembershipBenefitsComboOptions,
} from './config';

export type UserInfoType = {
  affiliateLevel: number | null;
  level: number | null;
  balance: number;
};

export type MembershipBenefitsProps = {
  membershipBenefitsInfo: {
    visible: boolean;
    module: MembershipBenefitsModuleType;
    soureType: 'domesticConsumer' | 'memberUser' | 'affiliateUser';
    priceAmount: number;
  };
  paymentType: 'ACCOUNT_FUND' | 'WECHAT';
  isWeeklyPass: boolean;
  userInfo: UserInfoType;
  onCancel: () => void;
  jumpEquity: (path: string) => void;
  onPayment: (
    params: Pick<
      MembershipBenefitsProps,
      'membershipBenefitsInfo' | 'paymentType'
    >,
  ) => void;
};

export const MembershipBenefits: React.FC<MembershipBenefitsProps> = ({
  membershipBenefitsInfo,
  isWeeklyPass,
  paymentType,
  userInfo,
  onCancel,
  jumpEquity,
  onPayment,
}) => {
  const { visible, module, soureType, priceAmount } = membershipBenefitsInfo;
  const { affiliateLevel, level, balance } = userInfo;

  const [loading, setLoading] = useState<boolean>(false);

  const [payment, setPayment] = useState(paymentType);

  const [options, setOptions] = useState(MembershipBenefitsComboOptions);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!visible) return;
    init();
  }, [visible]);

  const init = () => {
    setLoading(true);
    options.map((item) => {
      if (soureType === 'affiliateUser')
        item.hidden = ['once', 'qrcode'].includes(item.type) ? false : true;
      else if (soureType === 'memberUser')
        item.hidden = ['once', 'count', 'member'].includes(item.type)
          ? false
          : true;
      else
        module === 'RATE_SUBSCRIBE'
          ? (item.hidden = item.type === 'weeklyPass' ? false : true)
          : (item.hidden = ['once', 'count', 'weeklyPass'].includes(item.type)
              ? false
              : true);
      if (item.type === 'weeklyPass') item.price = isWeeklyPass ? 9.9 : 29.9;
      else if (item.type === 'count') item.price = priceAmount * 10 * 0.88;
      else item.price = priceAmount;
    });
    setOptions([...options]);
    setLoading(false);
    console.log(options, 'options', soureType);
  };

  const changeCurrentInde = (
    item: MembershipBenefitsComboOptionsType,
    index: number,
  ) => {
    if (!item.isChecked) return;
    setCurrentIndex(index);
  };

  const countChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    options.map((item) => {
      if (item.type === 'count') {
        item.count = Number(input.value);
        item.price = item.count * priceAmount * 0.88;
      }
    });
    setOptions([...options]);
  };

  const isDomesticConsumer = useCallback(() => {
    return (
      (!affiliateLevel || affiliateLevel == 10) &&
      (level === 0 || level === 1 || level === 5 || level === 7)
    );
  }, [affiliateLevel, level]);

  const getPrice = useMemo(() => {
    return options[currentIndex]['price'];
  }, [currentIndex, options]);

  const getMembershipBenefitsDetailValue = (
    type: keyof MembershipBenefitsDetailType,
  ) => {
    return isDomesticConsumer()
      ? MembershipBenefitsDetail[0][type]
      : MembershipBenefitsDetail[1][type];
  };

  const gotoPay = () => {
    console.log(paymentType, 'paymentType', payment);
    onPayment({
      paymentType: payment,
      membershipBenefitsInfo: membershipBenefitsInfo,
    });
  };

  const MembershipBenefitsCombo: React.FC = () => {
    return (
      <>
        <div className="flex items-center">
          {module === 'RATE_SUBSCRIBE' && (level === 0 || level === 1) && (
            <div className="bg-white rounded-[16px] w-[380px] h-[180px] leading-[180px] text-center mx-auto pt-[32px]">
              <img
                src={EmptyIcon}
                className="w-[72px] h-[72px] m-auto"
                alt=""
              />
              <p className="mt-[10px] text-lg text-gray-300">无订阅权限</p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-x-[20px] gap-y-[20px]">
            {options.map(
              (item, index) =>
                !item.hidden && (
                  <div
                    className={`relative w-[180px] h-[180px] bg-white rounded-[16px]${currentIndex === index ? ' active' : ''}`}
                    key={index}
                    onClick={() => changeCurrentInde(item, index)}
                    style={{
                      border: !item.isChecked
                        ? 'none'
                        : '3px solid transparent',
                    }}
                  >
                    {item.type === 'once' && (
                      <div className="text-red-500 text-center pt-[45px]">
                        <p className="text-lg text-stone-900">
                          {module === 'REALTIME_RATE'
                            ? '1次实时运价'
                            : '1条订阅'}
                        </p>
                        <p className="text-lg mt-[25px]">
                          ¥<span className="text-3xl">{item.price}</span>
                        </p>
                      </div>
                    )}
                    {item.type === 'count' && (
                      <div className="text-center pt-[45px]">
                        <Input
                          placeholder="输入购买数量"
                          className="input"
                          value={item.count}
                          onChange={countChange}
                          type="number"
                        />
                        <p className="mt-[12px]">{item.text}</p>
                        <div className="remark">享8.8折优惠</div>
                      </div>
                    )}
                    {item.type === 'weeklyPass' && (
                      <div className="text-center text-red-500">
                        <div
                          className="absolute top-0 left-0 w-[160px] h-[30px] py-[5px] text-white"
                          style={{
                            background: '#fa5151',
                            borderRadius:
                              currentIndex === index
                                ? '10px 0px 16px 0px'
                                : '16px 0px 16px 0px',
                            transform:
                              currentIndex !== index
                                ? 'translate(-3px, -3px)'
                                : 'none',
                          }}
                        >
                          首次优惠，续费¥29.9
                        </div>
                        <p className="mt-[50px] text-stone-900">{item.text}</p>
                        <div className="text-lg my-[10px]">
                          ¥
                          <span className="text-3xl">
                            {!isWeeklyPass ? '9.9' : '29.9'}
                          </span>
                          <span className="ml-[4px]">起</span>
                        </div>
                        <div className="remark">实时运价查询 50次/天</div>
                      </div>
                    )}
                    {item.type === 'member' && (
                      <div
                        className="text-red-500 text-center pt-[15px] rounded-[16px]"
                        style={{ background: '#F2D9BB' }}
                      >
                        <img
                          src={MemberIcon}
                          className="w-[38px] h-[38px] m-auto"
                          alt=""
                        />
                        <p className="mt-[4px] text-stone-900">{item.text}</p>
                        <div
                          className="rounded-[16px] bg-white mt-[13px] leading-[24px] pt-[10px]"
                          style={{ color: '#A97F4B' }}
                        >
                          <p>畅享实时运价</p>
                          <p>拍舱，抢舱，舱位捡漏</p>
                          <p>套餐外查询低价购买</p>
                        </div>
                      </div>
                    )}
                    {item.type === 'qrcode' && (
                      <div className="py-[12px] px-[25px] text-center">
                        <img
                          src={QrcodeIcon}
                          className="w-full h-[130px]"
                          alt=""
                        />
                        <p>客服二维码</p>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
        {affiliateLevel && affiliateLevel > 10 ? (
          <p style={{ marginTop: '20px' }}>
            请联系你的专属销售或客服额外购买使用次数，客服电话：0574-27987868
          </p>
        ) : (
          <div style={{ marginTop: '50px' }}>
            <div className="paymentType">
              <div>支付方式：</div>
              <div className="paymentType-item">
                <div className="flex items-center">
                  <img src={BalanceIcon} className="icon" alt="" />
                  <div className="">
                    钱包余额支付
                    <p className="text-xs">可用余额¥{balance}</p>
                  </div>
                </div>
                <Radio
                  checked={payment === 'ACCOUNT_FUND'}
                  value="ACCOUNT_FUND"
                  onChange={() => setPayment('ACCOUNT_FUND')}
                />
              </div>
              <div className="paymentType-item ml-[12px]">
                <div className="flex items-center">
                  <img src={WxIcon} className="icon" alt="" />
                  微信支付
                </div>
                <Radio
                  checked={payment === 'WECHAT'}
                  value="WECHAT"
                  onChange={() => setPayment('WECHAT')}
                />
              </div>
            </div>
            <div className="flex items-baseline mt-[22px]">
              <div>应付金额：</div>
              <div className="text-red-500">
                <div className="text-lg font-normal">
                  ¥<span className="text-2xl font-semibold">{getPrice}</span>
                </div>
                <Button
                  variant="solid"
                  color="orange"
                  className="w-[120px] rounded-[2px] mt-[16px]"
                  onClick={gotoPay}
                >
                  去支付
                </Button>
              </div>
            </div>
            <p className="mt-[16px]">
              发票获取：充值订单支持开具发票，可在个人中心在线申请，也可联系客服
            </p>
            <p>客服电话：0574-27987869</p>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="membershipBenefits">
        <Spin spinning={loading}>
          <div className="is-mask">
            <div className="membershipBenefits-modal">
              <div className="membershipBenefits-modal-title">
                <h2>{String(MembershipBenefitsTitle[module][soureType])}</h2>
                <h4>
                  一站式查询与订阅服务，涵盖船期、价格、库存、箱货跟踪等功能。支持拍舱、抢舱、舱位捡漏。
                </h4>
                <img
                  src={CloseIcon}
                  className="closeIcon"
                  alt="close"
                  onClick={onCancel}
                />
              </div>
              <div className="membershipBenefits-modal-content">
                <div className="flex-1" style={{ padding: '50px 50px 33px' }}>
                  <MembershipBenefitsCombo />
                </div>
                <div className="equityDetail">
                  <img
                    src={getMembershipBenefitsDetailValue('url') as string}
                    className="bg"
                    alt=""
                  />
                  {Array.isArray(getMembershipBenefitsDetailValue('options'))
                    ? (
                        getMembershipBenefitsDetailValue(
                          'options',
                        ) as MembershipBenefitsDetailType['options']
                      ).map((item) => (
                        <div className="equityDetail-item" key={item.text}>
                          <img src={CorrectIcon} className="icon" alt="" />
                          <p>{item.text}</p>
                        </div>
                      ))
                    : null}
                  <Button
                    type="primary"
                    variant="solid"
                    className="confirm-btn"
                    onClick={() => jumpEquity('/account/equity')}
                  >
                    查看更多会员权益
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

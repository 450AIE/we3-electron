import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { inquiryElectricityFeeAPI } from '@renderer/apis/electricityFeeInquiry';
import { getCurrentDate } from '@renderer/utils/date';

const bottomShowFileds = [
    {
        key: 'elec_cost',
        name: '当月应缴',
        unit: '元'
    },
    {
        key: 'elec_start',
        name: '抄表起度',
        unit: '度'
    },
    {
        key: 'elec_end',
        name: '抄表止度',
        unit: '度'
    }
];

function ElectricityFeeInquiry() {
    const [feeInfo, setFeeInfo] = useState();
    useEffect(() => {
        async function inquiryElecricityFee() {
            const res = await inquiryElectricityFeeAPI();
            setFeeInfo(res.data.info);
        }
        inquiryElecricityFee();
    }, []);
    return (
        feeInfo && (
            <div className={styles.container}>
                <div className="top-card">
                    <div className="dormitory">{feeInfo['room_id']}寝室</div>
                    <div className="top-detail-fee">
                        <div className="this-month-cost">
                            <div className="title">
                                <div className="icon"></div>
                                <div className="text">当月用量</div>
                            </div>
                            <div className="number">
                                <span className="orange">{feeInfo['elec_spend']}</span> 度
                            </div>
                        </div>
                        <div className="rest-money">
                            <div className="title">
                                <div className="icon"></div>
                                <div className="text">剩余电费</div>
                            </div>
                            <div className="number">
                                <span className="orange">{feeInfo['remain_money']}</span> 元
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="details-box">
                    <li className="one-detail">
                        <span className="title">电价</span>
                        <span className="detail-fee">0.540 元/度</span>
                    </li>
                    {bottomShowFileds.map((arr) => {
                        const { key, name, unit } = arr;
                        return (
                            <li className="one-detail" key={key}>
                                <span className="title">{name}</span>
                                <span className="detail-fee">
                                    {feeInfo[key]} {unit}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <div className="time-tips">
                    <div className="as-of-time">截至时间: {getCurrentDate()}</div>
                    <div className="update-time">更新于: {feeInfo['record_time']}</div>
                </div>
            </div>
        )
    );
}

export default ElectricityFeeInquiry;

import { Button, Form, Input, Modal } from 'antd';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { getRepairAreaAPI, getServiceTypeAPI } from '@renderer/apis/repaireReport';
import { RepaireArea, RepaireType } from './types';

function ReportRepaire() {
    // 以下三者用来存放请求到的数据
    const [serviceTypeArr, setServiceTypeArr] = useState<ServiceType[]>(undefined);
    // 这个存储在serviceTypeArr里面的，或许不需要额外去获取
    // const [repaireTypeArr, setRepaierTypeArr] = useState<RepaireType[]>([]);
    const [repaireAreaArr, setRepaireAreaArr] = useState<RepaireArea[]>([]);
    // 以下存放当前选择的数据
    const [serviceTypeId, setServiceTypeId] = useState<number>(undefined);
    const [repaireTypeId, setRepaireTypeId] = useState<number>(undefined);
    const [repaireArea, setRepaireArea] = useState('');
    useEffect(() => {
        getServiceTypeAPI().then((res) => {
            console.log('repaireTypes', res);
            setServiceTypeArr(res.data.service_types);
        });
        getRepairAreaAPI().then((res) => {
            console.log('repaireAreas', res);
            setRepaireAreaArr(res.data.areas);
        });
        
    }, []);
    function submitRepaire(formData) {
        console.log('拿到的是formData吗:', formData);
    }
    return (
        <div className={styles.container}>
            <Form onFinish={submitRepaire}>
                <Form.Item label="服务类型" name="service_type_id">
                    <Input placeholder="请选择类型" />
                </Form.Item>
                <Form.Item label="报修类型" name="repaire_type_id">
                    <Input placeholder="请选择类型" />
                </Form.Item>
                <Form.Item label="服务区域" name="area_id">
                    <Input placeholder="请选择类型" />
                </Form.Item>
                <Form.Item label="详细地址" name="address">
                    <Input placeholder="请输入详细地址(楼层-房间号)" />
                </Form.Item>
                <Form.Item label="申报标题" name="description">
                    <Input placeholder="请输入申报标题" />
                </Form.Item>
                <Form.Item label="申报内容" name="note">
                    <Input placeholder="请输入申报内容" />
                </Form.Item>
                <Form.Item label="联系电话" name="phone">
                    <Input placeholder="请输入联系电话" />
                </Form.Item>
                <Form.Item label="预约时间(选填)" name="appointed_time"></Form.Item>
                <Form.Item>
                    <Button htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ReportRepaire;

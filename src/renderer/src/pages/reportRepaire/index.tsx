import { Button, Form, Input, Modal } from 'antd';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { getRepairAreaAPI, getServiceTypeAPI } from '@renderer/apis/repaireReport';
import { RepaireArea, RepaireType } from './types';
import PickerModal from '@renderer/components/PickerModal';

function ReportRepaire() {
    const [form] = Form.useForm();
    // 以下三者用来存放请求到的数据
    const [serviceTypeArr, setServiceTypeArr] = useState<ServiceType[]>(undefined);
    // 这个存储在serviceTypeArr里面的，或许不需要额外去获取
    const [repaireTypeArr, setRepaierTypeArr] = useState<RepaireType[]>([]);
    const [repaireAreaArr, setRepaireAreaArr] = useState<RepaireArea[]>([]);
    // 以下存放当前选择的数据
    const [serviceType, setServiceType] = useState<ServiceType>(undefined);
    const [repaireType, setRepaireType] = useState<RepaireType>(undefined);
    const [repaireArea, setRepaireArea] = useState<RepaireArea>(undefined);
    // 当前打开的pickerModal，0表示没打开，1表示服务类型，2表示保修类型，3表示服务区域
    const [openedPickerModalId, setOpenedPickerModalId] = useState<number>(0);
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
    // 服务类型改变了，提取出其中的保修类型
    useEffect(() => {
        if (serviceTypeArr) {
            console.log('改变了，', serviceType.repair_types);
            setRepaierTypeArr(serviceType.repair_types);
        }
    }, [serviceType]);
    // 这个formData只是对象，没有被包装为FormData类型
    function submitRepaire(formData) {
        console.log('拿到的是formData吗:', formData);
    }
    function switchPickerModalId(id) {
        if (!openedPickerModalId) {
            setOpenedPickerModalId(id);
        }
    }
    return (
        <div className={styles.container}>
            <Form onFinish={submitRepaire} form={form} labelCol={{ span: 5 }}>
                <Form.Item name="service_type_id" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item name="repair_type_id" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item name="area_id" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item label="服务类型" name="service_type_name">
                    <Input placeholder="请选择类型" onClick={() => switchPickerModalId(1)} />
                </Form.Item>
                <Form.Item label="报修类型" name="repair_type_name">
                    <Input placeholder="请选择类型" onClick={() => switchPickerModalId(2)} />
                </Form.Item>
                <Form.Item label="服务区域" name="area_name">
                    <Input placeholder="请选择类型" onClick={() => switchPickerModalId(3)} />
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
                <Form.Item label="预约时间(选填)">
                    <Form.Item name="appointed_time_date">
                        <Input placeholder="请选择维修日期" />
                    </Form.Item>
                    <Form.Item name="appointed_time_time">
                        <Input placeholder="请选择维修时间" />
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="submit-btn">
                        提交
                    </Button>
                </Form.Item>
            </Form>
            {openedPickerModalId == 1 ? (
                <PickerModal
                    isOpen={openedPickerModalId}
                    setIsOpen={setOpenedPickerModalId}
                    options={serviceTypeArr}
                    value={serviceType}
                    setValue={(option) => {
                        setServiceType(option);
                        form.setFieldValue('service_type_id', option.id);
                        form.setFieldValue('service_type_name', option.name);
                        form.setFieldValue('repair_type_id', undefined);
                        form.setFieldValue('repair_type_name', undefined);
                        console.log(form.getFieldsValue());
                    }}
                />
            ) : openedPickerModalId == 2 ? (
                <PickerModal
                    isOpen={openedPickerModalId}
                    setIsOpen={setOpenedPickerModalId}
                    options={repaireTypeArr}
                    value={repaireType}
                    setValue={(option) => {
                        setRepaireType(option);
                        form.setFieldValue('repair_type_id', option.id);
                        form.setFieldValue('repair_type_name', option.name);
                    }}
                />
            ) : (
                <PickerModal
                    isOpen={openedPickerModalId}
                    setIsOpen={setOpenedPickerModalId}
                    options={repaireAreaArr}
                    value={repaireArea}
                    setValue={(option) => {
                        setRepaireArea(option);
                        form.setFieldValue('area_id', option.id);
                        form.setFieldValue('area_name', option.name);
                    }}
                />
            )}
        </div>
    );
}

export default ReportRepaire;

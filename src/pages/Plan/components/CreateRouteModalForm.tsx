import { Modal, Form, Input, Select, Button, Typography, Avatar } from "antd";
import {
  TeamOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface CreateRouteModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const CreateRouteModalForm = ({
  open,
  onCancel,
  onSubmit,
}: CreateRouteModalProps) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      width={850}
      centered
      styles={{
        content: {
          borderRadius: "12px",
        },
      }}
    >
      {/* Header with Cancel button */}
      <div className="flex justify-between items-center">
        <div></div>
        <Button
          type="text"
          onClick={onCancel}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Cancel
        </Button>
      </div>

      {/* Title and subtitle */}
      <div className="text-center">
        <Title level={2} className=" text-gray-800">
          Create a Route
        </Title>
        <Text className="text-gray-500 text-base">
          Let's Get These Deliveries Rollin' Like a Party on Wheels!
        </Text>
      </div>

      {/* Map icon placeholder */}
      <div className="flex justify-center">
        <div className="relative">
          <img src="/map.svg" alt="" />
          {/* Map lines decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-2 border-gray-300 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Route Name <span className="text-red-500">*</span>
            </span>
          }
          name="routeName"
          rules={[{ required: true, message: "Route name is required" }]}
          className="mb-6"
        >
          <Input
            placeholder="Name of the Route"
            size="large"
            className="rounded-lg border-gray-300"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-black-700 font-medium">
              Optimization logic
            </span>
          }
          name="optimization"
          className="mb-6"
        >
          <Select
            placeholder="Select Preference"
            size="large"
            className="rounded-lg"
            suffixIcon={<TeamOutlined className="text-blue-400" />}
          >
            <Select.Option value="distance">Shortest Distance</Select.Option>
            <Select.Option value="duration">Fastest Time</Select.Option>
            <Select.Option value="custom">Custom Logic</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="text-black-700 font-medium">Assign Team</span>}
          name="team"
          className="mb-8"
        >
          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
            <div className="flex items-center">
              <Button
                type="text"
                icon={<TeamOutlined className="text-gray-400" />}
                className="text-blue-500 hover:text-blue-500"
              >
                Add Team
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <Avatar size="small" className="bg-blue-500">
                A
              </Avatar>
              <Avatar size="small" className="bg-green-500">
                B
              </Avatar>
              <Avatar size="small" className="bg-orange-500">
                C
              </Avatar>
              <Button
                type="text"
                size="small"
                className="text-gray-400 hover:text-gray-600"
              >
                ⌄
              </Button>
            </div>
          </div>
        </Form.Item>

        <div className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            icon={<CompassOutlined style={{ fontSize: "30px" }} />}            
            size="large"
            className="w-full h-12 bg-green-800 hover:bg-green-700 border-0 rounded-lg font-medium text-base"
          >
            Optimize Route
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateRouteModalForm;

import { useState } from "react";
import { TeamOutlined, CompassOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Select, Button, Typography, Avatar } from "antd";
const { Title } = Typography;

interface CreateRouteModalProps {
  open: boolean;
  onClose: () => void;
  handleCreateRoute: () => Promise<void>;
}

const CreateRouteModalForm: React.FC<CreateRouteModalProps> = ({
  open,
  onClose,
  handleCreateRoute,
}: CreateRouteModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handelSubmit = async () => {
    try {
      setLoading(true);
      await handleCreateRoute();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={843}
      centered
    >
      {/* Title and subtitle */}
      <div className="text-center">
        <Title level={3} className="text-gray-800">
          Create a Route
        </Title>
      </div>

      {/* Map icon placeholder */}
      <div className="flex justify-center">
        <img src="/map.svg" alt="MAP" className="w-[150px] h-[150px]" />
      </div>

      <Form form={form} layout="vertical" onFinish={handelSubmit}>
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Route Name <span className="text-red-500">*</span>
            </span>
          }
          name="routeName"
          rules={[{ required: true, message: "Route name is required" }]}
        >
          <Input
            placeholder="Name of the Route"
            size="small"
            className="border-gray-300"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-black-700 font-medium">
              Optimization logic
            </span>
          }
          name="optimization"
        >
          <Select
            placeholder="Select Preference"
            size="small"
            suffixIcon={<TeamOutlined />}
          >
            <Select.Option value="distance">Shortest Distance</Select.Option>
            <Select.Option value="duration">Fastest Time</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="font-medium">Assign Team</span>}
          name="team"
        >
          <div className="flex items-center justify-between border border-gray-300 hover:border-blue-400 cursor-pointer">
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
            icon={<CompassOutlined style={{ fontSize: "15px" }} />}
            loading={loading}
            size="middle"
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

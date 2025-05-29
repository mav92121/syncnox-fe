import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Upload,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const TaskForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Form values:", values);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="text-base font-medium my-3 mb-6">Add Job</h2>
      <div className="flex-1 overflow-auto pr-2">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // requiredMark="optional"
          // className="space-y-4"
        >
          {/* Row 1: Date and Type */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: "Type is required" }]}
            >
              <Select placeholder="Select">
                <Select.Option value="task">Task</Select.Option>
                <Select.Option value="order">Order</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Row 2: Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input
              placeholder="Select"
              suffix={<SearchOutlined className="text-gray-400" />}
            />
          </Form.Item>

          {/* Row 3: Priority and ID */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Priority"
              name="priority"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select">
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Job ID" name="id">
              <Input
                placeholder="Auto Generate"
                suffix={<SearchOutlined className="text-gray-400" />}
              />
            </Form.Item>
          </div>

          {/* Row 4: Names */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="First Name" name="firstName">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>
          </div>

          {/* Row 5: Email and Business */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Email" name="email">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>

            <Form.Item label="Business Name" name="businessName">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>
          </div>

          {/* Row 6: Times */}
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="From" name="timeFrom">
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>

            <Form.Item label="To" name="timeTo">
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>

            <Form.Item label="Job Duration" name="duration">
              <Select placeholder="Select">
                <Select.Option value="15">15 minutes</Select.Option>
                <Select.Option value="30">30 minutes</Select.Option>
                <Select.Option value="45">45 minutes</Select.Option>
                <Select.Option value="60">1 hour</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Row 7: Phone */}
          <Form.Item label="Phone Number" name="phone">
            <Input.Group compact>
              <Select defaultValue="+234" style={{ width: "30%" }}>
                <Select.Option value="+234">+234</Select.Option>
              </Select>
              <Input style={{ width: "70%" }} placeholder="8023456789" />
            </Input.Group>
          </Form.Item>

          {/* Row 8: Customer Preferences */}
          <Form.Item label="Customer Preferences" name="preferences">
            <Input.TextArea rows={3} placeholder="Type" />
          </Form.Item>

          {/* Row 9: Notes */}
          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={3} placeholder="Type" />
          </Form.Item>

          {/* Row 10: Assign Drivers and Single/Recurring */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Assign Drivers" name="drivers" required>
              <Select placeholder="Select">
                <Select.Option value="rahul">Rahul +1</Select.Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item label="Single or Recurring" name="recurrence" required>
              <Select placeholder="Select">
                <Select.Option value="single">Single</Select.Option>
                <Select.Option value="recurring">Recurring</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Row 11: File Attachment */}
          <Form.Item label="Attach Files" name="files">
            <Upload.Dragger
              multiple
              className="border-2 border-dashed p-4"
              showUploadList={false}
            >
              <p className="flex items-center justify-center">
                <PlusOutlined className="mr-2" />
                <span>Attach Files</span>
              </p>
            </Upload.Dragger>
          </Form.Item>

          {/* Row 12: Payment Status */}
          <Form.Item label="Paid/Unpaid" name="paymentStatus" required>
            <Select placeholder="Select">
              <Select.Option value="paid">Paid</Select.Option>
              <Select.Option value="unpaid">Unpaid</Select.Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;

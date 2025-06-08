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
import type { UploadFile } from "antd/es/upload/interface";
import { message } from "antd";
import type { Dayjs } from "dayjs";
import { usePlanContext } from "../hooks/usePlanContext";
import type { Job } from "../types";

// Define an interface for the form values for type safety
interface TaskFormValues {
  date: Dayjs;
  jobType: "task" | "pickup" | "delivery";
  priority: "low" | "medium" | "high";
  address: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  businessName?: string;
  timeFrom?: Dayjs;
  timeTo?: Dayjs;
  duration?: string;
  phone?: {
    countryCode?: string;
    number: string; // Based on form rules, number is required
  };
  preferences?: string;
  notes?: string;
  drivers?: string; // Assuming single select for now
  recurrence?: "single" | "recurring";
  files?: UploadFile[]; // More specific type for Ant Design Upload's file list
  paymentStatus?: "paid" | "unpaid";
}

const TaskForm = () => {
  const [form] = Form.useForm();
  const { addJob, jobs } = usePlanContext();
  console.log("jobs are ->  ", jobs);
  const onFinish = async (values: TaskFormValues) => {
    console.log("Form values submitted:", values);

    const jobData: Omit<Job, "id" | "created_at" | "updated_at"> = {
      scheduled_date: values.date.toISOString(),
      job_type: values.jobType,
      delivery_address: values.address,
      priority_level: values.priority,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      business_name: values.businessName,
      // Combine date with time for start_time and end_time
      start_time: values.timeFrom
        ? values.date
            .hour(values.timeFrom.hour())
            .minute(values.timeFrom.minute())
            .second(0)
            .millisecond(0)
            .toISOString()
        : values.date.startOf("day").toISOString(), // Default to start of day if no timeFrom
      end_time: values.timeTo
        ? values.date
            .hour(values.timeTo.hour())
            .minute(values.timeTo.minute())
            .second(0)
            .millisecond(0)
            .toISOString()
        : values.date.endOf("day").toISOString(), // Default to end of day if no timeTo
      duration_minutes: values.duration ? parseInt(values.duration, 10) : 0, // Assuming duration is in minutes string
      phone_number: values.phone
        ? `${values.phone.countryCode || ""}-${values.phone.number}`
        : "",
      customer_preferences: values.preferences,
      additional_notes: values.notes,
      recurrence_type:
        values.recurrence === "single" ? "one_time" : values.recurrence!,
      documents: values.files
        ? values.files.map((file) => file.name)
        : undefined, // Or file.url if available and preferred
      payment_status: values.paymentStatus!,
    };

    try {
      const newJob = await addJob(jobData);
      if (newJob) {
        message.success("Job added successfully!");
        form.resetFields();
      } else {
        // This case can occur if addJob completes but doesn't return a job (e.g., void return path in PlanContext)
        message.warning(
          "Job submission processed, but status unclear. Please check the job list."
        );
      }
    } catch (error) {
      console.error("Failed to add job:", error);
      let errorMessageText = "Failed to add job. Please try again.";
      if (error instanceof Error) {
        errorMessageText = error.message;
      }
      // If using the specific API error structure from PlanContext, you could import and use isApiErrorWithMessage here
      message.error(errorMessageText);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-base font-medium mb-3 px-1">Add Job</h2>
      <div className="flex-1 overflow-y-auto px-2">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // requiredMark="optional"
          // className="space-y-4"
        >
          {/* Row 1: Date and Type */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
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
                <Select.Option value="pickup">Pickup</Select.Option>
                <Select.Option value="delivery">Delivery</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Row 2: Address */}
          <div className="mb-[-8px]"></div>

          {/* Row 3: Priority and ID */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
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
          </div>

          {/* Row 4: Names */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
            <Form.Item label="First Name" name="firstName">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>
          </div>

          {/* Row 5: Email and Business */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Type and Auto Suggest" />
            </Form.Item>

            <Form.Item label="Business Name" name="businessName">
              <Input placeholder="Type and Auto Suggest" />
            </Form.Item>
          </div>

          {/* Row 6: Times */}
          <div className="grid grid-cols-3 gap-4 mb-[-8px]">
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
          <div className="mb-[-8px]">
            <Form.Item label="Phone Number" name="phone">
              <Input.Group compact={false} className="flex gap-2">
                <Form.Item
                  name={["phone", "countryCode"]}
                  noStyle
                  initialValue="+234"
                >
                  <Select style={{ width: "30%" }}>
                    <Select.Option value="+234">+234</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["phone", "number"]}
                  noStyle
                  rules={[
                    { required: true, message: "Phone number is required" },
                  ]}
                >
                  <Input style={{ width: "70%" }} placeholder="8023456789" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </div>

          {/* Row 8: Customer Preferences */}
          <div className="mb-[-8px]">
            <Form.Item label="Customer Preferences" name="preferences">
              <Input.TextArea rows={3} placeholder="Type" />
            </Form.Item>
          </div>

          {/* Row 9: Notes */}
          <div className="mb-[-8px]">
            <Form.Item label="Notes" name="notes">
              <Input.TextArea rows={3} placeholder="Type" />
            </Form.Item>
          </div>

          {/* Row 10: Assign Drivers and Single/Recurring */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
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
          <div className="mb-[-8px]">
            <Form.Item label="Attach Files" name="files">
              <Upload.Dragger
                multiple
                // className="border-2 border-dashed p-4"
              >
                <p className="flex items-center justify-center">
                  <PlusOutlined className="mr-2" />
                  <span>Attach Files</span>
                </p>
              </Upload.Dragger>
            </Form.Item>
          </div>

          {/* Row 12: Payment Status */}
          <div className="">
            <Form.Item label="Paid/Unpaid" name="paymentStatus" required>
              <Select placeholder="Select">
                <Select.Option value="paid">Paid</Select.Option>
                <Select.Option value="unpaid">Unpaid</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="mt-4 sticky bottom-0 bg-white px-2">
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={() => form.submit()}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;

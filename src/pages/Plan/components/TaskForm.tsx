import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  message,
  Spin,
  AutoComplete,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { SelectProps } from "antd/es/select";
import type { UploadFile } from "antd/es/upload/interface";
import type { Dayjs } from "dayjs";
import { usePlanContext } from "../hooks/usePlanContext";
import type { Job } from "../types";
import "./TaskForm.css";
import { COUNTRY_CODES } from "@/assets/assets";

interface AddressSuggestion {
  name: string;
  point: {
    lat: number;
    lng: number;
  };
  city?: string;
  country?: string;
  state?: string;
  street?: string;
  housenumber?: string;
  postcode?: string;
}

const DEBOUNCE_DELAY = 300; // ms
const GRAPHHOPPER_API_KEY = import.meta.env.VITE_GRAPHHOPPER_API_KEY;
const GRAPHHOPPER_API_URL = `${import.meta.env.VITE_GRAPHHOPPER_URL}/geocode`;

// Define an interface for the form values for type safety
interface TaskFormValues {
  date: Dayjs;
  jobType: "task" | "pickup" | "delivery";
  priority: "low" | "medium" | "high";
  address: {
    name: string;
    address_id: string;
    lat: number;
    lon: number;
  };
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
  const [messageApi, contextHolder] = message.useMessage();
  const { addJob } = usePlanContext();
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [addressPlaceHolder, setAddressPlaceHolder] = useState<
    string | ReactNode
  >("Type to search address");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);

  const fetchAddressSuggestions = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setAddressSuggestions([]);
        return;
      }

      try {
        setIsSearching(true);
        const response = await fetch(
          `${GRAPHHOPPER_API_URL}?q=${encodeURIComponent(
            query
          )}&limit=5&key=${GRAPHHOPPER_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch address suggestions");
        }

        const data = await response.json();
        setAddressSuggestions(data.hits || []);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        messageApi.error("Failed to load address suggestions");
        setAddressSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    },
    [messageApi]
  );

  const debouncedSearch = useCallback(
    (query: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        fetchAddressSuggestions(query);
      }, DEBOUNCE_DELAY);
    },
    [fetchAddressSuggestions]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleAddressSearch = (searchText: string) => {
    debouncedSearch(searchText);
  };

  const handleAddressSelect = (value: string) => {
    const selectedAddress = addressSuggestions.find((addr) => {
      const displayAddress = [
        addr.street && addr.housenumber
          ? `${addr.housenumber} ${addr.street}`
          : addr.name,
        addr.city,
        addr.state,
        addr.postcode,
        addr.country,
      ]
        .filter(Boolean)
        .join(", ");
      return displayAddress === value;
    });

    if (selectedAddress) {
      form.setFieldsValue({
        address: {
          name: value,
          address_id: selectedAddress.name,
          lat: selectedAddress.point.lat,
          lon: selectedAddress.point.lng,
        },
        coordinates: {
          lat: selectedAddress.point.lat,
          lng: selectedAddress.point.lng,
        },
      });
      setAddressPlaceHolder(<div style={{ color: "black" }}>{value}</div>);
    }
  };

  const addressOptions: SelectProps["options"] = addressSuggestions.map(
    (addr) => {
      const displayAddress = [
        addr.street && addr.housenumber
          ? `${addr.housenumber} ${addr.street}`
          : addr.name,
        addr.city,
        addr.state,
        addr.postcode,
        addr.country,
      ]
        .filter(Boolean)
        .join(", ");

      return {
        value: displayAddress,
        label: (
          <div className="flex flex-col">
            <span>{addr.name}</span>
            <span className="text-xs text-gray-500">
              {[addr.city, addr.state, addr.country].filter(Boolean).join(", ")}
            </span>
          </div>
        ),
      };
    }
  );

  const onFinish = async (values: TaskFormValues) => {
    // Ensure address is properly set
    if (!values.address || !values.address.lat || !values.address.lon) {
      messageApi.warning("Please select an address from the suggestions");
      return;
    }
    const jobData: Omit<Job, "id" | "created_at" | "updated_at"> = {
      scheduled_date: values.date.toISOString(),
      job_type: values.jobType,
      delivery_address: values.address.name, // The formatted address string
      address_id: values.address.address_id, // The ID from the address object
      lat: values.address.lat,
      lon: values.address.lon,
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
        : null, // Default to start of day if no timeFrom
      end_time: values.timeTo
        ? values.date
            .hour(values.timeTo.hour())
            .minute(values.timeTo.minute())
            .second(0)
            .millisecond(0)
            .toISOString()
        : null, // Default to end of day if no timeTo
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
        messageApi.success("Job added successfully!");
        form.resetFields();
      } else {
        // This case can occur if addJob completes but doesn't return a job (e.g., void return path in PlanContext)
        messageApi.warning(
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

  // Custom required mark component
  const customRequiredMark = (
    label: React.ReactNode,
    { required }: { required: boolean }
  ) => (
    <>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </>
  );

  return (
    <div className="flex flex-col h-full">
      {contextHolder}
      <h2 className="text-base font-medium mb-3 px-1">Add Job</h2>
      <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="custom-form"
          requiredMark={customRequiredMark}
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

          {/* Row 3: Priority and Assign Drivers */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
            <Form.Item label="Priority" name="priority">
              <Select placeholder="Select" defaultValue={"medium"}>
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Assign Drivers" name="drivers">
              <Select placeholder="Select">
                <Select.Option value="rahul">Rahul +1</Select.Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </div>

          {/* Row 4: Full Width Address */}
          <div className="mb-[-8px]">
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <AutoComplete
                options={addressOptions}
                onSearch={handleAddressSearch}
                onSelect={(value) => {
                  handleAddressSelect(value);
                  form.setFieldValue("address", {
                    ...(form.getFieldValue("address") || {}),
                    name: value,
                  });
                }}
                value={form.getFieldValue("address")?.name || ""}
                placeholder={addressPlaceHolder}
                notFoundContent={isSearching ? <Spin size="small" /> : null}
                suffixIcon={
                  isSearching ? (
                    <LoadingOutlined />
                  ) : (
                    <SearchOutlined className="text-gray-400" />
                  )
                }
              />
            </Form.Item>
          </div>

          {/* Row 5: Phone Number */}
          <div className="mb-[-8px]">
            <Form.Item
              label="Phone Number"
              name="phone"
              required
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <Input.Group className="flex gap-3">
                <Form.Item
                  name={["phone", "countryCode"]}
                  noStyle
                  initialValue={`🇺🇸 +1`}
                >
                  <Select
                    style={{
                      width: "32%",
                      marginRight: "2px",
                    }}
                    showSearch
                    optionFilterProp="children"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <Select.Option
                        style={{
                          width: "auto",
                        }}
                        value={`${item.flag} ${item.code}`}
                      >
                        {`${item.flag}`} {`${item.code}`} &nbsp;{" "}
                        {`${item.name}`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["phone", "number"]}
                  noStyle
                  rules={[
                    { required: true, message: "Phone number is required" },
                    {
                      pattern: /^[0-9]{7,15}$/,
                      message:
                        "Please enter a valid phone number (7-15 digits)",
                    },
                  ]}
                >
                  <InputNumber
                    type="number"
                    required
                    style={{ width: "67%", flex: 2, cursor: "text" }}
                    placeholder="8023456789"
                    maxLength={15}
                    pattern="[0-9]*"
                  />
                </Form.Item>
              </Input.Group>
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
            <Form.Item label="From" name="timeFrom" initialValue={undefined}>
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>

            <Form.Item label="To" name="timeTo" initialValue={undefined}>
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>
            <Form.Item label="Job Duration" name="duration">
              <InputNumber
                min={1}
                max={Infinity}
                placeholder="Enter duration"
                className="w-full"
                addonAfter="min"
              />
            </Form.Item>
          </div>

          {/* Row 9: Customer Preferences */}
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

          {/* Row 10: Single/Recurring and Payment Status */}
          <div className="grid grid-cols-2 gap-4 mb-[-8px]">
            <Form.Item label="Single or Recurring" name="recurrence">
              <Select placeholder="Select" defaultValue={"single"}>
                <Select.Option value="single">Single</Select.Option>
                <Select.Option value="recurring">Recurring</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Paid/Unpaid" name="paymentStatus">
              <Select placeholder="Select" defaultValue={"paid"}>
                <Select.Option value="paid">Paid</Select.Option>
                <Select.Option value="unpaid">Unpaid</Select.Option>
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
        </Form>
      </div>
      <div className="mt-4 sticky bottom-0 bg-white px-2">
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={() => form.submit()}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" d="M12 8v8M8 12h8" />
          </svg>
          Add
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;

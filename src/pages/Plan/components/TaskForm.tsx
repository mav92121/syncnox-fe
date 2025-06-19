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
import { COUNTRY_CODES } from "../utils/CountryCodes";

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

  return (
    <div className="flex flex-col h-full">
      {contextHolder}
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
            <Form.Item label="Priority" name="priority">
              <Select placeholder="Select" defaultValue={"medium"}>
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Address"
              // name="address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <AutoComplete
                options={addressOptions}
                onSearch={handleAddressSearch}
                onSelect={(value) => {
                  handleAddressSelect(value);
                  // Update the form value to match the expected string type
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
                  <Select
                    style={{ width: "30%" }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      const country = COUNTRY_CODES.find(
                        (c) => c.code === option?.value
                      );
                      if (!country) return false;

                      const searchText = input.toLowerCase();
                      return (
                        country.code.toLowerCase().includes(searchText) ||
                        country.name.toLowerCase().includes(searchText) ||
                        country.country.toLowerCase().includes(searchText)
                      );
                    }}
                    dropdownStyle={{ maxHeight: 200, overflow: "auto" }}
                    placeholder="Country"
                  >
                    {COUNTRY_CODES.map((country, index) => (
                      <Select.Option
                        key={`${country.code}-${country.country}-${index}`}
                        value={country.code}
                      >
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: "16px" }}>
                            {country.flag}
                          </span>
                          <span>{country.code}</span>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["phone", "number"]}
                  noStyle
                  required
                  rules={[
                    { required: true, message: "Phone number is required" },
                    {
                      pattern: /^[0-9]{1,10}$/,
                      message: "Phone number must be 1-10 digits only",
                    },
                  ]}
                >
                  <InputNumber
                    required
                    style={{ width: "70%" }}
                    placeholder="8023456789"
                    maxLength={10}
                    controls={false}
                    formatter={(value) => {
                      // Only allow numbers and limit to 10 digits
                      const numericValue = value
                        ?.toString()
                        .replace(/[^0-9]/g, "");
                      return numericValue?.slice(0, 10) || "";
                    }}
                    parser={(value) => {
                      // Remove any non-numeric characters
                      return value?.replace(/[^0-9]/g, "") || "";
                    }}
                  />
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
            <Form.Item label="Assign Drivers" name="drivers">
              <Select placeholder="Select">
                <Select.Option value="rahul">Rahul +1</Select.Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item label="Single or Recurring" name="recurrence">
              <Select placeholder="Select" defaultValue={"single"}>
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
            <Form.Item label="Paid/Unpaid" name="paymentStatus">
              <Select placeholder="Select" defaultValue={"paid"}>
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

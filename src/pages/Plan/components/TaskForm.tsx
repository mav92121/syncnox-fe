import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// TimePickerButton component for consistent styling
const TimePickerButton = () => (
  <div className="h-5 w-5 rounded-none border border-gray-300 flex items-center justify-center">
    <div className="h-2 w-2 bg-white"></div>
  </div>
);

// Form validation schema
const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  taskType: z.string().min(1, { message: "Task type is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  customerId: z.string().min(1, { message: "Customer ID is required" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  businessName: z.string().optional(),
  phoneNumber: z.string().optional(),
  notes: z.string().optional(),
  timeFrom: z.string().optional(),
  timeTo: z.string().optional(),
  duration: z.string().optional(),
});

type TaskFormValues = z.infer<typeof formSchema>;

const TaskForm = () => {
  const [activeTab, setActiveTab] = useState("basic");

  // Common input classes to avoid repetition and hardcoding
  const inputClasses =
    "px-3 py-2 text-sm border-gray-200 bg-gray-50 rounded-none";
  const labelClasses = "text-xs font-medium text-gray-700";

  // Initialize form
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      taskType: "",
      address: "",
      priority: "",
      customerId: "",
      firstName: "",
      lastName: "",
      email: "",
      businessName: "",
      phoneNumber: "",
      notes: "",
      timeFrom: "",
      timeTo: "",
      duration: "",
    },
  });

  // Form submission handler
  function onSubmit(data: TaskFormValues) {
    console.log("Form submitted:", data);
    // Add API call or state update here
  }

  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="text-base font-medium my-3">Add Task / Orders</h2>

      {/* Tabs */}
      <Tabs
        defaultValue="basic"
        className="w-full mb-6"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        {/* Tab Content */}
        <TabsContent value="basic" className="pt-4">
          {/* Scrollable form area */}
          <div className="flex-1 overflow-auto sidebar-menu pr-2">
            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Row 1: Date and Type */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Date</FormLabel>
                        <Input type="date" />
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="taskType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          Task / Order Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(inputClasses, "w-full")}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="delivery">Delivery</SelectItem>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 2: Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Address</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            className={cn(inputClasses, "w-full")}
                            placeholder="Select"
                            readOnly
                          />
                        </FormControl>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Row 3: Priority and Customer */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(inputClasses, "w-full")}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Customer */}
                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          Customer or Tax ID
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              className={cn(inputClasses, "w-full")}
                              placeholder="Select or Auto Generate"
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 4: First Name and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className={cn(inputClasses, "w-full")}
                            placeholder="Type and Auto Suggest"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className={cn(inputClasses, "w-full")}
                            placeholder="Type and Auto Suggest"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 5: Email and Business Name */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className={cn(inputClasses, "w-full")}
                            placeholder="Type and Auto Suggest"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Business Name */}
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          Business Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className={cn(inputClasses, "w-full")}
                            placeholder="Type and Auto Suggest"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 6: Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>
                        Phone Number
                      </FormLabel>
                      <div className="flex">
                        <div className="relative w-1/4 mr-2">
                          <div className="flex items-center border border-gray-200 px-2 py-2 text-xs bg-gray-50 rounded-none">
                            <span className="mr-1">+234</span>
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            className={cn(inputClasses, "w-3/4")}
                            placeholder="8023456789"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Row 7: Additional Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>
                        Additional Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className={cn(inputClasses, "w-full")}
                          rows={3}
                          placeholder="Type"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Row 8: From, To, Duration */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  {/* From */}
                  <FormField
                    control={form.control}
                    name="timeFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>From</FormLabel>
                        <div className="flex">
                          <FormControl>
                            <Input
                              {...field}
                              className={cn(inputClasses, "w-full border-r-0")}
                              placeholder="Select"
                              readOnly
                            />
                          </FormControl>
                          <div className="bg-gray-50 px-2 flex items-center justify-center border border-l-0 border-gray-200 rounded-none">
                            <TimePickerButton />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* To */}
                  <FormField
                    control={form.control}
                    name="timeTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>To</FormLabel>
                        <div className="flex">
                          <FormControl>
                            <Input
                              {...field}
                              className={cn(inputClasses, "w-full border-r-0")}
                              placeholder="Select"
                              readOnly
                            />
                          </FormControl>
                          <div className="bg-gray-50 px-2 flex items-center justify-center border border-l-0 border-gray-200 rounded-none">
                            <TimePickerButton />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          Task/Order Duration
                        </FormLabel>
                        <div className="flex">
                          <FormControl>
                            <Input
                              {...field}
                              className={cn(inputClasses, "w-full border-full")}
                              placeholder="Select"
                              readOnly
                            />
                          </FormControl>
                          <div className="bg-gray-50 px-2 flex items-center justify-center border border-l-0 border-gray-200 rounded-none">
                            <TimePickerButton />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" className="w-full" variant="default">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="details" className="pt-4">
          <div className="flex-1 overflow-auto custom-scrollbar pr-2">
            <div className="p-8 text-center text-gray-500">
              Additional details form will go here.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskForm;

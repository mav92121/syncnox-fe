import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const TaskForm = () => {
  const [activeTab, setActiveTab] = useState("basic");

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
        {/* <TabsList className="border-none border-b border-gray-200 w-full flex justify-start rounded-none bg-transparent shadow-none">
          <TabsTrigger
            value="basic"
            className="rounded-none border-none data-[state=active]:border-b-2 data-[state=active]:border-[#003220] data-[state=active]:text-[#003220] px-4 py-2 shadow-none"
          >
            Basic
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none border-none data-[state=active]:border-b-2 data-[state=active]:border-[#003220] data-[state=active]:text-[#003220] px-4 py-2 shadow-none"
          >
            More Details
          </TabsTrigger>
        </TabsList> */}

        {/* Tab Content */}
        <TabsContent value="basic" className="pt-4">
          {/* Scrollable form area */}
          <div className="flex-1 overflow-auto sidebar-menu pr-2">
            {/* Form */}
            <div className="space-y-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    className="w-full px-3 py-2 rounded-none border-gray-300"
                    placeholder="Select"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    className="w-full px-3 py-2 rounded-none border-gray-300"
                    placeholder="Task/ Order"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    className="w-full px-3 py-2 rounded-none border-gray-300"
                    placeholder="Select"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
              </div>
              {/* Customer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer or Tax ID<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    className="w-full px-3 py-2 rounded-none border-gray-300"
                    placeholder="Select or Auto Generate"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
              </div>
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    className="w-full px-3 py-2 rounded-none border-gray-300"
                    placeholder="Select"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
              </div>
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <Input
                  type="text"
                  className="w-full px-3 py-2 rounded-none border-gray-300"
                  placeholder="Type and Auto Suggest"
                />
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <Input
                  type="text"
                  className="w-full px-3 py-2 rounded-none border-gray-300"
                  placeholder="Type and Auto Suggest"
                />
              </div>
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <Input
                  type="text"
                  className="w-full px-3 py-2 rounded-none border-gray-300"
                  placeholder="Type and Auto Suggest"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  className="w-full px-3 py-2 rounded-none border-gray-300"
                  placeholder="Type and Auto Suggest"
                />
              </div>
              {/* Country Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="relative w-1/4 mr-2">
                    <div className="flex items-center border border-gray-300 px-3 py-2 text-sm rounded-none">
                      <div className="w-4 h-4 mr-2 bg-green-500"></div>
                      <span>+234</span>
                      <svg
                        className="h-5 w-5 text-gray-400 ml-1"
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
                  <Input
                    type="text"
                    className="w-3/4 px-3 py-2 rounded-none border-gray-300"
                    placeholder="8023456789"
                  />
                </div>
              </div>
              {/* From, To, Duration */}
              <div className="flex space-x-4 pt-4">
                {/* From */}
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      className="w-full px-3 py-2 rounded-none border-gray-300"
                      placeholder="Select"
                      readOnly
                    />
                    <div className="bg-gray-100 px-2 flex items-center justify-center border-t border-r border-b border-gray-300">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* To */}
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      className="w-full px-3 py-2 rounded-none border-gray-300"
                      placeholder="Select"
                      readOnly
                    />
                    <div className="bg-gray-100 px-2 flex items-center justify-center border-t border-r border-b border-gray-300">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task/ Order Duration
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      className="w-full px-3 py-2 rounded-none border-gray-300"
                      placeholder="Select"
                      readOnly
                    />
                    <div className="bg-gray-100 px-2 flex items-center justify-center border-t border-r border-b border-gray-300">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <Textarea
                  className="w-full px-3 py-2 rounded-none border-gray-300"
                  rows={4}
                  placeholder="Type"
                />
              </div>
              {/* Submit Button */}
              <div className="py-4">
                <Button className="w-full">Add</Button>
              </div>
            </div>
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

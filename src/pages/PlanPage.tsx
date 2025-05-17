import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Dummy data for the tasks list
const dummyTasks = [
  { id: 'ORDER1230', priority: 'Low', firstName: 'Jack', lastName: 'Reacher', address: '1600 Pennsylvania Avenue NW, Washington, DC 20500', position: [38.8977, -77.0365] },
  { id: 'TASK071220', priority: 'Medium', firstName: 'Sofia', lastName: 'Khan', address: '1 Infinite Loop, Cupertino, CA 95014', position: [37.3318, -122.0312] },
  { id: 'ORDER08077', priority: 'Urgent', firstName: 'Mover', lastName: 'Grmnt', address: '901 W Olympic Blvd, Los Angeles, CA 90015', position: [34.0466, -118.2652] },
];

const PlanPage = () => {
  const [currentView, setCurrentView] = useState('initial');
  const [formData, setFormData] = useState({
    date: '',
    taskType: '',
    priority: '',
    customerOrTaskId: '',
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    phone: '',
    additionalNotes: '',
    fromSelect: '',
    toSelect: '',
    taskDuration: '',
  });

  const defaultPosition = [38.8951, -77.0364];
  const [selectedPosition, setSelectedPosition] = useState(defaultPosition);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="h-[calc(100vh-60px)] overflow-hidden p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Button variant="default" onClick={() => setCurrentView('addTask')}>
            Add
          </Button>
          <Button variant="outline" onClick={() => setCurrentView('taskList')}>
            Recent
          </Button>
        </div>
      </div>

      {currentView === 'initial' && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)]">
          <div className="flex space-x-4">
            <Button size="lg" onClick={() => setCurrentView('addTask')}>
              Manually Add Tasks/Orders
            </Button>
            <Button size="lg" variant="outline">
              Bulk Upload Tasks/Orders
            </Button>
          </div>
        </div>
      )}

      {currentView === 'addTask' && (
        <div className="flex gap-6 h-[calc(100vh-140px)] overflow-hidden">
          <div className="w-1/2 overflow-auto pr-2">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add Task / Orders</h2>
              <div className="flex border-b mb-4">
                <button className="pb-2 border-b-2 border-blue-600 text-blue-600 mr-4">Basic</button>
                <button className="pb-2 text-gray-600">More Details</button>
              </div>
              <form onSubmit={handleAddTaskSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date*</label>
                  <div className="relative mt-1">
                    <Input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="Select" className="pr-8" />
                    <CalendarOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task / Order Type*</label>
                  <div className="relative mt-1">
                    <select name="taskType" value={formData.taskType} onChange={handleInputChange} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white">
                      <option value="">Select</option>
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                      <option value="service">Service</option>
                    </select>
                    <svg className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none" width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority*</label>
                  <div className="relative mt-1">
                    <select name="priority" value={formData.priority} onChange={handleInputChange} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white">
                      <option value="">Select</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                    <svg className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none" width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer or Task ID*</label>
                  <div className="relative mt-1">
                    <Input type="text" name="customerOrTaskId" value={formData.customerOrTaskId} onChange={handleInputChange} placeholder="Select or Auto Generate" className="pr-8" />
                    <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <Input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Type and Auto Suggest" className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <Input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Type and Auto Suggest" className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Type and Auto Suggest" className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <Input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} placeholder="Type and Auto Suggest" className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="8023456789" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                </div>
                <div className="flex items-center gap-4 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <div className="flex items-center gap-2">
                    <span>From</span>
                    <Input type="text" name="fromSelect" value={formData.fromSelect} onChange={handleInputChange} placeholder="Select" className="w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>To</span>
                    <Input type="text" name="toSelect" value={formData.toSelect} onChange={handleInputChange} placeholder="Select" className="w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Task / Order Duration</span>
                    <Input type="text" name="taskDuration" value={formData.taskDuration} onChange={handleInputChange} placeholder="Select" className="w-24" />
                  </div>
                </div>
                <div className="md:col-span-2 mt-4">
                  <Button type="submit" className="w-full">Add</Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1 rounded-md shadow-md overflow-hidden">
            <MapContainer 
              center={selectedPosition} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              key={selectedPosition.toString()}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition}>
                <Popup>Selected Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      {currentView === 'taskList' && (
        <div className="flex flex-col gap-4 h-[calc(100vh-140px)]">
          {/* Map Container */}
          <div className="h-[50%] w-full rounded-md shadow-md overflow-hidden">
            <MapContainer 
              center={selectedPosition} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              key={selectedPosition.toString()}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {dummyTasks.map(task => (
                <Marker 
                  key={task.id} 
                  position={task.position as [number, number]}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{task.firstName} {task.lastName}</h3>
                      <p>{task.address}</p>
                      <p>ID: {task.id}</p>
                      <p>Priority: {task.priority}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Recent Tasks List */}
          <div className="flex-1 bg-white rounded-md shadow-md px-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tasks/Orders</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input type="text" placeholder="Search" className="pl-8 text-sm" />
                  <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                </div>
                <Button variant="outline">Delete</Button>
                <Button variant="outline">Filters</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="form-checkbox" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task / Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyTasks.map((task) => (
                    <tr key={task.id} onClick={() => setSelectedPosition(task.position as [number, number])} className="cursor-pointer hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" className="form-checkbox" onClick={(e) => e.stopPropagation()} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'Low' ? 'bg-green-100 text-green-800' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Add More Stops</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPage;
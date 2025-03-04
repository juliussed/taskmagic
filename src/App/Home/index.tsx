import { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Select, DatePicker, TimePicker, ColorPicker } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPencilOutline } from "react-icons/io5";
import Sidebar from "../Dashboard/Sidebar";
import Tasks from "../Tasks";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setSelectedTask } from "../../Redux/taskSlice";
import { RootState } from "../../Redux/store";
import { v4 as uuidv4 } from "uuid";
import { FaHouseUser } from "react-icons/fa6";
import queryString from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Account from "../Pages/Account";
import Settings from "../Pages/Settings";
import Notifications from "../Pages/Notification";

export default function Home() {
  const [addNew, setAddNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);
  const UserInfo = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.notifications.notifications); // Access notifications
  const theme = useSelector((state: RootState) => state.settings.theme); // Get theme from Redux state
  const [form] = Form.useForm();

  const { search } = useLocation();
  const parsed = queryString.parse(search);

  // Open/Close modal functions
  const openAddModal = () => setAddNew(true);
  const closeAddNewModal = () => {
    setAddNew(false);
    dispatch(setSelectedTask(null)); // Clear selection after closing
    form.resetFields();
  };

  // Pre-fill form when editing a task
  useEffect(() => {
    if (selectedTask) {
      form.setFieldsValue({
        ...selectedTask,
        deadline: selectedTask.deadline ? null : selectedTask.deadline,
        time: selectedTask.time ? null : selectedTask.time,
      });
      setAddNew(true);
    }
  }, [selectedTask, form]);

  // Handle new task submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTaskSubmit = (values: any) => {
    const taskData = {
      id: selectedTask ? selectedTask.id : uuidv4(),
      title: values.title,
      category: values.category,
      deadline: values.deadline?.format("YYYY-MM-DD"),
      time: values.time?.format("HH:mm"),
      color: values.color.toHexString(),
      note: values.note,
    };

    if (selectedTask) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }

    closeAddNewModal();
  };

  // Calculate unread notifications count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Change theme dynamically on theme change
  useEffect(() => {
    // Apply the theme class to the body tag
    document.body.className = theme;
     // Will apply 'light' or 'dark' class to body
  }, [theme]);

  const SectionContents = () => {
    switch (parsed.routepage) {
      case "notifications":
        return <Notifications />;
      case "account":
        return <Account />;
      case "settings":
        return <Settings />;
      default:
        return <Tasks searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <header className="w-full border-b pb-3 pr-10 px-10 border-b-gray-300 
        flex items-center justify-between py-5 h-[12vh]"
      >
        <div className="flex items-center gap-5">
          <h1 className="text-[30px] text-gray-100 font-bold">TaskManager</h1>
          {/* <AiOutlineSchedule size={30} className="text-red-800" /> */}
        </div>
        <Link to={"/homepage"}>
          <FaHouseUser size={30} className="text-gray-100 hover:rotate-6 hover:scale-[1.2]"/>
        </Link>
        <div className="flex items-center gap-10">
          {/* 🔍 Search Bar */}
          <Input
            className="w-[450px] text-[16px] py-2"
            placeholder="Search tasks by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="relative">
            {/* Notification Icon with Unread Count */}
            <IoIosNotificationsOutline
              size={35}
              className="text-white hover:rotate-6 cursor-pointer hover:scale-[1.2]"
              onClick={() => navigate("?routepage=notifications")}
              
            />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <Button
            className="h-[40px] flex items-center text-lg drop-shadow-2xl shadow gap-1"
            onClick={openAddModal}
          >
            <IoPencilOutline size={15} />
            New Task
          </Button>
          <div className="rounded-full h-12 w-12 border overflow-hidden">
            <img
              src={UserInfo.profilePicture || ""}
              alt="User Avatar"
              className="w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* Sidebar & Main Content */}
      <div className="flex h-[88vh]">
        <div className="w-[15%] border-r h-full">
          <Sidebar />
        </div>

        <div className="flex flex-col bg-white w-full h-full px-4 pt-4 items-center overflow-y-auto">
          {SectionContents()}
        </div>
      </div>


      {/* Add/Edit Task Modal */}
      <Modal open={addNew} onCancel={closeAddNewModal} footer={null} width={400}>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-4">
            {selectedTask ? "Edit Task" : "Add New Task"}
          </h2>
          <Form form={form} onFinish={handleTaskSubmit} layout="vertical">
            <Form.Item
              label="Task Title"
              name="title"
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input placeholder="Enter task title" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Select a category!" }]}
            >
              <Select placeholder="Select Category">
                <Select.Option value="Important">Important</Select.Option>
                <Select.Option value="Work">Work</Select.Option>
                <Select.Option value="Assignments">Assignments</Select.Option>
                <Select.Option value="Others">Others</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Deadline" name="deadline">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Time" name="time">
              <TimePicker />
            </Form.Item>
            <Form.Item label="Color" name="color">
              <ColorPicker />
            </Form.Item>
            <Form.Item label="Note" name="note">
              <Input.TextArea
                maxLength={50}
                placeholder="Write your note (Max: 50 characters)"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full">
              {selectedTask ? "Update Task" : "Add Task"}
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

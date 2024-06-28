import userImg from '../assets/profile.jpg';
import { Sidebar } from "flowbite-react";
import { useContext } from 'react';
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiBookmarkAlt, HiChartPie, HiInbox, HiNewspaper, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { AuthContext } from '../context/AuthProvider';
const SideBar = () => {
  const {user} = useContext(AuthContext);
  return (
    <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Logo className='w-16 h-12 rounded'  href="/" img={user?.photoURL}  imgAlt="">
        {
          user?.displayName || "demo"
        }
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/news" icon={HiNewspaper}>
           Manage News
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBar
import { FaUserPen } from "react-icons/fa6"
import { FiLogOut } from "react-icons/fi"
import { IoIosSettings } from "react-icons/io"
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();

  const Tabs =[
    {name:'Account',icon:<FaUserPen />,route:'account'},
    {name:'Settings',icon:<IoIosSettings />,route:'settings'},
  ]

  return (
    <div className="bg-white px-5 pt-10 h-full pb-5 flex flex-col justify-between">
      <div className="flex flex-col">
        {
        Tabs.map((item,index)=>
          <div key={index} className="flex flex-col gap-5">
            <button className="flex items-center justify-between pr-5    
              hover:bg-white rounded-[10px] p-2 cursor-pointer"
              onClick={()=>navigate(`?routepage=${item.route}`)}
            >
              <div >{item.name}</div>
              <div>{item.icon}</div>
            </button>
          </div>
        )}
      </div>
      <div className=" flex items-center mb-2 gap-5 cursor-pointer"
        onClick={()=>navigate('/')}
      >
        <div >Logout</div>
        <div><FiLogOut /></div>
      </div>
      
    </div>
  )
}

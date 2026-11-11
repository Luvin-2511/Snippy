import { Outlet } from 'react-router'
import Sidebar from '../../post/components/Sidebar'

const Mainlayout = () => {
  return (
    <div >
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Mainlayout

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Datatable_documents from "../../components/datatable/Datatable_documents"




const List = () => {
  console.log("listDocument called")
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_documents/>
      </div>
    </div>
  )
}

export default List
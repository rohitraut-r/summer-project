import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/contactUsMessages/ContactUsMessages";
import Chart from "../../components/appointments/Appointments";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
       
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
           <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;

import "./single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import Tables from "../../components/table/Tables";



const Single = () => {
  return (
    <div className="single">
      <Sidebar/>
      <div className="singlecontainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <div className="title">Information</div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="UserImage" />
              <div className="details">
                <h1 className="itemTitle">John Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Eamil:</span>
                  <span className="itemValue">john@example.com</span>
                </div>
                  <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+91 38483-94357</span>

                </div>
                  <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">xyz, 105, Garden Road. Bengluru</span>
                </div>
                  <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">India</span>
                </div>

              </div>
   
            </div>
           

          </div>
          <div className="right">
            <Chart />

          </div>
        
        </div>
          <div className="bottom">
            <Tables/>
          </div>
      </div>
    </div>
  )
}

export default Single
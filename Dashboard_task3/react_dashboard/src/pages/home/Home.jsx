import Chart from '../../components/chart/Chart';
import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Widgets from '../../components/widgets/Widgets';
import "./home.scss";

const Home = () => {
  return (
   <div className='home'>
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="widgets">
          <Widgets type="users"/>
          <Widgets type="order" />
          <Widgets type="earning"/>
          <Widgets type="balance"/>


        </div>
        <div className="charts">
          <Featured/>
          <Chart/>
        </div>

       </div>
   </div>
  )
}

export default Home

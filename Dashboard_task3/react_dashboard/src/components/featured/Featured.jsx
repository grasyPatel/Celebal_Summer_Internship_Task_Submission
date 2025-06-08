import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./featured.scss";
const Featured = () => {
  return (
    <div className='featured'>
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertOutlinedIcon className='icon'/>

        </div>
        <div className="center">
            <CircularProgressbar value={.7} maxValue={1} text={`${.7 * 100}%`} className='bar' />
            <h2 className="title">Total sales made today</h2>
            <span className='counter'>$420</span>
            <p className="para">Previous transactions processing. Last payments may not be included.</p>
        </div>
        <div className="bottom">
           
                <div className="item">
                     <h1 >Target</h1>
                      <p className='negative'><KeyboardArrowDownIcon  />
                    $12.4k</p>
                </div>
                <div className="item">
                     <h1 >last week</h1>
                       <p className='positive'><KeyboardArrowUpIcon />
                    $12.4k</p>
                </div>

               
                   
                <div className='item'>
                    <h1 >Last Month</h1>
                     <p className='negative'><KeyboardArrowDownIcon />
                    $12.4k</p>
                </div>
            
            
         
        </div>
    </div>
  )
}

export default Featured
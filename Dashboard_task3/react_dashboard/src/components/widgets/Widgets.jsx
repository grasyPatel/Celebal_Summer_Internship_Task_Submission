import './widgets.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
const Widgets = ({type}) => {
    let data;
    const amount=100;
    const diff=20;

    switch(type){
        case "users":
            data={title:"USERS",
            isMoney:false,
            link:"See all users",
            icon:<PersonIcon className='icon' style={{color:"#D32F2F", backgroundColor: "#EF9A9A" }}/>
            }
            break;
        case "order":
            data={title:"ORDERS",
            isMoney:true,
            link:"View all orders",
            icon:<ShoppingCartIcon className='icon'  style={{color:"#FFA000", backgroundColor: "#FFE082" }}/>
            }
            break;
        case "earning":
            data={title:"EARNINGS",
            isMoney:true,
            link:"View net earnings",
            icon:<MonetizationOnOutlinedIcon  className='icon'  style={{color:"#388E3C", backgroundColor: "#A5D6A7" }}/>
            }
            break;
         case "balance":
            data={title:"BALANCE",
            isMoney:true,
            link:"see details",
            icon:<AccountBalanceIcon className='icon'  style={{color:"#7B1FA2", backgroundColor: "#CE93D8" }}/>
            }
            break;    
        default:
            break;    

    }
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"} {amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage postive">
               < KeyboardArrowUpIcon />{diff}%</div>
           
              {data.icon}
          
        </div>
       
    </div>
  )
}

export default Widgets
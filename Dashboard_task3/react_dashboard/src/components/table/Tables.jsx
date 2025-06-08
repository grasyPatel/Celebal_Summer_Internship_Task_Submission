import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Tables = () => {
  const rows = [
  {
    id: "P1001",
    image: "https://cdn.thewirecutter.com/wp-content/media/2022/11/wirelessearbuds-2048px-8831.jpg",
    productName: "Wireless Earbuds",
    customer: "Aarav Mehta",
    amount: 2999,
    method: "Online Payment",
    status: "Delivered"
  },
  {
    id: "P1002",
    image: "https://cdn.thewirecutter.com/wp-content/media/2024/09/androidsmartwatches-2048px-05488.jpg?auto=webp&quality=75&width=1024",
    productName: "Smart Watch",
    customer: "Isha Verma",
    amount: 4999,
    method: "Cash on Delivery",
    status: "Pending"
  },
  {
    id: "P1003",
    image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9481.jpg?auto=webp&quality=75&width=1024",
    productName: "Bluetooth Speaker",
    customer: "Rohan Singh",
    amount: 1799,
    method: "Online Payment",
    status: "Shipped"
  },
  {
    id: "P1004",
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/11/fitness-tracker-2048px-5344.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
    productName: "Fitness Band",
    customer: "Sanya Kapoor",
    amount: 2199,
    method: "Online Payment",
    status: "Processing"
  },
  {
    id: "P1005",
    image: "https://kreo-tech.com/cdn/shop/files/Artboard_3_4.png?v=1748496768",
    productName: "Gaming Mouse",
    customer: "Kabir Malhotra",
    amount: 1499,
    method: "Cash on Delivery",
    status: "Cancelled"
  }
];

  return (
    <div className='table'>
      <div className="title">Last Transactions</div>
       <TableContainer className='table' component={Paper}>
      <Table  sx={{ minWidth: 800 }} aria-label="product order table">
        <TableHead >
          <TableRow  className='tablecell'>
            <TableCell className='tablecell'>Product</TableCell>
            <TableCell className='tablecell'>Customer</TableCell>
            <TableCell className='tablecell'>Amount</TableCell>
            <TableCell className='tablecell'>Payment Method</TableCell>
            <TableCell className='tablecell'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow className='tablecell' key={row.id}>
              <TableCell className='tablecell' >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={row.image} alt={row.productName} width={40} height={40} style={{ borderRadius: 5 }} />
                  {row.productName}
                </div>
              </TableCell >
              <TableCell className='tablecell'>{row.customer}</TableCell>
              <TableCell className='tablecell'>₹{row.amount}</TableCell>
              <TableCell className='tablecell'>{row.method}</TableCell>
              <TableCell className='tablecell'>
                <span style={{
                  color:
                    row.status === 'Delivered' ? 'green' :
                    row.status === 'Cancelled' ? 'red' :
                    row.status === 'Pending' ? 'orange' : 'blue',
                  fontWeight: 600
                }}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Tables
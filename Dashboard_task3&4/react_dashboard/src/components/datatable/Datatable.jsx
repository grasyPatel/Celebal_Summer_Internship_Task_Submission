import "./datatable.scss";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { userColumns, userRows } from "../../datatablesource";
const paginationModel = { page: 0, pageSize: 9 };

const Datatable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/test"} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={"/users/test"} style={{ textDecoration: "none" }}>
              <div className="deleteButton">Delete</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="titleheading">
        <div className="title">Add New User</div>
       <Link
      className="adduserLink"
      to={`/products/new`}
      style={{ textDecoration: "none" }}
    >
      Add Product
    </Link>
     <Link
      className="adduserLink"
      to={`/users/new`}
      style={{ textDecoration: "none" }}
    >
      Add User
    </Link>
      </div>

      <Paper className="paper" sx={{ height: 600, width: "100%" }}>
        <DataGrid
          className="dataGrid"
          rows={userRows}
          columns={userColumns.concat(actionColumn)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 9]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default Datatable;

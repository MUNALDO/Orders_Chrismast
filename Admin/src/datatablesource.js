export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      // console.log(params);
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.photo ? `http://localhost:3000/${params.row.photo}` : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 160,
  },
  {
    field: "bloodType",
    headerName: "Blood Type",
    width: 100,
  },
  {
    field: "role",
    headerName: "Role",
    width: 70,
  },
];

export const doctorColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Doctor name",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.photo ? `http://localhost:3000/${params.row.photo}` : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "specialization",
    headerName: "Specialization",
    width: 170,
  },
  {
    field: "hospital",
    headerName: "Hospital",
    width: 120,
  },
  {
    field: "isApproved",
    headerName: "Status",
    width: 120,
  },
];

export const bookingColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "appointmentDate",
    headerName: "Date (YYYY-MM-DD)",
    width: 220,
  },
  {
    field: "user_name",
    headerName: "User Name",
    width: 150,
  },
  {
    field: "doctor_name",
    headerName: "Doctor Name",
    width: 170,
  },
  {
    field: "doctor_specialization",
    headerName: "Doctor Specialization",
    width: 180,
  },
  {
    field: "ticketPrice",
    headerName: "Price",
    width: 70,
  },
  {
    field: "booking_status",
    headerName: "Booking Status",
    width: 150,
  },
  {
    field: "treatment_status",
    headerName: "Treatment Status",
    width: 150,
  },
];

export const stockColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.photo ? `http://localhost:3000/${params.row.photo}` : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "code",
    headerName: "Code",
    width: 100,
  },
  {
    field: "unit",
    headerName: "Unit",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 70,
  },
  {
    field: "Price",
    headerName: "Price",
    width: 70,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];

export const equipmentColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Equipment Name",
    width: 280,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.photo ? `http://localhost:3000/${params.row.photo}` : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "code",
    headerName: "Code",
    width: 80,
  },
  {
    field: "category",
    headerName: "Category",
    width: 180,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 70,
  },
  {
    field: "price",
    headerName: "Price",
    width: 70,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];

export const ordersColumns = [
  { field: "order_number", headerName: "Order Number", width: 110 },
  { field: "pick_up_place", headerName: "Pick up place", width: 380 },
  { field: "pick_up_time", headerName: "Pick up date", width: 130 },
  {
    field: "products",
    headerName: "Products",
    width: 500,
    height: 2000,
    renderCell: (params) => {
      const products = params.value || [];
      return (
        <div>
          {products.map((product, index) => (
            <div key={index}>
              {/* <div>{`Product Name: ${product.product_name} ||
                    \n\nProduct Quantity: ${product.product_quantity} ||
                    \n\nProduct Value: ${product.product_value}`}
              </div> */}
              <div>{`Product Quantity: ${product.product_quantity}`}</div>
            </div>
          ))}
        </div>
      );
    },
  },
  { field: "first_name", headerName: "First Name", width: 130 },
  { field: "last_name", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "Email", width: 270 },
  { field: "phone_number", headerName: "Phone Number", width: 150 }
];


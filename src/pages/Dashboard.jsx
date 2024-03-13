import { useEffect, useState } from "react";
import { fetchData, fetchURL } from "../ultilities/fetchUrl.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Hàm gọi API để lấy các orders
  const getOrders = async () => {
    const res = await fetchData({ url: fetchURL("GET_ORDERS") });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setOrders([...res.orders]);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getDetailOrderHandler = async (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <>
      <div className="d-flex flex-column my-5 gap-5">
        <div>
          <h1 className="h3">Dashboard</h1>
        </div>

        <div className="d-sm-flex gap-3 justify-content-between">
          <div className="border border-secondary flex-fill d-flex justify-content-between px-4">
            <div className="py-3">
              <p className="display-6 text-warning">2</p>
              <p>Clients</p>
            </div>
            <div className="pt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-person-fill-add"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
              </svg>
            </div>
          </div>

          <div className="border border-secondary flex-fill d-flex justify-content-between px-4">
            <div className="py-3">
              <p className="display-6 text-warning">444tr</p>
              <p>Earning</p>
            </div>
            <div className="pt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-coin"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
              </svg>
            </div>
          </div>

          <div className="border border-secondary flex-fill d-flex justify-content-between px-4">
            <div className="py-3">
              <p className="display-6 text-warning">2</p>
              <p>New Order</p>
            </div>
            <div className="pt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-file-earmark-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <h2 className="h4">History</h2>
          {error && <p className="text-center text-danger">{error}</p>}
          {orders.length !== 0 && (
            <table className="table mt-4">
              <thead className="table-warning">
                <tr>
                  <th>ID User</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Total</th>
                  <th>Delivery</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user._id}</td>
                    <td>{order.buyerName}</td>
                    <td>{order.buyerPhone}</td>
                    <td>{order.buyerAddress}</td>
                    <td>{Number(order.total).toLocaleString("de-DE")} VND</td>
                    <td>{order.deliveryStatus}</td>
                    <td>{order.payStatus}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          getDetailOrderHandler(order._id);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

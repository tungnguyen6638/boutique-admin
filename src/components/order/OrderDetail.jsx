import { useParams } from "react-router-dom";
import { fetchData, fetchURL } from "../../ultilities/fetchUrl";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState();

  // Hàm gọi đến API lấy order detail
  const getOrder = async () => {
    const res = await fetchData({ url: fetchURL("GET_ORDER", params.orderId) });

    if (res.hasError) {
      window.alert(res.message);
    } else {
      setOrderDetail(res.order);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <div>
        <section>
          <div>
            <div className="container d-sm-flex flex-column my-5 ">
              <h1 className="h3 pb-2">Information Order</h1>
              <p>ID User : {orderDetail && orderDetail.user._id}</p>
              <p>Buyer Name : {orderDetail && orderDetail.buyerName}</p>
              <p>Phone : {orderDetail && orderDetail.buyerPhone}</p>
              <p>Address : {orderDetail && orderDetail.buyerAddress}</p>
              <p>Total : {orderDetail && orderDetail.total}</p>
            </div>
          </div>

          <table
            className={`container my-5 text-center text-wrap table table-striped}`}
          >
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail &&
                orderDetail.cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.productId._id}</td>
                    <td>
                      <img
                        className="img-fluid"
                        style={{ width: "100px" }}
                        src={`${fetchURL(
                          "IMAGE_URL",
                          item.productId.images[0]
                        )}`}
                        alt="Product"
                      />
                    </td>
                    <td>{item.productId.name}</td>
                    <td>
                      {Number(item.productId.price).toLocaleString("de-DE")} VND
                    </td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default OrderDetail;

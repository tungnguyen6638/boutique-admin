import { useEffect } from "react";
import { fetchData, fetchURL } from "../ultilities/fetchUrl";
import { useState } from "react";
import openSocket from "socket.io-client";
import { getCookie } from "../ultilities/getUser";

const EditAmount = () => {
  const role = getCookie("role");
  const email = getCookie("email");
  const password = getCookie("password");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    const res = await fetchData({ url: fetchURL("GET_PRODUCTS") });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setProducts(res.products);
    }
  };

  useEffect(() => {
    getProducts();

    const socket = openSocket(fetchURL("SERVER_DOMAIN"), {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("product", (d) => {
      if (d.action === "add") {
        setProducts([...products, d.product]);
      }
      if (d.action === "edit") {
        const newProduct = products.map((p) => {
          if (p._id === d.product._id) {
            console.log(d.product);
            return d.product;
          }
          return p;
        });
        setProducts([...newProduct]);
      }
      if (d.action === "delete") {
        getProducts();
      }
    });
  }, []);

  // Xử lý search
  const searchHandler = (e) => {
    // lấy keyword
    const keyword = e.target.value;
    // Nếu keyword là rỗng thì reset lại toàn bộ products
    if (keyword === "") {
      getProducts();
      return;
    }

    // Set mảng product theo những product có chứa keyword
    setProducts((prev) => {
      return prev.filter((product) => {
        if (product.name.toLowerCase().includes(keyword.trim().toLowerCase())) {
          return true;
        }
        return false;
      });
    });
  };

  // Xử lí nút update
  const updateHandler = async (product, amount) => {
    const res = await fetchData({
      url: fetchURL("UPDATE_AMOUNT", product._id),
      method: "PUT",
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
        amount: amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.hasError) {
      window.alert(res.message);
    } else {
      window.alert(res.message);
    }
  };

  return (
    <>
      <div>
        <div className="my-5">
          <label htmlFor="products" className="form-label">
            Products
          </label>
          <input
            className="form-control"
            id="products"
            onChange={searchHandler}
            name="search"
            placeholder="Enter product name"
          />
        </div>
        <div className="overflow-auto">
          {error && <p>{error}</p>}
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>
                      <img
                        className="img-fluid"
                        style={{ width: "80px" }}
                        src={fetchURL("IMAGE_URL", product.images[0])}
                        alt="Product"
                      />
                    </td>
                    <td>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateHandler(product, e.target.amount.value);
                        }}
                        method="PUT"
                        className="d-flex gap-4"
                      >
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            name="amount"
                            defaultValue={product.amount}
                          />
                        </div>
                        <div>
                          <button className="btn btn-success me-1">
                            Update
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EditAmount;

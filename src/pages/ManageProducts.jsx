import { useEffect } from "react";
import { fetchData, fetchURL } from "../ultilities/fetchUrl";
import { useState } from "react";
import openSocket from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../ultilities/getUser";

const ManageProducts = () => {
  const role = getCookie("role");
  const email = getCookie("email");
  const password = getCookie("password");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm gọi API để lấy products
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

    // Lắng nghe sự kiện product để render sản phẩm lại
    socket.on("product", (d) => {
      if (d.action === "add") {
        setProducts([...products, d.product]);
      }
      if (d.action === "edit") {
        const newProduct = products.map((p) => {
          if (p._id === d.product._id) {
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
  const updateHandler = (product) => {
    navigate("/edit-product?mode=edit", { state: { product: product } });
  };

  // Xử lý nút Delete
  const deleteHandler = async (productId) => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      const res = await fetchData({
        url: fetchURL("DELETE_PRODUCT", productId),
        method: "DELETE",
        body: JSON.stringify({ email: email, password: password, role: role }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.hasError) {
        window.alert("Can't delete product because : " + res.message);
      } else {
        window.alert(res.message);
      }
    } else {
      return;
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
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                {role === "admin" && <th scope="col">Edit</th>}
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <th scope="row">{product._id}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <img
                        className="img-fluid"
                        style={{ width: "80px" }}
                        src={fetchURL("IMAGE_URL", product.images[0])}
                        alt="Product"
                      />
                    </td>
                    <td>{product.category}</td>
                    {role === "admin" && (
                      <td>
                        <button
                          className="btn btn-success me-1"
                          onClick={(e) => {
                            e.preventDefault();
                            updateHandler(product);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteHandler(product._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;

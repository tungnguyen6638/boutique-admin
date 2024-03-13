import { useSearchParams } from "react-router-dom";
import { fetchURL, fetchData } from "../ultilities/fetchUrl";
import { getUser } from "../ultilities/getUser";
import { useNavigate, useLocation } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state ? location.state.product : null;

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const user = getUser();

  const editProductHandler = async (event) => {
    event.preventDefault();
    const productName = event.target.name.value;
    const price = event.target.price.value;
    const long_desc = event.target.long_desc.value;
    const short_desc = event.target.short_desc.value;
    const category = event.target.category.value;
    const images = event.target.images.files;
    if (!images) {
      window.alert("No files");
      return;
    }

    // Dùng FormData để đẩy được file lên
    const product = new FormData();
    product.append("productName", productName);
    product.append("price", price);
    product.append("long_desc", long_desc);
    product.append("short_desc", short_desc);
    product.append("category", category);
    product.append("email", user.email);
    product.append("password", user.password);
    product.append("role", user.role);
    // Chỉ có thể add được 4 hình ảnh
    for (let i = 0; i < 4; i++) {
      product.append("images", images[i]);
    }

    const res = await fetchData({
      url:
        mode === "add"
          ? fetchURL("POST_ADD_PRODUCT")
          : fetchURL("PUT_EDIT_PRODUCT", editProduct._id),
      method: mode === "add" ? "POST" : "PUT",
      body: product,
    });

    if (res.hasError) {
      window.alert(res.message);
    } else {
      window.alert(res.message);
      return navigate("/");
    }
  };

  return (
    <>
      <div className="my-5">
        <div className="pb-4">
          <h1 className="h3 text-dark">
            {mode === "add" ? "Add Product" : "Edit Product"}
          </h1>
        </div>
        <div>
          <form onSubmit={editProductHandler} encType="multipart/form-data">
            <div className="form-group pb-4">
              <label htmlFor="product-name" className="pb-2">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                name="name"
                defaultValue={editProduct && editProduct.name}
              />
            </div>

            <div className="form-group pb-4">
              <label htmlFor="product-price" className="pb-2">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="product-price"
                name="price"
                defaultValue={editProduct && editProduct.price}
              />
            </div>

            <div className="form-group pb-4">
              <label htmlFor="product-long-desc" className="pb-2">
                Long Description
              </label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                className="form-control"
                name="long_desc"
                id="product-long-desc"
                defaultValue={editProduct && editProduct.long_desc}
              />
            </div>

            <div className="form-group pb-4">
              <label htmlFor="product-short-desc" className="pb-2">
                Short Description
              </label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                className="form-control"
                name="short_desc"
                id="product-short-desc"
                defaultValue={editProduct && editProduct.short_desc}
              />
            </div>

            <div className="form-group pb-4">
              <label htmlFor="product-category" className="pb-2">
                Category
              </label>
              <select
                id="product-category"
                name="category"
                className="form-control"
                defaultValue={editProduct && editProduct.category}
              >
                <option>Iphone</option>
                <option>Ipad</option>
                <option>Mac</option>
                <option>Airpod</option>
                <option>Watch</option>
                <option>Mouse</option>
                <option>Keyboard</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group pb-4">
              <label className="pb-2 pe-4" htmlFor="product-pic">
                Product pictures
              </label>
              <input
                type="file"
                className="form-control-file"
                name="images"
                id="product-pic"
                multiple
              />
            </div>

            <button type="submit" className="btn btn-warning text-light">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;

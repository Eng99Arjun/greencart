import React from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const {products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
        const { data } = await axios.post('/api/product/stock', {id, inStock});
        if (data.success) {
            fetchProducts();
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        {/* Mobile: Grid of cards */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border border-gray-300 rounded-md p-3 bg-white flex flex-col items-center">
                <img src={product.image[0]} alt="Product" className="w-20 h-20 object-contain mb-2" />
                <div className="text-center w-full">
                  <div className="font-medium truncate">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.category}</div>
                  <div className="text-primary font-semibold mt-1">{currency}{product.offerPrice}</div>
                  <div className="flex justify-center mt-2">
                    <label className="relative inline-flex items-center cursor-pointer gap-2">
                      <input
                        onClick={() => toggleStock(product._id, !product.inStock)}
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <div className="w-full overflow-x-auto">
            <table className="md:table-auto table-fixed w-full min-w-[600px]">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Product</th>
                  <th className="px-4 py-3 font-semibold truncate">Category</th>
                  <th className="px-4 py-3 font-semibold truncate">Selling Price</th>
                  <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded p-2">
                        <img src={product.image[0]} alt="Product" className="w-16" />
                      </div>
                      <span className="truncate w-full">{product.name}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{currency}{product.offerPrice}</td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input
                          onClick={() => toggleStock(product._id, !product.inStock)}
                          checked={product.inStock}
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductList;
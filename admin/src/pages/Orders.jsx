import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold mb-5">Orders</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-5 items-start border rounded-lg p-5 bg-white shadow-sm"
          >
            <img className="w-16" src={assets.parcel_icon} alt="Order Icon" />
            <div>
              <h4 className="font-semibold text-gray-700">Order Details</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} x {item.quantity} {item.size && `(${item.size})`}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-gray-700">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.address.street}, {order.address.city}, {order.address.state},{' '}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-sm text-gray-600">Phone: {order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Items: {order.items.length}</p>
              <p className="mt-2 text-sm">Method: {order.paymentMethod}</p>
              <p className={`text-sm ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                Payment: {order.payment ? 'Done' : 'Pending'}
              </p>
              <p className="text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-lg font-semibold">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 border rounded-md bg-gray-50 font-medium text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;



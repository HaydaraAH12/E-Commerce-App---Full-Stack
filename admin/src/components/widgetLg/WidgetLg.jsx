import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import "./widgetLg.css";
import { format } from 'timeago.js'


export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/order");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
          { orders.map((item)=>(
        <tr className="widgetLgTr" key={item._id}>
            <td className="widgetLgUser" >
            <span className="widgetLgName">{item.userId}</span>
          </td>
          <td className="widgetLgDate">{format(item.createdAt)}</td>
          <td className="widgetLgAmount">${item.amount}</td>
          <td className="widgetLgStatus">
            <Button type={item.status} />
          </td>
        </tr>
          ))}
      </table>
    </div>
  );
}

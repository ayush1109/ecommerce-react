import React from 'react';

const Orders = (props) => {
  console.log(props);
  const my_orders = props.user.user.myOrders;
  console.log(my_orders);
  function myFunction() {
    var input, filter, fill, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    fill = input.value;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValue.toUpperCase().indexOf(fill) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  return (
    <div className="container myOrders">
      <div className="row">
        <div className="col-3">Your Orders -</div>
        <div className="col-4">
          <input type="text" id="myInput" onChange={myFunction} placeholder="Search for names.." title="Type in a name"></input>
        </div>
      </div>
      <div className="my-products-div">
      {my_orders.map == null ? <div className="no-prdoucts">No Orders yet
                </div> : <div className="table-myOrders">
                    <table id="myTable">
                <tr>
                                    <th id="td-name">Name</th>
                                    <th id="td-company">Price</th>
                                    <th id="td-price">Bought On</th>
                                    <th id="td-category">Review</th>
                                </tr>
                   {my_orders.map((order) => {
                       return (
                                
                                <tr>
                                    <td id="td-name">{order.orders.name}</td>
                                    <td id="td-company">{order.orders.price}</td>
                                    <td id="td-price">{order.addedOn}</td>
                                    <td id="td-category">Rate Product</td>
                                </tr>
                       );
                   })}
                   </table>
                </div>}





      </div>

    </div>

  );
}

export default Orders;
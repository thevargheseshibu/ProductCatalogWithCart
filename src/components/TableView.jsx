import React from "react";

function tableCreator(props) {
  let tableView = [];

  for (let i = 0; i < props.products.length - 1; i += 2) {
    tableView.push(
      <div className="row">
        <div className="column" style={{ backgroundColor: "#aaa" }}>
          <h2>{props.products[i].title}</h2>
          <p>{props.products[i].description}</p>
          <button
            class="btn btn-sm btn-primary btn-minus"
            onClick={() => {
              props.setCart(cartAligner(i, props.cartView, props));
            }}
          >
            <i class="fa fa-minus"> Add to cart </i>
          </button>
        </div>

        <div className="column" style={{ backgroundColor: "#bbb" }}>
          <h2>{props.products[i + 1].title}</h2>
          <p>{props.products[i + 1].description}</p>
          <button
            class="btn btn-sm btn-primary btn-minus"
            onClick={() => {
              props.setCart(cartAligner(i + 1, props.cartView, props));
            }}
          >
            <i class="fa fa-minus"> Add to cart </i>
          </button>
        </div>
      </div>
    );
  }

  return tableView;
}

function cartAligner(index, cartD, props) {
  let cartData = JSON.parse(JSON.stringify(cartD));

  if (cartData[index]) {
    if (
      cartData.length > 0 &&
      props.inventory[index].stock - cartData[index].count < 6
    ) {
      props.setMessage("Less than few items left ");
    }

    if (cartData[index].count > props.products[index].limitOrder) {
      props.setMessage("Order Limit for the Item Reached");
      return cartData;
    } else if (props.inventory[index].stock - cartData[index].count === 0) {
      props.setMessage("Inventory over");
      return cartData;
    } else {
      cartData[index].count += 1;
      if (
        cartData.length > 0 &&
        props.inventory[index].stock - cartData[index].count < 6
      ) {
        props.setMessage("Less than few items left ");
      } else {
        props.setMessage("");
      }

      return cartData;
    }
  } else {
    cartData[index] = { ...cartData, index: index, count: 1 };
    props.setMessage("");
    return cartData;
  }
}
function TableView(props) {
  return <React.Fragment> {tableCreator(props)} </React.Fragment>;
}
export default TableView;

import React, { useState, useRef, useEffect } from "react";
import TableView from "../components/TableView";
import GridView from "./GridView";
import products from "../Data/products.json";
import inventory from "../Data/inventory.json";
import Cart from "./Cart";
import { useCookies, removeCookie } from "react-cookie";

function CatalogueViewNav() {
  const elements = document.getElementsByClassName("column");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [cartView, setCart] = useState(cookies.cart ? cookies.cart : []);
  const [limitInventory, setMessage] = useState("");
  const [cartDisplay, setCartDisplay] = useState(false);
  const [currView, setCurrView] = useState(
    cookies.layout ? cookies.layout : "gridView"
  );
  const mounted = useRef();
  var bgColors = {
    Default: "#81b71a",
    Blue: "#00B1E1",
    Cyan: "#37BC9B",
    Green: "#8CC152",
    Red: "#E9573F",
    Yellow: "#F6BB42",
  };

  useEffect(() => {
    if (currView === "gridView") {
      gridView();
    } else {
      listView();
    }
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setCookieData(currView, cartView);
    }
  });

  function setCookieData(layout, cartDetails) {
    removeCookie("layout");
    removeCookie("cart");
    setCookie("layout", JSON.parse(JSON.stringify(layout)), { path: "/" });

    setCookie("cart", cartDetails, { path: "/" });
  }

  // List View
  function listView() {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.width = "100%";
    }
  }

  // Grid View
  function gridView() {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.width = "50%";
    }
  }

  return (
    <div>
      <div className="container-fluid">
        {limitInventory && (
          <div className="warning" style={{ backgroundColor: bgColors.Red }}>
            {limitInventory}
          </div>
        )}

        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href="" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Product{" "}
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Catalogue
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="row bg-secondary py-1 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center h-100">
            <a
              className="text-body mr-3"
              onClick={() => {
                if (cartDisplay === true) {
                  setCartDisplay(false);
                } else {
                  setCartDisplay(true);
                }
              }}
            >
              {cartDisplay === true ? "Close" : "Cart"}
            </a>
          </div>
        </div>
      </div>

      {cartDisplay && (
        <Cart
          limitInventory={limitInventory}
          setMessage={(data) => {
            setMessage(data);
          }}
          setCart={(data) => {
            setCart(data);
          }}
          cartView={cartView}
          products={products.products}
          inventory={inventory.inventory}
        />
      )}

      <button
        onClick={() => {
          listView();
          setCurrView("listView");
        }}
      >
        <i class="fa fa-bars"></i> List
      </button>
      <button
        onClick={() => {
          gridView();
          setCurrView("gridView");
        }}
      >
        <i class="fa fa-th-large"></i> Grid
      </button>

      <div class="container-fluid">
        <div class="row px-xl-5"></div>
        <TableView
          limitInventory={limitInventory}
          setMessage={(data) => {
            setMessage(data);
          }}
          setCart={(data) => {
            setCart(data);
          }}
          cartView={cartView}
          inventory={inventory.inventory}
          products={products.products}
        />
      </div>
    </div>
  );
}

export default CatalogueViewNav;

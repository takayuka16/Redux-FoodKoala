import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuList } from "./features/menu/MenuList";
import { ShopList } from "./features/shop/ShopList";
import { FavoriteShopList } from "./features/shop/FavoriteShopList";
import { OrderHistory } from "./features/order/OrderHistory";
import { Login } from "./features/login/Login";
import { Concept } from "./features/concept/Concept";
import { InquiryForm } from "./features/inquiry/InquiryForm";
import SingleMenuPage from "./features/menu/SingleMenuPage";
import Navigation from "./components/Nav";
import { SingleShopPage } from "./features/shop/SingleShopPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="items">
              <Route index element={<MenuList />} />
              <Route path=":itemId" element={<SingleMenuPage />} />
            </Route>
            <Route path="shops">
              <Route index element={<ShopList />} />
              <Route path=":shopId" element={<SingleShopPage />} />
            </Route>
            <Route path="/favorites" element={<FavoriteShopList />} />
            <Route path="/order_history" element={<OrderHistory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/concept" element={<Concept />} />
            <Route path="/inquiry_form" element={<InquiryForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

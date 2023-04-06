import { Routes, Route } from "react-router-dom"
import MainPage from "./pages/For All Users/MainPage/MainPage"
import ProductPage from "./pages/For All Users/ProductPage/ProductPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import CategoryPage from "./pages/For All Users/CategoryPage/CategoryPage"
import Login from "./pages/For Not Users/Login/Login"
import Signup from "./pages/For Not Users/Signup/Signup"
import Cart from "./pages/For Users/Cart/Cart"
import OrderPage from "./pages/For Users/OrderPage/OrderPage"
import Profile from "./pages/For Users/Profile/Profile"
import Orders from "./pages/For Users/Orders/Orders"
import AllUsers from "./pages/For Admins/AllUsers/AllUsers"
import AllProducts from "./pages/For Admins/AllProducts/AllProducts"
import AllOrders from "./pages/For Admins/AllOrders/AllOrders"
import CreateProduct from "./pages/For Admins/CreateProduct/CreateProduct"
import UpdateProduct from "./pages/For Admins/UpdateProduct/UpdateProduct"
import { useContext } from "react"
import { UserContext } from "./context/UserProvider"

const Routing = () => {
	const { token, admin } = useContext(UserContext)

	function adminCondition(page) {
		if (token) {
			if (admin == true) return page
			else if (admin == false) return <ErrorPage />
			else return null
		} else if (token == "") return <Login />
		else return null
	}
	function userCondition(page) {
		if (token) {
			if (admin == true) return <ErrorPage />
			else if (admin == false) return page
			else return null
		} else if (token == "") return <Login />
		else return null
	}

	return (
		<>
			<Routes>
				{/* for all users */}
				<Route path="/" element={<MainPage />} />
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/category/:category" element={<CategoryPage />} />

				{/* error page */}
				<Route path="*" element={<ErrorPage />} />

				{/* For Admin and user */}
				<Route
					path="/order/:id"
					element={token ? <OrderPage /> : token == "" ? <Login /> : <ErrorPage />}
				/>
				<Route
					path="/profile"
					element={token ? <Profile /> : token == "" ? <Login /> : <ErrorPage />}
				/>

				{/* For Admin */}
				<Route path="/all_products" element={adminCondition(<AllProducts />)} />
				<Route path="/users" element={adminCondition(<AllUsers />)} />
				<Route path="/all_orders" element={adminCondition(<AllOrders />)} />
				<Route path="/create_product" element={adminCondition(<CreateProduct />)} />
				<Route path="/update_product/:id" element={adminCondition(<UpdateProduct />)} />

				{/* For User */}
				<Route path="/cart" element={userCondition(<Cart />)} />
				<Route path="/profile" element={userCondition(<Profile />)} />
				<Route path="/orders" element={userCondition(<Orders />)} />

				{/* For Not User */}
				<Route path="/login" element={token ? <ErrorPage /> : <Login />} />
				<Route path="/signup" element={token ? <ErrorPage /> : <Signup />} />
			</Routes>
		</>
	)
}

export default Routing

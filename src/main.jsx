import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./main.scss"
import CartProvider from "./context/CartProvider"
import HomeProvider from "./context/HomeProvider"
import OrderProvider from "./context/OrderProvider"
import ReviewProvider from "./context/ReviewProvider"
import UserProvider from "./context/UserProvider"
import { BrowserRouter } from "react-router-dom"
import LoadingProvider from "./context/LoadingProvider"
import InfosProvider from "./context/InfosProvider"

import "./i18n"

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<LoadingProvider>
			<UserProvider>
				<CartProvider>
					<OrderProvider>
						<ReviewProvider>
							<HomeProvider>
								<InfosProvider>
									<App />
								</InfosProvider>
							</HomeProvider>
						</ReviewProvider>
					</OrderProvider>
				</CartProvider>
			</UserProvider>
		</LoadingProvider>
	</BrowserRouter>,
)

// register()

import "./App.scss"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Routing from "./Routing"
import ScrollToTopWhenRefresh from "./components/ScrollToTopWhenRefresh/ScrollToTopWhenRefresh"
import Loading from "./components/Loading/Loading"
import { useContext } from "react"
import { LoadingContext } from "./context/LoadingProvider"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

function App() {
	const { loading, setLoading } = useContext(LoadingContext)

	return (
		<div className="layout">
			<Loading open={loading} setOpen={setLoading} />
			<ScrollToTop />
			<Header />
			<div className="main-layout">
				<ScrollToTopWhenRefresh>
					<Routing />
				</ScrollToTopWhenRefresh>
			</div>
			<Footer />
		</div>
	)
}

export default App

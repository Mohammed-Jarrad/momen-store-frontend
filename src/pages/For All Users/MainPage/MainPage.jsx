import { useContext, useEffect, useState } from "react"
import { HomeContext } from "../../../context/HomeProvider"
import "./MainPage.scss"
import Product from "../../../components/Product/Product"
import { BiCategoryAlt } from "react-icons/bi"
import { AiFillStar } from "react-icons/ai"
import { TbShoppingCartDiscount } from "react-icons/tb"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { NavLink } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

export const breakPoints = {
	1: { slidesPerView: 1 },
	350: { slidesPerView: 2 },
	768: { slidesPerView: 3 },
	992: { slidesPerView: 4 },
}

const MainPage = () => {
	const { t } = useTranslation()

	const { products, topRating, bigDiscount, categories } = useContext(HomeContext)

	return (
		<div className="main-page ">
			<Helmet title={t("mainPage")} />

			{products.length > 0 && (
				<div className="container">
					{categories.map(cate => (
						<CategoryBox category={cate} key={cate} />
					))}
					<TopRating topRating={topRating} />
					<BigDiscount bigDiscount={bigDiscount} />
				</div>
			)}
		</div>
	)
}

export default MainPage

const CategoryBox = ({ category }) => {
	const { t } = useTranslation()
	const { catesWithProducts } = useContext(HomeContext)

	const [items, setItems] = useState([...catesWithProducts[category]])

	return (
		<div className="cate-box">
			{items.length > 0 && (
				<>
					<div className="title">
						<BiCategoryAlt />
						<h2>{category}</h2>
						<NavLink to={`/category/${category}`}>{t("showMore")}</NavLink>
					</div>

					<div className="items">
						<Swiper
							breakpoints={breakPoints}
							className="swiper"
							modules={[Navigation, Pagination]}
							spaceBetween={5}
							navigation
							pagination={{ clickable: true }}
						>
							{[...items].map((product, i) => {
								return (
									<SwiperSlide key={i} className="slide">
										<Product product={product} />
									</SwiperSlide>
								)
							})}
						</Swiper>
					</div>
				</>
			)}
		</div>
	)
}

const TopRating = ({ topRating }) => {
	const { t } = useTranslation()
	return (
		<div className="top-rating" id="top">
			{topRating.length > 0 && (
				<>
					<div className="title">
						<AiFillStar />
						<h2>{t("topRating")}</h2>
					</div>

					<div className="items">
						<Swiper
							breakpoints={breakPoints}
							className="swiper"
							modules={[Navigation, Pagination]}
							spaceBetween={5}
							navigation
							pagination={{ clickable: true }}
							slidesPerGroup={2}
						>
							{[...topRating].map((product, i) => {
								return (
									<SwiperSlide key={i} className="slide">
										<Product product={product} />
									</SwiperSlide>
								)
							})}
						</Swiper>
					</div>
				</>
			)}
		</div>
	)
}

const BigDiscount = ({ bigDiscount }) => {
	const { t } = useTranslation()

	return (
		<div className="big-discount">
			{bigDiscount.length > 0 && (
				<>
					<div className="title">
						<TbShoppingCartDiscount />
						<h2>{t("bigDiscount")}</h2>
					</div>

					<div className="items">
						<Swiper
							breakpoints={breakPoints}
							className="swiper"
							modules={[Navigation, Pagination]}
							spaceBetween={5}
							navigation
							pagination={{ clickable: true }}
						>
							{[...bigDiscount].map((product, i) => {
								return (
									<SwiperSlide key={i} className="slide">
										<Product product={product} />
									</SwiperSlide>
								)
							})}
						</Swiper>
					</div>
				</>
			)}
		</div>
	)
}

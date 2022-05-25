import MoviePageV2 from "./pages/TVPage";
import { Fragment,lazy,Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss"
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import MovieCart from "./components/movie/MovieCart";
import MovieList from "./components/movie/MovieList";
import TVPage from "./pages/TVPage";
const HomePage = lazy(()=>import("./pages/HomePage"))
const MovieDetail = lazy(()=>import("./pages/MovieDetail"))
const MoviePage = lazy(()=>import("./pages/MoviePage"))
function App() {
  return (
    <Fragment>
    <Suspense>
    <Routes>
      <Route element={<Main></Main>}>
          <Route path="/" element={<><Banner></Banner><HomePage></HomePage></>}></Route>
          <Route path="/movies" element={<MoviePage kind="movie"></MoviePage>}></Route>
          <Route path="/tv" element={<TVPage kind="tv"></TVPage>}></Route>
          <Route path="/movie/:movieId" element={<MovieDetail kind = "movie"></MovieDetail>}></Route>
          <Route path="/tv/:movieId" element={<MovieDetail kind="tv"></MovieDetail>}></Route>
      </Route>
   </Routes>
    </Suspense>
   

    </Fragment>
  )
}

export default App;

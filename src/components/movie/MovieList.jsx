import React, { useEffect, useState } from 'react';
import {SwiperSlide,Swiper} from "swiper/react"
import "swiper/scss"
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import MovieCart, { MovieCartSkeleton } from './MovieCart';
//https://api.themoviedb.org/3/movie/now_playing?api_key=d239edfabc54edf26e7cec35b25d50c7
const MovieList = ({kind = "movie",type = 'now_playing'}) => {
    const [movies, setMovies] = useState([])
    const { data, error } = useSWR(
        tmdbAPI.getMovieList(kind,type), fetcher)
    const isLoading = !data && !error
    useEffect(()=>{
        console.log(data)
        if(data){
            setMovies(data.results)  
        }
        else{
            setMovies([])
        }
    },[data])
    
    return (
        <div className="movie-list">
        {isLoading && <>
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                <SwiperSlide>
                    <MovieCartSkeleton></MovieCartSkeleton>
                </SwiperSlide>
                
            </Swiper>
        </>}
        {!isLoading && <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {movies && movies.length > 0 && movies.map((item)=>{
                return (
                <SwiperSlide key={item.id}>
                        <MovieCart item={item}></MovieCart> 
                </SwiperSlide>
                )
            })}  
      </Swiper>}
    </div>
    );
};

export default MovieList;
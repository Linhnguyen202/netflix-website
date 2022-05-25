import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {SwiperSlide,Swiper} from "swiper/react"
import "swiper/scss"
import { fetcher } from '../../config';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
   
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=d239edfabc54edf26e7cec35b25d50c7`, fetcher)
    const movies = data?.results || []
    return (
       <section className="banner h-[500px] bg-tranparent page-container rounded-lg mb-10 overflow-hidden">
        <Swiper grabCursor={"true"} slidesPerView={"auto"}>
             {movies.length > 0 && movies.map(item=>{
            return (<SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
            </SwiperSlide>)
            })}
           
        </Swiper>
      </section>
    );
};
function BannerItem({item}){
    const {
        title,
        poster_path,
        id
    } = item
    const navigate= useNavigate()
    return (
        <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-lg  bg-gradient-to-t overlay from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" className="object-center w-full h-full rounded-lg" />
        <div className="absolute w-full text-white left-5 bottom-5">
          <h2 className="mb-3 text-3xl font-bold">{title}</h2>
          <div className="flex items-center mb-8 gap-x-3">
              <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
              <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
              <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
          </div>
          <Button className="w-auto px-6 py-3 font-medium text-white rounded-lg bg-primary" onClick={()=>navigate(`/movie/${id}`)}>Watch now</Button>
        </div>
      </div>
    )
}
export default Banner;
import { func } from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import {SwiperSlide,Swiper} from "swiper/react"
import useSWR from 'swr';
import MovieCart from '../components/movie/MovieCart';
import { fetcher, tmdbAPI } from '../config';
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetail = ({kind = "movie"}) => {
    const { movieId } = useParams()
    console.log(movieId)
    const {data,error} = useSWR(tmdbAPI.getMovieDetail(kind,movieId),fetcher)
    if(!data) return null
    const {backdrop_path,poster_path,title ,genres, overview} = data
    
    return (
        
        <>
        {data && <div className='py-10'>
            <div className='w-full h-[600px] relative'>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="w-full h-full bg-no-repeat bg-cover" style={{
                backgroundImage:`url(${tmdbAPI.imageOriginal(backdrop_path)})`
            }}></div>
            </div>
            <div className="w-full h-[600px] max-w-[500px] mx-auto -mt-[200px] z-10 relative pb-10">
                <img src={tmdbAPI.imageOriginal(poster_path)} className='w-full h-full object-fit rounded-xl' alt="" />
            </div>
            <h1 className='mb-10 text-3xl font-bold text-center text-white'>{title}</h1>    
            {genres.length > 0 &&  <div className="flex items-center justify-center mb-10 gap-x-5">
                {genres.map(item=>(
                    <span className='px-4 py-2 border rounded border-primary text-primary' key={item.id}>{item.name}</span>
                ))}
            </div>}
            <p className="text-sm text-center leading-relaxed max-w-[600px] mx-auto mb-10">{overview}</p>
            <MovieMeta kind={kind} type="credits"></MovieMeta>
            <MovieMeta kind={kind} type="videos"></MovieMeta>
            <MovieMeta kind={kind} type="similar"></MovieMeta>
        </div>}
            
        </>
    );
};
function MovieMeta({kind,type = "videos"}){
    const { movieId } = useParams()
    console.log(movieId)
    const {data,error} = useSWR(tmdbAPI.getMovieCast(kind,movieId,type),fetcher)
    if(!data) return null; 
    if(type === "credits"){
        const { cast } = data
        return (
            <div className='py-10'>
                <h2 className='mb-10 text-3xl text-center'>Casts</h2>
                <div className=" cast-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {cast.slice(0,10).map(item=>{
                        return (
                            <SwiperSlide key={item.id}>
                                <div  className="cast-item">
                                    <img src={`https://image.tmdb.org/t/p/original${item.profile_path}`}  className='w-full h-[350px] object-cover rounded-lg mb-3 select-none' alt="" />
                                    <h3 className='text-xl'>{item.name}</h3>
                                </div>                    
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                
                    
                </div>
            </div>
        )
    }
    else{
        const { results } = data;
        if(type === "videos"){
            return (
                <div className='py-10'>
                    <div className="flex flex-col gap-5">
                        {results.slice(0,2).map(item=>{
                            return(
                                <div key={item.id}>
                                    <h3 className='inline-block p-3 mb-5 text-xl font-medium text-white bg-secondary'>{item.name}</h3>
                                    <div  className='w-full aspect-video'>
                                        <iframe width="956" height="538" src={`https://www.youtube.com/embed/${item.key}`}
                                        title="YouTube video player" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen
                                        className='object-fill w-full h-full'></iframe>
                                    </div>
                                </div>
                                
                            )
                        })}  
                    </div>
               
                </div>
            )
        }
        if(type === "similar"){
            return(
            <div className='py-10'>
                <h2 className='mb-10 text-3xl font-medium'>Similar movies</h2>
                <div className="movie-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {results && results.length > 0 && results.map((item)=>{
                    return (
                    <SwiperSlide key={item.id}>
                            <MovieCart item={item}></MovieCart> 
                            </SwiperSlide>
                            )
                        })}  
                </Swiper>
                </div>
            </div>
            )
        }
        else{
            return null;
        }
    }
   
       
    
}
export default MovieDetail;
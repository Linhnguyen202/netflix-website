import React, { useEffect, useState } from 'react';
import MovieCart, {MovieCartSkeleton} from '../components/movie/MovieCart';
import { fetcher, tmdbAPI, tmdbAPITv } from '../config';
import useDebounce from '../hooks/useDebounce';
import useSWRInfinite from 'swr/infinite';
import {v4} from "uuid"

const itemsPerPage = 20
const TVPage = ({kind="tv"}) => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // 
    const [nextPage,setNextPage] = useState(1)
    const [filter,setFilter] = useState("")
    const [url,setUrl] = useState(tmdbAPI.getMovieList(kind,"popular",nextPage));
    const filterDebounce = useDebounce(filter,500)
    const handleFilterChange = (e)=>{
        setFilter(e.target.value)
    }
    const [movies, setMovies] = useState([])
    const { data, error,  size, setSize } = useSWRInfinite(
        (index) => url.replace("page=1",`page=${index + 1}`)
         ,
        fetcher
      );
      console.log(data)
    const loading = !data && !error
    const isEmpty = data?.[0]?.results.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
    useEffect(()=>{
        if(data){
            setMovies(data.reduce((a,b)=> a.concat(b.results),[]))  
        }
        else{
            setMovies([])
        }
    },[data])
    useEffect(()=>{
        if(filterDebounce){
            setUrl(tmdbAPI.getMovieSearch(kind,filterDebounce,nextPage))
        }
        else{
            
            setUrl(tmdbAPI.getMovieList(kind,"popular",nextPage))
        }
    },[filterDebounce,nextPage])
    // const {page,totals_pages} = data
    return (
       <div className='py-10 page-container'>
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text"
                    className='w-full p-4 text-white outline-none bg-slate-800' 
                    placeholder='Type here to search...'
                    onChange={handleFilterChange}
                    />
                </div>
                <button className='p-4 text-white bg-primary'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg></button>
            </div>
            {loading && <div className="grid grid-cols-4 gap-10">
                {new Array(itemsPerPage).fill(0).map(()=>{
                    return (
                        <MovieCartSkeleton key={v4()}></MovieCartSkeleton>
                    )
                })}
            </div>}
            {!loading && <div><div className="grid grid-cols-4 gap-10">
                  {movies  && movies.length  > 0 && movies.map(item=>{
                    return (
                        <MovieCart type="tv" key={item.id} item={item}></MovieCart>
                    )
                })}
            </div>
           
            </div>
            }
            <div className="mt-10 text-center">
                <button className={`p-3 px-4 rounded-lg bg-primary ${isReachingEnd ? "opacity-30" : ""}`} onClick={()=>setSize(size+1)} disabled={isReachingEnd}>Load More</button>
            </div>   
            
       </div>
    );
};

export default TVPage;
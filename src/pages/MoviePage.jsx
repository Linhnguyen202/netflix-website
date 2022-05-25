import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
// chuyen trang lam paginate
import MovieCart, {MovieCartSkeleton} from '../components/movie/MovieCart';
import { fetcher, tmdbAPI } from '../config';
import useDebounce from '../hooks/useDebounce'; // thu vien de dung load more
import {v4} from "uuid" //lay id random
import ReactPaginate from 'react-paginate';
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>

const itemsPerPage = 20
const MoviePage = ({kind}) => {
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
    const { data, error } = useSWR(url, fetcher)
    const loading = !data && !error
    useEffect(()=>{
        if(data){
            setMovies(data.results)  
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
    useEffect(() => {
        console.log(data)
        if(!data || !data.total_results) return; 
        setPageCount(Math.ceil(data.total_results / itemsPerPage))          
       }, [data,itemOffset]);
     
       // Invoke when user click to request another page.
       const handlePageClick = (event) => {
         const newOffset = (event.selected * itemsPerPage) % data.total_results;
         setItemOffset(newOffset);
         setNextPage(event.selected + 1)
       };
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
                        <MovieCart key={item.id} item={item}></MovieCart>
                    )
                })}
            </div>
            
            </div>
            }
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
       </div>
    );
};

export default MoviePage;
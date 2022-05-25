import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbAPI } from '../../config';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import {withErrorBoundary} from "react-error-boundary"
import LoadingSkeleton from "../loading/loading"
const MovieCart = ( {type = "movie", item} ) => {
    const {
        id,
        title,
        vote_average,
        release_date,
        first_air_date,
        poster_path
    } = item
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full p-3 rounded-lg select-none movie-card bg-slate-800">
            <img src={tmdbAPI.image500(poster_path)} className="w-full h-[250px] rounded-lg mb-5" alt="" />
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                <div className="flex items-center justify-between mb-6 text-sm text-white opacity-50">
                <span>{new Date(release_date || first_air_date).getFullYear()}</span>
                <span>{vote_average}</span>
                </div>
                <Button onClick={()=>navigate(`/${type}/${id}`)} >Watch now</Button>
            </div> 
        </div>
    );
};
MovieCart.propTypes = {
    item: PropTypes.shape({
        id:PropTypes.number,
        title:PropTypes.string,
        vote_average:PropTypes.number,
        release_date:PropTypes.string,
        poster_path:PropTypes.string
    })
}
function FallbackComponent(){
    return <p className='text-red-400 bg-red-50'>Something went wrong with this Componet</p>
}
export default withErrorBoundary(MovieCart,{
    FallbackComponent
});
export const MovieCartSkeleton = ()=>{
    return (
        <div className="flex flex-col h-full p-3 rounded-lg select-none movie-card bg-slate-800">
            <LoadingSkeleton width="100%" height="250px" radius="8px" className="mb-5"></LoadingSkeleton>
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-bold text-white">
                <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton> 
                </h3>
                <div className="flex items-center justify-between mb-6 text-sm text-white opacity-50">
                <span> <LoadingSkeleton width="50px" height="20px"></LoadingSkeleton> </span>
                <span><LoadingSkeleton width="30px" height="20px"></LoadingSkeleton></span>
                </div>
                <LoadingSkeleton width="100%" height="40px" radius="6px"></LoadingSkeleton>
            </div>
           
        </div>
    )
}
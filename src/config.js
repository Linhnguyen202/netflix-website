export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const apiKey = "d239edfabc54edf26e7cec35b25d50c7"
const tmdbEndpoint = "https://api.themoviedb.org/3"
const tmdbEndpointTv = "https://api.themoviedb.org/3/tv"
export const tmdbAPI = {
    getMovieList:(kind,type,page = 1)=>`${tmdbEndpoint}/${kind}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetail : (kind,movieId) => `${tmdbEndpoint}/${kind}/${movieId}?api_key=d239edfabc54edf26e7cec35b25d50c7`,
    getMovieCast : (kind,movieId,type)=>`${tmdbEndpoint}/${kind}/${movieId}/${type}?api_key=${apiKey}`,
    getMovieSearch : (kind,query,page)=>`https://api.themoviedb.org/3/search/${kind}?api_key=d239edfabc54edf26e7cec35b25d50c7&query=${query}&page=${page}`,
    imageOriginal:(url)=>`https://image.tmdb.org/t/p/original/${url}`,
    image500:(url) =>`https://image.tmdb.org/t/p/w500/${url}`
};
export const tmdbAPITv = {
    getMovieList:(type,page = 1)=>`${tmdbEndpointTv}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetail : (movieId) => `${tmdbEndpointTv}/${movieId}?api_key=d239edfabc54edf26e7cec35b25d50c7`,
    getMovieCast : (movieId,type)=>`${tmdbEndpointTv}/${movieId}/${type}?api_key=${apiKey}`,
    getMovieSearch : (query,page)=>`https://api.themoviedb.org/3/search/movie?api_key=d239edfabc54edf26e7cec35b25d50c7&query=${query}&page=${page}`,
    imageOriginal:(url)=>`https://image.tmdb.org/t/p/original/${url}`,
    image500:(url) =>`https://image.tmdb.org/t/p/w500/${url}`
};
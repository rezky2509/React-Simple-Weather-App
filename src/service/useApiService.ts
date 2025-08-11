import axios from 'axios'
import { useState,useEffect } from 'react'

// An interface is creating a blueprint
// it can grow and inherit compared to type
// this just to ensure we have a rough idea
// what kinda of property is expecting 
// it primary use is for object shapes, class contracts

// this is what the return type will be done 
interface ApiResponse<T>{
    // the reason we add union of null 
    // is because the response can be null from 
    // the api call
    // these T means it can be any type or interface 
    // that's why it called generics
    // Here when we said data:weatherData means that 
    // these data will be type of weatherData that is an aliases of cityWeatherResponse
    data:T | null;
    // This ? an optional where messsage can be exists or not 
    message?:string|null;
    loading?:boolean;
    errors?:boolean;
}

interface Coordinates {
    longitude: string | undefined,
    latitude: string | undefined
}



// the Colon is where we specified the return type
// so by using the interface, we can expect to return as 
// an interface as ApiResponse
// "I am creating a function called useFetchApi.
// It's a generic function that works with any type T.
// It takes one argument, url, which must be a string.
// It promises to return an object that conforms to the FetchResult shape, 
// and that FetchResult object will contain data of type T (or null), 
// along with loading and error states."

// Here the props is expecting two arguments
// first is the latitude and longitude
// when using {} you are destructure the object 
// where you know what kind of data that you only need 
// {latitude}:string
//   { latitude, longitude }: Coordinates, // Here's the destructuring and type annotation\
// if you want to send as two params then do this 
// (latitude:string,longitude:string)

const useApiService = 
// this chevron is the type of generics
    <T>
    // This is the argument taken from the call
    ({latitude,longitude}:Coordinates) 
        
        // // This is the return type
        // :ApiResponse<T> => {
        :ApiResponse<T> => {

    // different with nodejs, to read .env , 
    // you must use 
    // import.meta.env.VITE<KEY_VARIABLE_NAME>;
    // At the .env file, the variable name must start 
    // with VITE

    const base_url = import.meta.env.VITE_BASE_URL
    const api_key = import.meta.env.VITE_API_KEY

    // telling the react that this state is type of T (generics)
    // set as generics T on data payload because, 
    // on the interface, we set data as T or generics
    // means it can contain multiple responses. 
    const [data, setdata] = useState<T| null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<boolean>(false)
    const [message, setMessage] = useState<string | undefined>('')

    useEffect(()=>{
        async function fetchData() {
            // intialize the return data 
            setLoading(true)
            setMessage(undefined)
            // Check if the props value is undefined or null
            if(!latitude || !longitude){
                setErrors(true)
                // why message undefined ? 
                // because on the form handler we already set the 
                // handler when the input field either one is empty
                setMessage(undefined)
                setLoading(false)
                return
            }
            try {
                const backendResponse = await axios.get(`${base_url}&lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
                const filteredResponse = backendResponse.data
                setdata(filteredResponse)
                setMessage('')
            } catch (errorAxios: unknown) {
                // AxiosError is a specific error class provided by the Axios library itself.
                // axios also catch the error by them self. 
                if(axios.isAxiosError(errorAxios)){
                    setErrors(true)
                    // Now TypeScript knows 'errror' is an AxiosError
                    if(errorAxios.response){
                        console.log(errorAxios)
                        setMessage(errorAxios.response.data.message)
                    }

                }
            } finally{
                setLoading(false)
            }
        }
        // run this async function 
        fetchData()
    },[latitude, longitude, base_url, api_key])

    // When dealing with custom hooks, you return these kind of object 
    // { data, loading, error }
    // not sure the errors stills bug
    return {data, loading, errors, message}
}

export default useApiService
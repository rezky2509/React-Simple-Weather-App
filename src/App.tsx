import './App.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import { useState } from 'react'
import Alert from '@mui/material/Alert';
import type { AutocompleteChangeReason } from '@mui/material/Autocomplete';  

// For Typescript, when using react-hook-form need
// Since this is another library we need to install 
// npm install react-hook-form
import {useForm, type SubmitHandler} from 'react-hook-form'
import useApiService from './service/useApiService';
import { useEffect, useState } from 'react';



// to readFile from json
// import * as fs from 'fs';
import malaysia_cities from './service/malaysia_cities.json'
import Autocomplete from '@mui/material/Autocomplete';
import CardWeather from './CardWeather';
import type { CityWeatherResponse } from './service/weatherResponse';


// Animation
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import DialogComponent from './DialogComponent';


// This is where zod comes handy
// where it handle data validation
// as you can see the schema here 
// create thet type and checks the value
// of string type and check if the input 
// is number or not
// const schema = z.object({
//   longitude: z.string().number(),
//   latitidue: z.string().number()
// })

// type Location = z.infer<typeof schema>

// Type naming must be PascalCase   
// use string so that  as string for inputs, then parse to number for usage/validation
type Location = {
  longitude: string,
  latitude: string
}
// type Errors = {
//   longitude: string,
//   latitude: string
// }

interface Coordinates {
  // allow them to be optional 
  longitude: string | undefined,
  latitude: string | undefined
}

// The file format
interface DataFormat {
    city: string, 
    lat: string,
    lng: string,
    country: string,
    iso2?: string,
    admin_name?: string,
    capital?: string,
    population?: string, 
    population_proper?: string
}


function App() {  

  // to fetch data from file json that contained list of cities in malaysia 
  // const malaysiaCities = fs.readFileSync('./service/malaysia_cities.json','utf-8')
  // const rawMalaysiaData = fs.readFileSync('./service/malaysia_cities.json',{
  //   encoding:'utf-8'
  // })
  // try{
  //   const retrievedData = JSON.parse(rawMalaysiaData)
  //   console.log(retrievedData)
  // }catch(error){
  //   console.log(error)
  // }

  // Since we import directly, we can store it to state 
  // make it an array because there is multiple of data 
  const [malaysiaCities,setMalaysiaCities] = useState<DataFormat[]>([])

  // assign the selected city on select option 
  const [selectedCoordinate,setSelectedCoordinate] = useState<Coordinates>({
    latitude:'',
    longitude:''
  })

  // add useeffect to execute data insertion to the state 
  useEffect(()=>{
    // the malaysia_cities is the variable name set when import directly from 
    // the json 
    // it is automatically parsed the json file when importing the data. 
    setMalaysiaCities(malaysia_cities as DataFormat[])
  },[])

  // by default MUI autocomplete onchange does hold a parameter value
  // if you want to handle event handler you can do add the parameter 
  // event: React.SyntheticEvent -> this take like the event listener
  //  for the value parameter in Autocomplete's onChange event, undefined is generally not allowed; null is used instead.
  const handleSelectedCity = (event: React.SyntheticEvent ,newValue: DataFormat | null, reason: AutocompleteChangeReason) :void => {
    event.preventDefault()
    if(reason){
      console.log(reason)
    }
    // the value store in the input box, there is possiblity that value is null 
    const coordinates: Coordinates|null = {
      longitude: newValue?.lng,
      latitude: newValue?.lat
    }
    // console.log(coordinate)
    setSelectedCoordinate(coordinates)
  }


  // transfer the input value from the submit handler to the usestate 
  const [coordinates,setCoordinates] = useState<Coordinates>({
    longitude:'',
    latitude:''
  })

  // <-----------Implementation React Hook Form ------------------->
  // Register function is a built in function from react-hook-form 
  // This register function is REGISTRING the input field 
  // meaning that the input field will be logged to the register function 
  // the handlesubmit function is another function from react-hook-form 
  // another function you can access is formState where you can access the objects errors
  // where that errors object is handling the errors of the forms 

  // setValue is enabling the input value to change 
  // dynamically on state that had changing value
  // setValue is also another useForm hook that is available 
  // by react-form-hook 
  const {register,
    handleSubmit, 
    setValue,
    // setError,
    formState:{errors,
      // isSubmitting
    }} = useForm<Location>({
      // defaultValues:{
      //  latitude : '',
      //  longitude : ''
      // }
      // resolver: zodResolver(schema),
    });
    // here we set the input value on changing the select option 
    setValue('longitude',`${selectedCoordinate.longitude}`)
    setValue('latitude',`${selectedCoordinate.latitude}`)

  // Handling default values 
  // when you want to add default values to form , 
  // you can just use add the argument with an object with the 
  // property of defaultValues
  // useForm<Location>({
//     defaultValues:{
  //      latitidue:'5435345',
  //      'longitude: '124342'
//     }
// })
// this automatically will be inserted onto the value attribut of the input tag

  // The handlesubmit is basically the formhandler where by default
  // it had event.preventdefault. this where it do the basics handling 
  // FormState is accessing the form state with the objec errors is handling the errors 
  // messages, 
  // another object you can access is isSubmitting
  // this object is returning boolean value. 

  // isSubmitting
  // what isSubmitting does is its looking at the onsubmit object 
  // and looks if there is any code that are sending the data 
  // so for instance, when the button submit click, the error submit become true, 
  // them the onsubmit object is running. 
  //  const onSubmit:SubmitHandler<Location> = <---- this part right here 

  // setError
  // this method allow you to fetch the error that coming from the response server


  // so once we setup a custom hook that use for data fetch, we need to import
  // todo that we must do as follow 
  // first we defined the variable. 
  // IT MUST MATCH WITH WHAT IT RETURN 
  // Custom hooks must be define outside of the submit handler
  // hence we are setting the coordinates type and expecting the return 
  // type of coordinates 
  const {
    // So, name: weatherData means: "Take the property called name from data, 
    // and put its value into a new local variable that I want to call weatherData."
    // this implemantation called aliases
    // The type of weatherData will be CityWeatherResponse | null (assuming you use useApiService<CityWeatherResponse>). 
    // The null comes from the ApiResponse interface itself, indicating that data might not be present yet or due to an error. (This is the most precise outcome)
    // data (the actual payload from the API, like the weather information) has the type of CityWeatherResponse when I use the hook for weather data (because I've specified <CityWeatherResponse> as T).
    // But importantly, inside my useApiService custom hook, it's handled as a generic type T. This makes the hook reusable for any type of data, not just CityWeatherResponse.
    // And finally, yes, that data property returned by the hook is being renamed to weatherData using destructuring (data: weatherData) so I can easily use it in my component.
    data:weatherData,
    // data: weatherData is purely about renaming (aliasing) the data property to weatherData during the destructuring process.
    loading, 
    // this cityWeatherResponse is the type that we expecting to be return from this custom hooks
    // So, for this specific call, the hook's return type becomes ApiResponse<CityWeatherResponse>.
    // So, you're calling the hook with CityWeatherResponse as its generic type, 
    // and the hook then returns an object of type ApiResponse<CityWeatherResponse>, which you then destructure.
    // so actually on the return object or in the custom hooks it become from 
    // ApiResponse<T> as generics to ApiResponse<CityWeatherResponse> return 
    message } = useApiService<CityWeatherResponse | undefined>({
    longitude:coordinates.longitude,
    latitude:coordinates.latitude
  })

  // Form Handler onSubmit 
  // the type is SubmitHandler is another type from react hook form
  // and the field that is mathcing should be Location
  // this where the form field being stored and send to the handle submit as an argument
  // Here we also can add asynchronous to await to send the data to the server
  // when dealing with object declaration as function callback, add the async 
  // before the argument 
  const onSubmit:SubmitHandler<Location> = async(formData) => {
      // This below just a mockup to wait from the server to respond back
      // await new Promise((resolve)=>setTimeout(resolve,1000))
      // if error occur, throw it to the catch method 
      // throw new Error();
      // here where the setError will use 
      // but as reminder, since using typescript it is 
      // must be the same type of return as the type defintion
      // so the first argument is the property of the type
      // second argument is the object type and what the error message
      // setError('root',{
      //   message: 'Latitidue is invalid'
      // })
      // when sending or setting the set Error, there is a property caled root
      // this root is referring to error that is belong to the whole form. 
      // so in short, root is a property that actually not belong to any the input form 
      // instead it was send because something isn't right with the data 

      // then to use the custom hooks, we first transfer the hooks to useState
      setCoordinates({
        latitude: formData.latitude,
        longitude: formData.longitude
      })
  }


  // const [loading,setLoading] = useState<boolean>(false)
  // const [button,setButton] = useState<boolean>(false)
  // const [formData,setFormData] = useState<Location>({
  //   longitude: '',
  //   latitude: ''
  // }) 
  // const [errors,setErrors] = useState<Errors>({
  //   longitude: '',
  //   latitude: ''
  // })


  // useDebounce to prevent 
  
  // when handling form, it uses the FormEvent type
  // this enable to use the preventDefault method of html form element
  // function handleLocationSearch(event: React.FormEvent<HTMLFormElement>){
  //   event.preventDefault()
  //   // set the loading to true first 
  //   setLoading(true)
  //   setTimeout(()=>{
  //     // function itself schedules an action to be executed.
  //     // so setLoading to false after one second
  //     setLoading(false)
  //   },2000)
  // }

  // Handling form input 
  // to store event listeners on input use change event
  // You must initialize the form data here
  // for handling form, the type is HTMLInputElement 
  // function handleFormInput (e: React.ChangeEvent<HTMLInputElement>){
  //   // isNaN is checking the truth whether this is number or not 
  //   // in short isNaN (return NaN) return boolean
  //   // isNan(NaN) then return true 
  //   if(isNaN(Number(e.target.value))==true){
  //     setErrors({...errors,
  //       [e.target.name]:'Numbers only'
  //     })
  //     setButton(true)
  //   }else{
  //       setErrors({...errors,
  //       [e.target.name]:''
  //     })
  //     setButton(false)
  //   }


  //   // Check if the value is empty or not 
  //   if(e.target.value === ''){
  //     setButton(true)
  //     return
  //   }else{
  //     setButton(false)
  //   }

  //   // console.log(isNaN(Number(e.target.value)))
  //   // Using the spread operartor to create instance 
  //   // because react state is immutable 
  //   setFormData({...formData,
  //     // Set dynamic value assignment to property using []
  //     // since we are using html name attribute to set the property
  //     [e.target.name]:Number(e.target.value)
  //     // it's similar to 
  //     // instead of using the default property
  //     // longitude: e.target.value
  //     // latitiude: e.target.value
  //   })
  //   // using Number(here we strict the type)
  //   // it use the Number and check the value 
  //   // if the return is NaN (Not a Number then the value contained character)

  //   // setFormData({e.target.value})
  //   // console.log(formData)
  // }
  // function isButtonDisabled(){
  //   // Check both input form 
  //   // Boolean(formData.latitude) return true if empty
  //   if(Boolean(formData.latitude) && Boolean(formData.longitude)){
  //     return false;
  //   }else{
  //     return true
  //   }
  // }

  return (
    <>
    {/* Make the css styling from light blue to white */}
      <div className='w-screen h-screen flex flex-col bg-gradient-to-b from-blue-500 to-white'>
        {/* usually to centerized item use mx-auto my-auto */}
          <div className='mx-auto opacity-90 m-5 bg-white shadow-xl rounded-2xl p-10'>
           <h1 className='text-2xl'>Check Malaysia's city current weather <InsertEmoticonIcon/></h1>
           <p>This is my first React TypeScript Project utilizing these field of implementation</p>
           <div className='flex flex-col justify-items-center'>
              <DialogComponent/>
           </div>
            <Autocomplete<DataFormat,false,false,false>
            onChange={handleSelectedCity}
            className='ml-5 mb-5 mt-5'
            // options prop: This prop takes the full array of data items that you want the Autocomplete to suggest.
            options={malaysiaCities}
          // getOptionLabel prop: This prop is a function that tells the Autocomplete how to extract a displayable string (a "label") 
          // from each individual item in the options array. and we assign them to display the city name
          // so it's basically displaying the options. it's like solely mapping with the label of the property
            getOptionLabel={(option: DataFormat) => option.city} 
            renderInput={(params)=><TextField {...params} label="City"/>}
            />
            {/* <form onSubmit={handleLocationSearch}> */}
            {/* so, when the event of onsubmit, it called the handlesubmit which is the 
            react-form-hook library and onsubmit as an argument. This is where the 
            type defintion being send to the handle submit */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Implmentation using react-hook-form */}
              {/* Here where the register function inserted to each input field  */}
              {/* the ...register is instantiate the object to new property of latitude and longitude */}
              {/* on the register function you can add another object to add multiple attribute
                like {...register('latitude',{
                  required: true <---- make the input field attribute required
                  minLength: 10 <---- add another attribute 
                })}
              */}
              <TextField
              sx={{  width: '30px' }}
               error={Boolean(errors.latitude)} {...register('latitude',{
                // Here you specify what are the validation that you need to do 
                // such as requried cannot be empty 
                // and you can assign the error message directly when the 
                // required to true or it detect if the input is empty
                required: "Latitude is Required",
                // same as here where 
                // when checking the current input value
                // we can utilse the validate field to validate the input field
                // where we can take the current input value and using function callback
                // to return as string when any condition if the value does not match 
                // our criteria
                validate: (value) => {
                  if(!Number(value)){
                    return "Latitude must be in number"
                  }
                  // return if the input is valid
                  return true
                }
                })} name="latitude" className='w-full m-2' label="" variant="outlined" helperText={errors.latitude?.message }/>
              <TextField error={Boolean(errors.longitude)} {...register('longitude',
                {required: "Longitude is Required",
                  validate: (value) => {
                    const userInput = Number(value)
                    // A finite value is a numerical value that has a specific, fixed, and measurable quantity.
                    if(isNaN(userInput) || !isFinite(userInput)){
                      return "Longitude must be in number"
                    }
                    return true;
                  }
                })} name="longitude" className='w-full m-2'label="" variant="outlined" helperText={errors.longitude?.message}/>

              {/* Here you can see that the root is a part of the error property
                  the errors.?message is since message also can be empty than it is optional
                  thisi is a Conditional Rendering/ where it only execute when the condition or there is some value
                  on the property
              */}
              {/* Only shows error if exts */}
              {/* {errors.root && <Alert severity="error" className='w-full m-2'>{errors.root?.message}</Alert>} */}
              {message && <Alert severity="error" className='w-full m-2'>{message}</Alert>}
              <Button loading={loading} disabled={Boolean(errors.latitude)&&Boolean(errors.longitude)==true} 
               type='submit' className='w-50 m-4 p-2' variant='contained'>Search</Button>
            </form>

              {/* Manual form handler */}
              {/* Using w-full, make the input to grid cols */}
              {/* the double !! is checking if the object value is empty, then it will return true */}
              {/* The name attribute or property is to identify each input field */}
              {/* using .length to check the length. if the value is '' then it return as false else if 
              the length is more than 1 then return true */}
              {/* <TextField error={Boolean(errors.latitude.length)} name="latitude" className='w-full m-4' label="Latitude" variant="outlined" onChange={handleFormInput} helperText={errors.latitude}/> */}
              {/* <TextField error={Boolean(errors.longitude.length)} name="longitude" className='w-full m-4'label="Longitude" variant="outlined" onChange={handleFormInput} helperText={errors.longitude}/> */}
              {/* Two condition if the formdata is empty disable and if not passing the type checking */}
              {/* <Button disabled={isButtonDisabled()} type='submit' className='w-50 m-4 p-2' variant='contained' loading={loading}>Search</Button> */}
            {/* </form> */}
            {/*  */}
            {weatherData && (
              <CardWeather weatherData={weatherData}/>
            )
            }
          </div>
      </div>
    </>
  )
}

export default App

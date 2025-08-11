// the type here is refer to 
// we are only using this module to 
// import the interface or type 
// that is defined in this file 
// t's about instructing the compile-time environment 
// (TypeScript and your bundler) that this particular import 
// is irrelevant for the final JavaScript execution.
import type {CityWeatherResponse} from './service/weatherResponse'
import CountUp from './assets/reactbits/TextAnimations/CountUp/CountUp'

// Define the interface for the props that CardWeather expects
// means that we define specifically what type of data is the props 
interface CardWeatherProps {
  // using alieses to use the interface or type of CityWeatherResponse
  weatherData: CityWeatherResponse
}

//  Use React.FC with your props interface and destructure the props:
// what fc is function comopnent and telling that 
// this component expecting cardweatherprops with type of cityweather response. 
// in TypeScript, when creating a React functional component that expects to receive props, 
// the standard and recommended way is to define an interface (or type alias) 
// for the shape of those props and then explicitly apply that type to your component.
// Use React.FC<YourPropsInterface> (or directly type the argument) in your component definition. 
// This tells TypeScript what kind of props your functional component expects.
// this only implies if you are using react functional component 
// so that we can destructure the props on the props argument 
// and only stated which props we need inside the ()

// to sum up, since this component using react function component arrow 
// we need to tell react this component is function component (FC) arrow 
// and expecting the type CardWeatherProps that utilise the CityWeatherResponse type 
// and expecting weatherData as an aliases the props of type CityWeatherResponse

const CardWeather: React.FC<CardWeatherProps> = ({weatherData}) => {

  return (
    <>
    <div className="bg-gray-400 rounded-2xl p-5">
      <ul>
        <li><img src={`https://openweathermap.org/img/wn/${
          weatherData.weather.map((weatherCondition)=>{return weatherCondition.icon})
        }.png`} alt={`currentWeather${weatherData.weather.map((weatherCondition)=>weatherCondition.description)}`} /></li>
        <li>City Name: {weatherData.name}</li>
        <li>Current Weather: {weatherData.weather.map((weatherCondition)=>weatherCondition.main)}</li>
        <li>Temperature:
          <CountUp
            from={0}
            to={weatherData.main.temp}
            className='ml-1'
            direction="up"
            duration={0.5}/>°C
        </li>
        <li>Description: {weatherData.weather.map((weatherCondition)=>weatherCondition.description)}</li>
        <li>Wind Speed: <CountUp
            from={0}
            to={weatherData.wind.speed}
            className='ml-1'
            direction="up"
            duration={0.5}/>/ms</li>
        <li>Cloudiness: <CountUp
            from={0}
            to={weatherData.clouds.all}
            className='ml-1'
            direction="up"
            duration={0.5}/>%</li>
      </ul>
    </div>
    </>
  )
}
export default CardWeather
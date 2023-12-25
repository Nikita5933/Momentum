import * as string_decoder from "string_decoder";

export interface ITaskObj {
    pendingArray: string[],
    completedArray: string[]
}
export interface IChangeIcon {
    desc:string,
    humidity:number,
    id:number,
    temp:number,
    wind:number
}
interface IMainWeather {
    feels_like:number,
    grnd_level:number,
    humidity:number,
    pressure:number,
    sea_level:number,
    temp:number,
    temp_max:number,
    temp_min:number
}
interface IWeatherWeather {
    description:string,
    icon:string,
    id:number,
    main:string
}
interface IWindWeather {
    deg:number,
    gust:number,
    speed:number
}

export interface IWeather{
    main:IMainWeather,
    weather:{IWeatherWeather},
    wind:IWindWeather
}

export interface IWeatherObj {
    desc:string,
    humidity:number,
    id:number,
    temp:number,
    wind:number
}
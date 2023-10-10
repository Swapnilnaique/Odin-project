//* 6bab9aaf64ab4007b2f71805230910

async function apiCall() {

    //* calculating dates
    const date = new Date();
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let day = date.getDate()
    //* let formatted_date=`${day}/${month}`
    let full_date = `${year}-${month}-${day}`
    // console.log(full_date);

    //* current time
    let current_time = `${date.getHours()}:${date.getMinutes()}`
    console.log(current_time)


    //* getting the time for the next 3 hours
    let time = `${date.getHours()}:00`
    let time2 = `${date.getHours() + 1}:00`
    let time3 = `${date.getHours() + 2}:00`
    // console.log(time);
    // console.log(time2);
    // console.log(time3);

    //* combining the date and the time
    let full_time = `${full_date} ${time}`
    // let full_time2=`${full_date} ${time2}`
    // let full_time3=`${full_date} ${time3}`




    //* fetching the data
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6bab9aaf64ab4007b2f71805230910&q=goa&dt=${full_date}`, { mode: 'cors' })
    const response_json = await response.json()

    //* saving objects form api response
    const location = await response_json.location
    const data = await response_json.current
    const forecast = await response_json.forecast.forecastday[0]

    // console.log(forecast)
    console.log(response_json)
    // console.log(location)
    // console.log(data)

    //* selecting index of current hour with full_time variable
    let index = 0
    console.log("\nHours")
    for (let i = 0; i < forecast.hour.length; i++) {
        if (forecast.hour[i].time == full_time) {
            index = i
        }
    }

    //* Printing the data from the location obj
    console.log("\nLocation")
    console.log(`Location: ${location.name},${location.country}`)
    console.log(`Date and time: ${location.localtime}`)
    console.log(`Timezone: ${location.tz_id}`)

    //* Printing out data from the weather obj
    console.log("\nWeather")
    console.log(`Temperature in Celsius: ${data.temp_c}C`)
    console.log(`Conditions: ${data.condition.text}`)
    console.log(`Conditions: ${data.condition.icon}`)
    console.log(`Feels like: ${data.feelslike_c}C`)
    console.log(`Humidity: ${data.humidity}%`)
    console.log(`Wind speed: ${data.wind_kph}Kph`)
    console.log(`Wind direction: ${data.wind_dir}`)
    console.log(`UV: ${data.uv}`)
    console.log(`Chance of rain: ${forecast.hour[index].chance_of_rain}%`)

    //* printing out data from the forecast obj
    console.log("\nForecast")
    console.log(`Sunrise: ${forecast.astro.sunrise}`)
    console.log(`Sunset: ${forecast.astro.sunset}`)
    console.log(`Moonset: ${forecast.astro.moonset}`)
    console.log(`Moonrise: ${forecast.astro.moonrise}`)
    console.log(`Avg Temp: ${forecast.day.avgtemp_c}C`)
    console.log(`Avg Humidity: ${forecast.day.avghumidity}%`)
    console.log(`Chance of rain: ${forecast.day.daily_chance_of_rain}%`)



    //* printing out data from the Hours obj

    console.log(`\nHour: ${forecast.hour[index + 1].time}`)
    console.log(`Temperature: ${forecast.hour[index + 1].temp_c}C`)
    console.log(`Condition: ${forecast.hour[index + 1].condition.text}`)
    console.log(`Chance of rain: ${forecast.hour[index + 1].chance_of_rain}%`)
    console.log(`Humidity: ${forecast.hour[index + 1].humidity}%`)
    console.log(`Wind speed: ${forecast.hour[index + 1].wind_kph}Kph`)
    console.log(`Wind Direction: ${forecast.hour[index + 1].wind_dir}`)
    console.log(`Condition: ${forecast.hour[index + 1].condition.icon}`)
    
    console.log(`\nHour: ${forecast.hour[index + 2].time}`)
    console.log(`Temperature: ${forecast.hour[index + 2].temp_c}C`)
    console.log(`Condition: ${forecast.hour[index + 2].condition.text}`)
    console.log(`Chance of rain: ${forecast.hour[index + 2].chance_of_rain}%`)
    console.log(`Humidity: ${forecast.hour[index + 2].humidity}%`)
    console.log(`Wind speed: ${forecast.hour[index + 1].wind_kph}Kph`)
    console.log(`Wind Direction: ${forecast.hour[index + 1].wind_dir}`)
    console.log(`Condition: ${forecast.hour[index + 2].condition.icon}`)
    
    console.log(`\nHour: ${forecast.hour[index + 3].time}`)
    console.log(`Temperature: ${forecast.hour[index + 3].temp_c}C`)
    console.log(`Condition: ${forecast.hour[index + 3].condition.text}`)
    console.log(`Chance of rain: ${forecast.hour[index + 3].chance_of_rain}%`)
    console.log(`Humidity: ${forecast.hour[index + 3].humidity}%`)
    console.log(`Wind speed: ${forecast.hour[index + 1].wind_kph}Kph`)
    console.log(`Wind Direction: ${forecast.hour[index + 1].wind_dir}`)
    console.log(`Condition: ${forecast.hour[index + 3].condition.icon}`)


    //*current
    const temps = document.getElementById('temp')
    const location_display = document.getElementById('location')
    const icon = document.getElementById('icon')
    const condition = document.getElementById('current-mid')
    const feels = document.getElementById('current-bottom')

    condition.textContent = `${data.condition.text}`
    feels.innerHTML = `Feels like: ${data.feelslike_c}&#8451;`
    icon.style.backgroundImage = `url(${data.condition.icon})`
    temps.innerHTML = `${data.temp_c}&#8451;`
    location_display.textContent = `${location.name},${location.country}`

    // * info
    const time_display = document.getElementById('time')
    const humidity = document.getElementById('humidity')
    const wind_speed = document.getElementById('wind_speed')
    const uv = document.getElementById('uv')
    const wind_direction = document.getElementById('wind_direction')
    const rain = document.getElementById('rain')

    time_display.textContent = `Time: ${current_time}`
    humidity.textContent = `Humidity: ${data.humidity}%`
    wind_speed.textContent = `Wind speed: ${data.wind_kph}Kph`
    uv.textContent = `UV: ${data.uv}`
    wind_direction.textContent = `Wind direction: ${data.wind_dir}`
    rain.textContent = `Chance of rain: ${forecast.hour[index].chance_of_rain}%`


    //* Today
    const avg_temp = document.getElementById('avg-temp')
    const condition_today = document.getElementById('condition-today')
    const today_humidity = document.getElementById('today-humidity')
    const today_rain = document.getElementById('today-rain')
    const sunrise = document.getElementById('sunrise')
    const sunset = document.getElementById('sunset')
    const moonrise = document.getElementById('moonrise')
    const moonset = document.getElementById('moonset')

    sunrise.textContent = `Sunrise: ${forecast.astro.sunrise}`
    sunset.textContent = `Sunset: ${forecast.astro.sunset}`
    moonrise.textContent = `Moonrise: ${forecast.astro.moonrise}`
    moonset.textContent = `Moonset: ${forecast.astro.moonset}`
    avg_temp.innerHTML = `Avg Temp: ${forecast.day.avgtemp_c}&#8451;`
    condition_today.textContent = `${forecast.day.condition.text}`
    today_humidity.textContent = `Avg Humidity: ${forecast.day.avghumidity}%`
    today_rain.textContent = `Chance of rain: ${forecast.day.daily_chance_of_rain}%`

    //*Hours

    // hour1
    // const avg_temp = document.getElementById('avg-temp')
    // const condition_today = document.getElementById('condition-today')
    // const today_humidity = document.getElementById('today-humidity')
    // const today_rain = document.getElementById('today-rain')
    // const sunrise = document.getElementById('sunrise')
    // const sunset = document.getElementById('sunset')
    // const moonrise = document.getElementById('moonrise')
    // const moonset = document.getElementById('moonset')



}

apiCall()
<template>
    <div>
        <div class="row">
            <div class="col-md-4 sBar position-relative">
                <div class="bgImage" />

                <div class="navigationContainer position-absolute" :style="{width: '95%', zIndex: '9999'}">
                    <nav class="navbar bg-transparent">
                        <div class="container-fluid d-flex flex-nowrap gap-4">
                            <button class="navbar-toggler navBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                Search for Places
                            </button>
                            <button class="navbar-toggler navIcon" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <i class="fa-solid fa-location-crosshairs"></i>
                            </button>
                            
                            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div class="offcanvas-header d-flex justify-content-end">
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body">
                                    <form class="d-flex mt-3 position-relative" role="search">
                                        <i class="fa-solid fa-magnifying-glass position-absolute top-50 translate-middle" :style="{marginLeft: '16px'}"></i>
                                        <input class="form-control me-2" type="search" placeholder="search location" aria-label="Search" v-model="chosenLoc">
                                        <button class="btn btn-primary" type="button" @click="getLatLong">Search</button>
                                    </form>
                                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li class="nav-item dropend">
                                            <button type="button" class="btn btn-secondary position-relative" data-bs-toggle="dropdown" aria-expanded="false">
                                                Dropend
                                                <i class="fa-solid fa-chevron-right position-absolute end-0 translete-middle"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div class="now position-absolute start-50 translate-middle">
                    <div class="icon"><img src="" alt="weather"></div>
                    <div class="temperature">
                        <span class="tNumb">{{fixTodayTemperature}}</span>
                        <span class="unit">{{unit}}</span>
                    </div>
                    <div class="weather">{{weatherIndicator}} {{wCode}}</div>
                    <div class="date">Today, {{todayDate[0]}} <div>Time {{todayDate[1]}}</div></div>
                    <div class="location"><i class="fa-solid fa-location-dot me-2"></i>{{location}}</div>
                </div>
            </div>

            <div class="col-md-8 mBar">
                <div class="d-flex flex-column justify-content-center predictionContainer">
                    <WeatherNextPrediction 
                        :maxTemp="fixMaxTemp" 
                        :minTemp="fixMinTemp" 
                        :unit="unit" 
                        :date="nextDate" 
                        :wCode="nextWCode"
                        @changeToCel="changeToCelcius"
                        @changeToFah="changeToFahrenheit"
                    />
                    <WeatherTodayPrediction 
                        :windSpeed="todayWind" 
                        :humidity="todayHumidity" 
                        :visibility="todayVisibility" 
                        :pressure="todayPressure"
                    />
                    <div class="createdBy">created by <a href="https://github.com/hasanaimroatun/wpu-weatherAppChallenge">hasanaimroatun</a> - devChallenges.io</div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WeatherNextPrediction from './PredictionNextWeather.vue'
import WeatherTodayPrediction from './PredictionTodaysWeather.vue'
import axios from 'axios'

    export default {
        name: 'weather-container',
        components: {
            WeatherNextPrediction,
            WeatherTodayPrediction,
        },
        data() {
            return {
                iconsSrc: {
                    clear: require('@/assets/icon/Clear.png'),
                    hail: require('@/assets/icon/Hail.png'),
                    heavyCloud: require('@/assets/icon/HeavyCloud.png'),
                    heavyRain: require('@/assets/icon/HeavyRain.png'),
                    lightCloud: require('@/assets/icon/LightCloud.png'),
                    lightRain: require('@/assets/icon/LightRain.png'),
                    shower: require('@/assets/icon/Shower.png'),
                    sleet: require('@/assets/icon/Sleet.png'),
                    snow: require('@/assets/icon/Snow.png'),
                    thunderstorm: require('@/assets/icon/Thunderstorm.png')
                },
                weatherIndicator: '',
                chosenLoc: '',
                dataGeoFetching: {},
                lat: '',
                long: '',
                dataFetching: {},
                unit:'',
                todayTemperature: '',
                fixTodayTemperature: '',
                todayDate: '',
                todayWind: '',
                todayHumidity: '',
                todayVisibility: '',
                todayPressure: '',
                wCode: '',
                location: '',
                nextMaxTemp: [],
                nextMinTemp:[],
                nextWCode: [],
                nextDate: [],
                fixMaxTemp: [],
                fixMinTemp: [],
                errorMsg: ''
                
            }
        },
        mounted() {
            axios
            .get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,surface_pressure,precipitation,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&windspeed_unit=mph&timezone=auto')
            .then((res) => {
                this.dataFetching = res.data
                console.log(this.dataFetching)
                this.updateDataFetching()
            })
            .catch(err => {
                console.log(err.message)
                this.errorMsg = err.message
            })
        },
        updated() {
            console.log(this.chosenLoc)
        },
        methods: {
            getLocation() {
                if(navigator.geolocation) {
                    console.log('Geolocation is supported')
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.lat = position.coords.latitude
                        this.long = position.coords.longitude
                        console.log(this.lat)
                        console.log(this.long)
                    }, (err) => {
                        console.log(err)
                    })
                } else {
                    console.log('Geolocation is not supported by this browser.')
                }
            },
            getLatLong() {
                if(this.chosenLoc !== '') {
                    axios
                    .get('https://geocoding-api.open-meteo.com/v1/search?name='+ this.chosenLoc + '&count=1')
                    .then((res) => {
                        this.dataGeoFetching = res.data
                        this.lat = this.dataGeoFetching.results[0].latitude
                        this.long = this.dataGeoFetching.results[0].longitude
                        console.log(this.lat)
                        console.log(this.long)
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })

                    setTimeout(function() {
                        axios
                        .get('https://api.open-meteo.com/v1/forecast?latitude=' + this.lat + '&longitude=' + this.long + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,surface_pressure,precipitation,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&windspeed_unit=mph&timezone=auto')
                        .then((res) => {
                            this.dataFetching = res.data
                            console.log(this.dataFetching)
                            this.updateDataFetching()
                        })
                        .catch(err => {
                            console.log(err.message)
                            this.errorMsg = err.message
                        })
                    }, 2000)
                
                }
            },
            changeWeatherIcon() {
                const icon = document.getElementsByClassName('icon')[0].childNodes[0]
                
                if(this.wCode >= 0 && this.wCode <= 3) {
                    icon.src = this.iconsSrc.clear;
                    this.weatherIndicator = 'Clear';
                } 
                if(this.wCode >= 4 && this.wCode <= 9) {
                    icon.src = this.iconsSrc.heavyCloud;
                    this.weatherIndicator = 'Haze/ Dust/ Sand/ Smoke';
                }
                if(this.wCode >= 10 && this.wCode <= 12) {
                    icon.src = this.iconsSrc.heavyCloud;
                    this.weatherIndicator = 'Mist/ Fog';
                }
                if(this.wCode == 13) {
                    icon.src = this.iconsSrc.thunderstorm;
                    this.weatherIndicator = 'Lightning';
                }
                if(this.wCode >= 14 && this.wCode <= 16) {
                    icon.src = this.iconsSrc.lightRain;
                    this.weatherIndicator = 'Drizzle';
                }
                if(this.wCode == 17) {
                    icon.src = this.iconsSrc.thunderstorm;
                    this.weatherIndicator = 'Thunderstorm';
                }
                if(this.wCode >= 18) {
                    icon.src = this.iconsSrc.thunderstorm;
                    this.weatherIndicator = 'Storm';
                }
                if(this.wCode <= 19) {
                    icon.src = this.iconsSrc.heavyCloud;
                    this.weatherIndicator = 'Funnel cloud';
                }
                if(this.wCode >= 20 && this.wCode <= 28) {
                    icon.src = this.iconsSrc.lightRain;
                    this.weatherIndicator = 'Precipitation/ Fog/ Ice fog';
                }
                if(this.wCode == 29) {
                    icon.src = this.iconsSrc.thunderstorm;
                    this.weatherIndicator = 'Thunderstorm';
                }
                if(this.wCode >= 30 && this.wCode <= 35) {
                    icon.src = this.iconsSrc.heavyCloud;
                    this.weatherIndicator = 'Duststorm/ Sandstorm';
                }
                if(this.wCode >= 36 && this.wCode <= 39) {
                    icon.src = this.iconsSrc.snow;
                    this.weatherIndicator = 'Drifting/ Blowing snow';
                }
                if(this.wCode >= 40 && this.wCode <= 49) {
                    icon.src = this.iconsSrc.heavyCloud;
                    this.weatherIndicator = 'Fog/ Ice fog';
                }
                if(this.wCode >= 50 && this.wCode <= 59) {
                    icon.src = this.iconsSrc.lightRain;
                    this.weatherIndicator = 'Drizzle';
                }
                if(this.wCode >= 60 && this.wCode <= 69) {
                    icon.src = this.iconsSrc.heavyRain;
                    this.weatherIndicator = 'Rain';
                }
                if(this.wCode >= 70 && this.wCode <= 79) {
                    icon.src = this.iconsSrc.snow;
                    this.weatherIndicator = 'Snow'
                }
                if(this.wCode >= 80 && this.wCode <= 82) {
                    icon.src = this.iconsSrc.heavyRain;
                    this.weatherIndicator = 'Rain';
                }
                if(this.wCode >= 83 && this.wCode <= 84) {
                    icon.src = this.iconsSrc.sleet;
                    this.weatherIndicator = 'Rain and Snow Mixed';
                }
                if(this.wCode >= 85 && this.wCode <= 88) {
                    icon.src = this.iconsSrc.snow;
                    this.weatherIndicator = 'Snow';
                }
                if(this.wCode >= 89 && this.wCode <= 90) {
                    icon.src = this.iconsSrc.hail;
                    this.weatherIndicator = 'Shower of Hail';
                }
                if(this.wCode == 91) {
                    icon.src = this.iconsSrc.lightRain;
                    this.weatherIndicator = 'Slight Rain';
                }
                if(this.wCode == 92) {
                    icon.src = this.iconsSrc.heavyRain;
                    this.weatherIndicator = 'Moderate/ Heavy Rain';
                }
                if(this.wCode >= 93 && this.wCode <= 94) {
                    icon.src = this.iconsSrc.sleet;
                    this.weatherIndicator = 'Snow/ Rain and Snow Mixed/ Hail'
                }
                if(this.wCode >= 95 && this.wCode <= 99) {
                    icon.src = this.iconsSrc.thunderstorm;
                    this.weatherIndicator = 'Thunderstorm';
                }
            },
            updateDataFetching() {
                this.todayTemperature = this.dataFetching.current_weather.temperature.toString().replace('.',',')
                this.fixTodayTemperature = this.todayTemperature

                this.todayDate = this.dataFetching.current_weather.time.toString().split('T')
                this.wCode = parseInt(this.dataFetching.current_weather.weathercode)
                this.changeWeatherIcon()

                // wind speed
                this.todayWind = this.dataFetching.current_weather.windspeed.toString().replace('.',',')

                // humidity
                var h = 0
                for(let i = 0; i < this.dataFetching.hourly.relativehumidity_2m.length; i++) {
                    h += this.dataFetching.hourly.relativehumidity_2m[i]
                }
                this.todayHumidity = Math.round(h / this.dataFetching.hourly.relativehumidity_2m.length)
                
                // air pressure
                var p = 0
                for(let i = 0; i < this.dataFetching.hourly.surface_pressure.length; i++) {
                    p += this.dataFetching.hourly.surface_pressure[i]
                }
                this.todayPressure = Math.round(p / this.dataFetching.hourly.surface_pressure.length)
                
                // visibility
                var v = 0
                for(let i = 0; i < this.dataFetching.hourly.visibility.length; i++) {
                    v += this.dataFetching.hourly.visibility[i]
                }
                this.todayVisibility = ((v / this.dataFetching.hourly.visibility.length)*0.00062137).toFixed(1).replace('.',',')

                this.unit = this.dataFetching.hourly_units.temperature_2m.toString()
                this.location = this.dataFetching.timezone
                
                // next day
                // max temperature
                this.nextMaxTemp = []
                for(let i = 1; i < 6; i++) {
                    this.nextMaxTemp.push(this.dataFetching.daily.temperature_2m_max[i].toString().replace('.',','))
                }
                this.fixMaxTemp = this.nextMaxTemp

                // min temperature
                this.nextMinTemp = []
                for(let i = 1; i < 6; i++) {
                    this.nextMinTemp.push(this.dataFetching.daily.temperature_2m_min[i].toString().replace('.',','))
                }
                this.fixMinTemp = this.nextMinTemp

                // date
                this.nextDate = ['Tomorrow']
                for(let i = 2; i < 6; i++) {
                    this.nextDate.push(this.dataFetching.daily.time[i].toString())
                }

                // weather code
                this.nextWCode = []
                for(let i = 1; i < 6; i++) {
                    this.nextWCode.push(this.dataFetching.daily.weathercode[i])
                }
            },
            changeToCelcius() {
                this.fixMaxTemp = this.nextMaxTemp
                this.fixMinTemp = this.nextMinTemp
                this.fixTodayTemperature = this.todayTemperature
                this.unit='°C'
            },
            changeToFahrenheit() {
                this.fixMaxTemp = []
                for(let i = 0; i < this.nextMaxTemp.length; i++) {
                    this.fixMaxTemp.push(((this.nextMaxTemp[i].replace(',','.') * 9/5) + 32).toFixed(1).toString().replace('.',',')) 
                }
                
                this.fixMinTemp = []
                for(let i = 0; i < this.nextMinTemp.length; i++) {
                    this.fixMinTemp.push(((this.nextMinTemp[i].replace(',','.') * 9/5) + 32).toFixed(1).toString().replace('.',',')) 
                }

                this.fixTodayTemperature = ((this.todayTemperature.replace(',','.') * 9/5) + 32).toFixed(1).toString().replace('.',',')
                this.unit='°F'
            },
            
        }
    }
</script>

<style scoped>
.sBar {
    background-color: #1E213A;
    padding: 0;
    font-family: 'Raleway', sans-serif;
}

.sBar .bgImage {
    background-image: url('@/assets/icon/Cloud-background.png');
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 138%;
    opacity: 5%;
    height: 902px;
    margin-top: 103px;
    box-sizing: border-box;
}

.navigationContainer {
    top: 42px;
}

.navbar-toggler,
.navbar-toggler:focus {
    outline: none;
    box-shadow: none;
}

.navBtn {
    background-color: #6E707A;
    border: 1px solid #6E707A;
    padding: 11px 18px;
    font-weight: 500;
    font-size: 16px;
    line-height: 18.76px;
    color: #E7E7EB;
    margin-left: 34px;
    border-radius: 0;
}

.navIcon {
    width: 40px;
    height: 40px;
    background-color: #6E707A;
    border: 1px solid #6E707A;
    border-radius: 50%;
}

.fa-location-crosshairs {
    margin-left: -3px;
    color: #E7E7EB;
}

.fa-location-crosshairs:hover {
    color: #6E707A;
}

.navbar-toggler:hover {
    background-color: #E7E7EB;
    border: 1px solid #E7E7EB;
    color: #6E707A;
}

.offcanvas {
    background-color: #1E213A;
    padding: 5px 25px;
}

.offcanvas-body form {
    margin-bottom: 58px;
}

.offcanvas-body input {
    border-radius: 0;
    background: transparent;
    border: 1px solid #E7E7EB;
    padding-left: 30px;
}

.offcanvas-body input, 
.offcanvas-body input::placeholder {
    font-weight: 500;
    font-size: 16px;
    color: #616475;
}

.offcanvas-body button {
    border-radius: 0;
    font-weight: 600;
    font-size: 16px;
    color: #E7E7EB;
}

.offcanvas-body input:focus,
.offcanvas-body button:focus {
    outline: none;
    box-shadow: none;
} 

.nav-item button {
    font-weight: 500;
    font-size: 16px;
    color: #E7E7EB;
    width: 318px;
    border: none;
    background: transparent;
    padding-left: 18px;
    text-align: start;
    height: 64px;
}

.nav-item button:hover {
    border: 1px solid #616475;
}

.fa-chevron-right {
    color: #616475;
    margin-top: 3px;
    margin-right: 15px;
}

/* end of navbar style */

.now {
    top: 390px;
}

.icon {
    width: 202px;
    margin-top: 300px;
}

.icon,
.temperature,
.weather {
    margin-bottom: 87px;
}

.temperature .unit {
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    font-size: 48px;
    line-height: 56.35px;
    color: #A09FB1;
}

.temperature .tNumb {
    font-weight: 500;
    font-size: 114px;
    color: #E7E7EB;
}

.weather {
    font-weight: 600;
    font-size: 36px;
    line-height: 42.26px;
    color: #A09FB1;
}

.date {
    margin-bottom: 32px;
    font-weight: 500;
    font-size: 18px;
    line-height: 21.13px;
    color: #88869D;
}

.location {
    font-weight: 600;
    font-size: 18px;
    line-height: 21.13px;
    color: #88869D;
}

.mBar {
    background-color: #100E1D;
    font-family: 'Raleway', sans-serif;
}

.predictionContainer {
    padding: 42px 97px 25px;
}

.mBar .createdBy {
    margin-top: 112px;
    color: #A09FB1;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 17.07px;
}

.createdBy a {
    color: inherit;
    text-decoration: none;
    font-weight: 700;
}

.createdBy a:hover {
    color: #FFEC65;
}
</style>
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
                                        <button class="btn btn-primary" type="button" @click="addCity">Search</button>
                                    </form>
                                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <div v-if="cityContainer.length !== 0">
                                            <li class="nav-item">
                                                <button type="button" class="btn btn-secondary position-relative" @click="getLatLong">
                                                    {{cityContainer[0]}}
                                                    <i class="fa-solid fa-chevron-right position-absolute end-0 translete-middle"></i>
                                                </button>
                                            </li>
                                        </div>
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
                    <div class="date d-flex gap-3 justify-content-center">Today<span>.</span>{{todayDate}}</div>
                    <div class="location"><i class="fa-solid fa-location-dot me-2"></i>{{cityContainer[0]}}</div>
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
                        :iconsSrc="iconsSrc"
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
                months: ['list:', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                weatherIndicator: '',
                chosenLoc: '',
                locCoord: {
                    lat: '',
                    long: ''
                },
                dataGeoFetching: {},
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
                nextMaxTemp: [],
                nextMinTemp:[],
                nextWCode: [],
                nextDate: [],
                nextDays: [],
                fixMaxTemp: [],
                fixMinTemp: [],
                cityContainer: ['Berlin ( Germany )']
                
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
                alert(err.message)
            })
        
        },
        updated() {
            
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
            addCity() {
                if(this.chosenLoc !== '') {
                    axios
                    .get('https://geocoding-api.open-meteo.com/v1/search?name='+ this.chosenLoc + '&count=1')
                    .then((res) => {
                        this.dataGeoFetching = res.data
                        this.locCoord.lat = this.dataGeoFetching.results[0].latitude.toFixed(2)
                        this.locCoord.long = this.dataGeoFetching.results[0].longitude.toFixed(2)
                        this.cityContainer = []
                        this.cityContainer.push(this.dataGeoFetching.results[0].name + ' ( ' +  this.dataGeoFetching.results[0].country + ' )')
                        console.log(this.dataGeoFetching.results[0])
                    })
                    .catch((err) => {
                        console.log(err.message)
                        alert(err.message)
                    })
                }
            },
            getLatLong() {
                if(this.cityContainer.length !== 0) {
                    setTimeout(() => {
                        const x = this.locCoord.lat
                        const y = this.locCoord.long
                        axios
                        .get('https://api.open-meteo.com/v1/forecast?latitude=' + x + '&longitude=' + y + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,surface_pressure,precipitation,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&windspeed_unit=mph&timezone=auto')
                        .then((res) => {
                            this.dataFetching = res.data
                            console.log(this.dataFetching)
                            this.updateDataFetching()
                        })
                        .catch(err => {
                            console.log(err.message)
                            alert(err.message)
                        })
                    }, 200)
                }
            },
            changeWeatherIcon() {
                const icon = document.getElementsByClassName('icon')[0].childNodes[0]
                
                this.conditions(this.wCode, icon)
                this.labelWCondition()
            },
            conditions(code, elem) {
                if(code >= 0 && code <= 3) {elem.src = this.iconsSrc.clear} 
                if(code >= 4 && code <= 9) {elem.src = this.iconsSrc.heavyCloud}
                if(code >= 10 && code <= 12) {elem.src = this.iconsSrc.heavyCloud}
                if(code == 13) {elem.src = this.iconsSrc.thunderstorm}
                if(code >= 14 && code <= 16) {elem.src = this.iconsSrc.lightRain}
                if(code == 17) {elem.src = this.iconsSrc.thunderstorm}
                if(code == 18) {elem.src = this.iconsSrc.thunderstorm}
                if(code == 19) {elem.src = this.iconsSrc.heavyCloud}
                if(code >= 20 && code <= 28) {elem.src = this.iconsSrc.lightRain}
                if(code == 29) {elem.src = this.iconsSrc.thunderstorm}
                if(code >= 30 && code <= 35) {elem.src = this.iconsSrc.heavyCloud}
                if(code >= 36 && code <= 39) {elem.src = this.iconsSrc.snow}
                if(code >= 40 && code <= 49) {elem.src = this.iconsSrc.heavyCloud}
                if(code >= 50 && code <= 59) {elem.src = this.iconsSrc.lightRain}
                if(code >= 60 && code <= 69) {elem.src = this.iconsSrc.heavyRain}
                if(code >= 70 && code <= 79) {elem.src = this.iconsSrc.snow}
                if(code >= 80 && code <= 82) {elem.src = this.iconsSrc.heavyRain}
                if(code >= 83 && code <= 84) {elem.src = this.iconsSrc.sleet}
                if(code >= 85 && code <= 88) {elem.src = this.iconsSrc.snow}
                if(code >= 89 && code <= 90) {elem.src = this.iconsSrc.hail}
                if(code == 91) {elem.src = this.iconsSrc.lightRain}
                if(code == 92) {elem.src = this.iconsSrc.heavyRain}
                if(code >= 93 && code <= 94) {elem.src = this.iconsSrc.sleet}
                if(code >= 95 && code <= 99) {elem.src = this.iconsSrc.thunderstorm}
            },
            labelWCondition() {
                if(this.wCode >= 0 && this.wCode <= 3) {this.weatherIndicator = 'Clear'} 
                if(this.wCode >= 4 && this.wCode <= 9) {this.weatherIndicator = 'Haze/ Dust/ Sand/ Smoke'}
                if(this.wCode >= 10 && this.wCode <= 12) {this.weatherIndicator = 'Mist/ Fog'}
                if(this.wCode == 13) {this.weatherIndicator = 'Lightning'}
                if(this.wCode >= 14 && this.wCode <= 16) {this.weatherIndicator = 'Drizzle'}
                if(this.wCode == 17) {this.weatherIndicator = 'Thunderstorm'}
                if(this.wCode == 18) {this.weatherIndicator = 'Storm'}
                if(this.wCode == 19) {this.weatherIndicator = 'Funnel cloud'}
                if(this.wCode >= 20 && this.wCode <= 28) {this.weatherIndicator = 'Precipitation/ Fog/ Ice fog'}
                if(this.wCode == 29) {this.weatherIndicator = 'Thunderstorm'}
                if(this.wCode >= 30 && this.wCode <= 35) {this.weatherIndicator = 'Duststorm/ Sandstorm'}
                if(this.wCode >= 36 && this.wCode <= 39) {this.weatherIndicator = 'Drifting/ Blowing snow'}
                if(this.wCode >= 40 && this.wCode <= 49) {this.weatherIndicator = 'Fog/ Ice fog'}
                if(this.wCode >= 50 && this.wCode <= 59) {this.weatherIndicator = 'Drizzle'}
                if(this.wCode >= 60 && this.wCode <= 69) {this.weatherIndicator = 'Rain'}
                if(this.wCode >= 70 && this.wCode <= 79) {this.weatherIndicator = 'Snow'}
                if(this.wCode >= 80 && this.wCode <= 82) {this.weatherIndicator = 'Rain'}
                if(this.wCode >= 83 && this.wCode <= 84) {this.weatherIndicator = 'Rain and Snow Mixed'}
                if(this.wCode >= 85 && this.wCode <= 88) {this.weatherIndicator = 'Snow'}
                if(this.wCode >= 89 && this.wCode <= 90) {this.weatherIndicator = 'Shower of Hail'}
                if(this.wCode == 91) {this.weatherIndicator = 'Slight Rain'}
                if(this.wCode == 92) {this.weatherIndicator = 'Moderate/ Heavy Rain'}
                if(this.wCode >= 93 && this.wCode <= 94) {this.weatherIndicator = 'Snow/ Rain and Snow Mixed/ Hail'}
                if(this.wCode >= 95 && this.wCode <= 99) {this.weatherIndicator = 'Thunderstorm'}
            },
            updateDataFetching() {
                // today temperature
                this.todayTemperature = this.dataFetching.current_weather.temperature.toString().replace('.',',')
                this.fixTodayTemperature = this.todayTemperature

                // today date
                let tDate = new Date(this.dataFetching.current_weather.time).toString().split(' ')
                this.todayDate = tDate[0] + ', ' + parseInt(tDate[2]) + ' ' + tDate[1]
                
                // weather code
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

                // temperature unit
                this.unit = this.dataFetching.hourly_units.temperature_2m.toString()
                
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
                var rawDate = []
                
                for(let i = 2; i < 6; i++) {
                    rawDate.push(new Date(this.dataFetching.daily.time[i]).toString().split(' '))
                }
                for(let i = 0; i < rawDate.length; i++) {
                    this.nextDate.push(rawDate[i][0] + ', ' + parseInt(rawDate[i][2]) + ' ' + rawDate[i][1])
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

.nav-item button:hover,
.nav-item button:focus {
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
    white-space: nowrap;
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
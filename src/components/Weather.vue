<template>
    <div>
        <div class="row">
            <div class="col-md-4 sBar position-relative">
                <div class="bgImage" />

                <div class="navigationContainer position-absolute" :style="{width: '90%'}">
                    <nav class="navbar bg-transparent">
                        <div class="container-fluid d-flex">
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
                                    <form class="d-flex mt-3" role="search">
                                        <input class="form-control me-2" type="search" placeholder="search location" aria-label="Search">
                                        <button class="btn btn-primary" type="submit">Search</button>
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
                    <div class="icon"></div>
                    <div class="temperature"><span>15</span>℃</div>
                    <div class="weather">Rain</div>
                    <div class="date">Today</div>
                    <div class="location">Helsinski</div>
                </div>
            </div>

            <div class="col-md-8 mBar">
                <div class="d-flex flex-column justify-content-center predictionContainer">
                    <WeatherNextPrediction />
                    <WeatherTodayPrediction />
                    <div class="createdBy">created by <a href="#">hasanaimroatun</a> - devChallenges.io</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WeatherNextPrediction from './PredictionNextWeather.vue'
import WeatherTodayPrediction from './PredictionTodaysWeather.vue'

    export default {
        name: 'weather-container',
        components: {
            WeatherNextPrediction,
            WeatherTodayPrediction,
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

.iLocation:hover {
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
    padding-left: 49px;
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
}

.icon,
.temperature,
.weather {
    margin-bottom: 87px;
}

.temperature {
    font-weight: 100;
    font-size: 48px;
    line-height: 56.35px;
    color: #A09FB1;
}

.temperature span {
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
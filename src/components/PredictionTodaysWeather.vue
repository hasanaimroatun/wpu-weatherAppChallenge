<template>
    <div>
        <div class="title text-start">Today’s Hightlights</div>
        <div class="d-flex flex-wrap text-center cardContainer">
            <div class="card1 windStatus mb-4">
                <div class="cardTitle">Wind status</div>
                <div class="wind"><span>{{windSpeed}}</span>mph</div>
                <div class="wIconContainer d-flex justify-content-center">
                    <button class="wIcon me-3"><i class="fa-solid fa-location-arrow"></i></button>
                    WSW
                </div>
            </div>
            <div class="card1 humidity mb-4">
                <div class="cardTitle">Humidity</div>
                <div class="humid"><span>{{humidity}}</span>%</div>
                <div>
                    <div class="percentage d-flex">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="text-end percentage">%</div>
                </div>
            </div>
        </div>
        
        <div class="d-flex flex-wrap text-center cardContainer">
            <div class="card2 mb-4">
                <div class="cardTitle">Visibility</div>
                <div class="visible"><span>{{visibility}}</span>miles</div>
            </div>
            <div class="card2 mb-4">
                <div class="cardTitle">Air Pressure</div>
                <div class="pressure"><span>{{pressure}}</span>mb</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'today-prediction',
        props: ['windSpeed', 'humidity', 'visibility', 'pressure'],
        mounted() {
            document.getElementsByClassName('progress-bar')[0].style.width=this.humidity + '%'
        },
        updated() {
            document.getElementsByClassName('progress-bar')[0].style.width=this.humidity + '%'
        }
    }
</script>

<style scoped>
.title {
    margin-top: 72px;
    margin-bottom: 32px;
    color: #E7E7EB;
    font-weight: 700;
    font-size: 24px;
    line-height: 28.18px;
}

.cardContainer, 
.percentage {
    justify-content: space-between;
}

.card1, 
.card2 {
    width: 328px;
    background-color: #1E213A;
    color: #E7E7EB;
    padding-top: 22px;
    box-sizing: border-box;
}

.card1 {
    height: 204px;
}

.card2 {
    height: 159px;
    padding-bottom: 37px;
}

.cardTitle {
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 18.78px;
}

.windStatus {
    padding-bottom: 32px;
}

.wind {
    margin-bottom: 18px;
    font-weight: 500;
    font-size: 36px;
    line-height: 42.26px;
}

.wind span {
    font-weight: 700;
    font-size: 64px;
    line-height: 75.14px;
}

.wIconContainer {
    font-weight: 500;
    font-size: 14px;
    line-height: 16.44px;
}

.wIconContainer .wIcon {
    width: 29.49px;
    height: 29.49px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: rotate(170deg);
    border: none;
    margin-top: -10px;
}

.fa-location-arrow {
    color: #E7E7EB;
}

.humidity {
    padding: 22px 49px 41px;
}

.humid {
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 36px;
    line-height: 42.26px;
}

.humid span {
    font-weight: 700;
    font-size: 64px;
    line-height: 75.14px;
}

.percentage {
    font-weight: 700;
    font-size: 12px;
    line-height: 14.09px;
    padding: 3px;
}

.progress, 
.progress-bar {
    height: 0.5rem;
}

.progress-bar {
    background-color: #FFEC65;
}

.visible,
.pressure {
    font-weight: 500;
    font-size: 36px;
    line-height: 42.26px;
}

.visible span,
.pressure span {
    font-weight: 700;
    font-size: 64px;
    line-height: 75.14px;
}
</style>
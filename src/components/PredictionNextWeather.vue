<template>
    <div class="nContainer">
        <div class="iContainer d-flex justify-content-end">
            <button class="celcius" @click="$emit('changeToCel')">℃</button>
            <button class="fahrenheit" @click="$emit('changeToFah')">℉</button>
        </div>

        <div class="d-flex flex-wrap gap-4">
            <div v-for="(card, index) in ['card1', 'card2', 'card3', 'card4', 'card5']" :key="card">
                <div class="predictions position-relative">
                    <div class="date">{{date[index]}}</div>
                    <img src="" alt="weatherIcon" class="wIcons">
                    <div class="tempContainer position-absolute top-100 start-50 translate-middle">
                        <span class="temp1">{{maxTemp[index]}}{{unit}}</span>
                        <span class="temp2">{{minTemp[index]}}{{unit}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'next-prediction',
        props:['maxTemp', 'minTemp', 'unit', 'date', 'wCode', 'iconsSrc'],
        emits: ['changeToFah', 'changeToCel'], 
        mounted() {
            this.updateIcon()
        },
        updated() {
            this.updateIcon()
        },
        methods: {
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
            updateIcon() {
                const nextDayIcon = document.getElementsByClassName('wIcons')
                for(let i = 0; i < nextDayIcon.length; i++) {
                    this.conditions(this.wCode[i], nextDayIcon[i])
                }
            }
        }
    }
</script>

<style scoped>
.nContainer {
    padding-left: 0;
}

.iContainer {
    margin-bottom: 66px;
    gap: 12px;
}

.iContainer button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-weight: 700;
    font-size: 18px;
    line-height: 21.13px;
}

.celcius {
    background-color: #E7E7EB;
    border: 1px solid #E7E7EB;
    color: #110E3C;
}

.celcius:hover {
    background-color: #110E3C;
    border: 1px solid #110E3C;
    color: #E7E7EB;
}

.fahrenheit {
    background-color: #585676;
    border: 1px solid #585676;
    color: #E7E7EB;
}

.fahrenheit:hover {
    background-color: #E7E7EB;
    border: 1px solid #E7E7EB;
    color: #585676;
}

.predictions {
    width: 120px;
    height: 177px;
    background-color: #1E213A;
    padding: 18px 13px;
    box-sizing: border-box;
    color: #E7E7EB;
}

.date {
    font-weight: 500;
    font-size: 16px;
    line-height: 18.78px;
}

.wIcons {
    margin-top: 10px;
    width: 56.44px;
}

.tempContainer {
    display: flex;
    gap: 15px;
    margin-top: -28px;
}

.tempContainer span {
    font-weight: 500;
    font-size: 16px;
    line-height: 18.78px;
}

@media screen and (max-width: 576px) {
    .nContainer {
        padding-left: 31px;
    }
}
</style>
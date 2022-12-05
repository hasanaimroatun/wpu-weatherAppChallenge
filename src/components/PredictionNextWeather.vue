<template>
    <div>
        <div class="iContainer d-flex justify-content-end">
            <button class="celcius" @click="$emit('changeToCel')">℃</button>
            <button class="fahrenheit" @click="$emit('changeToFah')">℉</button>
        </div>

        <div class="d-flex flex-wrap gap-4">
            <div v-for="(card, index) in ['card1', 'card2', 'card3', 'card4', 'card5']" :key="card">
                <div class="predictions">
                    <div class="date">{{date[index]}}</div>
                    <div class="wIcon">{{wCode[index]}}</div>
                    <div class="tempContainer">
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
        props:['maxTemp', 'minTemp', 'unit', 'date', 'wCode'],
        emits: ['changeToFah', 'changeToCel'],
        
    }
</script>

<style scoped>
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

.wIcon {
    margin-top: 10px;
    width: 56.44px;
}

.tempContainer {
    margin-top: 31px;
    display: flex;
    justify-content: space-between;
}

.tempContainer span {
    font-weight: 500;
    font-size: 16px;
    line-height: 18.78px;
}
</style>
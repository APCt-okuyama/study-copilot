<template>
    <!-- 現在地の気象の情報を表示する -->
    <div class="weather-info">
        <h1>現在地の気象情報</h1>
        <p>現在地(緯度・軽度)※整数部分のみ表示</p>
        <p>{{ Math.floor(latitude) }} : {{ Math.floor(longitude) }}</p>
        <p>現在地の気象情報を表示します。</p>
        <h3>現在地の気象情報</h3>
        <p>天気: {{ weatherInfo.weather[0].main }}</p>
        <h3>現在地の気温情報</h3>
        <p>気温: {{ weatherInfo.main.temp }}℃</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class WeatherInfo extends Vue {
    // 緯度
    latitude = 0;
    // 経度
    longitude = 0;
    // 現在地の気象情報
    weatherInfo: any = null;
    // 現在地の緯度・経度を取得する
    getLocation() {
        // 緯度・経度を取得する
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            // 現在地の気象情報を取得する
            this.getWeatherInfo();
        });
    }
    // 現在地の気象情報を取得する
    getWeatherInfo() {
        // 緯度・経度を取得する
        const lat = this.latitude;
        const lon = this.longitude;
        // 緯度・経度が取得できない場合は処理を終了する
        if (lat === 0 || lon === 0) {
            return;
        }
        // 緯度・経度から現在地の気象情報を取得する
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_API_KEY}`;
        fetch(url)
            .then((response) => {
                console.log(response);
                return response.json();
        })
            .then((json) => {
            this.weatherInfo = json;
        });
    }
    //mountedで現在地の緯度・経度を取得する
    mounted() {
        this.getLocation();
    }
}
</script>
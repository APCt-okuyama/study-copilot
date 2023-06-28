<template>
    <!-- 現在地の気象の情報を表示する -->
    <div class="weather-info">
        <div class="box1">
            本日の日付は {{ getTodayStringWithWeek() }}
            <div class="row1">
                <div class="col1">
                    <h1>openweathermap を利用</h1>
                    <p>現在地(緯度・軽度)※整数部分のみ表示</p>
                    <p>{{ Math.floor(latitude) }} : {{ Math.floor(longitude) }}</p>
                    <p>現在地の気象情報を表示します。</p>
                    <h3>現在地の気象情報</h3>
                    <p>天気: {{ weatherInfo && weatherInfo.weather[0].main }}</p>
                    <h3>現在地の気温情報</h3>
                    <p>気温: {{ weatherInfo && convertKelvinToCelsius(weatherInfo.main.temp) }}℃</p>
                </div>
                <!-- <div>
                    <h1>Weatherbit API を利用</h1>
                    <p>現在地(緯度・軽度)※整数部分のみ表示</p>
                    <p>{{ Math.floor(latitude) }} : {{ Math.floor(longitude) }}</p>
                    <p>現在地の気象情報を表示します。</p>
                    <h3>現在地の気象情報</h3>
                    <p>天気: {{ weatherInfoWeatherbit && weatherInfoWeatherbit.weather.description }}</p>
                    <h3>現在地の気温情報</h3>
                    <p>気温: {{ weatherInfoWeatherbit && weatherInfoWeatherbit.temp }}</p>
                </div> -->
            </div>
        </div>

        <!-- <div class="box2">
            <div class="row1">
                <div class="col1">
                    <h1>3 Climacell API:</h1>
                    <p>現在地(緯度・軽度)※整数部分のみ表示</p>
                    <p>{{ Math.floor(latitude) }} : {{ Math.floor(longitude) }}</p>
                    <p>現在地の気象情報を表示します。</p>
                    <h3>現在地の気象情報</h3>
                    <p>天気: {{ weatherInfo.weather[0].main }}</p>
                    <h3>現在地の気温情報</h3>
                    <p>気温: {{ weatherInfo.main.temp }}℃</p>
                </div>
                <div class="col1">
                    <h1>4 WeatherAPI:</h1>
                    <p>現在地(緯度・軽度)※整数部分のみ表示</p>
                    <p>{{ Math.floor(latitude) }} : {{ Math.floor(longitude) }}</p>
                    <p>現在地の気象情報を表示します。</p>
                    <h3>現在地の気象情報</h3>
                    <p>天気: {{ weatherInfo.weather[0].main }}</p>
                    <h3>現在地の気温情報</h3>
                    <p>気温: {{ weatherInfo.main.temp }}℃</p>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class WeatherInfo extends Vue {
    // 緯度
    latitude = 0;
    // 経度
    longitude = 0;
    // 現在地の気象情報
    weatherInfo: any = null;
    weatherInfoWeatherbit: any = null;

    convertKelvinToCelsius(kelvin: number) {
        return Math.floor(kelvin - 273.15);
    }

    openweathermap_url = "https://api.openweathermap.org/data/2.5/weather";








    getWeatherInfoOpenWeatherMapUsingAxios() {
        // Get the latitude and longitude
        const lat = this.latitude;
        const lon = this.longitude;

        // If the latitude or longitude is zero, don't do anything
        if (lat === 0 || lon === 0) {
            return;
        }

        // Create the URL for the API call
        const url = this.openweathermap_url + `?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_API_KEY}`;

        // Make the API call
        axios.get(url)
            .then((response) => {
                console.log(response);
                this.weatherInfo = response.data;
                console.log(JSON.stringify(this.weatherInfo));
            });
    }








    // 現在地の気象情報を取得する(openweathermap)
    getWeatherInfo_ByOpenWeatherMap() {
        console.log('getWeatherInfo_ByOpenWeatherMap start.');
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
                console.log(JSON.stringify(this.weatherInfo));
            });
    }

    // 現在地の気象情報を取得する(Weatherbit API)
    getWeatherInfo_ByWeatherbit() {
        console.log('getWeatherInfo_ByWeatherbit start.');
        const lat = this.latitude;
        const lon = this.longitude;
        // 緯度・経度が取得できない場合は処理を終了する
        if (lat === 0 || lon === 0) {
            return;
        }
        // 緯度・経度から現在地の気象情報を取得する
        const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.VUE_APP_WEATHERBIT_API_KEY}`;
        fetch(url)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((json) => {
                this.weatherInfoWeatherbit = json.data[0];
                console.log("weatherbit...");
                console.log(JSON.stringify(json));
            });
    }

    // 現在地の気象情報を取得する(Climacell API)
    getWeatherInfo_ByClimacell() {
        console.log('getWeatherInfo_ByClimacell start.');
    }

    // 現在地の気象情報を取得する(WeatherAPI)
    getWeatherInfo_WeatherAPI() {
        console.log('getWeatherInfo_WeatherAPI start.');

    }

    //mountedで現在地の緯度・経度を取得する
    mounted() {
        this.getLocation();
    }

    // q: この関数は何をしているのか？
    // a: 現在日時を取得する
    getTodayStringWithWeek() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const dayOfWeek = today.getDay();
        const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
        return `${year}年${month}月${date}日(${dayOfWeekStr})`;
    }

    // q: この関数は何をしているのか？
    // a: 現在地の緯度・経度を取得する
    getLocation() {
        console.log('getLocation start.');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                console.log(`緯度: ${this.latitude}`);
                console.log(`経度: ${this.longitude}`);
                this.getWeatherInfoOpenWeatherMapUsingAxios();
            },
            (error) => {
                console.log(error);
            }
        );
    }













}
</script>
<style scoped>
.weather-info {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 100%;
    height: 100%;
}

.box1 {
    width: 50%;
    height: 100%;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
}

.box2 {
    width: 50%;
    height: 100%;
    background-color: #a19393;
    border-radius: 10px;
    padding: 10px;
}
</style>
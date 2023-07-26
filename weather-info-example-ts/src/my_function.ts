class MyFunctions {
    // コンストラクタ
    constructor() {
      // 初期化などの処理を行う場合はここに記述
    }
  
    getTodayStringWithWeek() {
        console.log("getTodayStringWithWeek start...");

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const dayOfWeek = today.getDay();
        const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
        return `${year}年${month}月${date}日(${dayOfWeekStr})`;
    }
    
    getDouble(num:number){
        return num * 2;
    }
}
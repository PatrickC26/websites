/* 
 * 溫度感測器 (DHT11)
 * 
 * 本程式將透 Arduino 並利溫、濕度感測器，測量環境溫、濕度
 * This code will measure the temperature and humidty by DHT11 sensor via Arduino
 * 
 * 本範例程式由 樹懶創客 撰寫
 * This example code written by Sloth Maker
 * 
 * 想知道更多資訊，歡迎進入
 * For more information pls visit
 * https://sites.google.com/view/sloth-maker/code-example/dht11
 */

// 匯入 DHT 函式庫
#include <DHT.h>

// 設定並初始化 DHT11 感測器
DHT dht(8, DHT11);

void setup() {
  // 與電腦進行初始化
  // 設定包率9600
  Serial.begin(9600);
  
  // 啟動 DHT 感測器
  dht.begin();
}

void loop() {
  // 讀取濕度
  float h = dht.readHumidity();
  // 讀取攝氏溫度
  float t = dht.readTemperature();
  // 讀取華氏溫度
  float f = dht.readTemperature(true);

  // 判斷是否有數值
  if (isnan(h) || isnan(t) || isnan(f)) {
    // 若沒有數值，則列印無法讀取
    Serial.println("Can't Read From DHT Sensor");
    return;
  }

  // 將數值列印出來
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print("%\t");
  Serial.print("Celsius: ");
  Serial.print(t);
  Serial.print("*C\t");
  Serial.print("Fahrenheit: ");
  Serial.print(f);
  Serial.print("*F\n");

  //延時5秒
  delay(1000);
}

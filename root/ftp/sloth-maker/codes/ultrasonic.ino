/* 
 * 伺服馬達 (servo)
 * 
 * 本程式將透 Arduino 並控制伺服馬達 
 * This code will control servo motor via Arduino
 * 
 * 本範例程式由 樹懶創客 撰寫
 * This example code written by Sloth Maker
 * 
 * 想知道更多資訊，歡迎進入
 * For more information pls visit
 * https://sites.google.com/view/sloth-maker/code-example/servo
 */

// 將超音波感測器的 Echo Pin 接在 2 號腳位上
#define EchoPin 2
// 將超音波感測器的 Trig Pin 接在 3 號腳位上
#define TrigPin 3


void setup() {
  // 與電腦進行初始化
  // 設定包率9600
  Serial.begin(9600);
  // 讓 Arduino 知道 TrigPin 會進行訊號發射
  pinMode(TrigPin, OUTPUT);
  // 讓 Arduino 知道 EchoPin 會進行接收
  pinMode(EchoPin, INPUT);
}

void loop() {
  // 讓超音波感測器發射聲波
  digitalWrite(TrigPin, LOW);
  delay(2);
  digitalWrite(TrigPin, HIGH);
  delay(10);
  digitalWrite(TrigPin, LOW);
  
  // 讀取 Echo Pin 過多久後收到訊號 LOW->HIGH->LOW
  long duration = pulseIn(EchoPin, HIGH); 
  // 將時間換算成距離
  unsigned long distance = duration * 0.034 / 2;
  // 將距離列印出來
  Serial.println(distance);
}

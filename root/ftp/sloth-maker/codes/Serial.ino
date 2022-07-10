/* 
 * 序列通訊 (Serial comm)
 * 
 * 本程式將進行電腦與Arduino之間的通訊
 * This code will do communication 
 *   between your computer and Arduino
 * 
 * 本範例程式由 樹懶創客 撰寫
 * This example code written by Sloth Maker
 * 
 * 想知道更多資訊，歡迎進入
 * For more information pls visit
 * https://sites.google.com/view/sloth-maker/code-example/serial
 */

void setup() {
  // 與電腦進行初始化
  // 設定包率9600
  Serial.begin(9600);

  // 列印 Hello World 至電腦
  Serial.println("Hello world");
}

void loop() {
  // 判斷是否有資料可以收取
  if (Serial.available()){
    // 收取資料
    char inC = Serial.read();
    // 將收到的數值進行列印
    Serial.print(inC);
  }
}

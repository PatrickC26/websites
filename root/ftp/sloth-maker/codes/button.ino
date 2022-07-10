/* 
 * 按鈕 (Button)
 * 
 * 本程式將傳送 Arduino上 按紐的數值到電腦
 * This code will send the data of the button from Arduino to computer
 * 
 * 本範例程式由 樹懶創客 撰寫
 * This example code written by Sloth Maker
 * 
 * 想知道更多資訊，歡迎進入
 * For more information pls visit
 * https://sites.google.com/view/sloth-maker/code-example/button
 */

void setup() {
  // 與電腦進行初始化
  // 設定包率9600
  Serial.begin(9600);

  // 將地2腳位 設定為輸入(INPUT)且上拉(PULLUP)
  pinMode(2,INPUT_PULLUP);
}

void loop() {
  // 將數值讀取，並存在inB中
  bool inB = digitalRead(2);
  
  // 因讀取方式，會造按下為0，不按為1
  //   透過NOT使其 按下為1，不按為0
  // inB = !inB;
  
  // 將inB 列印出來至電腦
  Serial.println(inB);
}

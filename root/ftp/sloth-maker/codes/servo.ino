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


// 匯入 Servo 函式庫
#include <Servo.h>

// 新增伺服馬達名稱
Servo servo;


void setup() {
  // 在2號腳位接上伺服馬達控制線
  servo.attach(2);
  
  // 控制伺服馬達轉動角度
  servo.write(val);
}

void loop() {
  // 沒有程式
  // no code
}

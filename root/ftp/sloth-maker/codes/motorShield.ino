/* 
 * 馬達控制版 (Motor Shield)
 * 
 * 本程式將透 Arduino 外接的馬達控制板，並藉此控制馬達
 * This code will control your motor from Arduino 
 * 
 * 本範例程式由 樹懶創客 撰寫
 * This example code written by Sloth Maker
 * 
 * 想知道更多資訊，歡迎進入
 * For more information pls visit
 * https://sites.google.com/view/sloth-maker/code-example/motorshield
 */

// 加入 1.3" OLED 螢幕
#include <AFMotor.h>
// https://github.com/adafruit/Adafruit-Motor-Shield-library

// 設定
AF_DCMotor motor1(1);


void setup(){
  // 設定馬達轉動速度
  motor1.setSpeed(200);
  // 設定馬達在停止
  motor1.run(RELEASE);
}

void loop(){
  // 設定馬達前進
  motor1.run(FORWARD);
  delay(1000);
  
  // 設定馬達停止
  motor1.run(RELEASE);
  delay(500);

  // 設定馬達後退
  motor1.run(BACKWARD);
  delay(1000);
  
  // 設定馬達停止
  motor1.run(RELEASE);
  delay(500);
  
}

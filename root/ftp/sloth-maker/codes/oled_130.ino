/* 
 * OLED 螢幕 (1.3")
 * 
 * 本程式將透過 Arduino 讓 OLED 螢幕進行顯示
 * This code will show your data on the OLED screen by Arduino
 * 
 * 本範例程式由 樹懶創客 撰寫
 * This example code written by Sloth Maker
 * 
 * 想知道更多資訊，歡迎進入
 * For more information pls visit
 * https://sites.google.com/view/sloth-maker/code-example/oled130
 */

// 加入 1.3" OLED 螢幕
#include <Adafruit_SH1106.h>
// 加入字體
#include <Fonts/FreeSans12pt7b.h>

// 初始化螢幕
Adafruit_SH1106 screen(-1);

const unsigned char slothMaker [] PROGMEM = {
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x1c, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x1c, 0xe0, 0x00, 0x00, 0x30, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x30, 0x30, 0x00, 0x00, 0x40, 0x18, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x60, 
  0x18, 0x00, 0x00, 0xc0, 0x0c, 0x00, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x40, 0xf8, 0x00, 
  0x00, 0x9c, 0x07, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x83, 0x80, 0x00, 0x00, 0xf2, 
  0x00, 0x00, 0xff, 0xe0, 0x00, 0x00, 0x00, 0x1f, 0xc0, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 
  0xff, 0x80, 0x00, 0x00, 0x00, 0x3f, 0xc0, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x03, 0xfe, 0x00, 
  0x00, 0x00, 0x00, 0x7f, 0x80, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x07, 0xfc, 0x00, 0x00, 0x00, 
  0x00, 0x8f, 0x80, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x07, 0xf8, 0x00, 0x00, 0x00, 0x01, 0x87, 
  0x00, 0x03, 0x3c, 0x00, 0x00, 0x03, 0x07, 0xf8, 0xff, 0xff, 0xff, 0xff, 0xff, 0x03, 0xff, 0x81, 
  0xec, 0x00, 0x00, 0x7c, 0x0f, 0xf8, 0x1f, 0xff, 0xff, 0xff, 0xfe, 0x03, 0xff, 0xc0, 0x0c, 0x00, 
  0x00, 0x60, 0x18, 0x08, 0x08, 0x00, 0x00, 0x00, 0x04, 0x06, 0x00, 0x60, 0x08, 0x00, 0x00, 0x20, 
  0x30, 0x08, 0x08, 0x00, 0x00, 0x00, 0x08, 0x04, 0x00, 0x30, 0x10, 0x00, 0x00, 0x18, 0x60, 0x18, 
  0x0c, 0x00, 0x00, 0x00, 0x10, 0x0c, 0x00, 0x18, 0x60, 0x00, 0x00, 0x0f, 0x80, 0x10, 0x0c, 0x00, 
  0x00, 0x00, 0x30, 0x0c, 0x00, 0x07, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x10, 0x0c, 0x00, 0x00, 0x00, 
  0x60, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x06, 0x00, 0x00, 0x00, 0xc0, 0x18, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x06, 0x00, 0x00, 0x00, 0x80, 0x38, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x06, 0x00, 0x00, 0x01, 0x00, 0x30, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x20, 0x07, 0x00, 0x00, 0x02, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x20, 0x07, 0x00, 0x00, 0x06, 0x00, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x60, 
  0x03, 0x00, 0x00, 0x0c, 0x00, 0xa0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x02, 0x80, 
  0x00, 0x18, 0x01, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x02, 0x80, 0x00, 0x10, 
  0x01, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x02, 0x80, 0x00, 0x20, 0x02, 0x40, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x02, 0x40, 0x00, 0x40, 0x02, 0x40, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x02, 0x40, 0x00, 0xc0, 0x04, 0x40, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x80, 0x01, 0x40, 0x01, 0x80, 0x0c, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x80, 0x01, 0x20, 0x03, 0x00, 0x08, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x80, 
  0x01, 0x20, 0x02, 0x00, 0x18, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x30, 
  0x04, 0x00, 0x11, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x10, 0x08, 0x00, 
  0x31, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0xf8, 0x18, 0x00, 0x21, 0x00, 
  0xcf, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x1f, 0xf0, 0x00, 0x42, 0x01, 0x9f, 0x80, 
  0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x20, 0x00, 0x42, 0x03, 0x1e, 0x60, 0x00, 0x00, 
  0x00, 0x00, 0x01, 0x80, 0x00, 0x00, 0x10, 0x00, 0xfe, 0x04, 0x3e, 0x18, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x80, 0x00, 0x00, 0x10, 0x00, 0x87, 0xf8, 0x3c, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 
  0x00, 0x00, 0x10, 0x01, 0x00, 0x30, 0x18, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 
  0x10, 0x03, 0x00, 0x10, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x10, 0x02, 
  0x00, 0x08, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x10, 0x06, 0x00, 0x08, 
  0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x10, 0x04, 0x00, 0x08, 0x00, 0x03, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x10, 0x08, 0x00, 0x04, 0x00, 0xff, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x10, 0x08, 0x00, 0x04, 0x3f, 0xfe, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x0c, 0x00, 0x00, 0x10, 0x10, 0x00, 0x07, 0xff, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 
  0x00, 0x00, 0x10, 0x10, 0x00, 0x03, 0xff, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 
  0x10, 0x20, 0x00, 0x01, 0xff, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x10, 0x60, 
  0x00, 0x00, 0x7f, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x08, 0x40, 0x00, 0x00, 
  0x0f, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x08, 0xc0, 0x00, 0x00, 0x03, 0xf8, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x08, 0x80, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x09, 0x00, 0x00, 0x00, 0x03, 0xf0, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x40, 0x00, 0x09, 0x00, 0x00, 0x01, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x78, 0x00, 0x0a, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xc0, 
  0x0e, 0x00, 0x3f, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7e, 0x0c, 0x0f, 
  0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xff, 0xf8, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
};

const unsigned char logoText [] PROGMEM = {
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x80, 0x00, 
  0x00, 0x00, 0x00, 0x08, 0x00, 0x40, 0x20, 0x1f, 0x80, 0x03, 0x00, 0x00, 0x00, 0x03, 0xf0, 0x00, 
  0x00, 0x60, 0x00, 0x08, 0x00, 0x60, 0x30, 0x3f, 0x80, 0x03, 0x80, 0x0c, 0x00, 0x00, 0xff, 0xc0, 
  0x00, 0x60, 0x60, 0x08, 0x00, 0x60, 0x30, 0x39, 0x80, 0x03, 0xc0, 0x0c, 0x01, 0x1f, 0xff, 0xf0, 
  0x00, 0x60, 0x7c, 0x08, 0x00, 0x60, 0x7e, 0x19, 0x80, 0x06, 0xe0, 0x04, 0x03, 0xff, 0xff, 0xf0, 
  0x00, 0x7c, 0xfc, 0x08, 0x00, 0x60, 0xf8, 0x19, 0x80, 0x0e, 0x70, 0x06, 0x03, 0x1e, 0x00, 0x70, 
  0x01, 0xf9, 0xf0, 0x0f, 0x80, 0x60, 0x30, 0x33, 0x80, 0x0c, 0x3c, 0x06, 0x03, 0x0c, 0x00, 0x70, 
  0x03, 0xe0, 0x60, 0x3f, 0x00, 0x60, 0x30, 0x33, 0x80, 0x1c, 0x18, 0x06, 0x03, 0x1c, 0x38, 0xe0, 
  0x00, 0x60, 0x60, 0xfc, 0x00, 0x60, 0x3f, 0xb3, 0x00, 0x18, 0xc0, 0x06, 0x03, 0x1f, 0xf9, 0xc0, 
  0x00, 0x60, 0x7d, 0xec, 0x00, 0x61, 0xff, 0x80, 0x00, 0x3b, 0xc0, 0x06, 0x02, 0x3f, 0x39, 0x80, 
  0x00, 0xe1, 0xf8, 0x0c, 0x03, 0x79, 0xf3, 0x81, 0x80, 0x70, 0xe0, 0x06, 0x00, 0x78, 0x78, 0x00, 
  0x00, 0xe1, 0xc4, 0x0c, 0x02, 0x7d, 0xf3, 0xef, 0xc0, 0x63, 0xe1, 0x86, 0x00, 0x7c, 0xf0, 0x00, 
  0x00, 0xf0, 0x3c, 0x0c, 0x06, 0x7e, 0xff, 0x60, 0xc0, 0x06, 0x61, 0x86, 0x00, 0x6f, 0xe0, 0x00, 
  0x01, 0xf8, 0xec, 0x4c, 0x06, 0x6e, 0xff, 0x60, 0xc0, 0x05, 0xe1, 0x87, 0x00, 0x0f, 0xc0, 0x00, 
  0x01, 0xe8, 0x8c, 0x6c, 0x06, 0x67, 0xfa, 0x61, 0xc0, 0x07, 0xe0, 0x87, 0x00, 0x07, 0x80, 0x00, 
  0x01, 0x60, 0x9c, 0x2c, 0x06, 0x60, 0x30, 0x7f, 0xc0, 0x06, 0xc0, 0x87, 0x00, 0x07, 0xe0, 0x00, 
  0x03, 0x70, 0xf8, 0x0e, 0x06, 0x60, 0x30, 0x79, 0x80, 0x0c, 0x81, 0x87, 0x00, 0x0f, 0xf8, 0x00, 
  0x03, 0x70, 0xcc, 0x0e, 0x0c, 0x70, 0x7c, 0x63, 0x80, 0x0f, 0x01, 0x87, 0x00, 0x1c, 0x7e, 0x00, 
  0x02, 0x70, 0x8c, 0x0e, 0x0c, 0x70, 0x7e, 0x7d, 0x80, 0x0c, 0x00, 0x07, 0x00, 0x38, 0x1f, 0x80, 
  0x00, 0x70, 0x88, 0x0e, 0x0c, 0x70, 0xfe, 0x71, 0x80, 0x0c, 0x00, 0x07, 0x00, 0xf7, 0xff, 0xe0, 
  0x00, 0x70, 0xc8, 0x0e, 0x04, 0x60, 0xf7, 0x67, 0x00, 0x0c, 0xf0, 0x06, 0x01, 0xe0, 0x7d, 0xf0, 
  0x00, 0x70, 0xca, 0x0e, 0x00, 0x61, 0xf3, 0x5c, 0x00, 0x1f, 0x30, 0x06, 0x07, 0xf0, 0x1c, 0x20, 
  0x00, 0x60, 0xdf, 0x0e, 0x00, 0x61, 0xf2, 0x30, 0x00, 0x1c, 0x30, 0x06, 0x00, 0x30, 0x1c, 0x00, 
  0x00, 0x60, 0x7e, 0x6e, 0x00, 0x61, 0x70, 0x33, 0x00, 0x3c, 0x30, 0x06, 0x00, 0x30, 0x18, 0x00, 
  0x00, 0x60, 0xf8, 0x3c, 0x00, 0x60, 0x70, 0x23, 0x80, 0x34, 0x70, 0x6e, 0x00, 0x30, 0x18, 0x00, 
  0x00, 0x61, 0xc0, 0x3c, 0x00, 0x60, 0x70, 0x61, 0xc0, 0x37, 0xe0, 0x3c, 0x00, 0x30, 0x38, 0x00, 
  0x00, 0x60, 0x00, 0x1c, 0x00, 0x60, 0x60, 0x40, 0x40, 0x27, 0xe0, 0x3c, 0x00, 0x1f, 0xf8, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x00, 0x1f, 0xf0, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xc0, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
};

void setup(){
  // 初始化螢幕
  screen.begin(SH1106_SWITCHCAPVCC, 0x3C);
  // 清除螢幕
  screen.clearDisplay();
  // 設定文字顏色
  screen.setTextColor(WHITE);
}

void loop(){
  // 加入 slothMaker 的圖片 [圖片為 樹懶創客 logo]
  screen.drawBitmap(10, 0, slothMaker, 108, 64, WHITE); // (x,y, img , )
  // 顯示圖片
  screen.display();
  // 讓圖片持續顯示1.5秒
  delay(1500);

  // 清除螢幕
  screen.clearDisplay();
  // 設置字體
  screen.setFont(&FreeSans12pt7b);
  // 設置文字位置
  screen.setCursor(2, 40); // (x,y)
  // 列印文字
  screen.println("Sloth Maker");
  // 顯示圖片
  screen.display();
  // 讓圖片持續顯示1.5秒
  delay(1500);
  
  // 清除螢幕
  screen.clearDisplay();
  // 加入 logoText 的圖片 [圖片為 樹懶創客 字樣]
  screen.drawBitmap(0, 12, logoText, 128, 40, WHITE);
  // 顯示圖片
  screen.display();
  // 讓圖片持續顯示1.5秒
  delay(1500);// 加入 slothMaker 的圖片 [圖片為 樹懶創客 logo]
  screen.drawBitmap(10, 0, slothMaker, 108, 64, WHITE); // (x,y, img , )
  // 顯示圖片
  screen.display();
  // 讓圖片持續顯示1.5秒
  delay(1500);

  // 清除螢幕
  screen.clearDisplay();
  // 設置字體
  screen.setFont(&FreeSans12pt7b);
  // 設置文字位置
  screen.setCursor(2, 40); // (x,y)
  // 列印文字
  screen.println("Sloth Maker");
  // 顯示圖片
  screen.display();
  // 讓圖片持續顯示1.5秒
  delay(1500);
  
  // 清除螢幕
  screen.clearDisplay();
  // 加入 logoText 的圖片 [圖片為 樹懶創客 字樣]
  screen.drawBitmap(0, 12, logoText, 128, 40, WHITE);
  // 顯示圖片
  screen.display();
  // 讓圖片持續顯示1.5秒
  delay(1500);
}
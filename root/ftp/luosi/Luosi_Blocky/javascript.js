
//Serial
Blockly.Arduino.Luosi_serial_begin=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=this.getFieldValue("BOUND_RATE");
  return a+'.begin('+b+');\n';
}

Blockly.Arduino.Luosi_serial_end=function(){
  var a=this.getFieldValue("SERIAL_PORT");
  return a+'.end();\n';
}

Blockly.Arduino.Luosi_serial_print=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return a+'.print(String('+b+'));\n';
}

Blockly.Arduino.Luosi_serial_println=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return a+'.println(String('+b+'));\n';
}

// Blockly.Arduino.Luosi_serial_readString=function(){
//   var a=this.getFieldValue("SERIAL_PORT"),
//       c=Blockly.Arduino.statementToCode(this,"STATEMENT");
//   Blockly.Arduino.definitions_.define_Luosi_serial_invoke='String Luosi_serialStr="";';
//   var returnStr='if ('+a+'.available()) {\n  Luosi_serialStr = "";\n  while ('+a+'.available()) {\n    char tempChar='+a+'.read();\n    if (tempChar!=\'\\n\'&& tempChar!=\'\\r\')\n      Luosi_serialStr+=String(tempChar);\n    delay(1);\n  }\n'+c+'}\n'
//   return returnStr;
// }

Blockly.Arduino.Luosi_serial_readuntil=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return a+'.readStringUntil('+b+');\n';
}

Blockly.Arduino.Luosi_serial_readInt=function(){
  var a=this.getFieldValue("SERIAL_PORT");
  return a+'.parseInt();\n';
}

Blockly.Arduino.Luosi_serial_readChar=function(){
  var a=this.getFieldValue("SERIAL_PORT");
  return a+'.read();\n';
}

// Blockly.Arduino.Luosi_serial_read_result=function(){
//   return['Luosi_serialStr',Blockly.Arduino.ORDER_ATOMIC];
// }


//Basic
Blockly.Arduino.Luosi_basic_D1_pins=function(){
  return this.getFieldValue("D1_PIN");
};

Blockly.Arduino.Luosi_basic_sonar_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"TRIG_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"ECHO_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);

  Blockly.Arduino.definitions_.define_Luosi_sonar_include="#include <Ultrasonic.h>";
  Blockly.Arduino.definitions_['define_Luosi_sonar_invoke']='Ultrasonic Luosi_sonic('+a+', '+b+');';
  return'';
};

Blockly.Arduino.Luosi_basic_sonar=function(){
  return'Luosi_sonic.convert(Luosi_sonic.timing(), Ultrasonic::CM)';
};

Blockly.Arduino.Luosi_basic_dht11=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("DHT11_TYPE"),
      myType='';
  if (b=='temperature')
    myType='readTemperature';
  else if (b=='humidity')
    myType='readHumidity';
  Blockly.Arduino.definitions_['define_dht_']="#include <DHT_mini.h>";
  Blockly.Arduino.definitions_['define_dht_set_'+a]="DHT Luosi_dht11_p"+a+"("+a+", DHT11);";
  Blockly.Arduino.setups_['setup_dht_'+a]="Luosi_dht11_p"+a+".begin();";
  return["Luosi_dht11_p"+a+"."+myType+"()",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Luosi_basic_servo=function(){
  var a=Blockly.Arduino.valueToCode(this,"attach_Pin",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Angle",Blockly.Arduino.ORDER_ATOMIC)||"";

    Blockly.Arduino.definitions_.define_Luosi_servo_include="#include <Servo.h>";
    Blockly.Arduino.definitions_['Luosi_servo']="Servo Luosi_servo;";
    Blockly.Arduino.setups_['Luosi_servo']="Luosi_servo.attach("+a+");";
  return'Luosi_servo.write(' + b + ');\n';
};

Blockly.Arduino.Luosi_basic_RFID=function(){
  var a=Blockly.Arduino.valueToCode(this,"SS_Pin",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"RST_Pin",Blockly.Arduino.ORDER_ATOMIC)||"";

    Blockly.Arduino.definitions_.define_Luosi_RFID_include="#include <SPI.h>\n#include <MFRC522.h>";
    Blockly.Arduino.definitions_['Luosi_RFID']='MFRC522 Luosi_RFID(/*SS_PIN*/ ' + a + ', /*RST_PIN*/ ' + b + ');\nString Luosi_RFID_readID()\n{\nString ret;\nif (Luosi_RFID.PICC_IsNewCardPresent() && Luosi_RFID.PICC_ReadCardSerial())\n{\nMFRC522::PICC_Type piccType = Luosi_RFID.PICC_GetType(Luosi_RFID.uid.sak);\n\nfor (byte i = 0; i < Luosi_RFID.uid.size; i++) {\nret += (Luosi_RFID.uid.uidByte[i] < 0x10 ? "0" : "");\nret += String(Luosi_RFID.uid.uidByte[i], HEX);\n}\n}\nrfid.PICC_HaltA();\nrfid.PCD_StopCrypto1();\nreturn ret;\n}';
    Blockly.Arduino.setups_['Luosi_RFID']='SPI.begin();\n  Luosi_RFID.PCD_Init();'

  return'Luosi_RFID_readID()';
};


//L293D
Blockly.Arduino.Luosi_AFM_run=function(){
  var a=this.getFieldValue("MOTOR"),
      b=this.getFieldValue("DIR"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";

    Blockly.Arduino.definitions_["Luosi_AFM"]='#define Luosi_Latch_MOTOR2_A 1\n#define Luosi_Latch_MOTOR2_B 4\n#define Luosi_Latch_MOTOR4_A 0\n#define Luosi_Latch_MOTOR4_B 6\n#define FORWARD 1\n#define BACKWARD 2\n#define BRAKE 3\n#define RELEASE 4\n#define Luosi_Latch_Latch_PIN 12\n#define Luosi_Latch_CLK_PIN 4\n#define Luosi_Latch_EN_PIN 13\n#define Luosi_Latch_DATA_PIN 0\nstatic uint8_t Luosi_Latch_State =0;\n#define Luosi_Motor2_pin 5\n#define Luosi_Motor4_pin 14\n\nvoid Luosi_AFM_setup() {\n  pinMode(Luosi_Latch_Latch_PIN, OUTPUT);\n  pinMode(Luosi_Latch_EN_PIN, OUTPUT);\n  pinMode(Luosi_Latch_DATA_PIN, OUTPUT);\n  pinMode(Luosi_Latch_CLK_PIN, OUTPUT);\n  digitalWrite(Luosi_Latch_EN_PIN, LOW);\n  pinMode(Luosi_Motor2_pin, OUTPUT); \n  pinMode(Luosi_Motor4_pin, OUTPUT); \n}\nvoid Luosi_AFM_setDirection(uint8_t Luosi_AFM_setDirection_motorNum, uint8_t Luosi_Luosi_AFM_setDirection_CMD) {\n  uint8_t a, b;\n  if (Luosi_AFM_setDirection_motorNum == 2){a = Luosi_Latch_MOTOR2_A; b = Luosi_Latch_MOTOR2_B;}\n  if (Luosi_AFM_setDirection_motorNum == 4){a = Luosi_Latch_MOTOR4_A; b = Luosi_Latch_MOTOR4_B;}\n  switch (Luosi_Luosi_AFM_setDirection_CMD) {\n    case FORWARD:\n      Luosi_Latch_State |= _BV(a);\n      Luosi_Latch_State &= ~_BV(b); \n      break;\n    case BACKWARD:\n      Luosi_Latch_State &= ~_BV(a);\n      Luosi_Latch_State |= _BV(b);\n      break;\n    case RELEASE:\n      Luosi_Latch_State &= ~_BV(a);\n      Luosi_Latch_State &= ~_BV(b); \n      break;\n  }\n  digitalWrite(Luosi_Latch_Latch_PIN, LOW);\n  digitalWrite(Luosi_Latch_DATA_PIN, LOW);\n  for (uint8_t i=0; i<8; i++) {\n    digitalWrite(Luosi_Latch_CLK_PIN, LOW);\n    if (Luosi_Latch_State & _BV(7-i)) digitalWrite(Luosi_Latch_DATA_PIN, HIGH);\n    else digitalWrite(Luosi_Latch_DATA_PIN, LOW);\n    digitalWrite(Luosi_Latch_CLK_PIN, HIGH);\n  }\n  digitalWrite(Luosi_Latch_Latch_PIN, HIGH);\n}\nvoid Luosi_AFM_setSpeed(uint8_t Luosi_AFM_setDirection_motorNum, uint8_t speed) {\n  if (Luosi_AFM_setDirection_motorNum == 2) analogWrite(Luosi_Motor2_pin, speed);\n  else if (Luosi_AFM_setDirection_motorNum == 4) analogWrite(Luosi_Motor4_pin, speed);\n}';
    Blockly.Arduino.setups_['Luosi_AFM']='  Luosi_AFM_setup();';
    return '  Luosi_AFM_setDirection('+ a +', '+ b +');\n  Luosi_AFM_setSpeed('+ a +', '+ c +');\n';
}

Blockly.Arduino.Luosi_AFM_stop=function(){
  var a=this.getFieldValue("MOTOR");
	return 'Luosi_AFM_setDirection('+a+', RELEASE);\n';
}


// internet
Blockly.Arduino.Luosi_Wifi_connect=function(){
  var a=Blockly.Arduino.valueToCode(this,"Luosi_WiFi_SSID",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Luosi_WiFi_PSWD",Blockly.Arduino.ORDER_ATOMIC)||"";

    Blockly.Arduino.definitions_.define_Luosi_WiFi_include="#include <ESP8266WiFi.h>";
    Blockly.Arduino.definitions_['Luosi_WiFi']='#define wifi_SSID '+a+' \n#define wifi_PSWD '+b;
    return 'WiFi.begin(wifi_SSID, wifi_PSWD);\nwhile (WiFi.status() != WL_CONNECTED) {delay(500);Serial.print(".");}\nSerial.print("\\n\\nConnected! IP address: ");\nSerial.println(WiFi.localIP());\n';
};

Blockly.Arduino.Luosi_line_Init=function(){
  var a=Blockly.Arduino.valueToCode(this,"TOKEN",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"ID",Blockly.Arduino.ORDER_ATOMIC)||"";

  Blockly.Arduino.definitions_.define_Luosi_line_include="#include <WiFiClientSecure.h>";
  Blockly.Arduino.definitions_.define_Luosi_line_token='String Luosi_line_token ="";\nString Luosi_line_ID = "";';
  Blockly.Arduino.definitions_.define_Luosi_line_invoke='void Luosi_line_sendMsg(String myMsg) {\n  static WiFiClientSecure line_client;\n  line_client.setInsecure();\n  myMsg="{\\"to\\":\\""+Luosi_line_ID+"\\",\\"messages\\":[{\\"type\\":\\"text\\",\\"text\\":\\""+myMsg+"\\"}]}";\n  Serial.println(myMsg);\n  if (line_client.connect("api.line.me", 443)) {\n    line_client.println("POST /v2/bot/message/push HTTP/1.1");\n    line_client.println("Connection: close");\n    line_client.println("Host: api.line.me");\n    line_client.println("Authorization: Bearer " + Luosi_line_token);\n    line_client.println("Content-Type: application/json; charset=utf-8");\n    line_client.println("Content-Length: " + String(myMsg.length()));\n    line_client.println();\n    line_client.println(myMsg);\n    line_client.println();\n    line_client.stop();\n    Serial.println("Line Bot push success");\n  }\n  else {\n    Serial.println("Line Bot push failed");\n  }\n}\n';

  return'Luosi_line_token ='+a+';\nLuosi_line_ID = '+b+';\n';
};

Blockly.Arduino.Luosi_line_sendMsg=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'Luosi_line_sendMsg('+a+');\n';
};

Blockly.Arduino.Luosi_HTTP_get=function(){
  var a=Blockly.Arduino.valueToCode(this,"Luosi_HTTP_get_url",Blockly.Arduino.ORDER_ATOMIC)||"";

    Blockly.Arduino.definitions_.define_Luosi_HTTP="#include <ESP8266HTTPClient.h>\n#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_['Luosi_HTTP']='WiFiClientSecure Luosi_client_secure; \nHTTPClient Luosi_Internet_https;';
    Blockly.Arduino.definitions_['Luosi_HTTP_get']='String Luosi_HTTP_get(String Luosi_url){\n  String Luosi_output = "";\n  if (Luosi_Internet_https.begin(Luosi_client_secure, Luosi_url)) {\n    int httpCode = Luosi_Internet_https.GET(); \n    Serial.println("HTTP Get Response code: " + String(httpCode));\n    if (httpCode > 0) Luosi_output = Luosi_Internet_https.getString();\n    Luosi_Internet_https.end();\n  } else Serial.printf("[HTTPS] Unable to connect");\n  return Luosi_output;\n}';
    Blockly.Arduino.setups_['Luosi_HTTP']='  Luosi_client_secure.setInsecure();';
    return'Luosi_HTTP_get('+a+')';
};

Blockly.Arduino.Luosi_HTTP_put=function(){
  var a=Blockly.Arduino.valueToCode(this,"Luosi_HTTP_put_url",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Luosi_HTTP_put_data",Blockly.Arduino.ORDER_ATOMIC)||"";

    Blockly.Arduino.definitions_.define_Luosi_HTTP="#include <ESP8266HTTPClient.h>\n#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_['Luosi_HTTP']='WiFiClientSecure Luosi_client_secure; \nHTTPClient Luosi_Internet_https;';
    Blockly.Arduino.definitions_['Luosi_HTTP_put']='void Luosi_HTTP_put(String Luosi_url, String Luosi_HTTP_upload_txt){\n  if (Luosi_Internet_https.begin(Luosi_client_secure, Luosi_url)) {\n    int httpCode = Luosi_Internet_https.PUT(Luosi_HTTP_upload_txt);\n    Serial.println("HTTP Put Response code: " + String(httpCode));\n    Luosi_Internet_https.end();\n  } else Serial.printf("[HTTPS] Unable to connect");\n}';
    Blockly.Arduino.setups_['Luosi_HTTP']='  Luosi_client_secure.setInsecure();';
    return'Luosi_HTTP_put('+a+', '+b+');';
};
//thingspeak
Blockly.Arduino.Luosi_things_get_url=function(){
  Blockly.Arduino.definitions_.define_thingspeak_invoke="int thingSpeakRec=0;";
  Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
  Blockly.Arduino.definitions_.define_thingspeak_event='\nvoid invokeThingSpeak(const String& key, const String& p1, const String& p2, const String& p3, const String& p4, const String& p5, const String& p6, const String& p7, const String& p8)\n{\n  static HTTPClient client;\n  client.begin("http://api.thingspeak.com/update");\n  client.addHeader("Content-Type", "application/json");\n  const String payload = String() + "{\\"api_key\\":\\"" + key\n                        + "\\",\\"field1\\":\\"" + p1\n                        + "\\",\\"field2\\":\\"" + p2\n                        + "\\",\\"field3\\":\\"" + p3\n                        + "\\",\\"field4\\":\\"" + p4\n                        + "\\",\\"field5\\":\\"" + p5\n                        + "\\",\\"field6\\":\\"" + p6\n                        + "\\",\\"field7\\":\\"" + p7\n                        + "\\",\\"field8\\":\\"" + p8\n                        + "\\"}";\n  int postCode=client.POST(payload);\n  if (postCode==200)\n    thingSpeakRec=client.getString().toInt();\n  else\n    thingSpeakRec=0;\n  client.end();\n}\n';

  var a=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||'"---"',
    	b=Blockly.Arduino.valueToCode(this,"FIELD1",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	c=Blockly.Arduino.valueToCode(this,"FIELD2",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	d=Blockly.Arduino.valueToCode(this,"FIELD3",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	e=Blockly.Arduino.valueToCode(this,"FIELD4",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	f=Blockly.Arduino.valueToCode(this,"FIELD5",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	g=Blockly.Arduino.valueToCode(this,"FIELD6",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	h=Blockly.Arduino.valueToCode(this,"FIELD7",Blockly.Arduino.ORDER_ATOMIC)||"0",
    	i=Blockly.Arduino.valueToCode(this,"FIELD8",Blockly.Arduino.ORDER_ATOMIC)||"0";

	return"invokeThingSpeak("+[a,"String("+b+")","String("+c+")","String("+d+")","String("+e+")","String("+f+")","String("+g+")","String("+h+")","String("+i+")"].join(", ")+");\n"
};

Blockly.Arduino.Luosi_things_get_rec=function(){
  return['thingSpeakRec',Blockly.Arduino.ORDER_ATOMIC];
}


//----------------------------------------
setTimeout(function(){
	if (Blockly.Blocks.board_initializes_setup)
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_initializes_setup" id="0" x="100" y="50">         <next><block type="initializes_loop" id="1"></block></next></block></xml>');
	else
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="initializes_setup" id="0" x="100" y="50"><next><block type="initializes_loop" id="1"></block></next></block></xml>');

	Blockly.mainWorkspace.clear();
	Blockly.Xml.domToWorkspace(xmlDoc, Blockly.mainWorkspace);
}, 3000);

// Serial
Blockly.Blocks.Luosi_serial_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE)
      .appendField(Blockly.Msg.Luosi.Serial_INIT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_BAUDRATE)
      .appendField(new Blockly.FieldDropdown([["4800","4800"],["9600","9600"],["19200","19200"],["38400","38400"],["57600","57600"],["115200","115200"],["230400","230400"]]),"BOUND_RATE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};

Blockly.Blocks.Luosi_serial_end={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT")
      .appendField(Blockly.Msg.Luosi.Serial_END);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};

Blockly.Blocks.Luosi_serial_print={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendValueInput("TEXT")
      .appendField(Blockly.Msg.Luosi.Serial_PRINT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};

Blockly.Blocks.Luosi_serial_println={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendValueInput("TEXT")
      .appendField(Blockly.Msg.Luosi.Serial_PRINTLN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};

Blockly.Blocks.Luosi_serial_readString={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT")
      .appendField(Blockly.Msg.Luosi.Serial_READ_STRING);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};

Blockly.Blocks.Luosi_serial_readuntil={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.Luosi.Serial_READUNTIL);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};

Blockly.Blocks.Luosi_serial_read_result={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Serial_HELPURL);
  this.setColour(290);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Serial_TITLE)
      .appendField(Blockly.Msg.Luosi.Serial_READ_RESULT);
  this.setOutput(!0,"String")
  this.setTooltip(Blockly.Msg.Luosi.Serial_TOOLTIP)
}};


// Basic
Blockly.Blocks.Luosi_basic_D1_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Basic_HELPURL);
  this.setColour(230);
  this.appendDummyInput()
      .appendField("D1 Pin")
      .appendField(new Blockly.FieldDropdown([["D2","16"],["D3","5"],["D4","4"],["D5","14"],["D6","12"],["D7","13"],["D8","0"],["D9","2"],["D10","15"],]),"D1_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.Luosi.Basic_TOOLTIP)
}};

Blockly.Blocks.Luosi_basic_sonar_init={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Basic_HELPURL);
  this.setColour(157);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Basic_SONAR)
      .appendField(Blockly.Msg.Luosi.Basic_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("sonar"), "varName");
  this.appendValueInput("TRIG_PIN")
      .setCheck("Number")
      .appendField("Trig "+Blockly.Msg.Luosi.Basic_PIN);
  this.appendValueInput("ECHO_PIN")
      .setCheck("Number")
      .appendField("Echo "+Blockly.Msg.Luosi.Basic_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.Luosi.Basic_TOOLTIP)
}};

Blockly.Blocks.Luosi_basic_sonar={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Basic_HELPURL);
  this.setColour(157);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Basic_SONAR)
      .appendField(Blockly.Msg.Luosi.Basic_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("sonar"), "varName")
      .appendField(Blockly.Msg.Luosi.Basic_SONAR_DISTANCE);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.Luosi.Basic_TOOLTIP)
}};

Blockly.Blocks.Luosi_basic_dht11={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Basic_HELPURL);
  this.setColour(320);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.Basic_DHT11)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.Luosi.Basic_DHT11_MODE),"DHT11_TYPE");
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.Luosi.Basic_PIN);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.Luosi.Basic_TOOLTIP)
}};

Blockly.Blocks.Luosi_basic_servo={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Basic_HELPURL);
  this.setColour(230);
  this.appendDummyInput()
      .appendField("Servo Write");
  this.appendValueInput("attach_Pin")
      .setCheck("Number")
      .appendField("attach_Pin");
  this.appendValueInput("Angle")
      .setCheck("Number")
      .appendField("Angle");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Basic_TOOLTIP)
}};

Blockly.Blocks.Luosi_basic_RFID={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Basic_HELPURL);
  this.setColour(230);
  this.appendDummyInput()
      .appendField("RFID");
  this.appendValueInput("SS_Pin")
      .setCheck("Number")
      .appendField("SS_Pin");
  this.appendValueInput("RST_Pin")
      .setCheck("Number")
      .appendField("RST_Pin");
  this.setOutput(!0,"TEXT");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.Luosi.Basic_TOOLTIP)
}};


// L293D
Blockly.Blocks.Luosi_AFM_run={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.AFM_HELPURL);
  this.setColour(340);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.AFM_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.AFM_MOTOR)
      .appendField(new Blockly.FieldDropdown([["M2","2"],["M4","4"]]),"MOTOR");
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.Luosi.AFM_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.Luosi.AFM_MOVE_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.AFM_TOOLTIP)
}};

Blockly.Blocks.Luosi_AFM_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.AFM_HELPURL);
  this.setColour(340);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.AFM_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.Luosi.AFM_MOTOR)
      .appendField(new Blockly.FieldDropdown([["M2","2"],["M4","4"]]),"MOTOR")
      .appendField(Blockly.Msg.Luosi.AFM_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.AFM_TOOLTIP)
}};


// internet
Blockly.Blocks.Luosi_Wifi_connect={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_HELPURL);
  this.setColour(30);
  this.appendDummyInput()
      .appendField("Connect to WiFi");
  this.appendValueInput("Luosi_WiFi_SSID")
      .setCheck("String")
      .appendField("     WiFi SSID");
  this.appendValueInput("Luosi_WiFi_PSWD")
      .setCheck("String")
      .appendField("     WiFi PSWD");
//  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};

Blockly.Blocks.Luosi_line_Init={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_HELPURL);
  this.setColour(120);
  this.appendDummyInput()
      .appendField("Line Bot")
      .appendField(Blockly.Msg.Luosi.LINE_SETUP);
  this.appendValueInput("ID")
      .setCheck("String")
      .appendField("user ID");
  this.appendValueInput("TOKEN")
      .setCheck("String")
      .appendField(Blockly.Msg.Luosi.LINE_TOKEN);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};

Blockly.Blocks.Luosi_line_sendMsg={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_TOOLTIP);
  this.setColour(120);
  this.appendDummyInput()
      .appendField("Line Bot");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.Luosi.LINE_SEND_MSG);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};

Blockly.Blocks.Luosi_HTTP_get={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_TOOLTIP);
  this.setColour(40);
  this.appendDummyInput()
      .appendField("HTTP Get");
  this.appendValueInput("Luosi_HTTP_get_url")
      .setCheck("String")
      .appendField("     URL");
  this.setOutput(!0,"Text");
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};

Blockly.Blocks.Luosi_HTTP_put={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_TOOLTIP);
  this.setColour(40);
  this.appendDummyInput()
      .appendField("HTTP Put");
  this.appendValueInput("Luosi_HTTP_put_url")
      .setCheck("String")
      .appendField("     URL");
  this.appendValueInput("Luosi_HTTP_put_data")
      .setCheck("String")
      .appendField("     Data");
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};

//ThingSpeak
Blockly.Blocks.Luosi_things_get_url={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_TOOLTIP);
  this.setColour(100);
  this.appendDummyInput().appendField(Blockly.Msg.Luosi.THINGSPSEAK_GET_URL_TITLE);
  this.appendValueInput("KEY")
      .setCheck("String")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.Luosi.THINGSPSEAK_KEY);
  this.appendValueInput("FIELD1").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD1);
  this.appendValueInput("FIELD2").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD2);
  this.appendValueInput("FIELD3").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD3);
  this.appendValueInput("FIELD4").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD4);
  this.appendValueInput("FIELD5").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD5);
  this.appendValueInput("FIELD6").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD6);
  this.appendValueInput("FIELD7").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD7);
  this.appendValueInput("FIELD8").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Luosi.THINGSPSEAK_FIELD8);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};

Blockly.Blocks.Luosi_things_get_rec={init:function(){
  this.setHelpUrl(Blockly.Msg.Luosi.Internet_TOOLTIP);
  this.setColour(100);
  this.appendDummyInput().appendField(Blockly.Msg.Luosi.THINGSPSEAK_GET_REC_TITLE);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.Luosi.Internet_TOOLTIP)
}};Blockly.Msg.Luosi.LINE_SETUP

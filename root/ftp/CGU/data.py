import json

# location = "/home/pi/Desktop/project/database/"
location = "/Users/slothsmba/Desktop/CGU_project/project/database/"

errString_1 = "ERROR(1) : Due to value too large or too small"
errString_2 = "ERROR(2) : No ID found\nGenerated a new ID for this value"
errString_3 = "ERROR(3) : Data Type mismatch"
errString_4 = "ERROR(4) : "


class getData:
    def __getD(id, dataB):
        allDataOrigional_Control = "{\"A\":\"999\",\"T\":\"0\",\"[\":\"\",\"Q\":\"0\",\"P\":\"0\"}"
        allDataOrigional_Float = "{\"B\":\"0\",\"C\":\"0\",\"F\":\"0\",\"G\":\"0\",\"H\":\"0\",\"I\":\"0\",\"J\":\"0\",\"K\":\"0\",\"L\":\"0\",\"N\":\"0\",\"O\":\"\",\"R\":\"0\",\"S\":\"0\",\"U\":\"0\",\"V\":\"0\",\"W\":\"0\",\"X\":\"0\",\"D\":\"0\",\"E\":\"0\",\"]\":\"0\"}"
        allDataOrigional_String = "{\"C\":\"\",\"M\":\"0.0,0.0\",\"O\":\"\",\"Y\":\"\",\"^\":\"0,C,01\"}"
        allDataOrigional = ""

        if dataB == "FLoat":
            allDataOrigional = allDataOrigional_Float
        elif dataB == "String":
            allDataOrigional = allDataOrigional_String
        elif dataB == "Control":
            allDataOrigional = allDataOrigional_Control

        with open(location + dataB + "_database.json") as inputfile:
            if not ("{" in inputfile.read()):
                with open(location + dataB + "_database.json", "w") as outputfile:
                    outputfile.write(allDataOrigional)
                data = json.load(allDataOrigional)
                return data[id]
            else:
                data = json.load(inputfile)
                return data[id]

    def getFloatData(id):
        return getData.__getD(id, "Float")

    def getStringData(id):
        return getData.__getD(id, "String")

    def getControlData(id):
        return getData.__getD(id, "Control")


class putData:
    def __putD(id, newdata, dataB):
        allDataOrigional_Control = "{\"A\":\"999\",\"T\":\"0\",\"[\":\"\",\"Q\":\"0\",\"P\":\"0\"}"
        allDataOrigional_Float = "{\"B\":\"0\",\"C\":\"0\",\"F\":\"0\",\"G\":\"0\",\"H\":\"0\",\"I\":\"0\",\"J\":\"0\",\"K\":\"0\",\"L\":\"0\",\"N\":\"0\",\"O\":\"\",\"R\":\"0\",\"S\":\"0\",\"U\":\"0\",\"V\":\"0\",\"W\":\"0\",\"X\":\"0\",\"D\":\"0\",\"E\":\"0\",\"]\":\"0\"}"
        allDataOrigional_String = "{\"C\":\"\",\"M\":\"0.0,0.0\",\"O\":\"\",\"Y\":\"\",\"^\":\"0,C,01\"}"
        allDataOrigional = ""

        if dataB == "FLoat" :
            allDataOrigional = allDataOrigional_Float
        elif dataB == "String" :
            allDataOrigional = allDataOrigional_String
        elif dataB == "Control" :
            allDataOrigional = allDataOrigional_Control

        try:
            with open(location + dataB + "_database.json") as inputfile:
                data = inputfile.read()
                if not ("{" in data):
                    data = allDataOrigional
                idIndex = data.index("\"" + id + "\":\"") + len("\"" + id + "\":\"")
                dataF = data[0: idIndex]
                data = data[idIndex: len(data)]
                data = data[data.index("\""): len(data)]
                data = dataF + newdata + data
            with open(location + dataB + "_database.json", "w") as outputfile:
                outputfile.write(data)
                return True
        except Exception as e:
            if "substring not found" in str(e):
                print(errString_2)
                with open(location + dataB + "_database.json") as inputfileE:
                    data = inputfileE.read()
                    data = data[0:-1] + ",\"" + id + "\":\"" + newdata + "\"}"
                with open(location + dataB + "_database.json", "w") as outputfileE:
                    outputfileE.write(data)
                    return True
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return False

    def putFloatData(id, newdata):
        return putData.__putD(id, newdata, "Float")

    def putStringData(id, newdata):
        return putData.__putD(id, newdata, "String")

    def putControlData(id, newdata):
        return putData.__putD(id, newdata, "Control")


class motor:
    def getThrottle(self):
        try:
            return int(getData.getFloatData("B"))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setThrottle(0)
                return self.__class__().getThrottle()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return -1

    def getBrakeValue(self):
        try:
            return int(getData.getControlData("A"))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setBrakeValue(999)
                return self.__class__().getBrakeValue()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return -1

    # ------------ set void ------------------

    def setThrottle(self, value: int):
        if "int" not in str(value.__class__):
            print(errString_3)
            return False
        value = int(value)
        if (value < -100) | (value > 100):
            print(errString_1)
            return False
        return putData.putFloatData("B", str(value))

    def setBrakeValue(self, value: int):
        if "int" not in str(value.__class__):
            print(errString_3)
            return False
        value = int(value)
        if ((value < 0) | (value > 10)) & (value != 999):
            print(errString_1)
            return False
        return putData.putControlData("A", str(value))


class distance:
    def __getDistance(self, id: str):
        try:
            return float(getData.getFloatData(id))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().__setDistance(id, 0.0)
                return float(getData.getFloatData(id))
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return -1.0

    def __setDistance(self, id: str, value: float):
        if "float" not in str(value.__class__):
            print(errString_3)
            return False
        value = float(value)
        if id == "F":
            if (value > 600.0) | (value < 0.0):
                print(errString_1)
                return False
        elif (value > 300.0) | (value < 0.0):
            print(errString_1)
            return False
        return putData.putFloatData(id, str(value))

    # get Method

    def getFrontLeft_outer(self):
        return self.__class__().__getDistance("D")

    def getFrontLeft_inner(self):
        return self.__class__().__getDistance("E")

    def getFrontCenter(self):
        return self.__class__().__getDistance("F")

    def getFrontRight_outer(self):
        return self.__class__().__getDistance("H")

    def getFrontRight_inner(self):
        return self.__class__().__getDistance("G")

    def getBackLeft(self):
        return self.__class__().__getDistance("I")

    def getBackRight(self):
        return self.__class__().__getDistance("J")

    def getBackCenter(self):
        return self.__class__().__getDistance("K")

    # ------------ set void ------------------

    def setFrontLeft_outer(self, value: float):
        return self.__class__().__setDistance("D", value)

    def setFrontLeft_inner(self, value: float):
        return self.__class__().__setDistance("E", value)

    def setFrontCenter(self, value: float):
        return self.__class__().__setDistance("F", value)

    def setFrontRight_outer(self, value: float):
        return self.__class__().__setDistance("H", value)

    def setFrontRight_inner(self, value: float):
        return self.__class__().__setDistance("G", value)

    def setBackLeft(self, value: float):
        return self.__class__().__setDistance("I", value)

    def setBackRight(self, value: float):
        return self.__class__().__setDistance("J", value)

    def setBackCenter(self, value: float):
        return self.__class__().__setDistance("K", value)


class speed:
    def getSpeed(self):
        try:
            return float(getData.getFloatData("L"))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setSpeed(0.0)
                return self.__class__().getSpeed()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return -1.0

    def setSpeed(self, value: float):
        if "float" not in str(value.__class__):
            print(errString_3)
            return False
        value = float(value)
        if (value > 50.0) | (value < 0.0):
            print(errString_1)
            return False
        return putData.putFloatData("L", str(value))


class outer:
    def getInternetCheck(self):
        try:
            result = getData.getFloatData("]")
            if result == "1":
                return True
            elif result == "0":
                return False
            else:
                self.__class__().setInternetCheck(False)
                return False
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setInternetCheck(False)
                return self.__class__().getInternetCheck()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return False

    def getSystemTime(self):
        try:
            return getData.getStringData("Y")
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setSystemTime("0-0-0 0:0:0")
                return self.__class__().getWarning()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return ""

    def getPhoneNumber(self):
        try:
            return getData.getStringData("C")
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setPhoneNumber("")
                return self.__class__().getPhoneNumber()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return ""

    def getNote(self):
        try:
            return getData.getStringData("O")
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setNote("")
                return self.__class__().getNote()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return ""

    def getWeather(self):
        try:
            return getData.getStringData("^")
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setWeather("")
                return self.__class__().getWeather()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return ""

    def getWarning(self):
        try:
            return getData.getControlData("[")
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setWarning("")
                return self.__class__().getWarning()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return ""

    # ------ put Data ------

    def setInternetCheck(self, value: bool):
        if not "bool" in str(value.__class__):
            print(errString_3)
            return False
        if value:
            return putData.putFloatData("]", "1")
        elif not value:
            return putData.putFloatData("]", "0")

    def setSystemTime(self, value: str):
        if not ((value.count("-") == 2) & (value.count(":") == 2)):
            print(errString_3)
            return False

        return putData.putStringData("Y", str(value))

    def setPhoneNumber(self, value: str):
        return putData.putStringData("C", str(value))

    def setNote(self, value: str):
        return putData.putStringData("O", str(value))

    def setWeather(self, value: str):
        if value == "":
            return putData.putStringData("^", str(value))
        if not (value.count(",") == 2):
            print(errString_3)
            return False
        return putData.putStringData("^", str(value))

    def setWarning(self, value: str):
        return putData.putControlData("[", str(value))


class direction:
    def getFrontGyro(self):
        try:
            return float(getData.getFloatData("R"))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setFrontGyro(0.0)
                return self.__class__().getFrontGyro()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return 0.0

    def getRotation(self):
        return float(self.__class__.getBackGyro(self)) - float(self.__class__.getFrontGyro(self))

    def getDirectionLight(self):
        try:
            return int(getData.getControlData("T"))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setDirectionLight(0)
                return self.__class__().getDirectionLight()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return 0

    def getBackGyro(self):
        try:
            return float(getData.getFloatData("S"))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setBackGyro(0.0)
                return self.__class__().getBackGyro()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return 0.0

    def setFrontGyro(self, value: float):
        if "float" not in str(value.__class__):
            print(errString_3)
            return False
        return putData.putFloatData("R", str(value))

    DIRECTION_LEFT_ON = 1
    DIRECTION_LEFT_OFF = 2
    DIRECTION_RIGHT_ON = 3
    DIRECTION_RIGHT_OFF = 4
    DIRECTION_BRAKE_ON = 5
    DIRECTION_BRAKE_OFF = 6

    def setDirectionLight(self, value: int):
        if "int" not in str(value.__class__):
            print(errString_3)
            return False
        if (value > 6) | (value < 0):
            print(errString_1)
            return False
        return putData.putControlData("T", str(value))

    def setBackGyro(self, value: float):
        if "float" not in str(value.__class__):
            print(errString_3)
            return False
        return putData.putFloatData("S", str(value))


class temperature:
    def __getFloatData(self, id: str):
        try:
            return float(getData.getFloatData(id))
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().__setFloatData(id, 0.0)
                return float(getData.getFloatData(id))
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return -1.0

    def __setFloatData(self, id: str, value: float):
        if "float" not in str(value.__class__):
            print(errString_3)
            return False
        value = float(value)
        if (value > 100.0) | (value < 0.0):
            print(errString_1)
            return False
        return putData.putFloatData(id, str(value))

    def getAirHumidty(self):
        return self.__class__().__getFloatData("N")

    def getAirTemperature(self):
        return self.__class__().__getFloatData("U")

    def getMotorTemperature(self):
        return self.__class__().__getFloatData("V")

    def getBatteryTemperature(self):
        return self.__class__().__getFloatData("W")

    def getBatteryPercent(self):
        return self.__class__().__getFloatData("X")

    # ----- set Method --------

    def setAirHumidty(self, value: float):
        return self.__class__().__setFloatData("N", value)

    def setAirTemperature(self, value: float):
        return self.__class__().__setFloatData("U", value)

    def setMotorTemperature(self, value: float):
        return self.__class__().__setFloatData("V", value)

    def setBatteryTemperature(self, value: float):
        return self.__class__().__setFloatData("W", value)

    def setBatteryPercent(self, value: float):
        return self.__class__().__setFloatData("X", value)


class key:

    def getGPS_plainText(self):
        try:
            return getData.getStringData("M")
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setGPS(0.0, 0.0)
                return self.__class__().getGPS_plainText()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return ""

    def getGPS_Latitude(self):
        tempS = self.getGPS_plainText()
        tempS = tempS[0: tempS.index(",")]
        return float(tempS)

    def getGPS_Longitude(self):
        tempS = self.getGPS_plainText()
        tempS = tempS[tempS.index(",") + 1: len(tempS)]
        return float(tempS)

    def setGPS(self, lat: float, lon: float):
        if not "float" in str(lat.__class__):
            print(errString_3)
            return False
        if not "float" in str(lon.__class__):
            print(errString_3)
            return False
        if (lat < -90) | (lat > 90) | (lon < -180) | (lon > 180):
            print(errString_1)
            return False
        send = str(lat) + "," + str(lon)
        return putData.putStringData("M", send)

    # ----- boolean Status -------

    def get_ON_OFF_Status(self):
        try:
            result = getData.getControlData("P")
            if result == "1":
                return True
            elif result == "0":
                return False
            else:
                self.__class__().set_ON_OFF_Status(False)
                return False
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().set_ON_OFF_Status(False)
                return self.__class__().get_ON_OFF_Status()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return False

    def getBeeper(self):
        try:
            result = getData.getControlData("Q")
            if result == "1":
                return True
            elif result == "0":
                return False
            else:
                self.__class__().setBeeper(False)
                return False
        except Exception as e:
            if "KeyError" in str(e.__class__):
                self.__class__().setBeeper(False)
                return self.__class__().getBeeper()
            else:
                print("Unknown ERROR occur : " + str(e.__class__) + str(e))
                return False

    def set_ON_OFF_Status(self, value: bool):
        if not "bool" in str(value.__class__):
            print(errString_3)
            return False
        if value:
            return putData.putControlData("P", "1")
        elif not value:
            return putData.putControlData("P", "0")

    def setBeeper(self, value: bool):
        if not "bool" in str(value.__class__):
            print(errString_3)
            return False
        if value:
            return putData.putControlData("Q", "1")
        elif not value:
            return putData.putControlData("Q", "0")

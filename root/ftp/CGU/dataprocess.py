import json
import data

# location = "/Users/slothsmba/Desktop/"
location = "/home/pi/Desktop/project/"


def renewLog(inHead, inData):
    if (inHead == "P") | (inHead == "Q") | (inHead == "]"):
        if inData == "1":
            inData = True
        else:
            inData = False
    allHead = ['B','D','E','F','G','H','I','J','K','L','M','P','Q','O','C','Y','[','^',']','R','S','N','U','V','W','X','*']
    for i in allHead :
        if i == inHead:
            break
        elif i == '*':
            return
    return {
        'B': lambda x: data.motor().setThrottle(int(float(inData))),
        'D': lambda x: data.distance().setFrontLeft_outer(float(inData)),
        'E': lambda x: data.distance().setFrontLeft_inner(float(inData)),
        'F': lambda x: data.distance().setFrontCenter(float(inData)),
        'G': lambda x: data.distance().setFrontRight_inner(float(inData)),
        'H': lambda x: data.distance().setFrontRight_outer(float(inData)),
        'I': lambda x: data.distance().setBackLeft(float(inData)),
        'J': lambda x: data.distance().setBackRight(float(inData)),
        'K': lambda x: data.distance().setBackCenter(float(inData)),
        'L': lambda x: data.speed().setSpeed(float(inData)),
        'M': lambda x: data.key().setGPS(float(inData[:inData.index(",")]), float(inData[inData.index(",")+1:])),
        'P': lambda x: data.key().set_ON_OFF_Status(inData),
        'Q': lambda x: data.key().setBeeper(inData),
        'O': lambda x: data.outer().setNote(inData),
        'C': lambda x: data.outer().setPhoneNumber(inData),
        'Y': lambda x: data.outer().setSystemTime(inData),
        ']': lambda x: data.outer().setInternetCheck(inData),
        '^': lambda x: data.outer().setWeather(inData),
        '[': lambda x: data.outer().setWarning(inData),
        'R': lambda x: data.direction().setFrontGyro(float(inData)),
        'S': lambda x: data.direction().setBackGyro(float(inData)),
        'N': lambda x: data.temperature().setAirHumidty(float(inData)),
        'U': lambda x: data.temperature().setAirTemperature(float(inData)),
        'V': lambda x: data.temperature().setMotorTemperature(float(inData)),
        'W': lambda x: data.temperature().setBatteryTemperature(float(inData)),
        'X': lambda x: data.temperature().setBatteryPercent(float(inData)),
    }[inHead](inData)




def dataprocess(inS):
    value = ""
    inS = inS[2:-1]
    print(inS)
    head = inS[0]
    if not head.isascii():
        while not head.isascii():
            inS = inS[1:]
            head = ord(inS[0])
    else:
        if inS[-1] == '%':
            value = (inS[1:-1])
        else:
            while not inS[-1] == '%':
                inS = inS[0:-1]
                value = (inS[1:-1])
    print("  Value of: " + head + "  Value is: " + (value))
    renewLog(head, value)

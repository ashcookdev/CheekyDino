import serial

port = serial.Serial(
    port='USB001', # replace 'USB001' with your port path
    baudrate=19200,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS
)

hexCode = bytes.fromhex('07')
port.write(hexCode)

# Path: frontend/src/backend/server.py



@echo off
echo.
start mongod --dbpath %userprofile%\Documents\MongoDB --bind_ip 127.0.0.1
node -i
pause
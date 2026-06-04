@echo off
setlocal

cd /d "%~dp0"

set "MVN_CMD="

for /f "delims=" %%M in ('where mvn 2^>nul') do (
  if not defined MVN_CMD set "MVN_CMD=%%M"
)

if defined MVN_CMD goto run_maven

set "INTELLIJ_MVN=C:\Program Files\JetBrains\IntelliJ IDEA 2026.1.2\plugins\maven\lib\maven3\bin\mvn.cmd"
if exist "%INTELLIJ_MVN%" (
  set "MVN_CMD=%INTELLIJ_MVN%"
  goto run_maven
)

echo No se encontro Maven en PATH ni el Maven embebido de IntelliJ IDEA.
echo Instala Maven o ejecuta desde IntelliJ: Maven ^> springboot ^> Plugins ^> spring-boot ^> spring-boot:run
exit /b 1

:run_maven
if "%~1"=="" (
  call "%MVN_CMD%" spring-boot:run
) else (
  call "%MVN_CMD%" %*
)
exit /b %ERRORLEVEL%

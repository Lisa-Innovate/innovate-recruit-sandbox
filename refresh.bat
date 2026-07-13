@echo off
echo Pushing site files to Docker...
docker cp site\. innovate-recruit-sandbox-web-1:/usr/share/nginx/html/
echo.
echo Done! Refresh your browser at localhost:8080
pause

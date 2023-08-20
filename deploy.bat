@echo off
ionic build --prod
ionic cap add android
ionic cap copy
ionic cap sync
ionic cap open android
pause

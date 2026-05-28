# Run from PowerShell:  .\START-HERE.ps1
# (Same as .\START-HERE.bat — PowerShell requires .\ for scripts in the current folder.)
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here
& cmd /c "START-HERE.bat"

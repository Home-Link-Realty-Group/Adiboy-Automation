$repo = "https://github.com/Home-Link-Realty-Group/Wholesaler-Pro"
$dailyLogin = Join-Path $PSScriptRoot "DAILY_LOGIN.html"
$workspace = Join-Path $PSScriptRoot "Home-Link-SaaS-Reconstruction.code-workspace"

if (Test-Path $dailyLogin) {
    Start-Process $dailyLogin
} else {
    Start-Process $repo
}

if (Test-Path $workspace) {
    Start-Process $workspace
}

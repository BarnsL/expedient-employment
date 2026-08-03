<#
.SYNOPSIS
    Builds the Expedient Employment Windows release artifacts:
      1. Builds the GUI (npm run build in gui/).
      2. Runs electron-builder for --win dir zip (unpacked dir + portable zip).
      3. Compiles installer/windows.iss with Inno Setup 6 (ISCC.exe).

    Artifacts land in release/ at the repository root:
      - ExpedientEmployment-Setup-<version>.exe   (per-user installer)
      - ExpedientEmployment-portable-<version>.zip (portable zip)

    One-time prerequisite: Inno Setup 6 (https://jrsoftware.org/isinfo.php).
    Nothing is installed globally; electron-builder runs through npx.
#>
param(
    [string]$Version
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$GuiDir = Join-Path $RepoRoot 'gui'
$ReleaseDir = Join-Path $RepoRoot 'release'

# --- Resolve the app version from gui/package.json ---------------------------
if (-not $Version) {
    $pkg = Get-Content (Join-Path $GuiDir 'package.json') -Raw | ConvertFrom-Json
    $Version = [string]$pkg.version
}
if (-not $Version) { throw 'Could not determine the app version from gui/package.json.' }
Write-Host "Building Expedient Employment $Version"

# --- 1. Build the GUI ---------------------------------------------------------
Push-Location $GuiDir
try {
    if (-not (Test-Path (Join-Path $GuiDir 'node_modules'))) {
        Write-Host 'Installing GUI dependencies (npm install)...'
        & npm install
        if ($LASTEXITCODE -ne 0) { throw 'npm install failed in gui/.' }
    }
    Write-Host 'Building the GUI (npm run build)...'
    & npm run build
    if ($LASTEXITCODE -ne 0) { throw 'GUI build failed.' }

    # --- 2. electron-builder: unpacked dir + portable zip ---------------------
    Write-Host 'Running electron-builder (--win dir zip)...'
    & npx --yes electron-builder --config electron-builder.yml --win dir zip
    if ($LASTEXITCODE -ne 0) { throw 'electron-builder failed.' }
}
finally {
    Pop-Location
}

$UnpackedDir = Join-Path $GuiDir 'release\win-unpacked'
if (-not (Test-Path $UnpackedDir)) {
    throw "Expected electron-builder output at $UnpackedDir but it was not created."
}

# --- Collect the portable zip into release/ ----------------------------------
if (-not (Test-Path $ReleaseDir)) { New-Item -ItemType Directory -Path $ReleaseDir | Out-Null }

$zipArtifact = Get-ChildItem (Join-Path $GuiDir 'release') -Filter "*.zip" |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $zipArtifact) { throw 'electron-builder did not produce a portable zip.' }
$zipOut = Join-Path $ReleaseDir "ExpedientEmployment-portable-$Version.zip"
Copy-Item $zipArtifact.FullName $zipOut -Force
Write-Host "Portable zip: $zipOut"

# --- 3. Inno Setup installer ---------------------------------------------------
$isccCandidates = @(
    (Join-Path ${env:ProgramFiles(x86)} 'Inno Setup 6\ISCC.exe'),
    (Join-Path $env:ProgramFiles 'Inno Setup 6\ISCC.exe')
)
$iscc = $isccCandidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $iscc) {
    $isccCommand = Get-Command ISCC.exe -ErrorAction SilentlyContinue
    if ($isccCommand) { $iscc = $isccCommand.Source }
}
if (-not $iscc) {
    throw @(
        'Inno Setup 6 (ISCC.exe) was not found.'
        'Install it from https://jrsoftware.org/isinfo.php (one-time install),'
        'then re-run this script. The portable zip above is already built and usable.'
    ) -join ' '
}

Write-Host "Compiling the installer with $iscc ..."
& $iscc "/DAppVersion=$Version" (Join-Path $RepoRoot 'installer\windows.iss')
if ($LASTEXITCODE -ne 0) { throw 'Inno Setup compilation failed.' }

$setupOut = Join-Path $ReleaseDir "ExpedientEmployment-Setup-$Version.exe"
if (-not (Test-Path $setupOut)) {
    throw "Inno Setup finished but $setupOut was not created."
}

Write-Host ''
Write-Host 'Windows release complete:'
Write-Host "  Installer:   $setupOut"
Write-Host "  Portable:    $zipOut"

Get-ChildItem -Path ./.latex -Filter "*.pdf" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination ./
}
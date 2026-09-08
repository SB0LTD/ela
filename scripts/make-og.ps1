# Generate a 1200x1200 social-share (OG) image from the portrait,
# with a branded teal frame + gold accent + "ElaHealing" wordmark.
Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile("$PSScriptRoot\..\public\ela.jpeg")

$size = 1200
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = "AntiAlias"
$g.InterpolationMode = "HighQualityBicubic"
$g.PixelOffsetMode = "HighQuality"

# Background wash (teal -> sand) in case of any letterboxing
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point(0,0)),
  (New-Object System.Drawing.Point($size,$size)),
  [System.Drawing.Color]::FromArgb(34,80,90),
  [System.Drawing.Color]::FromArgb(46,151,165))
$g.FillRectangle($bgBrush, 0, 0, $size, $size)

# Crop portrait to a square from the top (keeps the face), draw filling the frame
# portrait is 1122x1402; take a 1122x1122 square starting near the top
$cropSize = 1122
$srcRect = New-Object System.Drawing.Rectangle(0, 60, $cropSize, $cropSize)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Bottom gradient scrim for text legibility
$scrimBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point(0, ($size-360))),
  (New-Object System.Drawing.Point(0, $size)),
  [System.Drawing.Color]::FromArgb(0,15,35,42),
  [System.Drawing.Color]::FromArgb(220,15,35,42))
$g.FillRectangle($scrimBrush, 0, ($size-360), $size, 360)

# Wordmark "ElaHealing"
$fontEla = New-Object System.Drawing.Font("Georgia", 62, [System.Drawing.FontStyle]::Regular)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232,213,168))
$sf = New-Object System.Drawing.StringFormat
$g.DrawString("Ela", $fontEla, $whiteBrush, 70, ($size-190))
$elaWidth = $g.MeasureString("Ela", $fontEla).Width
$g.DrawString("Healing", $fontEla, $goldBrush, (70 + $elaWidth - 18), ($size-190))

# Tagline
$fontTag = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular)
$tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(215,240,242))
$g.DrawString("Holistic Wellness & Transformation", $fontTag, $tagBrush, 76, ($size-92))

# Gold accent line
$goldPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(201,163,95), 4)
$g.DrawLine($goldPen, 78, ($size-108), 200, ($size-108))

$bmp.Save("$PSScriptRoot\..\public\og-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose(); $bmp.Dispose(); $src.Dispose()
Write-Host "Created public/og-image.jpg (1200x1200)"

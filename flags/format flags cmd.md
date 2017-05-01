# Guide: Convert flags to standart format

- Convert specific file
```bash
convert -gravity center -background yellow -transparent yellow -resize 500x500 -extent 500x500 <FILE>.png <FILE>.png
```

- Convert entire folder (working dir)
```bash
mogrify -gravity center -background yellow -transparent yellow -resize 500x500 -extent 500x500 <FILE>.png <FILE>.png
```

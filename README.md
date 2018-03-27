# text-ocr
A text extractor for smart india hackathon


Download the trained model from [Google Drive](https://drive.google.com/file/d/0B3APw5BZJ67ETHNPaU9xUkVoV0U/view) and place it in folder where you want your checkpoint path
run  
```bash
python3 run_demo_server.py --checkpoint_path=/path/to/east_icdar2015_resnet_v1_50_rbox/
```


Instructions for integrating Tessaract with EAST:

install tesseract-ocr

`sudo apt-get install tesseract-ocr`
`sudo apt-get install tesseract-ocr-hin`

Get the trained data files, and cube files for reading hindi.

`wget https://github.com/indic-ocr/tessdata/blob/master/hin/hin.traineddata`

For more trained models, go to https://github.com/indic-ocr/tessdata

Move the downloaded files to /usr/share/tesseract-ocr/tessdata/tessconfigs [Actual location may differ]

To download trained models for other languages, go to https://github.com/indic-ocr/tessdata

`sudo mv hin.*cube.* /usr/share/tesseract-ocr/tessdata`
`sudo mv hin.traineddata /usr/share/tesseract-ocr/tessdata`

Create two directories: imcache, and text, in the root directory of this project
`mkdir imcache text`

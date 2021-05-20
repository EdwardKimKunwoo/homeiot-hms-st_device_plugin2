#!/usr/bin/env python

import os
import string
import glob, os.path
import argparse

import sys
from PIL import Image

imgResList=[]

def main():
	global resDir
	source_w = -1
	source_h = -1
	parser = argparse.ArgumentParser ( description = """ ex$ python make_animap.py ./resDir --source_w 244 --source_h 244 --crop""")
	parser.add_argument('resDir', help='resource directory')
	parser.add_argument('--source_w', nargs='?', default='', const='', help='source resize width')
	parser.add_argument('--source_h', nargs='?', default='', const='',help='source resize height')
	parser.add_argument('--crop', nargs='?', default=False, const=True,help='need crop')

	args = parser.parse_args()
	
	if len(args.resDir) > 0 and os.path.isdir(args.resDir) :
		print ("Resource Directory:" + args.resDir)
		dir = args.resDir
		for obj in glob.glob(dir + '/*'):
			if os.path.isfile(obj) and os.path.splitext(obj)[1] == ".png":
				imgResList.append(os.path.abspath(obj))
			
	else :
		print ('resource directory path is required.')
		return

	if len(args.source_w) > 0 :
		print ("Source Resize Width:" + args.source_w)
		source_w = int(args.source_w)

	if len(args.source_h) > 0 :
		print ("Source Resize Height:" + args.source_h)
		source_h = int(args.source_h)

	imgResList.sort()
	print(str(len(imgResList)) + ' items selected.')
	
	if source_w > 0 and source_h > 0 :
		if args.crop :
			print ("Crop")
			temp_images = [Image.open(x) for x in imgResList]
			images =  [image.crop(((image.width - source_w)/2, (image.height - source_h)/2, (image.width -(image.width - source_w)/2), (image.height - (image.height - source_h)/2) )) for image in temp_images]
		else :
			print ("Resize")
			images = [Image.open(x).resize((source_w,source_h)) for x in imgResList]
	else :
		images = [Image.open(x) for x in imgResList]

	widths, heights = zip(*(i.size for i in images))
	
	total_width = sum(widths)
	max_height = max(heights)
	
	print("total_width:" + str(total_width))
	new_im = Image.new('RGBA', (total_width, max_height))
	x_offset = 0
	
	for im in images:
		new_im.paste(im, (x_offset,0))
		x_offset += im.size[0]

	new_im.save('output.png')
	
if __name__ == '__main__':
  main()

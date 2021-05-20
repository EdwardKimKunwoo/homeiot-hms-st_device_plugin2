#!/bin/python3
 
import os 
 
def add_copyright(path, except_path, line): 
	copyright = "/* Copyright " 

	for root, dirs, files in os.walk(path): 
		[dirs.remove(d) for d in list(dirs) if d in except_path]

		for file in files: 
			if file.endswith(".js"): 
				print(os.path.join(root, file)) 
				with open(os.path.join(root, file), 'r+') as f:
					content = f.read()
					if content.find(copyright,0,13) == -1: 
						f.seek(0, 0)
						f.write(line.rstrip('\r\n') + '\n' + content)
						print("successful") 

					else:
						print("error - exist") 
						#print(os.path.join(root, file)) 

def find_js_files(path, except_path): 

	for root, dirs, files in os.walk(path): 
		[dirs.remove(d) for d in list(dirs) if d in except_path]
		#print("dir=%s"%(dir))
		for file in files: 
			#print(file) 
			if file.endswith(".js"): 
				print(os.path.join(root, file)) 

def main():
	os.chdir("..") 
	root = os.getcwd() 
	print("root=%s"%(root))

	exclude = set(["lib", "res"])
	#exclude = "lib"

	line = """/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved
PROPRIETARY/CONFIDENTIAL
This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/
"""

	# call function
	#find_js_files(root, exclude) 
	add_copyright(root, exclude, line) 

if __name__ == '__main__':
	main()

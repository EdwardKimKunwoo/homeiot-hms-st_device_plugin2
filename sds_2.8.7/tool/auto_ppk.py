#!/bin/python3

import os
import string
import glob, os.path
import argparse

def main():
	os.chdir("..") 
	root = os.getcwd() 
	print("root=%s"%(root))

if __name__ == '__main__':
	main()
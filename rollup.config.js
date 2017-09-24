import resolve from 'rollup-plugin-node-resolve-angular';
import typescript from 'rollup-plugin-typescript2';
import angular from 'rollup-plugin-angular';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import pkgGen from 'rollup-plugin-pkg-generator';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';

import { minify } from 'uglify-es';


function cleanName(name){
	var parts = name.split('/');
	if (parts.length > 1) {
		name = parts[parts.length-1];
	}
	return name;
}

const targetFolder = './dist/';
const browserFile = cleanName(pkg.name) + '.es5.js';
const moduleFile = 'index.js';
const minFile = cleanName(pkg.name) + '.es5.min.js';

var umdConfig = {
		input : './index.ts',
		output : {
			file : targetFolder + browserFile,
			format : 'es',
			exports: 'named'
		},
		sourcemap : true,
		name : browserFile.split('.')[0].replace(/-/g, '_'),
		plugins : [
			copy({
				'./src': './dist/src'
			}),
			angular(),
			typescript(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			autoExternal(),
			commonjs()
		]
};

var minifyConfig = {
		input : './index.ts',
		output : {
			file : targetFolder + minFile,
			format : 'es',
			exports: 'named'
		},
		sourcemap : true,
		name : minFile.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			typescript(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			autoExternal(),
			commonjs(),
			uglify({}, minify),
			pkgGen({pkg:{
				main: 'index.js',
				module: moduleFile,
				browser: browserFile,
				dependencies: pkg.peerDependencies,
				devDependencies: {},
				scripts: {},
				typings: 'index.d.ts'
			}})
		]
};


export default [
	umdConfig,
	minifyConfig
]
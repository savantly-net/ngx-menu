import resolve from 'rollup-plugin-node-resolve-angular';
import commonjs from 'rollup-plugin-commonjs';
import angular from 'rollup-plugin-angular';
import uglify from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import pkgGen from 'rollup-plugin-pkg-generator';
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
const mainName = cleanName(pkg.name) + '.umd.js'
const moduleName = cleanName(pkg.name) + '.es5.js'
const minName = cleanName(pkg.name) + '.umd.min.js'

// Add here external dependencies that actually you use.
// This will exclude them from the bundle
const globals = {
	'@angular/core' : 'ng.core',
	'@angular/core' : 'Injectable',
	'@angular/common' : 'ng.common',
	'@angular/router' : 'CanActivate',
	'@angular/router' : 'ActivatedRouteSnapshot',
	'@angular/router' : 'Router',
	'rxjs/Observable' : 'Rx',
	'rxjs/Observer' : 'Rx',
	'rxjs/add/operator/map' : 'Rx'
};


var umdConfig = {
		input : './index.ts',
		output : {
			file : targetFolder + mainName,
			format : 'umd',
			exports: 'named'
		},
		sourcemap : true,
		name : mainName.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			typescript(),
			resolve({
				browser: true
			}),
			commonjs()
		],
		external : Object.keys(globals),
		globals : globals
};

var es5Config = {
		input : './index.ts',
		output : {
			file : targetFolder + moduleName,
			format : 'es',
			exports: 'named'
		},
		sourcemap : true,
		name : moduleName.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			typescript(),
			resolve({
				browser: true
			}),
			commonjs(),
		],
		external : Object.keys(globals),
		globals : globals
};

var minifyConfig = {
		input : './index.ts',
		output : {
			file : targetFolder + minName,
			format : 'umd'
		},
		sourcemap : true,
		name : minName.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			typescript(),
			resolve({
				browser: true
			}),
			commonjs(),
			uglify({}, minify),
			pkgGen({pkg:{
				module: moduleName,
				main: mainName,
				devDependencies: {},
				scripts: {},
				typings: 'index.d.ts'
			}})
		]
};


export default [
	umdConfig,
	es5Config,
	minifyConfig
]
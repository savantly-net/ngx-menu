import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkgGen from 'rollup-plugin-pkg-generator';
import pkg from './package.json';

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
	'rxjs/add/operator/map' : 'Rx',
	'jwt-decode' : 'decode'
};

function cleanName(name){
	var parts = name.split('/');
	if (parts.length > 1) {
		return parts[parts.length-1];
	} else return name;
}


export default {
	input : 'dist/index.js',
	output : {
		file : 'dist/' + cleanName(pkg.name) + '.umd.js',
		format : 'umd',
		exports: 'named'
	},
	sourcemap : true,
	name : cleanName(pkg.name),
	plugins : [
		resolve(),
		commonjs(), // so Rollup can convert it to an ES module
		pkgGen(),
	],
	external : Object.keys(globals),
	globals : globals
}
#!/bin/sh

if [ ! -d 'node_modules' ]
then	npm install
fi

rev=$(grep '|| null;' -n node_modules/headers-polyfill/lib/index.mjs);

if [ ! -z "$rev" ]
then	# header-polyfill matches pre "cff8faf4f92ba8cfc0e62d000ecde4eb78a0a491"
	# commit version. Make sure its post commit version
	sed -i 's/)] || null;/)] ?? null;/' node_modules/headers-polyfill/lib/index.mjs ;
fi;

echo;
echo '==================================================';
echo;
echo '--------------------------------';
echo 'show effected method (with problem code)'
echo 'in "node_modules/headers-polyfill/lib/index.mjs"';
echo '	https://github.com/mswjs/headers-polyfill/blob/main/src/Headers.ts#L73';
echo;

head -n 72 node_modules/headers-polyfill/lib/index.mjs | tail -n 3;

echo;
echo '==================================================';
echo;
echo 'Run build process to demonstrate error.';
echo;
echo;
echo;
echo;
echo;
echo;

npm run build;

echo;
echo;
echo;
echo;
echo;
echo;
echo '==================================================';
echo;
echo;
echo;
echo 'Update problem code to pre "cff8faf4f92ba8cfc0e62d000ecde4eb78a0a491" commit state'
echo;
sed -i 's/)] ?? null;/)] || null;/' node_modules/headers-polyfill/lib/index.mjs ;
echo;

echo '--------------------------------';
echo 'show effected method (with updated code to fix problem)'
echo;

head -n 72 node_modules/headers-polyfill/lib/index.mjs | tail -n 3;
echo;
echo '--------------------------------';
echo;
echo;
echo;
echo;
echo;
echo;

echo '==================================================';
echo;
echo 'Rerun build process to demonstrate error no longer occurs';
echo;
echo;
echo;
echo;
echo;
echo;

npm run build;

echo;
echo;
echo;
echo;
echo;
echo;
echo '==================================================';
echo;
echo;
echo;
echo;
echo;
echo;
echo '--------------------------------';
echo 'Put headers-polyfill back to how it was';
echo;

sed -i 's/)] || null;/)] ?? null;/' node_modules/headers-polyfill/lib/index.mjs ;
echo '--------------------------------';
echo;
echo 'show effected method (with problem code restored)'
echo;
head -n 72 node_modules/headers-polyfill/lib/index.mjs | tail -n 3;
echo;
echo '--------------------------------';
echo;
echo;

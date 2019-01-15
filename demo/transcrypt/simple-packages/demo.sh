#set -e

VERBOSE=1
#VERBOSE=0

#python3 -m pip install --user transcrypt
#sudo apt install default-jre

rm -rf src/__target__

echo '#############################'
echo '# the source tree and script'
echo
tree -P '*.py' --prune src
echo
echo '#vvvvvvvvvvvvvvvvvvvvvv'
cat src/spam.py
echo '#^^^^^^^^^^^^^^^^^^^^^^'
if [ $VERBOSE -ne 0 ]; then
    echo
    echo '#vvvvvvvvvvvvvvvvvvvvvv'
    cat src/org/python/pypi/myproject/spam.py
    echo '#^^^^^^^^^^^^^^^^^^^^^^'
    echo
    echo '#vvvvvvvvvvvvvvvvvvvvvv'
    cat src/org/python/pypi/myproject/ham.py
    echo '#^^^^^^^^^^^^^^^^^^^^^^'
    echo
    echo '#vvvvvvvvvvvvvvvvvvvvvv'
    cat src/org/__init__.py
    echo '#^^^^^^^^^^^^^^^^^^^^^^'
    #echo
    #echo '#----------------------'
    #cat src/org/python/__init__.py
    #echo '#----------------------'
    #echo
    #echo '#----------------------'
    #cat src/org/python/pypi/__init__.py
    #echo '#----------------------'
    #echo
    #echo '#----------------------'
    #cat src/org/python/pypi/myproject/__init__.py
    #echo '#----------------------'
    #echo
    #echo '#----------------------'
    #cat src/org/python/pypi/myproject/eggs/__init__.py
    #echo '#----------------------'
    #echo
    #echo '#----------------------'
    #cat src/org/python/pypi/myproject/eggs/eggs.py
    #echo '#----------------------'
    echo
    echo '(All other files look like that last one.)'
fi

echo
read -n1 -r -p "Paused.  Hit any key to continue..." KEY

echo
echo
echo '#############################'
echo '# running the script with Python'
echo
set -x
python3 src/spam.py || { set +x; } 2> /dev/null || true

echo
read -n1 -r -p "Paused.  Hit any key to continue..." KEY

echo
echo
echo '#############################'
echo '# running transcrypt'
echo
# transcrypt options:
#  -b               force a rebuild
#  --nomin          do not minify the generated JS
#  --parent .none   build for node JS (rather than a browser)
#
# other options:
#  --verbose
#  --esv 5          force ES5
#  --unit .auto     generate dynamically-loadable JS modules
#  --unit .run      generate loader & runtime unit as static modules
#  --unit .com      generate component unit as static module
set -x
transcrypt -b --nomin --parent .none src/spam.py
{ set +x; } 2> /dev/null

if [ $VERBOSE -ne 0 ]; then
    set -x
    tree src/__target__
    { set +x; } 2> /dev/null
fi

echo
read -n1 -r -p "Paused.  Hit any key to continue..." KEY

echo
echo
echo '#############################'
echo '# converting ES6 -> ES5'
echo
# transcrypt produces ES6 by default.  node 8.10 (used by VS Code) does
# not support ES6.  (The move to Electron 3 or 4 will fix that.)  There
# is a transcrypt flag to produce ES5 but it doesn't work right.  As a
# workaround we run the transpiled files through the typescript
# compiler, which converts the ES6 to ES5.
echo '<renaming .js files to .ts>'
python3 << 'EOF'
import os
for filename in os.listdir('src/__target__'):
    if not filename.endswith('.js'):
        continue
    old = 'src/__target__/' + filename
    new = old.rpartition('.')[0] + '.ts'
    #print(f' -> renaming "{old}" to "{new}"')
    os.rename(old, new)
EOF
echo '<running the typescript compiler>'
# The --allowJs flag would work if we also used --outDir.
# Note that we ignore errors since some of the transcrypt files do not
# compile under typescript.
echo
set -x
&>/dev/null tsc src/__target__/spam.ts || { set +x; } 2> /dev/null || true

if [ $VERBOSE -ne 0 ]; then
    set -x
    tree src/__target__
    { set +x; } 2> /dev/null
fi

echo
read -n1 -r -p "Paused.  Hit any key to continue..." KEY

echo
echo
echo '#############################'
echo '# running the script with node'
echo
set -x
node src/__target__/spam.js
{ set +x; } 2> /dev/null

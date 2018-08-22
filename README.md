[Mostly this repo is for tracking effort and organizing notes.]

Browsers have been running Javascript from very early on.  The goal here is to be able to run Python there too, as well as anywhere else that can run JS/WASM.  FWIW, Python-in-the-browser was [a real possibility](https://brendaneich.com/2008/04/popularity/).  It probably worked out better this way. :)

### Concrete Topics

#### objectives

primary:
* run the same Python code via the Javascript engine that currently runs standalone
* interact with Python objects/functions/modules from Javascript / Typescript
* interact with Javascript objects/functions/modules from Python

secondary:
* access browser API from Python

#### use cases

* implement most of a [VS Code extension](https://code.visualstudio.com/docs/extensions/overview) in Python
* client-side web scripting (as a JS replacement)
* client-side Jupyter notebooks kernel (see pyodide)

#### target platform

[v8 Javascript engine](https://github.com/v8/v8/wiki)

#### possible solutions (and prior art)

* implement Python in Javascript / TypeScript
  * [batavia](https://pybee.org/project/projects/bridges/batavia/)
  * [brython](https://github.com/brython-dev/brython)
* transpile existing Python implementation to JS/TS
* compile existing Python implementation to Webassembly
  * [info on SO](https://stackoverflow.com/a/47739532)
  * (inactive) [pypy-js](http://pypyjs.org/)
  * [pyodide](https://github.com/iodide-project/pyodide)
  * [EmPython](https://github.com/aidanhs/empython)
  * [cpython-emscripten](https://github.com/dgym/cpython-emscripten)
  * [EmCPython](https://github.com/PeachPy/EmCPython)
  * [micropython + emscripten](https://github.com/micropython/micropython/issues/3313)
  * [micropython + emscripten](https://github.com/micropython/micropython/pull/2618)
  * [micropython + emscripten](https://github.com/micropython/micropython/pull/3575)
  * (inactive) [Google Native Client](https://www.google.com/search?q="cpython"+nativeclient&oq="cpython"+nativeclient)
* transpile Python modules to JS/TS
  * [transcrypt](http://www.transcrypt.org)
  * (inactive?) [python-to-typescript](https://github.com/w0rp/python-to-typescript)
  * (inactive?) [jiphy](https://github.com/timothycrosley/jiphy)
* compile Python modules to WASM
  * C -> WASM: [emscripten](http://emscripten.org)
  * Python -> C: [Nuitka](https://nuitka.net/)
  * Python -> C++: [ShedSkin](https://shedskin.readthedocs.io/en/latest/)
  * leverage [Cython](http://cython.org/)?
* use a Python-like language
  * [RapydScript](https://github.com/atsepkov/RapydScript)
* emulation
  * [micropython + unicorn](https://micropython.org/unicorn/)
* interact with a Python "server" over the network/stdio
  * every web app ever
  * subprocesses
  * [node: python-bridge](https://github.com/Submersible/node-python-bridge)
* support Python natively in the browser (e.g. [embed CPython](https://docs.python.org/3/c-api/intro.html#embedding-python) in the browser binary)

The easiest would probably be interacting with Python over the network/stdio.  However, it's probably the least efficient.

Note: In the Node.js world there's also the option of using [an "addon"](https://nodejs.org/api/addons.html) to expose Python.  However, this is not a cross-platform solution.

#### technical concerns

* web vs. not web

Interop:
* prior art: Jython, IronPython
* how to expose Python in JS/TS?
  * "py" JS module: `.exec(src: string): any`
  * "py" JS module: `.run(argv, ...)`  (a la subprocess)
  * "py" JS module: `.import(module: string): Module` (expose module attrs to JS)
  * native JS modules / objects
  * ...
* how to expose JS/TS in Python?
  * "js" (or "ts") Python module to expose JS globals
  * "js" Python module: `.require(module)` (expose JS module to Python)
  * ...

Runtime:
* what part of runtime is unsupported?
  * subinterpreters?
  * threads?
  * subprocesses?
* performance penalty (over native JS/WASM)

Modules:
* what stdlib modules are unavailable?
* .py/extension import won't work without adding an importer that can handle JS sandbox
* how to provide stdlib?
  * pre-build into Python runtime (i.e. frozen/builtin)
  * ship zipped along with Python (.py only)
* how to support Python (.py) modules?
  * pre-build into Python runtime (i.e. frozen)
  * ship zipped along with Python (.py only)
* how to support extension modules?
  * pre-build into Python runtime (i.e. builtin)
  * transpile to JS
  * compile to WASM
  
Python Server:
* interact via socket vs. stdio
* lifecycle management (e.g. launch; don't leak processes)
* JS/TS API
* Python API

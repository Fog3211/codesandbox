(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var global = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform$1 = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions = {};
  var release$1 = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime$1() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var browser$1 = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform$1,
    release: release$1,
    config: config,
    uptime: uptime$1
  };

  var process = browser$1;

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  /*
  The MIT License (MIT)

  Copyright (c) 2016 CoderPuppy

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  */
  var _endianness;
  function endianness() {
    if (typeof _endianness === 'undefined') {
      var a = new ArrayBuffer(2);
      var b = new Uint8Array(a);
      var c = new Uint16Array(a);
      b[0] = 1;
      b[1] = 2;
      if (c[0] === 258) {
        _endianness = 'BE';
      } else if (c[0] === 513){
        _endianness = 'LE';
      } else {
        throw new Error('unable to figure out endianess');
      }
    }
    return _endianness;
  }

  function hostname() {
    if (typeof global.location !== 'undefined') {
      return global.location.hostname
    } else return '';
  }

  function loadavg() {
    return [];
  }

  function uptime() {
    return 0;
  }

  function freemem() {
    return Number.MAX_VALUE;
  }

  function totalmem() {
    return Number.MAX_VALUE;
  }

  function cpus() {
    return [];
  }

  function type() {
    return 'Browser';
  }

  function release () {
    if (typeof global.navigator !== 'undefined') {
      return global.navigator.appVersion;
    }
    return '';
  }

  function networkInterfaces(){}
  function getNetworkInterfaces(){}

  function arch() {
    return 'javascript';
  }

  function platform() {
    return 'browser';
  }

  function tmpDir() {
    return '/tmp';
  }
  var tmpdir = tmpDir;

  var EOL = '\n';
  var _polyfillNode_os = {
    EOL: EOL,
    arch: arch,
    platform: platform,
    tmpdir: tmpdir,
    tmpDir: tmpDir,
    networkInterfaces:networkInterfaces,
    getNetworkInterfaces: getNetworkInterfaces,
    release: release,
    type: type,
    cpus: cpus,
    totalmem: totalmem,
    freemem: freemem,
    uptime: uptime,
    loadavg: loadavg,
    hostname: hostname,
    endianness: endianness,
  };

  var _polyfillNode_os$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    endianness: endianness,
    hostname: hostname,
    loadavg: loadavg,
    uptime: uptime,
    freemem: freemem,
    totalmem: totalmem,
    cpus: cpus,
    type: type,
    release: release,
    networkInterfaces: networkInterfaces,
    getNetworkInterfaces: getNetworkInterfaces,
    arch: arch,
    platform: platform,
    tmpDir: tmpDir,
    tmpdir: tmpdir,
    EOL: EOL,
    'default': _polyfillNode_os
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_os$1);

  var _polyfillNode_fs = {};

  var _polyfillNode_fs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _polyfillNode_fs
  });

  var require$$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_fs$1);

  var _polyfillNode_child_process = {};

  var _polyfillNode_child_process$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _polyfillNode_child_process
  });

  var require$$2 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_child_process$1);

  var os = require$$0;
  var fs = require$$1;
  var child = require$$2;

  var DEFAULT_RESOLV_FILE = '/etc/resolv.conf';

  function getInterfaceName() {
    var val = 'eth';
    var platform = os.platform();
    if (platform === 'darwin') {
      val = 'en';
    } else if (platform === 'win32') {
      val = null;
    }
    return val;
  }

  function getIfconfigCMD() {
    if (os.platform() === 'win32') {
      return 'ipconfig/all';
    }
    return '/sbin/ifconfig';
  }

  /**
   * Get all addresses.
   *
   * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
   * @param {Function(err, addr)} callback
   *  - {Object} addr {
   *    - {String} ip
   *    - {String} ipv6
   *    - {String} mac
   *  }
   */
  function address(interfaceName, callback) {
    if (typeof interfaceName === 'function') {
      callback = interfaceName;
      interfaceName = null;
    }

    var addr = {
      ip: address.ip(interfaceName),
      ipv6: address.ipv6(interfaceName),
      mac: null
    };
    address.mac(interfaceName, function (err, mac) {
      if (mac) {
        addr.mac = mac;
      }
      callback(err, addr);
    });
  }

  address.interface = function (family, name) {
    var interfaces = os.networkInterfaces();
    var noName = !name;
    name = name || getInterfaceName();
    family = family || 'IPv4';
    for (var i = -1; i < 8; i++) {
      var interfaceName = name + (i >= 0 ? i : ''); // support 'lo' and 'lo0'
      var items = interfaces[interfaceName];
      if (items) {
        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          if (item.family === family) {
            return item;
          }
        }
      }
    }

    if (noName) {
      // filter 127.0.0.1, get the first ip
      for (var k in interfaces) {
        var items = interfaces[k];
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (item.family === family && item.address !== '127.0.0.1') {
            return item;
          }
        }
      }
    }
    return;
  };

  /**
   * Get current machine IPv4
   *
   * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
   * @return {String} IP address
   */
  address.ip = function (interfaceName) {
    var item = address.interface('IPv4', interfaceName);
    return item && item.address;
  };

  /**
   * Get current machine IPv6
   *
   * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
   * @return {String} IP address
   */
  address.ipv6 = function (interfaceName) {
    var item = address.interface('IPv6', interfaceName);
    return item && item.address;
  };

  // osx start line 'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500'
  // linux start line 'eth0      Link encap:Ethernet  HWaddr 00:16:3E:00:0A:29  '
  var MAC_OSX_START_LINE = /^(\w+)\:\s+flags=/;
  var MAC_LINUX_START_LINE = /^(\w+)\s{2,}link encap:\w+/i;

  // ether 78:ca:39:b0:e6:7d
  // HWaddr 00:16:3E:00:0A:29
  var MAC_RE = address.MAC_RE = /(?:ether|HWaddr)\s+((?:[a-z0-9]{2}\:){5}[a-z0-9]{2})/i;

  // osx: inet 192.168.2.104 netmask 0xffffff00 broadcast 192.168.2.255
  // linux: inet addr:10.125.5.202  Bcast:10.125.15.255  Mask:255.255.240.0
  var MAC_IP_RE = address.MAC_IP_RE = /inet\s(?:addr\:)?(\d+\.\d+\.\d+\.\d+)/;

  function getMAC(content, interfaceName, matchIP) {
    var lines = content.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trimRight();
      var m = MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line);
      if (!m) {
        continue;
      }

      // check interface name
      var name = m[1];
      if (name.indexOf(interfaceName) !== 0) {
        continue;
      }

      var ip = null;
      var mac = null;
      var match = MAC_RE.exec(line);
      if (match) {
        mac = match[1];
      }

      i++;
      while (true) {
        line = lines[i];
        if (!line || MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line)) {
          i--;
          break; // hit next interface, handle next interface
        }
        if (!mac) {
          match = MAC_RE.exec(line);
          if (match) {
            mac = match[1];
          }
        }

        if (!ip) {
          match = MAC_IP_RE.exec(line);
          if (match) {
            ip = match[1];
          }
        }

        i++;
      }

      if (ip === matchIP) {
        return mac;
      }
    }
  }

  /**
   * Get current machine MAC address
   *
   * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
   * @param {Function(err, address)} callback
   */
  address.mac = function (interfaceName, callback) {
    if (typeof interfaceName === 'function') {
      callback = interfaceName;
      interfaceName = null;
    }
    interfaceName = interfaceName || getInterfaceName();
    var item = address.interface('IPv4', interfaceName);
    if (!item) {
      return callback();
    }

    // https://github.com/nodejs/node/issues/13581
    // bug in node 7.x and <= 8.4.0
    if (!process.env.CI && (item.mac === 'ff:00:00:00:00:00' || item.mac === '00:00:00:00:00:00')) {
      // wrong address, ignore it
      item.mac = '';
    }

    if (item.mac) {
      return callback(null, item.mac);
    }

    child.exec(getIfconfigCMD(), {timeout: 5000}, function (err, stdout, stderr) {
      if (err || !stdout) {
        return callback(err);
      }

      var mac = getMAC(stdout || '', interfaceName, item.address);
      callback(null, mac);
    });
  };

  // nameserver 172.24.102.254
  var DNS_SERVER_RE = /^nameserver\s+(\d+\.\d+\.\d+\.\d+)$/i;

  /**
   * Get DNS servers.
   *
   * @param {String} [filepath] resolv config file path. default is '/etc/resolv.conf'.
   * @param {Function(err, servers)} callback
   */
  address.dns = function (filepath, callback) {
    if (typeof filepath === 'function') {
      callback = filepath;
      filepath = null;
    }
    filepath = filepath || DEFAULT_RESOLV_FILE;
    fs.readFile(filepath, 'utf8', function (err, content) {
      if (err) {
        return callback(err);
      }
      var servers = [];
      content = content || '';
      var lines = content.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        var m = DNS_SERVER_RE.exec(line);
        if (m) {
          servers.push(m[1]);
        }
      }

      callback(null, servers);
    });
  };

  var address_1 = address;

  var ip = address_1.ipv6();
  console.log(ip);

}));

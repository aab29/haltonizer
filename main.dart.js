(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isc=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isj)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="c"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="i"){processStatics(init.statics[b2]=b3.i,b4)
delete b3.i}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.aS"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.aS"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.aS(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aU=function(){}
var dart=[["","",,H,{"^":"",fq:{"^":"c;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
aZ:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ap:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.aX==null){H.dA()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.i(P.bA("Return interceptor for "+H.e(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$aB()]
if(v!=null)return v
v=H.dE(a)
if(v!=null)return v
if(typeof a=="function")return C.w
y=Object.getPrototypeOf(a)
if(y==null)return C.j
if(y===Object.prototype)return C.j
if(typeof w=="function"){Object.defineProperty(w,$.$get$aB(),{value:C.d,enumerable:false,writable:true,configurable:true})
return C.d}return C.d},
j:{"^":"c;",
h:["a_",function(a){return"Instance of '"+H.U(a)+"'"}]},
cj:{"^":"j;",
h:function(a){return String(a)},
$isaP:1},
cl:{"^":"j;",
h:function(a){return"null"},
$isq:1},
aD:{"^":"j;",
h:["a0",function(a){return String(a)}]},
cq:{"^":"aD;"},
aJ:{"^":"aD;"},
a6:{"^":"aD;",
h:function(a){var z=a[$.$get$ba()]
if(z==null)return this.a0(a)
return"JavaScript function for "+H.e(J.ab(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isaz:1},
a4:{"^":"j;$ti",
L:function(a,b){H.r(b,H.A(a,0))
if(!!a.fixed$length)H.b1(P.aK("add"))
a.push(b)},
h:function(a){return P.bd(a,"[","]")},
gN:function(a){return new J.c2(a,a.length,0,[H.A(a,0)])},
gj:function(a){return a.length},
$isa3:1,
$isp:1,
i:{
ci:function(a,b){return J.a5(H.b0(a,[b]))},
a5:function(a){H.as(a)
a.fixed$length=Array
return a}}},
fp:{"^":"a4;$ti"},
c2:{"^":"c;a,b,c,0d,$ti",
gp:function(){return this.d},
q:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.i(H.dK(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ah:{"^":"j;",
C:function(a,b){var z
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=C.b.gD(b)
if(this.gD(a)===z)return 0
if(this.gD(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gD:function(a){return a===0?1/a<0:a<0},
ar:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.i(P.aK(""+a+".round()"))},
al:function(a,b,c){if(C.b.C(b,c)>0)throw H.i(H.Z(b))
if(this.C(a,b)<0)return b
if(this.C(a,c)>0)return c
return a},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
Y:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ah:function(a,b){var z
if(a>0)z=this.ag(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
ag:function(a,b){return b>31?0:a>>>b},
X:function(a,b){if(typeof b!=="number")throw H.i(H.Z(b))
return a<b},
$isI:1,
$isb_:1},
be:{"^":"ah;",$isa0:1},
ck:{"^":"ah;"},
aA:{"^":"j;",
a3:function(a,b){if(b>=a.length)throw H.i(H.aT(a,b))
return a.charCodeAt(b)},
m:function(a,b){H.o(b)
if(typeof b!=="string")throw H.i(P.b2(b,null,null))
return a+b},
F:function(a,b,c){H.u(c)
if(c==null)c=a.length
if(b>c)throw H.i(P.aI(b,null,null))
if(c>a.length)throw H.i(P.aI(c,null,null))
return a.substring(b,c)},
Z:function(a,b){return this.F(a,b,null)},
h:function(a){return a},
gj:function(a){return a.length},
$isD:1}}],["","",,H,{"^":"",cn:{"^":"c;a,b,c,0d,$ti",
gp:function(){return this.d},
q:function(){var z,y,x,w
z=this.a
y=J.aW(z)
x=y.gj(z)
if(this.b!==x)throw H.i(P.b9(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.am(z,w);++this.c
return!0}},ag:{"^":"c;$ti"}}],["","",,H,{"^":"",
du:function(a){return init.types[H.u(a)]},
iN:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isaC},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ab(a)
if(typeof z!=="string")throw H.i(H.Z(a))
return z},
cs:function(a,b){var z,y
if(typeof a!=="string")H.b1(H.Z(a))
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.ar(z,3)
y=H.o(z[3])
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return},
U:function(a){var z,y,x,w,v,u,t,s,r
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.o||!!J.m(a).$isaJ){v=C.i(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.c.a3(w,0)===36)w=C.c.Z(w,1)
r=H.aY(H.as(H.Q(a)),0,null)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+r,init.mangledGlobalNames)},
dv:function(a){throw H.i(H.Z(a))},
ar:function(a,b){if(a==null)J.au(a)
throw H.i(H.aT(a,b))},
aT:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.R(!0,b,"index",null)
z=H.u(J.au(a))
if(!(b<0)){if(typeof z!=="number")return H.dv(z)
y=b>=z}else y=!0
if(y)return P.ch(b,a,"index",null,z)
return P.aI(b,"index",null)},
Z:function(a){return new P.R(!0,a,null,null)},
bQ:function(a){if(typeof a!=="number")throw H.i(H.Z(a))
return a},
i:function(a){var z
if(a==null)a=new P.bj()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.bZ})
z.name=""}else z.toString=H.bZ
return z},
bZ:function(){return J.ab(this.dartException)},
b1:function(a){throw H.i(a)},
dK:function(a){throw H.i(P.b9(a))},
a2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.dM(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.ah(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aE(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.bi(H.e(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$bp()
u=$.$get$bq()
t=$.$get$br()
s=$.$get$bs()
r=$.$get$bw()
q=$.$get$bx()
p=$.$get$bu()
$.$get$bt()
o=$.$get$bz()
n=$.$get$by()
m=v.k(y)
if(m!=null)return z.$1(H.aE(H.o(y),m))
else{m=u.k(y)
if(m!=null){m.method="call"
return z.$1(H.aE(H.o(y),m))}else{m=t.k(y)
if(m==null){m=s.k(y)
if(m==null){m=r.k(y)
if(m==null){m=q.k(y)
if(m==null){m=p.k(y)
if(m==null){m=s.k(y)
if(m==null){m=o.k(y)
if(m==null){m=n.k(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.bi(H.o(y),m))}}return z.$1(new H.cK(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.bk()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.R(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.bk()
return a},
a_:function(a){var z
if(a==null)return new H.bI(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.bI(a)},
dD:function(a,b,c,d,e,f){H.h(a,"$isaz")
switch(H.u(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.i(new P.cU("Unsupported number of arguments for wrapped closure"))},
a8:function(a,b){var z
H.u(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.dD)
a.$identity=z
return z},
c9:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(d).$isp){z.$reflectionInfo=d
x=H.cx(z).r}else x=d
w=e?Object.create(new H.cB().constructor.prototype):Object.create(new H.b3(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function(){this.$initialize()}
else{u=$.B
if(typeof u!=="number")return u.m()
$.B=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.b7(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.du,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.b5:H.aw
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.i("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.b7(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
c6:function(a,b,c,d){var z=H.aw
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
b7:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.c8(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.c6(y,!w,z,b)
if(y===0){w=$.B
if(typeof w!=="number")return w.m()
$.B=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.S
if(v==null){v=H.ad("self")
$.S=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.B
if(typeof w!=="number")return w.m()
$.B=w+1
t+=w
w="return function("+t+"){return this."
v=$.S
if(v==null){v=H.ad("self")
$.S=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
c7:function(a,b,c,d){var z,y
z=H.aw
y=H.b5
switch(b?-1:a){case 0:throw H.i(H.cz("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
c8:function(a,b){var z,y,x,w,v,u,t,s
z=$.S
if(z==null){z=H.ad("self")
$.S=z}y=$.b4
if(y==null){y=H.ad("receiver")
$.b4=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.c7(w,!u,x,b)
if(w===1){z="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
y=$.B
if(typeof y!=="number")return y.m()
$.B=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
y=$.B
if(typeof y!=="number")return y.m()
$.B=y+1
return new Function(z+y+"}")()},
aS:function(a,b,c,d,e,f,g){var z,y
z=J.a5(H.as(b))
H.u(c)
y=!!J.m(d).$isp?J.a5(d):d
return H.c9(a,z,c,y,!!e,f,g)},
o:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.i(H.G(a,"String"))},
u:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.i(H.G(a,"int"))},
dI:function(a,b){throw H.i(H.G(a,H.o(b).substring(3)))},
dH:function(a,b){var z=J.aW(b)
throw H.i(H.c5(a,z.F(b,3,z.gj(b))))},
h:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.m(a)[b])return a
H.dI(a,b)},
dC:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.dH(a,b)},
as:function(a){if(a==null)return a
if(!!J.m(a).$isp)return a
throw H.i(H.G(a,"List"))},
bR:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.u(z)]
else return a.$S()}return},
a9:function(a,b){var z,y
if(a==null)return!1
if(typeof a=="function")return!0
z=H.bR(J.m(a))
if(z==null)return!1
y=H.bU(z,null,b,null)
return y},
d:function(a,b){var z,y
if(a==null)return a
if($.aM)return a
$.aM=!0
try{if(H.a9(a,b))return a
z=H.aa(b)
y=H.G(a,z)
throw H.i(y)}finally{$.aM=!1}},
aV:function(a,b){if(a!=null&&!H.aQ(a,b))H.b1(H.G(a,H.aa(b)))
return a},
bM:function(a){var z
if(a instanceof H.k){z=H.bR(J.m(a))
if(z!=null)return H.aa(z)
return"Closure"}return H.U(a)},
dL:function(a){throw H.i(new P.cb(H.o(a)))},
bS:function(a){return init.getIsolateTag(a)},
b0:function(a,b){a.$ti=b
return a},
Q:function(a){if(a==null)return
return a.$ti},
iM:function(a,b,c){return H.a1(a["$as"+H.e(c)],H.Q(b))},
dt:function(a,b,c,d){var z
H.o(c)
H.u(d)
z=H.a1(a["$as"+H.e(c)],H.Q(b))
return z==null?null:z[d]},
A:function(a,b){var z
H.u(b)
z=H.Q(a)
return z==null?null:z[b]},
aa:function(a){var z=H.J(a,null)
return z},
J:function(a,b){var z,y
H.an(b,"$isp",[P.D],"$asp")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.aY(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(a===-2)return"dynamic"
if(typeof a==="number"){H.u(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.ar(b,y)
return H.e(b[y])}if('func' in a)return H.dd(a,b)
if('futureOr' in a)return"FutureOr<"+H.J("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
dd:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.D]
H.an(b,"$isp",z,"$asp")
if("bounds" in a){y=a.bounds
if(b==null){b=H.b0([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.e.L(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.ar(b,r)
t=C.c.m(t,b[r])
q=y[u]
if(q!=null&&q!==P.c)t+=" extends "+H.J(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.J(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.J(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.J(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.dp(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.o(z[l])
n=n+m+H.J(i[h],b)+(" "+H.e(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
aY:function(a,b,c){var z,y,x,w,v,u
H.an(c,"$isp",[P.D],"$asp")
if(a==null)return""
z=new P.bl("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.J(u,c)}v="<"+z.h(0)+">"
return v},
a1:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.Q(a)
y=J.m(a)
if(y[b]==null)return!1
return H.bO(H.a1(y[d],z),null,c,null)},
an:function(a,b,c,d){var z,y
H.o(b)
H.as(c)
H.o(d)
if(a==null)return a
z=H.aR(a,b,c,d)
if(z)return a
z=b.substring(3)
y=H.aY(c,0,null)
throw H.i(H.G(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(z+y,init.mangledGlobalNames)))},
bO:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.v(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.v(a[y],b,c[y],d))return!1
return!0},
iK:function(a,b,c){return a.apply(b,H.a1(J.m(b)["$as"+H.e(c)],H.Q(b)))},
bV:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="c"||a.builtin$cls==="q"||a===-1||a===-2||H.bV(z)}return!1},
aQ:function(a,b){var z,y,x
if(a==null){z=b==null||b.builtin$cls==="c"||b.builtin$cls==="q"||b===-1||b===-2||H.bV(b)
return z}z=b==null||b===-1||b.builtin$cls==="c"||b===-2
if(z)return!0
if(typeof b=="object"){z='futureOr' in b
if(z)if(H.aQ(a,"type" in b?b.type:null))return!0
if('func' in b)return H.a9(a,b)}y=J.m(a).constructor
x=H.Q(a)
if(x!=null){x=x.slice()
x.splice(0,0,y)
y=x}z=H.v(y,null,b,null)
return z},
r:function(a,b){if(a!=null&&!H.aQ(a,b))throw H.i(H.G(a,H.aa(b)))
return a},
v:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="c"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="c"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.v(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="q")return!0
if('func' in c)return H.bU(a,b,c,d)
if('func' in a)return c.builtin$cls==="az"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.v("type" in a?a.type:null,b,x,d)
else if(H.v(a,b,x,d))return!0
else{if(!('$is'+"T" in y.prototype))return!1
w=y.prototype["$as"+"T"]
v=H.a1(w,z?a.slice(1):null)
return H.v(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=H.aa(t)
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.bO(H.a1(r,z),b,u,d)},
bU:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.v(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.v(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.v(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.v(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.dG(m,b,l,d)},
dG:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.v(c[w],d,a[w],b))return!1}return!0},
iL:function(a,b,c){Object.defineProperty(a,H.o(b),{value:c,enumerable:false,writable:true,configurable:true})},
dE:function(a){var z,y,x,w,v,u
z=H.o($.bT.$1(a))
y=$.ao[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aq[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.o($.bN.$2(a,z))
if(z!=null){y=$.ao[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aq[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.at(x)
$.ao[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aq[z]=x
return x}if(v==="-"){u=H.at(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.bX(a,x)
if(v==="*")throw H.i(P.bA(z))
if(init.leafTags[z]===true){u=H.at(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.bX(a,x)},
bX:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aZ(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
at:function(a){return J.aZ(a,!1,null,!!a.$isaC)},
dF:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.at(z)
else return J.aZ(z,c,null,null)},
dA:function(){if(!0===$.aX)return
$.aX=!0
H.dB()},
dB:function(){var z,y,x,w,v,u,t,s
$.ao=Object.create(null)
$.aq=Object.create(null)
H.dw()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.bY.$1(v)
if(u!=null){t=H.dF(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
dw:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.P(C.p,H.P(C.v,H.P(C.h,H.P(C.h,H.P(C.u,H.P(C.q,H.P(C.r(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bT=new H.dx(v)
$.bN=new H.dy(u)
$.bY=new H.dz(t)},
P:function(a,b){return a(b)||b},
cw:{"^":"c;a,b,c,d,e,f,r,0x",i:{
cx:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.a5(z)
y=z[0]
x=z[1]
return new H.cw(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
cH:{"^":"c;a,b,c,d,e,f",
k:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
i:{
C:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.b0([],[P.D])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.cH(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aj:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
bv:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cp:{"^":"n;a,b",
h:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+z+"' on null"},
i:{
bi:function(a,b){return new H.cp(a,b==null?null:b.method)}}},
cm:{"^":"n;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.e(this.a)+")"},
i:{
aE:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.cm(a,y,z?null:b.receiver)}}},
cK:{"^":"n;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dM:{"^":"k:4;a",
$1:function(a){if(!!J.m(a).$isn)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
bI:{"^":"c;a,0b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isy:1},
k:{"^":"c;",
h:function(a){return"Closure '"+H.U(this).trim()+"'"},
gU:function(){return this},
$isaz:1,
gU:function(){return this}},
bm:{"^":"k;"},
cB:{"^":"bm;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
b3:{"^":"bm;a,b,c,d",
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+("Instance of '"+H.U(z)+"'")},
i:{
aw:function(a){return a.a},
b5:function(a){return a.c},
ad:function(a){var z,y,x,w,v
z=new H.b3("self","target","receiver","name")
y=J.a5(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
cI:{"^":"n;a",
h:function(a){return this.a},
i:{
G:function(a,b){return new H.cI("TypeError: "+H.e(P.af(a))+": type '"+H.bM(a)+"' is not a subtype of type '"+b+"'")}}},
c4:{"^":"n;a",
h:function(a){return this.a},
i:{
c5:function(a,b){return new H.c4("CastError: "+H.e(P.af(a))+": type '"+H.bM(a)+"' is not a subtype of type '"+b+"'")}}},
cy:{"^":"n;a",
h:function(a){return"RuntimeError: "+H.e(this.a)},
i:{
cz:function(a){return new H.cy(a)}}},
dx:{"^":"k:4;a",
$1:function(a){return this.a(a)}},
dy:{"^":"k:6;a",
$2:function(a,b){return this.a(a,b)}},
dz:{"^":"k:7;a",
$1:function(a){return this.a(H.o(a))}}}],["","",,H,{"^":"",
dp:function(a){return J.ci(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
H:function(a,b,c){if(a>>>0!==a||a>=c)throw H.i(H.aT(b,a))},
fQ:{"^":"j;","%":"ArrayBuffer"},
bg:{"^":"j;","%":";ArrayBufferView;aG|bE|bF|aH|bG|bH|F"},
fR:{"^":"bg;","%":"DataView"},
aG:{"^":"bg;",
gj:function(a){return a.length},
$isaC:1,
$asaC:I.aU},
aH:{"^":"bF;",
l:function(a,b){H.H(b,a,a.length)
return a[b]},
$asag:function(){return[P.I]},
$asa7:function(){return[P.I]},
$isa3:1,
$asa3:function(){return[P.I]},
$isp:1,
$asp:function(){return[P.I]}},
F:{"^":"bH;",
$asag:function(){return[P.a0]},
$asa7:function(){return[P.a0]},
$isa3:1,
$asa3:function(){return[P.a0]},
$isp:1,
$asp:function(){return[P.a0]}},
fS:{"^":"aH;","%":"Float32Array"},
fT:{"^":"aH;","%":"Float64Array"},
fU:{"^":"F;",
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":"Int16Array"},
fV:{"^":"F;",
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":"Int32Array"},
fW:{"^":"F;",
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":"Int8Array"},
fX:{"^":"F;",
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
fY:{"^":"F;",
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
fZ:{"^":"F;",
gj:function(a){return a.length},
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
h_:{"^":"F;",
gj:function(a){return a.length},
l:function(a,b){H.H(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
bE:{"^":"aG+a7;"},
bF:{"^":"bE+ag;"},
bG:{"^":"aG+a7;"},
bH:{"^":"bG+ag;"}}],["","",,P,{"^":"",
cM:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.dl()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a8(new P.cO(z),1)).observe(y,{childList:true})
return new P.cN(z,y,x)}else if(self.setImmediate!=null)return P.dm()
return P.dn()},
iv:[function(a){self.scheduleImmediate(H.a8(new P.cP(H.d(a,{func:1,ret:-1})),0))},"$1","dl",4,0,3],
iw:[function(a){self.setImmediate(H.a8(new P.cQ(H.d(a,{func:1,ret:-1})),0))},"$1","dm",4,0,3],
ix:[function(a){H.d(a,{func:1,ret:-1})
P.da(0,a)},"$1","dn",4,0,3],
dg:function(a,b){if(H.a9(a,{func:1,args:[P.c,P.y]}))return b.aq(a,null,P.c,P.y)
if(H.a9(a,{func:1,args:[P.c]}))return H.d(a,{func:1,ret:null,args:[P.c]})
throw H.i(P.b2(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
df:function(){var z,y
for(;z=$.O,z!=null;){$.Y=null
y=z.b
$.O=y
if(y==null)$.X=null
z.a.$0()}},
iJ:[function(){$.aN=!0
try{P.df()}finally{$.Y=null
$.aN=!1
if($.O!=null)$.$get$aL().$1(P.bP())}},"$0","bP",0,0,2],
bL:function(a){var z=new P.bB(H.d(a,{func:1,ret:-1}))
if($.O==null){$.X=z
$.O=z
if(!$.aN)$.$get$aL().$1(P.bP())}else{$.X.b=z
$.X=z}},
dj:function(a){var z,y,x
H.d(a,{func:1,ret:-1})
z=$.O
if(z==null){P.bL(a)
$.Y=$.X
return}y=new P.bB(a)
x=$.Y
if(x==null){y.b=z
$.Y=y
$.O=y}else{y.b=x.b
x.b=y
$.Y=y
if(y.b==null)$.X=y}},
dJ:function(a){var z,y
z={func:1,ret:-1}
H.d(a,z)
y=$.l
if(C.a===y){P.am(null,null,C.a,a)
return}y.toString
P.am(null,null,y,H.d(y.M(a),z))},
al:function(a,b,c,d,e){var z={}
z.a=d
P.dj(new P.dh(z,e))},
bJ:function(a,b,c,d,e){var z,y
H.d(d,{func:1,ret:e})
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
bK:function(a,b,c,d,e,f,g){var z,y
H.d(d,{func:1,ret:f,args:[g]})
H.r(e,g)
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
di:function(a,b,c,d,e,f,g,h,i){var z,y
H.d(d,{func:1,ret:g,args:[h,i]})
H.r(e,h)
H.r(f,i)
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
am:function(a,b,c,d){var z
H.d(d,{func:1,ret:-1})
z=C.a!==c
if(z)d=!(!z||!1)?c.M(d):c.aj(d,-1)
P.bL(d)},
cO:{"^":"k:5;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
cN:{"^":"k:8;a,b,c",
$1:function(a){var z,y
this.a.a=H.d(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
cP:{"^":"k:1;a",
$0:function(){this.a.$0()}},
cQ:{"^":"k:1;a",
$0:function(){this.a.$0()}},
d9:{"^":"c;a,0b,c",
a1:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.a8(new P.db(this,b),0),a)
else throw H.i(P.aK("`setTimeout()` not found."))},
i:{
da:function(a,b){var z=new P.d9(!0,0)
z.a1(a,b)
return z}}},
db:{"^":"k:2;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
N:{"^":"c;0a,b,c,d,e,$ti",
ap:function(a){if(this.c!==6)return!0
return this.b.b.E(H.d(this.d,{func:1,ret:P.aP,args:[P.c]}),a.a,P.aP,P.c)},
an:function(a){var z,y,x,w
z=this.e
y=P.c
x={futureOr:1,type:H.A(this,1)}
w=this.b.b
if(H.a9(z,{func:1,args:[P.c,P.y]}))return H.aV(w.as(z,a.a,a.b,null,y,P.y),x)
else return H.aV(w.E(H.d(z,{func:1,args:[P.c]}),a.a,null,y),x)}},
E:{"^":"c;K:a<,b,0af:c<,$ti",
T:function(a,b,c){var z,y,x,w
z=H.A(this,0)
H.d(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.l
if(y!==C.a){y.toString
H.d(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.dg(b,y)}H.d(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.E(0,$.l,[c])
w=b==null?1:3
this.G(new P.N(x,w,a,b,[z,c]))
return x},
av:function(a,b){return this.T(a,null,b)},
G:function(a){var z,y
z=this.a
if(z<=1){a.a=H.h(this.c,"$isN")
this.c=a}else{if(z===2){y=H.h(this.c,"$isE")
z=y.a
if(z<4){y.G(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.am(null,null,z,H.d(new P.cV(this,a),{func:1,ret:-1}))}},
J:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.h(this.c,"$isN")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.h(this.c,"$isE")
y=u.a
if(y<4){u.J(a)
return}this.a=y
this.c=u.c}z.a=this.n(a)
y=this.b
y.toString
P.am(null,null,y,H.d(new P.d_(z,this),{func:1,ret:-1}))}},
A:function(){var z=H.h(this.c,"$isN")
this.c=null
return this.n(z)},
n:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
H:function(a){var z,y,x,w
z=H.A(this,0)
H.aV(a,{futureOr:1,type:z})
y=this.$ti
x=H.aR(a,"$isT",y,"$asT")
if(x){z=H.aR(a,"$isE",y,null)
if(z)P.bC(a,this)
else P.cW(a,this)}else{w=this.A()
H.r(a,z)
this.a=4
this.c=a
P.W(this,w)}},
t:[function(a,b){var z
H.h(b,"$isy")
z=this.A()
this.a=8
this.c=new P.t(a,b)
P.W(this,z)},function(a){return this.t(a,null)},"ax","$2","$1","ga4",4,2,9],
$isT:1,
i:{
cW:function(a,b){var z,y,x
b.a=1
try{a.T(new P.cX(b),new P.cY(b),null)}catch(x){z=H.a2(x)
y=H.a_(x)
P.dJ(new P.cZ(b,z,y))}},
bC:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.h(a.c,"$isE")
if(z>=4){y=b.A()
b.a=a.a
b.c=a.c
P.W(b,y)}else{y=H.h(b.c,"$isN")
b.a=2
b.c=a
a.J(y)}},
W:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.h(y.c,"$ist")
y=y.b
u=v.a
t=v.b
y.toString
P.al(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.W(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.h(r,"$ist")
y=y.b
u=r.a
t=r.b
y.toString
P.al(null,null,y,u,t)
return}o=$.l
if(o==null?q!=null:o!==q)$.l=q
else o=null
y=b.c
if(y===8)new P.d2(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.d1(x,b,r).$0()}else if((y&2)!==0)new P.d0(z,x,b).$0()
if(o!=null)$.l=o
y=x.b
if(!!J.m(y).$isT){if(y.a>=4){n=H.h(t.c,"$isN")
t.c=null
b=t.n(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.bC(y,t)
return}}m=b.b
n=H.h(m.c,"$isN")
m.c=null
b=m.n(n)
y=x.a
u=x.b
if(!y){H.r(u,H.A(m,0))
m.a=4
m.c=u}else{H.h(u,"$ist")
m.a=8
m.c=u}z.a=m
y=m}}}},
cV:{"^":"k:1;a,b",
$0:function(){P.W(this.a,this.b)}},
d_:{"^":"k:1;a,b",
$0:function(){P.W(this.b,this.a.a)}},
cX:{"^":"k:5;a",
$1:function(a){var z=this.a
z.a=0
z.H(a)}},
cY:{"^":"k:10;a",
$2:function(a,b){this.a.t(a,H.h(b,"$isy"))},
$1:function(a){return this.$2(a,null)}},
cZ:{"^":"k:1;a,b,c",
$0:function(){this.a.t(this.b,this.c)}},
d2:{"^":"k:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.S(H.d(w.d,{func:1}),null)}catch(v){y=H.a2(v)
x=H.a_(v)
if(this.d){w=H.h(this.a.a.c,"$ist").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.h(this.a.a.c,"$ist")
else u.b=new P.t(y,x)
u.a=!0
return}if(!!J.m(z).$isT){if(z instanceof P.E&&z.gK()>=4){if(z.gK()===8){w=this.b
w.b=H.h(z.gaf(),"$ist")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.av(new P.d3(t),null)
w.a=!1}}},
d3:{"^":"k:11;a",
$1:function(a){return this.a}},
d1:{"^":"k:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.A(x,0)
v=H.r(this.c,w)
u=H.A(x,1)
this.a.b=x.b.b.E(H.d(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.a2(t)
y=H.a_(t)
x=this.a
x.b=new P.t(z,y)
x.a=!0}}},
d0:{"^":"k:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.h(this.a.a.c,"$ist")
w=this.c
if(w.ap(z)&&w.e!=null){v=this.b
v.b=w.an(z)
v.a=!1}}catch(u){y=H.a2(u)
x=H.a_(u)
w=H.h(this.a.a.c,"$ist")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.t(y,x)
s.a=!0}}},
bB:{"^":"c;a,0b"},
cC:{"^":"c;$ti",
gj:function(a){var z,y
z={}
y=new P.E(0,$.l,[P.a0])
z.a=0
this.ao(new P.cE(z,this),!0,new P.cF(z,y),y.ga4())
return y}},
cE:{"^":"k;a,b",
$1:function(a){H.r(a,H.A(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.q,args:[H.A(this.b,0)]}}},
cF:{"^":"k:1;a,b",
$0:function(){this.b.H(this.a.a)}},
cD:{"^":"c;$ti"},
t:{"^":"c;a,b",
h:function(a){return H.e(this.a)},
$isn:1},
dc:{"^":"c;",$isiu:1},
dh:{"^":"k:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bj()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.i(z)
x=H.i(z)
x.stack=y.h(0)
throw x}},
d5:{"^":"dc;",
at:function(a){var z,y,x
H.d(a,{func:1,ret:-1})
try{if(C.a===$.l){a.$0()
return}P.bJ(null,null,this,a,-1)}catch(x){z=H.a2(x)
y=H.a_(x)
P.al(null,null,this,z,H.h(y,"$isy"))}},
au:function(a,b,c){var z,y,x
H.d(a,{func:1,ret:-1,args:[c]})
H.r(b,c)
try{if(C.a===$.l){a.$1(b)
return}P.bK(null,null,this,a,b,-1,c)}catch(x){z=H.a2(x)
y=H.a_(x)
P.al(null,null,this,z,H.h(y,"$isy"))}},
aj:function(a,b){return new P.d7(this,H.d(a,{func:1,ret:b}),b)},
M:function(a){return new P.d6(this,H.d(a,{func:1,ret:-1}))},
ak:function(a,b){return new P.d8(this,H.d(a,{func:1,ret:-1,args:[b]}),b)},
S:function(a,b){H.d(a,{func:1,ret:b})
if($.l===C.a)return a.$0()
return P.bJ(null,null,this,a,b)},
E:function(a,b,c,d){H.d(a,{func:1,ret:c,args:[d]})
H.r(b,d)
if($.l===C.a)return a.$1(b)
return P.bK(null,null,this,a,b,c,d)},
as:function(a,b,c,d,e,f){H.d(a,{func:1,ret:d,args:[e,f]})
H.r(b,e)
H.r(c,f)
if($.l===C.a)return a.$2(b,c)
return P.di(null,null,this,a,b,c,d,e,f)},
aq:function(a,b,c,d){return H.d(a,{func:1,ret:b,args:[c,d]})}},
d7:{"^":"k;a,b,c",
$0:function(){return this.a.S(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
d6:{"^":"k:2;a,b",
$0:function(){return this.a.at(this.b)}},
d8:{"^":"k;a,b,c",
$1:function(a){var z=this.c
return this.a.au(this.b,H.r(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
bd:function(a,b,c){var z,y,x
if(P.de(a))return b+"..."+c
z=new P.bl(b)
y=$.$get$aO()
C.e.L(y,a)
try{x=z
x.a=P.cG(x.gu(),a,", ")}finally{if(0>=y.length)return H.ar(y,-1)
y.pop()}y=z
y.a=y.gu()+c
y=z.gu()
return y.charCodeAt(0)==0?y:y},
de:function(a){var z,y
for(z=0;y=$.$get$aO(),z<y.length;++z)if(a===y[z])return!0
return!1},
a7:{"^":"c;$ti",
gN:function(a){return new H.cn(a,this.gj(a),0,[H.dt(this,a,"a7",0)])},
am:function(a,b){return this.l(a,b)},
h:function(a){return P.bd(a,"[","]")}}}],["","",,P,{"^":"",
cd:function(a){var z=J.m(a)
if(!!z.$isk)return z.h(a)
return"Instance of '"+H.U(a)+"'"},
af:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ab(a)
if(typeof a==="string")return JSON.stringify(a)
return P.cd(a)},
aP:{"^":"c;"},
"+bool":0,
I:{"^":"b_;"},
"+double":0,
n:{"^":"c;"},
bj:{"^":"n;",
h:function(a){return"Throw of null."}},
R:{"^":"n;a,b,c,d",
gw:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gv:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gw()+y+x
if(!this.a)return w
v=this.gv()
u=P.af(this.b)
return w+v+": "+H.e(u)},
i:{
b2:function(a,b,c){return new P.R(!0,a,b,c)}}},
cv:{"^":"R;e,f,a,b,c,d",
gw:function(){return"RangeError"},
gv:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else if(x>z)y=": Not in range "+H.e(z)+".."+H.e(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.e(z)}return y},
i:{
aI:function(a,b,c){return new P.cv(null,null,!0,a,b,"Value not in range")}}},
cg:{"^":"R;e,j:f>,a,b,c,d",
gw:function(){return"RangeError"},
gv:function(){if(J.c_(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.e(z)},
i:{
ch:function(a,b,c,d,e){var z=H.u(e!=null?e:J.au(b))
return new P.cg(b,z,!0,a,c,"Index out of range")}}},
cL:{"^":"n;a",
h:function(a){return"Unsupported operation: "+this.a},
i:{
aK:function(a){return new P.cL(a)}}},
cJ:{"^":"n;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
i:{
bA:function(a){return new P.cJ(a)}}},
ca:{"^":"n;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.af(z))+"."},
i:{
b9:function(a){return new P.ca(a)}}},
bk:{"^":"c;",
h:function(a){return"Stack Overflow"},
$isn:1},
cb:{"^":"n;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
eE:{"^":"c;"},
cU:{"^":"c;a",
h:function(a){return"Exception: "+this.a}},
a0:{"^":"b_;"},
"+int":0,
p:{"^":"c;$ti",$isa3:1},
"+List":0,
q:{"^":"c;",
h:function(a){return"null"}},
"+Null":0,
b_:{"^":"c;"},
"+num":0,
c:{"^":";",
h:function(a){return"Instance of '"+H.U(this)+"'"},
toString:function(){return this.h(this)}},
y:{"^":"c;"},
D:{"^":"c;"},
"+String":0,
bl:{"^":"c;u:a<",
gj:function(a){return this.a.length},
h:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
i:{
cG:function(a,b,c){var z=J.c1(b)
if(!z.q())return a
if(c.length===0){do a+=H.e(z.gp())
while(z.q())}else{a+=H.e(z.gp())
for(;z.q();)a=a+c+H.e(z.gp())}return a}}}}],["","",,W,{"^":"",
dk:function(a,b){var z
H.d(a,{func:1,ret:-1,args:[b]})
z=$.l
if(z===C.a)return a
return z.ak(a,b)},
a:{"^":"ay;","%":";HTMLElement"},
dO:{"^":"w;","%":"AbortPaymentEvent"},
dP:{"^":"a;",
h:function(a){return String(a)},
"%":"HTMLAnchorElement"},
dY:{"^":"b;","%":"AnimationEvent"},
dZ:{"^":"b;","%":"AnimationPlaybackEvent"},
e_:{"^":"b;","%":"ApplicationCacheErrorEvent"},
e0:{"^":"a;",
h:function(a){return String(a)},
"%":"HTMLAreaElement"},
e1:{"^":"bf;","%":"HTMLAudioElement"},
e3:{"^":"a;","%":"HTMLBRElement"},
e4:{"^":"av;","%":"BackgroundFetchClickEvent"},
av:{"^":"w;","%":";BackgroundFetchEvent"},
e5:{"^":"av;","%":"BackgroundFetchFailEvent"},
e6:{"^":"av;","%":"BackgroundFetchedEvent"},
e7:{"^":"a;","%":"HTMLBaseElement"},
e8:{"^":"b;","%":"BeforeInstallPromptEvent"},
e9:{"^":"b;","%":"BeforeUnloadEvent"},
c3:{"^":"j;","%":";Blob"},
ea:{"^":"b;","%":"BlobEvent"},
eb:{"^":"a;","%":"HTMLBodyElement"},
ec:{"^":"a;","%":"HTMLButtonElement"},
ed:{"^":"w;","%":"CanMakePaymentEvent"},
ax:{"^":"a;",
W:function(a,b,c){return a.getContext(b)},
V:function(a,b){return this.W(a,b,null)},
$isax:1,
"%":"HTMLCanvasElement"},
ee:{"^":"j;","%":"CanvasGradient"},
ef:{"^":"j;","%":"CanvasPattern"},
b6:{"^":"j;",$isb6:1,"%":"CanvasRenderingContext2D"},
ei:{"^":"b;","%":"ClipboardEvent"},
ej:{"^":"b;","%":"CloseEvent"},
ek:{"^":"V;","%":"CompositionEvent"},
el:{"^":"a;","%":"HTMLContentElement"},
en:{"^":"b;","%":"CustomEvent"},
eo:{"^":"a;","%":"HTMLDListElement"},
ep:{"^":"a;","%":"HTMLDataElement"},
eq:{"^":"a;","%":"HTMLDataListElement"},
et:{"^":"a;","%":"HTMLDetailsElement"},
eu:{"^":"b;","%":"DeviceMotionEvent"},
ev:{"^":"b;","%":"DeviceOrientationEvent"},
ew:{"^":"a;","%":"HTMLDialogElement"},
ey:{"^":"a;","%":"HTMLDivElement"},
cc:{"^":"bh;","%":";Document"},
ez:{"^":"j;","%":"DOMError"},
eA:{"^":"j;",
h:function(a){return String(a)},
"%":"DOMException"},
ay:{"^":"bh;",
h:function(a){return a.localName},
$isay:1,
"%":";Element"},
eC:{"^":"a;","%":"HTMLEmbedElement"},
eD:{"^":"b;","%":"ErrorEvent"},
b:{"^":"j;",$isb:1,"%":";Event|InputEvent"},
bb:{"^":"j;",
a2:function(a,b,c,d){return a.addEventListener(b,H.a8(H.d(c,{func:1,args:[W.b]}),1),!1)},
"%":";EventTarget"},
w:{"^":"b;","%":";ExtendableEvent"},
eF:{"^":"w;","%":"ExtendableMessageEvent"},
f3:{"^":"w;","%":"FetchEvent"},
f4:{"^":"a;","%":"HTMLFieldSetElement"},
f5:{"^":"c3;","%":"File"},
f7:{"^":"V;","%":"FocusEvent"},
f8:{"^":"b;","%":"FontFaceSetLoadEvent"},
f9:{"^":"w;","%":"ForeignFetchEvent"},
fb:{"^":"a;0j:length=","%":"HTMLFormElement"},
fd:{"^":"b;","%":"GamepadEvent"},
fe:{"^":"a;","%":"HTMLHRElement"},
ff:{"^":"b;","%":"HashChangeEvent"},
fg:{"^":"a;","%":"HTMLHeadElement"},
fh:{"^":"a;","%":"HTMLHeadingElement"},
fi:{"^":"cc;","%":"HTMLDocument"},
fj:{"^":"a;","%":"HTMLHtmlElement"},
fk:{"^":"a;","%":"HTMLIFrameElement"},
fl:{"^":"a;","%":"HTMLImageElement"},
fn:{"^":"a;",$isL:1,$isae:1,"%":"HTMLInputElement"},
fo:{"^":"w;","%":"InstallEvent"},
fr:{"^":"V;","%":"KeyboardEvent"},
fs:{"^":"a;","%":"HTMLLIElement"},
ft:{"^":"a;","%":"HTMLLabelElement"},
fu:{"^":"a;","%":"HTMLLegendElement"},
fx:{"^":"a;","%":"HTMLLinkElement"},
fy:{"^":"a;","%":"HTMLMapElement"},
bf:{"^":"a;","%":";HTMLMediaElement"},
fB:{"^":"b;","%":"MediaEncryptedEvent"},
fC:{"^":"j;","%":"MediaError"},
fD:{"^":"b;","%":"MediaKeyMessageEvent"},
fE:{"^":"b;","%":"MediaQueryListEvent"},
fF:{"^":"b;","%":"MediaStreamEvent"},
fG:{"^":"b;","%":"MediaStreamTrackEvent"},
fH:{"^":"a;","%":"HTMLMenuElement"},
fI:{"^":"b;","%":"MessageEvent"},
fJ:{"^":"a;","%":"HTMLMetaElement"},
fL:{"^":"a;","%":"HTMLMeterElement"},
fM:{"^":"b;","%":"MIDIConnectionEvent"},
fN:{"^":"b;","%":"MIDIMessageEvent"},
fO:{"^":"a;","%":"HTMLModElement"},
aF:{"^":"V;","%":";DragEvent|MouseEvent"},
fP:{"^":"b;","%":"MutationEvent"},
h0:{"^":"co;","%":"Navigator"},
co:{"^":"j;","%":";NavigatorConcurrentHardware"},
h1:{"^":"j;","%":"NavigatorUserMediaError"},
bh:{"^":"bb;",
h:function(a){var z=a.nodeValue
return z==null?this.a_(a):z},
"%":";Node"},
h2:{"^":"w;","%":"NotificationEvent"},
h3:{"^":"a;","%":"HTMLOListElement"},
h4:{"^":"a;","%":"HTMLObjectElement"},
h6:{"^":"a;","%":"HTMLOptGroupElement"},
h7:{"^":"a;","%":"HTMLOptionElement"},
h8:{"^":"a;","%":"HTMLOutputElement"},
h9:{"^":"j;","%":"OverconstrainedError"},
ha:{"^":"b;","%":"PageTransitionEvent"},
hb:{"^":"a;","%":"HTMLParagraphElement"},
hc:{"^":"a;","%":"HTMLParamElement"},
hf:{"^":"w;","%":"PaymentRequestEvent"},
hg:{"^":"b;","%":"PaymentRequestUpdateEvent"},
hh:{"^":"a;","%":"HTMLPictureElement"},
hi:{"^":"aF;","%":"PointerEvent"},
hl:{"^":"b;","%":"PopStateEvent"},
hm:{"^":"j;","%":"PositionError"},
hn:{"^":"a;","%":"HTMLPreElement"},
ho:{"^":"b;","%":"PresentationConnectionAvailableEvent"},
hp:{"^":"b;","%":"PresentationConnectionCloseEvent"},
hq:{"^":"a;","%":"HTMLProgressElement"},
ct:{"^":"b;","%":";ProgressEvent"},
hr:{"^":"b;","%":"PromiseRejectionEvent"},
hs:{"^":"w;","%":"PushEvent"},
ht:{"^":"a;","%":"HTMLQuoteElement"},
hz:{"^":"b;","%":"RTCDataChannelEvent"},
hA:{"^":"b;","%":"RTCDTMFToneChangeEvent"},
hB:{"^":"b;","%":"RTCPeerConnectionIceEvent"},
hC:{"^":"b;","%":"RTCTrackEvent"},
hD:{"^":"a;","%":"HTMLScriptElement"},
hF:{"^":"b;","%":"SecurityPolicyViolationEvent"},
hG:{"^":"a;0j:length=","%":"HTMLSelectElement"},
hH:{"^":"b;","%":"SensorErrorEvent"},
hJ:{"^":"a;","%":"HTMLShadowElement"},
hK:{"^":"a;","%":"HTMLSlotElement"},
hL:{"^":"a;","%":"HTMLSourceElement"},
hM:{"^":"a;","%":"HTMLSpanElement"},
hN:{"^":"b;","%":"SpeechRecognitionError"},
hO:{"^":"b;","%":"SpeechRecognitionEvent"},
hP:{"^":"b;","%":"SpeechSynthesisEvent"},
hS:{"^":"b;","%":"StorageEvent"},
hT:{"^":"a;","%":"HTMLStyleElement"},
hY:{"^":"w;","%":"SyncEvent"},
i_:{"^":"a;","%":"HTMLTableCaptionElement"},
i0:{"^":"a;","%":"HTMLTableCellElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement"},
i1:{"^":"a;","%":"HTMLTableColElement"},
i2:{"^":"a;","%":"HTMLTableElement"},
i3:{"^":"a;","%":"HTMLTableRowElement"},
i4:{"^":"a;","%":"HTMLTableSectionElement"},
i5:{"^":"a;","%":"HTMLTemplateElement"},
i6:{"^":"a;","%":"HTMLTextAreaElement"},
i8:{"^":"V;","%":"TextEvent"},
ia:{"^":"a;","%":"HTMLTimeElement"},
ib:{"^":"a;","%":"HTMLTitleElement"},
id:{"^":"V;","%":"TouchEvent"},
ie:{"^":"a;","%":"HTMLTrackElement"},
ig:{"^":"b;","%":"TrackEvent"},
ih:{"^":"b;","%":"TransitionEvent|WebKitTransitionEvent"},
V:{"^":"b;","%":";UIEvent"},
ii:{"^":"a;","%":"HTMLUListElement"},
ij:{"^":"a;","%":"HTMLUnknownElement"},
il:{"^":"b;","%":"VRDeviceEvent"},
im:{"^":"b;","%":"VRDisplayEvent"},
io:{"^":"b;","%":"VRSessionEvent"},
iq:{"^":"bf;","%":"HTMLVideoElement"},
is:{"^":"aF;","%":"WheelEvent"},
it:{"^":"bb;","%":"DOMWindow|Window"},
iz:{"^":"a;","%":"HTMLDirectoryElement"},
iA:{"^":"a;","%":"HTMLFontElement"},
iB:{"^":"a;","%":"HTMLFrameElement"},
iC:{"^":"a;","%":"HTMLFrameSetElement"},
iD:{"^":"a;","%":"HTMLMarqueeElement"},
iE:{"^":"b;","%":"MojoInterfaceRequestEvent"},
iF:{"^":"ct;","%":"ResourceProgressEvent"},
iI:{"^":"b;","%":"USBConnectionEvent"},
cR:{"^":"cC;$ti",
ao:function(a,b,c,d){var z=H.A(this,0)
H.d(a,{func:1,ret:-1,args:[z]})
H.d(c,{func:1,ret:-1})
return W.z(this.a,this.b,a,!1,z)}},
iy:{"^":"cR;a,b,c,$ti"},
cS:{"^":"cD;a,b,c,d,e,$ti",
ai:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
H.d(z,{func:1,args:[W.b]})
if(y)J.c0(x,this.c,z,!1)}},
i:{
z:function(a,b,c,d,e){var z=W.dk(new W.cT(c),W.b)
z=new W.cS(0,a,b,z,!1,[e])
z.ai()
return z}}},
cT:{"^":"k:12;a",
$1:function(a){return this.a.$1(H.h(a,"$isb"))}}}],["","",,P,{"^":"",ip:{"^":"b;","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",d4:{"^":"c;",
O:function(){return Math.random()}},ai:{"^":"c;a,b,$ti",
h:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"}},hv:{"^":"c;"}}],["","",,P,{"^":"",dN:{"^":"x;","%":"SVGAElement"},dQ:{"^":"ac;","%":"SVGAnimateElement"},dR:{"^":"ac;","%":"SVGAnimateMotionElement"},dS:{"^":"ac;","%":"SVGAnimateTransformElement"},dT:{"^":"j;","%":"SVGAnimatedLength"},dU:{"^":"j;","%":"SVGAnimatedLengthList"},dV:{"^":"j;","%":"SVGAnimatedNumber"},dW:{"^":"j;","%":"SVGAnimatedNumberList"},dX:{"^":"j;","%":"SVGAnimatedString"},ac:{"^":"f;","%":";SVGAnimationElement"},eg:{"^":"K;","%":"SVGCircleElement"},eh:{"^":"x;","%":"SVGClipPathElement"},er:{"^":"x;","%":"SVGDefsElement"},es:{"^":"f;","%":"SVGDescElement"},ex:{"^":"f;","%":"SVGDiscardElement"},eB:{"^":"K;","%":"SVGEllipseElement"},eG:{"^":"f;","%":"SVGFEBlendElement"},eH:{"^":"f;","%":"SVGFEColorMatrixElement"},eI:{"^":"f;","%":"SVGFEComponentTransferElement"},eJ:{"^":"f;","%":"SVGFECompositeElement"},eK:{"^":"f;","%":"SVGFEConvolveMatrixElement"},eL:{"^":"f;","%":"SVGFEDiffuseLightingElement"},eM:{"^":"f;","%":"SVGFEDisplacementMapElement"},eN:{"^":"f;","%":"SVGFEDistantLightElement"},eO:{"^":"f;","%":"SVGFEFloodElement"},eP:{"^":"ak;","%":"SVGFEFuncAElement"},eQ:{"^":"ak;","%":"SVGFEFuncBElement"},eR:{"^":"ak;","%":"SVGFEFuncGElement"},eS:{"^":"ak;","%":"SVGFEFuncRElement"},eT:{"^":"f;","%":"SVGFEGaussianBlurElement"},eU:{"^":"f;","%":"SVGFEImageElement"},eV:{"^":"f;","%":"SVGFEMergeElement"},eW:{"^":"f;","%":"SVGFEMergeNodeElement"},eX:{"^":"f;","%":"SVGFEMorphologyElement"},eY:{"^":"f;","%":"SVGFEOffsetElement"},eZ:{"^":"f;","%":"SVGFEPointLightElement"},f_:{"^":"f;","%":"SVGFESpecularLightingElement"},f0:{"^":"f;","%":"SVGFESpotLightElement"},f1:{"^":"f;","%":"SVGFETileElement"},f2:{"^":"f;","%":"SVGFETurbulenceElement"},f6:{"^":"f;","%":"SVGFilterElement"},fa:{"^":"x;","%":"SVGForeignObjectElement"},fc:{"^":"x;","%":"SVGGElement"},K:{"^":"x;","%":";SVGGeometryElement"},x:{"^":"f;","%":";SVGGraphicsElement"},fm:{"^":"x;","%":"SVGImageElement"},fv:{"^":"K;","%":"SVGLineElement"},fw:{"^":"bD;","%":"SVGLinearGradientElement"},fz:{"^":"f;","%":"SVGMarkerElement"},fA:{"^":"f;","%":"SVGMaskElement"},fK:{"^":"f;","%":"SVGMetadataElement"},hd:{"^":"K;","%":"SVGPathElement"},he:{"^":"f;","%":"SVGPatternElement"},hj:{"^":"K;","%":"SVGPolygonElement"},hk:{"^":"K;","%":"SVGPolylineElement"},hu:{"^":"bD;","%":"SVGRadialGradientElement"},hw:{"^":"K;","%":"SVGRectElement"},hE:{"^":"f;","%":"SVGScriptElement"},hI:{"^":"ac;","%":"SVGSetElement"},hR:{"^":"f;","%":"SVGStopElement"},hU:{"^":"f;","%":"SVGStyleElement"},f:{"^":"ay;","%":";SVGElement"},hV:{"^":"x;","%":"SVGSVGElement"},hW:{"^":"x;","%":"SVGSwitchElement"},hX:{"^":"f;","%":"SVGSymbolElement"},hZ:{"^":"bo;","%":"SVGTSpanElement"},bn:{"^":"x;","%":";SVGTextContentElement"},i7:{"^":"bo;","%":"SVGTextElement"},i9:{"^":"bn;","%":"SVGTextPathElement"},bo:{"^":"bn;","%":";SVGTextPositioningElement"},ic:{"^":"f;","%":"SVGTitleElement"},ik:{"^":"x;","%":"SVGUseElement"},ir:{"^":"f;","%":"SVGViewElement"},bD:{"^":"f;","%":";SVGGradientElement"},ak:{"^":"f;","%":";SVGComponentTransferFunctionElement"},iG:{"^":"f;","%":"SVGFEDropShadowElement"},iH:{"^":"f;","%":"SVGMPathElement"}}],["","",,P,{"^":"",e2:{"^":"b;","%":"AudioProcessingEvent"},h5:{"^":"b;","%":"OfflineAudioCompletionEvent"}}],["","",,P,{"^":"",em:{"^":"b;","%":"WebGLContextEvent"},hx:{"^":"j;","%":"WebGLRenderingContext"},hy:{"^":"j;","%":"WebGL2RenderingContext"}}],["","",,P,{"^":"",hQ:{"^":"j;","%":"SQLError"}}],["","",,K,{"^":"",b8:{"^":"c;a,b,c"}}],["","",,T,{"^":"",bc:{"^":"c;a,b,c",
P:function(){var z=T.ce(this.a,this.b)
this.b=this.b+this.c
return z},
i:{
ce:function(a,b){var z,y
for(z=0,y=1;b>0;){y/=a
z+=y*C.f.Y(b,a)
b/=a}return z}}}}],["","",,U,{"^":"",cf:{"^":"c;a,b",
gR:function(){return new P.ai(this.a.P(),this.b.P(),[P.I])},
$iscr:1}}],["","",,F,{"^":"",
bW:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=document
y=H.h(z.querySelector("#canvas"),"$isax")
x=window.innerWidth
w=window.innerHeight
v=C.f.ar(Math.min(H.bQ(x),H.bQ(w))*0.6)
y.width=v
y.height=v
u=H.dC((y&&C.l).V(y,"2d"),"$isb6")
w=H.h(z.querySelector("#x_base"),"$isL")
x=H.h(z.querySelector("#y_base"),"$isL")
t=H.h(z.querySelector("#x_index_increment"),"$isL")
s=H.h(z.querySelector("#y_index_increment"),"$isL")
r=H.h(z.querySelector("#x_index"),"$isL")
q=H.h(z.querySelector("#y_index"),"$isL")
p=H.h(z.querySelector("#points_count_box"),"$isL")
o=H.h(z.querySelector("#plot_random_button"),"$isae")
n=H.h(z.querySelector("#plot_halton_button"),"$isae")
m=H.h(z.querySelector("#reset_halton_button"),"$isae")
z=H.h(z.querySelector("#clear_canvas_button"),"$isae")
l=y.width
l.toString
if(typeof l!=="number")return l.aw()
l=new T.cA(u,l,l*0.008,w,x,t,s,r,q,p,o,n,m,z,new R.cu(C.k),new U.cf(new T.bc(2,1,1),new T.bc(3,1,1)))
w.toString
k=W.b
j={func:1,ret:-1,args:[k]}
W.z(w,"change",H.d(l.ga9(),j),!1,k)
w.disabled=!1
x.toString
W.z(x,"change",H.d(l.gac(),j),!1,k)
x.disabled=!1
t.toString
W.z(t,"change",H.d(l.gaa(),j),!1,k)
t.disabled=!1
s.toString
W.z(s,"change",H.d(l.gad(),j),!1,k)
s.disabled=!1
r.toString
W.z(r,"change",H.d(l.gab(),j),!1,k)
r.disabled=!1
q.toString
W.z(q,"change",H.d(l.gae(),j),!1,k)
q.disabled=!1
p.disabled=!1
o.toString
p=W.aF
q={func:1,ret:-1,args:[p]}
W.z(o,"click",H.d(l.ga7(),q),!1,p)
o.disabled=!1
n.toString
W.z(n,"click",H.d(l.ga6(),q),!1,p)
n.disabled=!1
m.toString
W.z(m,"click",H.d(l.ga8(),q),!1,p)
m.disabled=!1
z.toString
W.z(z,"click",H.d(l.ga5(),q),!1,p)
z.disabled=!1
l.B()}},1],["","",,R,{"^":"",cu:{"^":"c;a",
gR:function(){var z=this.a
return new P.ai(z.O(),z.O(),[P.I])},
$iscr:1}}],["","",,T,{"^":"",cA:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
aC:[function(a){var z=T.M(this.d,2,1e6,2)
this.dx.a.a=z
return z},"$1","ga9",4,0,0],
aF:[function(a){var z=T.M(this.e,3,1e6,2)
this.dx.b.a=z
return z},"$1","gac",4,0,0],
aD:[function(a){var z=T.M(this.f,1,1e6,0)
this.dx.a.c=z
return z},"$1","gaa",4,0,0],
aG:[function(a){var z=T.M(this.r,1,1e6,0)
this.dx.b.c=z
return z},"$1","gad",4,0,0],
aE:[function(a){var z=T.M(this.x,1,1e7,0)
this.dx.a.b=z
return z},"$1","gab",4,0,0],
aH:[function(a){var z=T.M(this.y,1,1e7,0)
this.dx.b.b=z
return z},"$1","gae",4,0,0],
aA:[function(a){return this.I(this.db,C.m)},"$1","ga7",4,0,0],
az:[function(a){this.I(this.dx,C.n)
this.B()},"$1","ga6",4,0,0],
I:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=T.M(this.z,1,1e4,1)
for(y=[P.I],x=this.b,w=this.a,v=b.a,u=b.b,t=b.c,s=this.c,r=s*0.5,q=0;q<z;++q){p=H.an(a.gR(),"$isai",y,"$asai")
w.toString
w.fillStyle="rgba("+v+", "+u+", "+t+", 1)"
w.fillRect(p.a*x-r,p.b*x-r,s,s)}},
aB:[function(a){var z=this.dx
z.a.b=1
z.b.b=1
this.B()},"$1","ga8",4,0,0],
ay:[function(a){var z=this.b
return this.a.clearRect(0,0,z,z)},"$1","ga5",4,0,0],
B:function(){var z,y
z=this.dx
y=z.a
this.d.value=C.b.h(y.a)
z=z.b
this.e.value=C.b.h(z.a)
this.f.value=C.b.h(y.c)
this.r.value=C.b.h(z.c)
this.x.value=C.b.h(y.b)
this.y.value=C.b.h(z.b)},
i:{
M:function(a,b,c,d){var z=H.cs(a.value,null)
z=H.u(C.b.al(z==null?b:z,d,c))
a.valueAsNumber=z
return z}}}}]]
setupProgram(dart,0,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.be.prototype
return J.ck.prototype}if(typeof a=="string")return J.aA.prototype
if(a==null)return J.cl.prototype
if(typeof a=="boolean")return J.cj.prototype
if(a.constructor==Array)return J.a4.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a6.prototype
return a}if(a instanceof P.c)return a
return J.ap(a)}
J.aW=function(a){if(typeof a=="string")return J.aA.prototype
if(a==null)return a
if(a.constructor==Array)return J.a4.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a6.prototype
return a}if(a instanceof P.c)return a
return J.ap(a)}
J.dq=function(a){if(a==null)return a
if(a.constructor==Array)return J.a4.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a6.prototype
return a}if(a instanceof P.c)return a
return J.ap(a)}
J.dr=function(a){if(typeof a=="number")return J.ah.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aJ.prototype
return a}
J.ds=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.a6.prototype
return a}if(a instanceof P.c)return a
return J.ap(a)}
J.c_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dr(a).X(a,b)}
J.c0=function(a,b,c,d){return J.ds(a).a2(a,b,c,d)}
J.c1=function(a){return J.dq(a).gN(a)}
J.au=function(a){return J.aW(a).gj(a)}
J.ab=function(a){return J.m(a).h(a)}
var $=I.p
C.l=W.ax.prototype
C.o=J.j.prototype
C.e=J.a4.prototype
C.b=J.be.prototype
C.f=J.ah.prototype
C.c=J.aA.prototype
C.w=J.a6.prototype
C.j=J.cq.prototype
C.d=J.aJ.prototype
C.k=new P.d4()
C.a=new P.d5()
C.m=new K.b8(255,14,14)
C.n=new K.b8(50,55,255)
C.p=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.q=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.h=function(hooks) { return hooks; }

C.r=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.t=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.u=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.v=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.i=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
$.B=0
$.S=null
$.b4=null
$.aM=!1
$.bT=null
$.bN=null
$.bY=null
$.ao=null
$.aq=null
$.aX=null
$.O=null
$.X=null
$.Y=null
$.aN=!1
$.l=C.a
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["ba","$get$ba",function(){return H.bS("_$dart_dartClosure")},"aB","$get$aB",function(){return H.bS("_$dart_js")},"bp","$get$bp",function(){return H.C(H.aj({
toString:function(){return"$receiver$"}}))},"bq","$get$bq",function(){return H.C(H.aj({$method$:null,
toString:function(){return"$receiver$"}}))},"br","$get$br",function(){return H.C(H.aj(null))},"bs","$get$bs",function(){return H.C(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"bw","$get$bw",function(){return H.C(H.aj(void 0))},"bx","$get$bx",function(){return H.C(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"bu","$get$bu",function(){return H.C(H.bv(null))},"bt","$get$bt",function(){return H.C(function(){try{null.$method$}catch(z){return z.message}}())},"bz","$get$bz",function(){return H.C(H.bv(void 0))},"by","$get$by",function(){return H.C(function(){try{(void 0).$method$}catch(z){return z.message}}())},"aL","$get$aL",function(){return P.cM()},"aO","$get$aO",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:-1,args:[,]},{func:1,ret:P.q},{func:1,ret:-1},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:P.q,args:[,]},{func:1,args:[,P.D]},{func:1,args:[P.D]},{func:1,ret:P.q,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[P.c],opt:[P.y]},{func:1,ret:P.q,args:[,],opt:[,]},{func:1,ret:[P.E,,],args:[,]},{func:1,ret:-1,args:[W.b]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.dL(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aU=a.aU
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.bW,[])
else F.bW([])})})()
//# sourceMappingURL=main.dart.js.map

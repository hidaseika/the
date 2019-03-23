<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

## Modules

<dl>
<dt><a href="#module_@the-/secret">@the-/secret</a></dt>
<dd><p>Secret store for the-frameworks</p>
</dd>
<dt><a href="#module_mixins">mixins</a></dt>
<dd><p>Mix functions</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#TheSecret">TheSecret</a> ⇐ <code><a href="#CryptoMixed">CryptoMixed</a></code></dt>
<dd></dd>
<dt><a href="#CryptoMixed">CryptoMixed</a></dt>
<dd></dd>
<dt><a href="#LockMixed">LockMixed</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#create">create(...args)</a> ⇒ <code><a href="#TheSecret">TheSecret</a></code></dt>
<dd><p>Create a TheSecret instance</p>
</dd>
<dt><a href="#theSecret">theSecret()</a> ⇒ <code><a href="#TheSecret">TheSecret</a></code></dt>
<dd><p>Default exports</p>
</dd>
<dt><a href="#cryptoMix">cryptoMix()</a></dt>
<dd></dd>
<dt><a href="#lockMix">lockMix()</a></dt>
<dd><p>Mixin for lock</p>
</dd>
</dl>

<a name="module_@the-/secret"></a>

## @the-/secret
Secret store for the-frameworks

<a name="module_mixins"></a>

## mixins
Mix functions

<a name="TheSecret"></a>

## TheSecret ⇐ [<code>CryptoMixed</code>](#CryptoMixed)
**Kind**: global class  
**Extends**: [<code>CryptoMixed</code>](#CryptoMixed), [<code>LockMixed</code>](#LockMixed)  

* [TheSecret](#TheSecret) ⇐ [<code>CryptoMixed</code>](#CryptoMixed)
    * [.decrypt()](#TheSecret+decrypt)
    * [.encrypt()](#TheSecret+encrypt)
    * [.get([name])](#TheSecret+get) ⇒ <code>\*</code>
    * [.writeout(filename)](#TheSecret+writeout)

<a name="TheSecret+decrypt"></a>

### theSecret.decrypt()
Descript data in file

**Kind**: instance method of [<code>TheSecret</code>](#TheSecret)  
<a name="TheSecret+encrypt"></a>

### theSecret.encrypt()
Encrypt data in file

**Kind**: instance method of [<code>TheSecret</code>](#TheSecret)  
<a name="TheSecret+get"></a>

### theSecret.get([name]) ⇒ <code>\*</code>
Get value for name

**Kind**: instance method of [<code>TheSecret</code>](#TheSecret)  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name to get |

<a name="TheSecret+writeout"></a>

### theSecret.writeout(filename)
Write out into external file

**Kind**: instance method of [<code>TheSecret</code>](#TheSecret)  

| Param | Type |
| --- | --- |
| filename | <code>string</code> | 

<a name="CryptoMixed"></a>

## CryptoMixed
**Kind**: global class  
<a name="LockMixed"></a>

## LockMixed
**Kind**: global class  
<a name="create"></a>

## create(...args) ⇒ [<code>TheSecret</code>](#TheSecret)
Create a TheSecret instance

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="theSecret"></a>

## theSecret() ⇒ [<code>TheSecret</code>](#TheSecret)
Default exports

**Kind**: global function  
<a name="cryptoMix"></a>

## cryptoMix()
**Kind**: global function  
<a name="lockMix"></a>

## lockMix()
Mixin for lock

**Kind**: global function  
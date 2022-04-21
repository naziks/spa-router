# nRouter
### Lightweight page hash router for single page applications

## Install  
Using local file:
```html
<script src="path/to/nrouter.min.js"></script>
```  

Using CDN:
```html
<script src="https://cdn.jsdelivr.net/gh/naziks/spa-router/nrouter.min.js"></script>
```

## Quick Start  
```javascript
let router = new nRouter();

router
.on('/home', () => {})
.on("/page/:id", ({id}) => {});
.notFound(()=>{})
.start();
```

### Routes
There are two types of routes:  

__Static__ - /home  
__Dynamic__ - /page/:id

### Adding routes  
```js
let router = new nRouter({
  routes: {
    "/home": () => {},
    "/page/:id": ({id}) => {}
  }
});

// or
let router = new nRouter();

router
.on('/home', () => {})
.on("/page/:id", ({id}) => {});
```

## Methods
```javascript
// Change path using javascript (it also changes url hash)
router.navigate('/path/to/sth')

// Check routes again using hash from url
router.resolve()

// Add route
router.on('/path/to/sth', function(){
  // My callback function
})

// Add route with params
router.on('/share/:username', function(({username})){
  // My callback function
})
// or
router.on('/share/:username', function(params){
  // My callback function
  let username = params.username
})

// Starting router
/// Loading hash from url and validate it
/// Else uses default route
/// Adding event listiner to trigger hash change
router.start()
```

## Variables
Using:
```javascript
let router = new nRouter({
  key1: 'value1',
  key2: 'value2',
  ...
});

// or

router.key1 = 'value1';
router.key2 = 'value2';
```  
- __default_route__ - Fallback route (Default: /)
- __start_hash__ - Hash path (Default: #!) (Example: #!/path/to/sth)
- __debug__ - Toggle debug (Default: false)
- __routes__ - Object with router (Default: {})
- __notFound__ - Not found callback (Default: ()=>{})


## Debug
Log everything in console

```javascript
let rotuer = new nRouter({debug:true});
// or
router.debug = true;

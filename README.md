# Node CLI Router

## Version 0.1.0

I build a lot of Node CLI tools and one of the things I've always wanted is a small router for user arguments.

I build a lot of websites using Sinatra and I love how in Sinatra you can route URLs to functions easily. I decided to take a go at doing something similar for command line flags and arguments for CLI tools.


## Installation

```
npm install cli_router
```

In your scripts:

```js
var router = require("cli_router");
```

## Examples

### Array Matching Syntax
Say we have a CLI tool which is run on the command line by running `foo`. We can match on arguments like so:

```js
router.match(["-a", "-b"], function() {
  // do something
});

router.go(process.argv);
```

That would match:

```
$ foo -a -b
$ foo -b -a
```

We can also use flags that take a parameter:

```js
router.match(["-a", ["-b", "num"]], function(params) {
  console.log(params.num);
});
router.go(process.argv);
```

That would match:

```
$ foo -a -b 5
$ foo -b 5 -a
```

And in the callback, `params.num === "5"` and `params.a === true`.

The callback takes one argument, containing the parameters the user passed in. For example:

With this route:

```js
router.match(["-a", ["-b", "num], "-c"], function(params) {});
```

Here's how the params object will look for each of these calls:
```
$ foo -a -b -5 -c
{
  a: true,
  b: "5",
  c: true
}
```

### String Matching Syntax
If you don't like the array syntax, you can match with strings too. These two matches are equivalent:

```js
router.match(["-a", ["-b", "num"]], function(params) {...});
router.match("-a -b <num>", function(params) {...});
```

The same parameters are passed into the function.

Of course, ordering doesn't matter. So all four of these are identical in terms of what they match:

```js
["-a", ["-b", "num"]]
[["-b", "num"], "-a"]
"-a -b <num>"
"-b <num> -a"
```

### Multiple Routes
When a user string is matched by more than one defined route, __the first route__ will take affect. For example:

```js
router.match("-a <num> -b", function(){});
router.match("-b -a <num>", function(){});
```

When `$ foo -a 5 -b` is run, the first route will be used, because it was defined first.

## Other Arguments
Some tools might take it one main argument and then allow flags to be set. For example:

```
$ foo test.txt -a -b -c
```

The CLI Router doesn't support this, but you can get around it yourself. Rather than calling `router.go(process.argv)`, strip the user arguments out and call `router.process` on them. Using the above example, say the user passes in arguments such that `process.argv` looks like so:

```
["node", "/Users/MadeUp/yourscript.js", "test.txt", "-a", "-b"]
```

You can get the main argument, `test.txt` as `process.argv[2]`, and then call `router.process(process.argv.slice(3).join(" "))` to route based on the flags.

## Contexts
If you care about the context in which the callback function is called, you can add it as a third parameter to `match`:

```js
router.match("some string", function() {}, this);
```

## Wildcards

You can use `*` in your routes to denote wildcards. For example:

```js
//string syntax
router.match("-a -b *", function() {});
//array syntax
router.match(["-a", "-b", "*"], function() {});
```

Will match:

```
$ foo -a -b -c -d -e
$ foo -b -a -c 5
```

The wildcard matching passes all the passed in arguments to the callback. Example:

```
$ foo -a -b -c 5

// the object passed into the callback:
{
  a: true,
  b: true,
  c: "5"
}
```


Note that you must define the wildcard __last in the match string/array__. This will not work:

```js
route.match("-a * -b", function() {});
```

## Contributing

- Fork the repository
- Clone it down
- `npm install`
- `npm test`
- Push to your repository.
- Make a pull request.


## Todo
- Optional Parameters
- Make it detect `-abc` as `-a -b -c`
- Fully document API (for now, the source and tests are pretty self documenting)

## Changelog

__v0.1.0__
- wildcard support
- improve parameter passing

__v0.0.1__
- initial release!



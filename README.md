# 🦖 Deno-Hosts

**The hosts file parsing and resolver module for Deno**


Deno-Hosts is a Deno (Typescript) module for parsing hosts files and performing reverse IP -> hostname or vice versa lookups which are file or text data based (e.g. via `/etc/hosts`).

This can be helpful to determine if there is a prettier (or known) hostname available for an IP address.

These lookups are "extremely inexpensive" compared to normal IP reverse DNS lookups because no network communication is required, as these lookups are all file-based (offline)! Naturally, the (obvious) tradeoff/downside is that this only works in cases where the IP mapping exists in the hostsfile.


## Usages

```javascript
import Hosts from 'https://deno.land/x/deno_hosts@v1.0.0/mod.ts';

const hostsPath = "/etc/hosts";  // Hosts file path

const hosts = new Hosts(Deno.readTextFileSync(hostsPath));

console.log(hosts.toObject());
```


### Output

```json
[
    {
        "ip": "127.0.0.1",      
        "hostname": "localhost",
        "alias": null
    },
    {
        "ip": "127.0.1.1",
        "hostname": "local.test",
        "alias": "local"
    }
]
```

## API

- **hosts.toObject()** - For geeting JSON from hosts file.
- **hosts.toText()** - Re-convert text from parsed hosts file.
- **hosts.resolve(hostname : string)** - Lookup hostname -> IP (Return `undefined` in case of not found).
- **hosts.reverse(ip : string)** - Lookup IP -> hostname (Return `undefined` in case of not found).
- **hosts.match(str: string)** - Lookup and match ip/hostname/alias and return a Host object.


```javascript
type Host = {
    ip: string,
    hostname: string,
    alias: string | null
}
```

```javascript
class Hosts {
    constructor(hosts : string) : Object<Hosts>
    toObject() : Hosts[]
    toText() : string
    resolve(hostname : string) : string | undefined
    reverse(ip: string) : string | undefined
    match(str : string) : Host | undefined
}
```


**Note:** Hosts file location depends on OS. So use according your OS and for checking run time env OS use `Deno.build` stable API.

- Windows - `C:/Windows/System32/drivers/etc/hosts`
- Linux - `/etc/hosts`
- Mac OS X - `/private/etc/hosts`


## ToDo

- [x] Write Test cases.
- [ ] Write JSDoc for class methods.
- [x] Write Inital Readme content.
- [ ] Write HowTo Guide.
- [x] Publish at Deno.land
- [ ] Publish at Nest.land
- [ ] Setup auto Testing using Travis CI


## References

1. [What is hosts file (wiki)](https://en.wikipedia.org/wiki/Hosts_%28file%29)
2. [hosts-parser](https://github.com/imyelo/hosts-parser)
3. [go-hostsfile](https://github.com/jaytaylor/go-hostsfile)


## License

Permissive MIT license.


## Contact

You are more than welcome to open issues and send pull requests if you find a bug or want a new feature.

If you appreciate this module please feel free to drop me a line and tell me! It's always nice to hear from people who have benefitted from my work.

Email: [hello (at) ganeshagrawal.com](mailto:hello@ganeshagrawal.com)

Twitter: [@imganeshagrawal](https://twitter.com/imganeshagrawal)
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import  * as path  from "https://deno.land/std@0.88.0/path/mod.ts";
import Hosts from '../mod.ts';

const hostsFile = path.join(Deno.cwd(), "./tests/hosts");

Deno.test({
    name: "Parsing Dummy Host Data",
    fn() : void {
        assertEquals(new Hosts("127.0.0.1   localhost").toObject(), [
            {
                ip: "127.0.0.1",
                hostname: "localhost",
                alias: null
            }
        ]);
        assertEquals(new Hosts("127.0.0.1   localhost").toText(), "127.0.0.1\t\tlocalhost");
      },
});

Deno.test({
    name: "Parsing Dummy Host File",
    fn() : void {
        assertEquals(new Hosts(Deno.readTextFileSync(hostsFile)).toObject(), [
            {
                ip: "127.0.0.1",
                hostname: "localhost",
                alias: null
            },
            {
                ip: "127.0.1.1",
                hostname: "local.test",
                alias: "local"
            }
        ]);
      },
});

Deno.test({
    name: "Resolving hostname",
    fn() : void {
        assertNotEquals(new Hosts(Deno.readTextFileSync(hostsFile)).resolve("local"), "127.0.0.1");
        assertEquals(new Hosts(Deno.readTextFileSync(hostsFile)).resolve("local"), "127.0.1.1");
        assertEquals(new Hosts(Deno.readTextFileSync(hostsFile)).resolve("google.com"), undefined);
      },
});

Deno.test({
    name: "Reverse ip",
    fn() : void {
        assertNotEquals(new Hosts(Deno.readTextFileSync(hostsFile)).reverse("127.0.0.1"), "local.test");
        assertEquals(new Hosts(Deno.readTextFileSync(hostsFile)).reverse("127.0.0.1"), "localhost");
      },
});

Deno.test({
    name: "Match Host Details",
    fn() : void {
        assertEquals(new Hosts(Deno.readTextFileSync(hostsFile)).match("127.0.1.1"), {
            ip: "127.0.1.1",
            hostname: "local.test",
            alias: "local"
        });
        assertEquals(new Hosts(Deno.readTextFileSync(hostsFile)).match("google.com"), undefined);
      },
});
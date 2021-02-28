import type { Host } from './types.ts';
import { hostEntryToString } from './utils.ts';

export default class Hosts {
    #origin : Host[];

    constructor(hosts : string){
        this.#origin = [];
        this.parse(hosts || "");
    }
    
    public toObject() : Host[]{
        return this.#origin;
    }

    public toText() : string {
        return this.#origin.map(hostEntryToString).join('\n');
    }

    public resolve(hostname : string) : string | undefined {
        let matching : Host | undefined = undefined;
        for(let i=this.#origin.length-1; i>=0; i--){
            if(this.#origin[i].hostname === hostname || this.#origin[i].alias === hostname){
                matching = this.#origin[i];
                break;
            }
        }
        return matching?.ip;
    }

    public reverse(ip: string) : string | undefined {
        let matching : Host | undefined = undefined;
        for(let i=this.#origin.length-1; i>=0; i--){
            if(this.#origin[i].ip === ip){
                matching = this.#origin[i];
                break;
            }
        }
        return matching?.hostname;
    }

    public match(str : string) : Host | undefined{
        let matching : Host | undefined = undefined;
        for(let i=this.#origin.length-1; i>=0; i--){
            if(this.#origin[i].ip === str || this.#origin[i].hostname === str || this.#origin[i].alias === str){
                matching = this.#origin[i];
                break;
            }
        }
        return matching;
    }

    private parse(textData : string) : void{
        const hosts = textData.split('\n');
        hosts.forEach((line) => {
            line = line.trim();
            const indexOfHash = line.indexOf('#');
            if(indexOfHash > -1){
                line = line.slice(0, indexOfHash);
            }
            const matched = line.trim().split(/\s+/);
            if(matched.length < 2){
                return;
            }
            const ipAddress =  matched[0];
            const hostname = matched[1];
            const alias = matched[2] ?? null;
            this.#origin.push({
                ip: ipAddress,
                hostname: hostname,
                alias: alias
            });
        });
    }

}
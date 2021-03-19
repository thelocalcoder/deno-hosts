import type {Host} from './types.ts';

export function hostEntryToString(host : Host) : string {
    let hostString : string;
    hostString = `${host.ip}\t\t${host.hostname}`;
    if(host.alias){
        hostString += `\t\t${host.alias}`;
    }
    return hostString;
}
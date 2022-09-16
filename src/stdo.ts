import { WriteStream, createWriteStream } from "fs";

let outWriteStream: WriteStream;
let errWriteStream: WriteStream;

enum stdo_type {
    out,
    err,
}

function init(out: string, err: string): void {
    outWriteStream = createWriteStream(out, {encoding: "utf8"});
    errWriteStream = createWriteStream(err, {encoding: "utf8"});
}

function log_to_file(type: stdo_type, s: string): void {
    switch (type) {
        case stdo_type.out:
            outWriteStream.write(s);
            break;
        case stdo_type.err:
            errWriteStream.write(s);
            break;
        default:
            throw new Error("unknown type");
    }
}

function logln(type: stdo_type, s: string): void {
    log_to_file(type, s + "\n");
}

function out(s: string): void {
    logln(stdo_type.out, format(s));
}

function err(s: string): void {
    logln(stdo_type.err, format(s));
}

function close(): void {
    outWriteStream.close();
    errWriteStream.close();
}

function format(s: string): string {
    const date = new Date();
    const time = date.toLocaleTimeString();
    return "[" + time + "] " + s;
}

export { stdo_type, init, log_to_file, logln, out, err, close, format };
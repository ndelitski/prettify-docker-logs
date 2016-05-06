const fs = require('fs');
const path = require('path');

const logPath = process.argv[2];
const start = process.argv[3];
const maxLines = process.argv[4];

const content = fs.readFileSync(logPath, 'utf8');

const lines = content.split(/\n/g);
var printedLines = 0;

for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    if (line) {
        var parsed = JSON.parse(line);
        var matched = true;

        if (start) {
            // console.log(new Date(start), new Date(parsed.time));
            matched = matched && (new Date(start) < new Date(parsed.time));
        }

        if (maxLines) {
            matched = matched && (printedLines <= maxLines);
        }

        if (matched) {
            printedLines++;
            process.stdout.write(parsed.log);
        }
    }
}

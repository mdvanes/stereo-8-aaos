const fs = require("fs");

const buildGradlePath = "./android/app/build.gradle";

const bumpGradle = () => {
  const data = fs.readFileSync(buildGradlePath, {
    encoding: "utf-8",
    flag: "r",
  });

  let matched = false;
  let inject = false;

  const lines = data.split("\n");
  const newLines = lines.map((line) => {
    if (line === "        /* start versions */") {
      matched = true;
      inject = true;
    }
    if (matched) {
      console.log(line);
    }

    if (inject) {
      inject = false;
      return `        /* start versions */
        versionCode 1999
        versionName "1.0.1999"      
        /* end versions */`;
    }
    if (!matched) {
      return line;
    }
    if (line === "        /* end versions */") {
      matched = false;
    }
    return "";
  });
  console.log(newLines);
  fs.writeFileSync(buildGradlePath, newLines.join("\n"));
};

const run = () => {
  bumpGradle();
};

run();

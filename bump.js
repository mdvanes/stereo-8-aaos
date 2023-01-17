const fs = require("fs");
const jq = require("node-jq");

const buildGradlePath = "./android/app/build.gradle";
const appJsonPath = "./app.json";

const bumpGradle = (versionCode) => {
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
    if (inject) {
      inject = false;
      return `        /* start versions */
        versionCode ${versionCode}
        versionName "1.0.${versionCode}"      
        /* end versions */`;
    }
    if (!matched) {
      return line;
    }
    if (line === "        /* end versions */") {
      matched = false;
    }
    return undefined;
  });
  fs.writeFileSync(
    buildGradlePath,
    newLines.filter((n) => typeof n !== "undefined").join("\n")
  );
};

const bumpAppJson = async (versionCode) => {
  const data = await jq.run(
    `.=(.expo.android.versionCode=${versionCode})`,
    appJsonPath
  );
  fs.writeFileSync(appJsonPath, data + "\n");
  const data1 = await jq.run(
    `.=(.expo.version="1.0.${versionCode}")`,
    appJsonPath
  );
  fs.writeFileSync(appJsonPath, data1 + "\n");
};

const run = async () => {
  console.log("Start bumping version code...");
  if (process.argv.length > 2) {
    const versionCode = process.argv[2];
    console.log("Setting version code to:", versionCode);
    console.log("Bumping gradle...");
    bumpGradle(versionCode);
    console.log("Bumping app.json...");
    await bumpAppJson(versionCode);
  } else {
    console.error("You must set versionCode as param!");
  }
  console.log("Done");
};

run();

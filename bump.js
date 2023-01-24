const fs = require("fs");
const jq = require("node-jq");

const buildGradlePath = "./android/app/build.gradle";
const appJsonPath = "./app.json";
const packageJsonPath = "./package.json";

const getVersion = (versionCode) => `1.0.${versionCode}`;

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
        versionName "${getVersion(versionCode)}"      
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

const writeJq = async (path, filter) => {
  const data = await jq.run(filter, path);
  fs.writeFileSync(path, data + "\n");
};

const bumpAppJson = async (versionCode) => {
  await writeJq(appJsonPath, `.=(.expo.android.versionCode=${versionCode})`);
  await writeJq(appJsonPath, `.=(.expo.version="${getVersion(versionCode)}")`);

  await writeJq(packageJsonPath, `.=(.version="${getVersion(versionCode)}")`);
};

const run = async () => {
  console.log("Start bumping version code...");
  if (process.argv.length > 2) {
    const versionCode = process.argv[2];
    console.log("Setting version code to:", versionCode);
    console.log("Bumping gradle...");
    bumpGradle(versionCode);
    console.log("Bumping app.json & package.json...");
    await bumpAppJson(versionCode);
  } else {
    console.error("You must set versionCode as param!");
  }
  console.log("Done");
};

run();

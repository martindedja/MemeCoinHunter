module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  testMatch: ["**/tests/unit/**/*.spec.js"],
  testURL: "http://localhost/",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(svg|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
    "\\.(css|less|scss|sass)$": "jest-transform-stub",
  },
  setupFiles: ["jest-canvas-mock"],
};

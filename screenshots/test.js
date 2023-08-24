const puppeteer = require('puppeteer');
var fs = require('fs');

(async () => {

  var dir = './output';

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }


  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://8080-eaeacfdcfeafeaeabcdffcafaafdfd.project.examly.io');
  await page.screenshot({path: './output/example.png'});
  
  const image1 = fs.readFileSync("./screenshots/example.png");
  const image2 = fs.readFileSync("./output/example.png");

  const diffpercent = await getDiff(
    image1 ,
    image2
  );
  console.log('TESTCASE:test_case7:success:',diffpercent);

  const page1 = await browser.newPage();
  await page1.goto('https://8081-eaeacfdcfeafeaeabcdffcafaafdfd.project.examly.io');
  await page1.screenshot({path: './output/example1.png'});
  
  const image3 = fs.readFileSync("./screenshots/example1.png");
  const image4 = fs.readFileSync("./output/example1.png");

  const diffpercent1 = await getDiff(
    image3 ,
    image4
  );
  console.log('TESTCASE:test_case8:success:',diffpercent1);


  await browser.close();
})();

const getDiff = async (image1, image2) => {
  return new Promise(async (resolve) => {
    const compare = require("resemblejs").compare;
    await compare(image1, image2, {}, function(err, data) {
        if (err) {
            console.log("An error!");
            resolve(0);
        } else {
            resolve(100 - data.rawMisMatchPercentage);
        }
    });
  });
};
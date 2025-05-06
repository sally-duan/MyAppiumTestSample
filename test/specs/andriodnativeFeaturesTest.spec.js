//packages and activities

xdescribe("Andriod native feature test", () => {
  xit("Accss an activity directly", async () => {
    await driver.startActivity(
      "io.appium.android.apis",
      "io.appium.android.apis.app.AlertDialogSamples"
    );
    await driver.pause(4000);
    await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
  });

  it("Working with Dialog Boxes", async () => {
    // access activity
    await driver.startActivity(
      "io.appium.android.apis",
      "io.appium.android.apis.app.AlertDialogSamples"
    );

    // click on first dialog
    await $(
      '//*[@resource-id="io.appium.android.apis:id/two_buttons"]'
    ).click();
    driver.pause(10000);
    await driver.acceptAlert();

    // await driver.dismissAlert();

    // get alert text
    // console.log("ALERT TEXT -->", await driver.getAlertText());
  });

  it("Vertical scrolling", async () => {
    await $("~App").click();
    await $("~Activity").click();

    // scroll to the end (not stable if element gets moved)
    // await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');

    // scrollTextIntoView - more stable
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")'
    ).click();

    // await $('~Secure Surfaces').click();

    // assertion
    await expect($("~Secure Dialog")).toExist();
  });

  it("Horizontal Scrolling", async () => {
    await driver.startActivity(
      "io.appium.android.apis",
      "io.appium.android.apis.view.Gallery1"
    );

    // Horizontal scrolling
    await $(
      "android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()"
    );
    await driver.pause(5000);
    await $(
      "android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()"
    );
  });

  it.only("Working with a date picker", async () => {
    // access the date picker
    await driver.startActivity(
      "io.appium.android.apis",
      "io.appium.android.apis.view.DateWidgets1"
    );

    // get current date
    const date = await $(
      '//*[@resource-id="io.appium.android.apis:id/dateDisplay"]'
    );
    const currentDate = await date.getText();

    // click on change the date button
    await $("~change the date").click();

    // scroll right to the next month
    await $(
      "android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()"
    );

    // select the 10th date
    await $('//*[@text="10"]').click();

    // click on ok button
    await $('//*[@resource-id="android:id/button1"]').click();

    // verify the updated date
    await expect(await date.getText()).not.toEqual(currentDate);
  });
});

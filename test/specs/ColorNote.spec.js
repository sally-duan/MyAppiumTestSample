describe("ColorNoteTest", () => {
  xit("Skip Tutorial", async () => {
    // await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]').click();

    await $(
      'android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip")'
    ).click();

    await expect($('//*[@text="Add note"]')).toBeDisplayed();
    driver.pause(5000);
  });

  it("add a note, save changes & verify note", async () => {
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]'
    ).click();

    await $('//*[@text="Add note"]').click();
    await $('//*[@text="Text"]').click();
    await expect($('//*[@text="Editing"]')).toBeDisplayed();

    // add note title
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]'
    ).addValue("beautiful dogs");

    // add note body
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]'
    ).addValue("my\nfavorite\ndog");

    // save the changes
    await driver.back();
    await driver.back();
  });
});

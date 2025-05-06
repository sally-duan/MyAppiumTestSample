// find elements:
// 1. use AccessibilityId
// 2. use classname or tag name (TextView, GamepadButton, layout)
// 3. use XPathEvaluator
// 4. use Andriod UIAutomator

xdescribe("Andriod Find App element test", () => {
  it("Find element by accessibilityId", async () => {
    const appOption = await $("~App");
    await appOption.click();

    const actionBar = await $("~Action Bar");
    await expect(actionBar).toBeExisting();
  });

  it("Find element by className", async () => {
    const AccessibilityItem = await $(".android.widget.TextView");
    await expect(AccessibilityItem).toHaveText("API Demos");
  });

  it("Find element by UIAutomator selector", async () => {
    await $('android=new UiSelector().textContains("Animation")').click();
  });

  it("Find multiple elements", async () => {
    const expectedList = [
      "API Demos",
      "Access'ibility",
      "Accessibility",
      "Animation",
      "App",
      "Content",
      "Graphics",
      "Media",
      "NFC",
      "OS",
      "Preference",
      "Text",
      "Views",
    ];
    const actualList = [];

    const textList = await $$("android.widget.TextView");

    for (const element of textList) {
      actualList.push(await element.getText());
    }

    // assert the list
    await expect(actualList).toEqual(expectedList);
  });

  it("Working with text field", async () => {
    // access the auto complete screen
    await $("~Views").click();
    await $('//*[@text="Auto Complete"]').click();
    await $('//*[@content-desc="1. Screen Top"]').click();

    // enter the country name
    const textField = await $(
      '//*[@resource-id="io.appium.android.apis:id/edit"]'
    );
    await textField.addValue("Canada");

    // verify the country name
    await expect(textField).toHaveText("Canada");
  });
});

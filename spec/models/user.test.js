const User = require("../../models/user");

describe(User, () => {
  it("has a username and password", () => {
    const bob = new User({
      username: "bob123",
      password: "thisisapassword",
    });

    expect(bob.username).toEqual("bob123");
    expect(bob.password).toEqual("thisisapassword");
  });
});

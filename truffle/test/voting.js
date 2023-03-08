const Voting = artifacts.require("Voting");

contract('Voting', () => {
  it('should read newly written values', async() => {
    const voting = await Voting.deployed();
    var value = (await votingInstance.read()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await votingInstance.write(1);
    value = (await Voting.read()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await votingInstance.write(2);
    value = (await votingInstance.read()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});

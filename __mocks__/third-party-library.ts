const mockThirdPartyLibrary = jest.createMockFromModule('third-party-library')

mockThirdPartyLibrary.someFunction = jest.fn(() => 'mocked result')

module.exports = mockThirdPartyLibrary
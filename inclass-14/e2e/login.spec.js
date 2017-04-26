import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        const oldHeadline = 'old headline'
        const newHeadline = 'new headline'
        const getMessage = (msg) => 
            `${preamble} ${common.creds.username} "${msg}"`

        const updateHeadline = (msg) => () => 
            findId('newHeadline').sendKeys(msg)
            .then(findId('headline').click())
            .then(common.logout)
            .then(common.login)
            .then(findId('newHeadline').clear())
            .then(findId('message').getText().then(text => {
                expect(text).to.equal(getMessage(msg))
            }))

        updateHeadline(newHeadline)()
        .then(updateHeadline(oldHeadline))
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})

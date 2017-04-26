import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'bl19test',
    password: 'inside-tie-short'
}

exports.login = () =>
    sleep(500)
        .then(findId('loginUsernameInput').clear())
        .then(findId('loginPasswordInput').clear())
        .then(findId('loginUsernameInput').sendKeys(exports.creds.username))
        .then(findId('loginPasswordInput').sendKeys(exports.creds.password))
        .then(findId('loginButton').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logoutButton').click())
        .then(sleep(500))
        .then(findId('welcomeText').getText()
            .then(text => {
                expect(text).to.equal('Welcome!')
            }))


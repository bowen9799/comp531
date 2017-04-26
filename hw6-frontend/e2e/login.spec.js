import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Frontend Test', () => {

    before('Should Register New User', (done) => {
        go()
        .then(sleep(500))
        .then(findId('inputUsername').sendKeys('bowenl'))
        .then(findId('inputEmail').sendKeys('bl19@rice.edu'))
        .then(findId('inputPhone').sendKeys('111-111-1111'))
        .then(findId('inputZipcode').sendKeys('11111'))
        .then(findId('dob').sendKeys('11111111'))
        .then(findId('inputPassword').sendKeys('123'))
        .then(findId('inputPasswordConfirmation').sendKeys('123'))
        .then(findId('registerButton').click())
        .then(sleep(2000))
        .then(findId('errorMessage').getText()
        .then(text => {
             expect(text).to.equal('You can now login') 
        })
        .then(done))
    }) 

    before('Should Log In', (done) => {
        go().then(common.login).then(done)
    })

    it('Should Add New Article', (done)=> {
        sleep(500)
        .then(findId('addArticleTA').sendKeys('bowenl'))
        .then(findId('addArticleButton').click())
        .then(sleep(2000))
        .then(driver.findElements(By.className("articleBody"))
                .then(articles => {
                    articles[0].getAttribute("value")
                        .then(text => expect(text).to.equal('bowenl'))
                }))
        .then(done)
    })

    it('Should Edit Article', (done)=> {
        sleep(500)
        .then(driver.findElements(By.className("articleBody"))
        .then(articles => {
            articles[0].clear()
            .then(sleep(500))
            .then(articles[0].sendKeys('bobobo'))
        }))
        .then(driver.findElements(By.className("editButton"))
        .then(buttons=>{
            buttons[0].click()}))
        .then(sleep(500))
        .then(driver.findElements(By.className("articleBody"))
                .then(articles => {
                    articles[0].getAttribute("value")
                        .then(text => expect(text).to.equal('bobobo'))
                }))
        .then(done)
    })

    it('Should Update Headline', (done) => {
        sleep(500)
        .then(findId('headlineInput').sendKeys('nonono'))
        .then(findId('updateHeadlineButton').click())
        .then(sleep(500))
        .then(findId('headlineInput').sendKeys('bowenl'))
        .then(findId('updateHeadlineButton').click())
        .then(sleep(500))
        .then(findId('myHeadlineText').getText()
        .then(text => {
             expect(text).to.equal('bowenl') 
        })).then(done)
    })

    let followersCount = 0;
    it('Should Add Follower', (done) => {
        sleep(500)
        .then(driver.findElements(By.className("followerItem"))
        .then(followers => {
            followersCount = followers.length
        }))
        .then(findId('addFollowerInput').sendKeys('Follower'))
        .then(findId('addFollowerButton').click())
        .then(sleep(500))
        .then(driver.findElements(By.className("followerItem"))
        .then(followers => {
            expect(followers.length).to.equal(followersCount + 1)
        }))
        .then(done)
    })

    let followerIndex = -1
    it('Should Delete Follower', (done) => {
        sleep(500)
        .then(driver.findElements(By.className("followerName"))
        .then(followers => {
            followersCount = followers.length
            followers.forEach((element, index) => {
                element.getText().then(text=> {
                    if(text == "Follower") {
                        followerIndex = index;
                    }
                })
            })
            if (followerIndex == -1) done
        }))
        .then(driver.findElements(By.className("glyphicon-trash"))
        .then(removes => {
            removes[followerIndex].click()
        }))
        .then(sleep(500))
        .then(driver.findElements(By.className("followerItem"))
        .then(followers => {
            expect(followers.length).to.equal(followersCount - 1)
        }))
        .then(done)
    })
    
    it('Should Search for "Only One Article Like This" and Verify Author', (done) => {
        sleep(500)
        .then(findId('filterArticlesInput').sendKeys('Only One Article Like This'))
        .then(sleep(500))
        .then(driver.findElements(By.className("articleBody"))
                .then(articles => {
                    articles[0].getAttribute("value")
                        .then(text => expect(text.indexOf('Only One Article Like This')).to.equal(0))
                }))
        .then(driver.findElements(By.className("articleAuthorText"))
                .then(author => {
                    author[0].getText()
                        .then(text => expect(text.indexOf('bl19test')).to.equal(0))
                }))
        .then(findId('filterArticlesInput').clear())
        .then(done)
    })

    it('Should Update Email', (done) => {
        sleep(500)
        .then(findId('profilePageLink').click())
        .then(sleep(500))
        .then(findId('inputEmail').sendKeys('a@c.oo'))
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(sleep(4000))
        .then(findId('inputEmail')
        .then(input => {
            input.getAttribute("placeholder")
            .then(text=> expect(text).to.equal('a@c.oo'))}))
            .then(findId('inputEmail').sendKeys('bl19@rice.edu'))
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(sleep(4000))
        .then(findId('inputEmail')
        .then(input => {
            input.getAttribute("placeholder")
                .then(text => expect(text).to.equal('bl19@rice.edu'))}))
        .then(done)
    }) 

    it('Should Update Zipcode', (done) => {
        sleep(500)
        .then(findId('inputZipcode').sendKeys('77005'))
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(sleep(4000))
        .then(findId('inputZipcode')
        .then(input => {
            input.getAttribute("placeholder")
            .then(text=> expect(text).to.equal('77005'))}))
        .then(findId('inputZipcode').sendKeys('12345'))
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(findId('updateButton').click())
        .then(sleep(4000))
        .then(findId('inputZipcode')
        .then(input => {
            input.getAttribute("placeholder")
            .then(text=> expect(text).to.equal('12345'))}))
        .then(done)
    }) 

    it('Should Update Password', (done) => {
        sleep(500)
        .then(findId('inputPassword').sendKeys('123'))
        .then(findId('inputPasswordConfirmation').sendKeys('123'))
        .then(findId('updateButton').click())
        .then(sleep(4000))
        .then(findId('inputPassword')
        .then(input => {
            input.getAttribute("value")
            .then(text=> expect(text).to.equal(''))}))
        .then(findId('inputPasswordConfirmation')
        .then(input => {
            input.getAttribute("value")
            .then(text=> expect(text).to.equal(''))}))
        .then(done)
    })
})

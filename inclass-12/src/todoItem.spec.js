import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={1} text={"text"} done={false}
             toggle={e => {}} remove={e => {}} />
		</div>)
        // findDOMNode and assert 3 children of the ToDoItem element
        const input = findDOMNode(node).children[0]
		expect(input.children.length).to.equal(3)
        // assert the innerHTML of the todo is the text you initially set
        expect(input.children[1].innerHTML).to.equal('text')
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
         const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={1} text={"text"} done={false} 
            toggle={e => {}} remove={e => { }}/>
		</div>)
        // findDOMNode and assert 3 children of the ToDoItem element
        const input = findDOMNode(node).children[0]
        expect(input.children.length).to.equal(3)
        // assert there is no child with classname 'completed'
        const input2 = findByClassname(node, 'completed')
        expect(input2).to.be.null
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem 
				id={1} text="text" done={false} toggle={e => { toggled = true }}
				remove={e => { }}
			/></div>)
        const input = findDOMNode(node).children[0]
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        expect(toggled).to.be.false
	    TestUtils.Simulate.click(input.children[0])
		expect(toggled).to.be.true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={1} text="text" done={false} 
            toggle={e => { toggled = true }} remove={e => { removed=true}}/>
		</div>)
        const input = findDOMNode(node).children[0]
        // when the remove button is clicked via TestUtils.Simulate.click()
        TestUtils.Simulate.click(input.children[2])
        // we expect the variable removed to be true
        expect(removed).to.equal(true)
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={1} text="text" done={true} 
            toggle={e => { toggled = true }} remove={e => { removed = true}} />
		</div>)
        const input = findDOMNode(node).children[0]
        // assert that the rendered className is "completed"
		expect(input.children[1].className).to.equal('completed')
    })

})

/*
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:13:14
 * @LastEditors: -_-
 * @Description:
 */

class Person {
    public name: string
    private old: number
    protected sex: string
    constructor (name: string, old: number, sex: string) {
        this.name = name
        this.old = old
    }

    say () {
        console.log('父类方法')
    }
}

class Student extends Person {
    constructor (name: string, old: number, sex: string) {
        super(name, old, sex)
    }

    say () {
        console.log(this.name)
        console.log(this.old)
        console.log(this.sex)
    }
}

const c = new Student('hhvcg', 12, 'nan')
c.name
c.old
c.sex

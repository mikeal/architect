var test = require('tape')
var parse = require('@architect/parser')
var validate = require('../../src/create/aws/validate')

test('scheduled env', t=> {
  t.plan(1)
  t.ok(validate, 'validate')
})

test('test good rate(1 minute)', t=> {
  t.plan(1)
  var arc = parse(`
@app
testy

@scheduled
daily-thing rate(1 minute)
mint-thin rate(2 minutes)
another rate(1 hour)
yet-another-one rate(30 days)
  `)
  validate(arc, function _validate(err, result) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(true, `legit`)
    }
  })
})

test('test bad rate(1 minutes)', t=> {
  t.plan(1)
  var arc = parse(`
@app
testy

@scheduled
daily-thing rate(1 minutes)

  `)
  validate(arc, function _validate(err, result) {
    if (err) {
      t.ok(true, `legit`)
      console.log(err)
    }
    else {
      t.fail(err)
    }
  })
})


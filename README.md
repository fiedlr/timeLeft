# timeLeft
Just another countdown plugin for jQuery.

**Requires jQuery UI Widget Factory >= 1.11.4**

## Features

- nothing extraordinary
- small in size
- a minimized amount of calculations
- set refreshInterval to whatever you like

## How it works

It can't get any simpler than this:

`$('#countdown').timeLeft({till: 'June 1'});`

## Options

### till
a string suitable for a `new Date(till)` object

**Default**: 'January 19, 2038 03:14:07'

### format 
how to format the countdown, this takes any HTML input

**Default**: '%Y years %M months %W weeks %D days %h hours %m minutes %s seconds remain...'

### refreshInterval
how long a refresh should take in milliseconds

**Default**: 1000

### complete
the function to be run after the countdown reaches 0

**Default**: function () { alert("It's time!"); }

## Methods

### refresh
refreshes the countdown

### destroy
destroys the countdown

## Copyright

Released under the [MIT License](http://opensource.org/licenses/MIT).

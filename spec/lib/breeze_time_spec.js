var BreezeTime = require('../../lib/breeze_time.js');
var ext = require('../../lib/extensions.js');

var minutePairs = [
    {min: 540, time: '9:00AM'},
    {min: 720, time: '12:00PM'},
    {min: 814, time: '1:34PM'},
    {min: 955, time: '3:55PM'},
    {min: 360, time: '6:00AM'},
    {min: 602, time: '10:02AM'},
    {min: 1260, time: '9:00PM'},
    {min: 0, time: '12:00AM'}
];


describe('BreezeTime library tests', function(){

    // .parse
    describe('Static parse function', function(){
        it('works with no-space times', function(){
            minutePairs.forEach((p)=>{
                let bt = BreezeTime.parse(p.time);
                expect(bt).not.toBeNull();
                expect(bt.asMinutes()).toEqual(p.min);
            });
        });
    });

    // .resolve
    describe('Static resolve function', function(){

        it('works when given minute values', function(){

            minutePairs.forEach((p)=>{
                let bt = BreezeTime.resolve(p.min);
                expect(bt).not.toBeNull();
                expect(bt.asTime()).toEqual(p.time);
            });
        
        });

        it('works when given time strings without spaces', function(){
            minutePairs.forEach((p)=>{
                let bt = BreezeTime.resolve(p.time);
                expect(bt).not.toBeNull();
                expect(bt.asMinutes()).toEqual(p.min);
            });
        });

    });

    describe('instance methods', function(){


        var fromMinutes = null,
            fromParse = null;

        beforeAll(function () {
            fromMinutes = minutePairs.map((p) => {
                return BreezeTime.fromMinutes(p.min);
            });
            fromParse = minutePairs.map((p) => {
                return BreezeTime.parse(p.time);
            });
        });


        describe('asMinutes()', function(){

            it('on instances from .fromMinutes()', function(){

                fromMinutes.forEach((m,i)=>{
                    expect(m.asMinutes()).toEqual(minutePairs[i].min);
                });
               
            });

            it('on instances from .parse()', function(){

                fromParse.forEach((m,i)=>{
                    expect(m.asMinutes()).toEqual(minutePairs[i].min);
                });

            });

        });

    });



});
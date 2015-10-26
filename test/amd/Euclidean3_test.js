define([
    'davinci-eight/math/QQ',
    'davinci-eight/math/Dimensions',
    'davinci-eight/math/Unit',
    'davinci-eight/math/Euclidean3'
], function(
    QQ,
    Dimensions,
    Unit,
    Euclidean3
) {
  describe("Euclidean3", function() {

    var random = function() {
      var w = Math.random();
      var x = Math.random();
      var y = Math.random();
      var z = Math.random();
      return new Euclidean3(w, x, y, z, Math.random(), Math.random(), Math.random(), Math.random());
    }

    var zero = new Euclidean3(0, 0, 0, 0, 0, 0, 0, 0);
    var one  = new Euclidean3(1, 0, 0, 0, 0, 0, 0, 0);
    var i    = new Euclidean3(0, 1, 0, 0, 0, 0, 0, 0);
    var j    = new Euclidean3(0, 0, 1, 0, 0, 0, 0, 0);
    var k    = new Euclidean3(0, 0, 0, 1, 0, 0, 0, 0);
    var ij   = new Euclidean3(0, 0, 0, 0, 1, 0, 0, 0);
    var jk   = new Euclidean3(0, 0, 0, 0, 0, 1, 0, 0);
    var ki   = new Euclidean3(0, 0, 0, 0, 0, 0, 1, 0);
    var I    = new Euclidean3(0, 0, 0, 0, 0, 0, 0, 1);
    var mone = new Euclidean3(-1, 0, 0, 0, 0, 0, 0, 0);

    beforeEach(function() {
      jasmine.addMatchers({
        toBeNear: function(m) {
          return {
            compare: function (actual, expected) {
              var tolerance = (Math.pow(10, -2) / 2);
              var pass = (Math.abs(actual.coordinate(0) - expected.coordinate(0)) < tolerance) &&
                         (Math.abs(actual.coordinate(1) - expected.coordinate(1)) < tolerance) &&
                         (Math.abs(actual.coordinate(2) - expected.coordinate(2)) < tolerance) &&
                         (Math.abs(actual.coordinate(3) - expected.coordinate(3)) < tolerance) &&
                         (Math.abs(actual.coordinate(4) - expected.coordinate(4)) < tolerance) &&
                         (Math.abs(actual.coordinate(5) - expected.coordinate(5)) < tolerance) &&
                         (Math.abs(actual.coordinate(6) - expected.coordinate(6)) < tolerance) &&
                         (Math.abs(actual.coordinate(7) - expected.coordinate(7)) < tolerance);
              return {'pass': pass};
            }
          };
        }
      });
    });

    it('constructor', function() {
      var w = Math.random();
      var x = Math.random();
      var y = Math.random();
      var z = Math.random();
      var xy = Math.random();
      var yz = Math.random();
      var zx = Math.random();
      var xyz = Math.random();

      var a = new Euclidean3(w, x, y, z, xy, yz, zx, xyz);

      expect(a.coordinate(0)).toBe(w);
      expect(a.coordinate(1)).toBe(x);
      expect(a.coordinate(2)).toBe(y);
      expect(a.coordinate(3)).toBe(z);
      expect(a.coordinate(4)).toBe(xy);
      expect(a.coordinate(5)).toBe(yz);
      expect(a.coordinate(6)).toBe(zx);
      expect(a.coordinate(7)).toBe(xyz);

      expect(a.coordinates()[0]).toBe(w);
      expect(a.coordinates()[1]).toBe(x);
      expect(a.coordinates()[2]).toBe(y);
      expect(a.coordinates()[3]).toBe(z);
      expect(a.coordinates()[4]).toBe(xy);
      expect(a.coordinates()[5]).toBe(yz);
      expect(a.coordinates()[6]).toBe(zx);
      expect(a.coordinates()[7]).toBe(xyz);
    });

    it('Should implement toString()', function() {
      var a = new Euclidean3(1, 2, 3, 4, 5, 6, 7, 8);
      expect(a.toStringIJK()).toBe("1+2*i+3*j+4*k+5*ij+6*jk+7*ki+8*I");
    });

    it('Should implement add function', function() {
      var a = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      var b = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      
      var c = a.add(b);

      expect(c.coordinate(0)).toBe(a.coordinate(0) + b.coordinate(0));
      expect(c.coordinate(1)).toBe(a.coordinate(1) + b.coordinate(1));
      expect(c.coordinate(2)).toBe(a.coordinate(2) + b.coordinate(2));
      expect(c.coordinate(3)).toBe(a.coordinate(3) + b.coordinate(3));
      expect(c.coordinate(4)).toBe(a.coordinate(4) + b.coordinate(4));
      expect(c.coordinate(5)).toBe(a.coordinate(5) + b.coordinate(5));
      expect(c.coordinate(6)).toBe(a.coordinate(6) + b.coordinate(6));
      expect(c.coordinate(7)).toBe(a.coordinate(7) + b.coordinate(7));
    });

    it('Should implement sub function', function() {
      var a = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      var b = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      
      var c = a.sub(b);

      expect(c.coordinate(0)).toBe(a.coordinate(0) - b.coordinate(0));
      expect(c.coordinate(1)).toBe(a.coordinate(1) - b.coordinate(1));
      expect(c.coordinate(2)).toBe(a.coordinate(2) - b.coordinate(2));
      expect(c.coordinate(3)).toBe(a.coordinate(3) - b.coordinate(3));
      expect(c.coordinate(4)).toBe(a.coordinate(4) - b.coordinate(4));
      expect(c.coordinate(5)).toBe(a.coordinate(5) - b.coordinate(5));
      expect(c.coordinate(6)).toBe(a.coordinate(6) - b.coordinate(6));
      expect(c.coordinate(7)).toBe(a.coordinate(7) - b.coordinate(7));
    });

    it('div Euclidean3', function() {
      var u  = new Euclidean3(1, 0, 0, 0, 0, 0, 0, 0)
      var i  = new Euclidean3(0, 1, 0, 0, 0, 0, 0, 0)
      var j  = new Euclidean3(0, 0, 1, 0, 0, 0, 0, 0)
      var k  = new Euclidean3(0, 0, 0, 1, 0, 0, 0, 0)
      var ij = new Euclidean3(0, 0, 0, 0, 1, 0, 0, 0)
      var jk = new Euclidean3(0, 0, 0, 0, 0, 1, 0, 0)
      var ki = new Euclidean3(0, 0, 0, 0, 0, 0, 1, 0)
      var I  = new Euclidean3(0, 0, 0, 0, 0, 0, 0, 1)

      expect(u.div(u).w).toBe(1);
      expect(u.div(u).x).toBe(0);
      expect(u.div(u).y).toBe(0);
      expect(u.div(u).z).toBe(0);
      expect(u.div(u).xy).toBe(0);
      expect(u.div(u).yz).toBe(0);
      expect(u.div(u).zx).toBe(0);
      expect(u.div(u).xyz).toBe(0);

  //    expect(u.div(i).w).toBe(0);
  //    expect(u.div(i).x).toBe(1);
  //    expect(u.div(i).y).toBe(0);
  //    expect(u.div(i).z).toBe(0);
  //    expect(u.div(i).xy).toBe(0);
  //    expect(u.div(i).yz).toBe(0);
  //    expect(u.div(i).zx).toBe(0);
  //    expect(u.div(i).xyz).toBe(0);
    });

    it('grade(index) function', function() {
      var m = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());

      var w = m.grade(0);

      expect(w.coordinate(0)).toBe(m.coordinate(0));
      expect(w.coordinate(1)).toBe(0);
      expect(w.coordinate(2)).toBe(0);
      expect(w.coordinate(3)).toBe(0);
      expect(w.coordinate(4)).toBe(0);
      expect(w.coordinate(5)).toBe(0);
      expect(w.coordinate(6)).toBe(0);
      expect(w.coordinate(7)).toBe(0);

      var v = m.grade(1);

      expect(v.coordinate(0)).toEqual(0);
      expect(v.coordinate(1)).toEqual(m.coordinate(1));
      expect(v.coordinate(2)).toEqual(m.coordinate(2));
      expect(v.coordinate(3)).toEqual(m.coordinate(3));
      expect(v.coordinate(4)).toBe(0);
      expect(v.coordinate(5)).toBe(0);
      expect(v.coordinate(6)).toBe(0);
      expect(v.coordinate(7)).toBe(0);

      var b = m.grade(2);

      expect(b.coordinate(0)).toEqual(0);
      expect(b.coordinate(1)).toBe(0);
      expect(b.coordinate(2)).toBe(0);
      expect(b.coordinate(3)).toBe(0);
      expect(b.coordinate(4)).toEqual(m.coordinate(4));
      expect(b.coordinate(5)).toEqual(m.coordinate(5));
      expect(b.coordinate(6)).toEqual(m.coordinate(6));
      expect(b.coordinate(7)).toBe(0);

      var s = m.grade(3);

      expect(s.coordinate(0)).toEqual(0);
      expect(s.coordinate(1)).toBe(0);
      expect(s.coordinate(2)).toBe(0);
      expect(s.coordinate(3)).toBe(0);
      expect(s.coordinate(4)).toEqual(0);
      expect(s.coordinate(5)).toEqual(0);
      expect(s.coordinate(6)).toEqual(0);
      expect(s.coordinate(7)).toBe(m.coordinate(7));

      var z = m.grade(4);

      expect(z.coordinate(0)).toEqual(0);
      expect(z.coordinate(1)).toBe(0);
      expect(z.coordinate(2)).toBe(0);
      expect(z.coordinate(3)).toBe(0);
      expect(z.coordinate(4)).toEqual(0);
      expect(z.coordinate(5)).toEqual(0);
      expect(z.coordinate(6)).toEqual(0);
      expect(z.coordinate(7)).toEqual(0);
    });

    describe("multiplication", function() {
      it("associative", function() {
        var a = random();
        var b = random();
        var c = random();

        var ab = a.mul(b);
        var bc = b.mul(c);
        var lhs = ab.mul(c);
        var rhs = a.mul(bc);

        expect(lhs.coordinate(0)).toBeCloseTo(rhs.coordinate(0));
        expect(lhs.coordinate(1)).toBeCloseTo(rhs.coordinate(1));
        expect(lhs.coordinate(2)).toBeCloseTo(rhs.coordinate(2));
        expect(lhs.coordinate(3)).toBeCloseTo(rhs.coordinate(3));
        expect(lhs.coordinate(4)).toBeCloseTo(rhs.coordinate(4));
        expect(lhs.coordinate(5)).toBeCloseTo(rhs.coordinate(5));
        expect(lhs.coordinate(6)).toBeCloseTo(rhs.coordinate(6));
        expect(lhs.coordinate(7)).toBeCloseTo(rhs.coordinate(7));
      });
      it("left distributive", function() {
        var x = random();
        var y = random();
        var z = random();

        var xy = x.mul(y);
        var xz = x.mul(z);
        var lhs = x.mul(y.add(z));
        var rhs = xy.add(xz);

        expect(lhs.coordinate(0)).toBeCloseTo(rhs.coordinate(0));
        expect(lhs.coordinate(1)).toBeCloseTo(rhs.coordinate(1));
        expect(lhs.coordinate(2)).toBeCloseTo(rhs.coordinate(2));
        expect(lhs.coordinate(3)).toBeCloseTo(rhs.coordinate(3));
        expect(lhs.coordinate(4)).toBeCloseTo(rhs.coordinate(4));
        expect(lhs.coordinate(5)).toBeCloseTo(rhs.coordinate(5));
        expect(lhs.coordinate(6)).toBeCloseTo(rhs.coordinate(6));
        expect(lhs.coordinate(7)).toBeCloseTo(rhs.coordinate(7));
      });
      it("right distributive over addition", function() {
        var x = random();
        var y = random();
        var z = random();

        var yx = y.mul(x);
        var zx = z.mul(x);
        var lhs = (y.add(z)).mul(x);
        var rhs = yx.add(zx);

        expect(lhs.coordinate(0)).toBeCloseTo(rhs.coordinate(0));
        expect(lhs.coordinate(1)).toBeCloseTo(rhs.coordinate(1));
        expect(lhs.coordinate(2)).toBeCloseTo(rhs.coordinate(2));
        expect(lhs.coordinate(3)).toBeCloseTo(rhs.coordinate(3));
        expect(lhs.coordinate(4)).toBeCloseTo(rhs.coordinate(4));
        expect(lhs.coordinate(5)).toBeCloseTo(rhs.coordinate(5));
        expect(lhs.coordinate(6)).toBeCloseTo(rhs.coordinate(6));
        expect(lhs.coordinate(7)).toBeCloseTo(rhs.coordinate(7));
      });
      it("square of any vector is a real scalar", function() {
        var a = random().grade(1);
        var b = a.mul(a);

        expect(b.grade(1)).toBeNear(zero);
        expect(b.grade(2)).toBeNear(zero);
        expect(b.grade(3)).toBeNear(zero);
      });
    });

    describe("scalar product (scp)", function() {
      it("", function() {
        expect(one.scp(one)).toBeNear(one);
        expect(one.scp(i)).toBeNear(zero);
        expect(one.scp(j)).toBeNear(zero);
        expect(one.scp(k)).toBeNear(zero);
        expect(one.scp(ij)).toBeNear(zero);
        expect(one.scp(jk)).toBeNear(zero);
        expect(one.scp(ki)).toBeNear(zero);
        expect(one.scp(I)).toBeNear(zero);

        expect(i.scp(one)).toBeNear(zero);
        expect(i.scp(i)).toBeNear(one);
        expect(i.scp(j)).toBeNear(zero);
        expect(i.scp(k)).toBeNear(zero);
        expect(i.scp(ij)).toBeNear(zero);
        expect(i.scp(jk)).toBeNear(zero);
        expect(i.scp(ki)).toBeNear(zero);
        expect(i.scp(I)).toBeNear(zero);

        expect(j.scp(one)).toBeNear(zero);
        expect(j.scp(i)).toBeNear(zero);
        expect(j.scp(j)).toBeNear(one);
        expect(j.scp(k)).toBeNear(zero);
        expect(j.scp(ij)).toBeNear(zero);
        expect(j.scp(jk)).toBeNear(zero);
        expect(j.scp(ki)).toBeNear(zero);
        expect(j.scp(I)).toBeNear(zero);

        expect(k.scp(one)).toBeNear(zero);
        expect(k.scp(i)).toBeNear(zero);
        expect(k.scp(j)).toBeNear(zero);
        expect(k.scp(k)).toBeNear(one);
        expect(k.scp(ij)).toBeNear(zero);
        expect(k.scp(jk)).toBeNear(zero);
        expect(k.scp(ki)).toBeNear(zero);
        expect(k.scp(I)).toBeNear(zero);

        expect(ij.scp(one)).toBeNear(zero);
        expect(ij.scp(i)).toBeNear(zero);
        expect(ij.scp(j)).toBeNear(zero);
        expect(ij.scp(k)).toBeNear(zero);
        expect(ij.scp(ij)).toBeNear(mone);
        expect(ij.scp(jk)).toBeNear(zero);
        expect(ij.scp(ki)).toBeNear(zero);
        expect(ij.scp(I)).toBeNear(zero);

        expect(jk.scp(one)).toBeNear(zero);
        expect(jk.scp(i)).toBeNear(zero);
        expect(jk.scp(j)).toBeNear(zero);
        expect(jk.scp(k)).toBeNear(zero);
        expect(jk.scp(ij)).toBeNear(zero);
        expect(jk.scp(jk)).toBeNear(mone);
        expect(jk.scp(ki)).toBeNear(zero);
        expect(jk.scp(I)).toBeNear(zero);

        expect(ki.scp(one)).toBeNear(zero);
        expect(ki.scp(i)).toBeNear(zero);
        expect(ki.scp(j)).toBeNear(zero);
        expect(ki.scp(k)).toBeNear(zero);
        expect(ki.scp(ij)).toBeNear(zero);
        expect(ki.scp(jk)).toBeNear(zero);
        expect(ki.scp(ki)).toBeNear(mone);
        expect(ki.scp(I)).toBeNear(zero);

        expect(I.scp(one)).toBeNear(zero);
        expect(I.scp(i)).toBeNear(zero);
        expect(I.scp(j)).toBeNear(zero);
        expect(I.scp(k)).toBeNear(zero);
        expect(I.scp(ij)).toBeNear(zero);
        expect(I.scp(jk)).toBeNear(zero);
        expect(I.scp(ki)).toBeNear(zero);
        expect(I.scp(I)).toBeNear(mone);
      });
    });

    describe("exterior product", function() {
      it("", function() {
        expect(one.ext(one)).toBeNear(one);
        expect(one.ext(i)).toBeNear(i);
        expect(one.ext(j)).toBeNear(j);
        expect(one.ext(k)).toBeNear(k);
        expect(one.ext(ij)).toBeNear(ij);
        expect(one.ext(jk)).toBeNear(jk);
        expect(one.ext(ki)).toBeNear(ki);
        expect(one.ext(I)).toBeNear(I);

        expect(i.ext(one)).toBeNear(i);
        expect(i.ext(i)).toBeNear(zero);
        expect(i.ext(j)).toBeNear(ij);
        expect(i.ext(k)).toBeNear(zero.sub(ki));
        expect(i.ext(ij)).toBeNear(zero);
        expect(i.ext(jk)).toBeNear(I);
        expect(i.ext(ki)).toBeNear(zero);
        expect(i.ext(I)).toBeNear(zero);

        expect(j.ext(one)).toBeNear(j);
        expect(j.ext(i)).toBeNear(zero.sub(ij));
        expect(j.ext(j)).toBeNear(zero);
        expect(j.ext(k)).toBeNear(jk);
        expect(j.ext(ij)).toBeNear(zero);
        expect(j.ext(jk)).toBeNear(zero);
        expect(j.ext(ki)).toBeNear(I);
        expect(j.ext(I)).toBeNear(zero);

        expect(k.ext(one)).toBeNear(k);
        expect(k.ext(i)).toBeNear(ki);
        expect(k.ext(j)).toBeNear(zero.sub(jk));
        expect(k.ext(k)).toBeNear(zero);
        expect(k.ext(ij)).toBeNear(I);
        expect(k.ext(jk)).toBeNear(zero);
        expect(k.ext(ki)).toBeNear(zero);
        expect(k.ext(I)).toBeNear(zero);

        expect(ij.ext(one)).toBeNear(ij);
        expect(ij.ext(i)).toBeNear(zero);
        expect(ij.ext(j)).toBeNear(zero);
        expect(ij.ext(k)).toBeNear(I);
        expect(ij.ext(ij)).toBeNear(zero);
        expect(ij.ext(jk)).toBeNear(zero);
        expect(ij.ext(ki)).toBeNear(zero);
        expect(ij.ext(I)).toBeNear(zero);

        expect(jk.ext(one)).toBeNear(jk);
        expect(jk.ext(i)).toBeNear(I);
        expect(jk.ext(j)).toBeNear(zero);
        expect(jk.ext(k)).toBeNear(zero);
        expect(jk.ext(ij)).toBeNear(zero);
        expect(jk.ext(jk)).toBeNear(zero);
        expect(jk.ext(ki)).toBeNear(zero);
        expect(jk.ext(I)).toBeNear(zero);

        expect(ki.ext(one)).toBeNear(ki);            // 49
        expect(ki.ext(i)).toBeNear(zero);            // 50
        expect(ki.ext(j)).toBeNear(I);               // 51
        expect(ki.ext(k)).toBeNear(zero);            // 52
        expect(ki.ext(ij)).toBeNear(zero);           // 53
        expect(ki.ext(jk)).toBeNear(zero);           // 54
        expect(ki.ext(ki)).toBeNear(zero);           // 55
        expect(ki.ext(I)).toBeNear(zero);            // 56

        expect(I.ext(one)).toBeNear(I);              // 57
        expect(I.ext(i)).toBeNear(zero);             // 58
        expect(I.ext(j)).toBeNear(zero);             // 59
        expect(I.ext(k)).toBeNear(zero);             // 60
        expect(I.ext(ij)).toBeNear(zero);            // 61
        expect(I.ext(jk)).toBeNear(zero);            // 62
        expect(I.ext(ki)).toBeNear(zero);            // 63
        expect(I.ext(I)).toBeNear(zero);             // 64
      });
    });

    describe("left contraction", function() {
      it("", function() {
        expect(one.lco(one)).toBeNear(one);
        expect(one.lco(i)).toBeNear(i);
        expect(one.lco(j)).toBeNear(j);
        expect(one.lco(k)).toBeNear(k);
        expect(one.lco(ij)).toBeNear(ij);
        expect(one.lco(jk)).toBeNear(jk);
        expect(one.lco(ki)).toBeNear(ki);
        expect(one.lco(I)).toBeNear(I);

        expect(i.lco(one)).toBeNear(zero);
        expect(i.lco(i)).toBeNear(one);
        expect(i.lco(j)).toBeNear(zero);
        expect(i.lco(k)).toBeNear(zero);
        expect(i.lco(ij)).toBeNear(j);
        expect(i.lco(jk)).toBeNear(zero);
        expect(i.lco(ki)).toBeNear(zero.sub(k));
        expect(i.lco(I)).toBeNear(jk);

        expect(j.lco(one)).toBeNear(zero);
        expect(j.lco(i)).toBeNear(zero);
        expect(j.lco(j)).toBeNear(one);
        expect(j.lco(k)).toBeNear(zero);
        expect(j.lco(ij)).toBeNear(zero.sub(i));
        expect(j.lco(jk)).toBeNear(k);
        expect(j.lco(ki)).toBeNear(zero);
        expect(j.lco(I)).toBeNear(ki);

        expect(k.lco(one)).toBeNear(zero);
        expect(k.lco(i)).toBeNear(zero);
        expect(k.lco(j)).toBeNear(zero);
        expect(k.lco(k)).toBeNear(one);
        expect(k.lco(ij)).toBeNear(zero);
        expect(k.lco(jk)).toBeNear(zero.sub(j));
        expect(k.lco(ki)).toBeNear(i);
        expect(k.lco(I)).toBeNear(ij);

        expect(ij.lco(one)).toBeNear(zero);
        expect(ij.lco(i)).toBeNear(zero);
        expect(ij.lco(j)).toBeNear(zero);
        expect(ij.lco(k)).toBeNear(zero);
        expect(ij.lco(ij)).toBeNear(zero.sub(one));
        expect(ij.lco(jk)).toBeNear(zero);
        expect(ij.lco(ki)).toBeNear(zero);
        expect(ij.lco(I)).toBeNear(zero.sub(k));

        expect(jk.lco(one)).toBeNear(zero);
        expect(jk.lco(i)).toBeNear(zero);
        expect(jk.lco(j)).toBeNear(zero);
        expect(jk.lco(k)).toBeNear(zero);
        expect(jk.lco(ij)).toBeNear(zero);
        expect(jk.lco(jk)).toBeNear(zero.sub(one));
        expect(jk.lco(ki)).toBeNear(zero);
        expect(jk.lco(I)).toBeNear(zero.sub(i));

        expect(ki.lco(one)).toBeNear(zero);          // 49
        expect(ki.lco(i)).toBeNear(zero);            // 50
        expect(ki.lco(j)).toBeNear(zero);            // 51
        expect(ki.lco(k)).toBeNear(zero);            // 52
        expect(ki.lco(ij)).toBeNear(zero);           // 53
        expect(ki.lco(jk)).toBeNear(zero);           // 54
        expect(ki.lco(ki)).toBeNear(zero.sub(one));  // 55
        expect(ki.lco(I)).toBeNear(zero.sub(j));     // 56

        expect(I.lco(one)).toBeNear(zero);           // 57
        expect(I.lco(i)).toBeNear(zero);             // 58
        expect(I.lco(j)).toBeNear(zero);             // 59
        expect(I.lco(k)).toBeNear(zero);             // 60
        expect(I.lco(ij)).toBeNear(zero);            // 61
        expect(I.lco(jk)).toBeNear(zero);            // 62
        expect(I.lco(ki)).toBeNear(zero);            // 63
        expect(I.lco(I)).toBeNear(zero.sub(one));    // 64
      });
    });

    describe("right contraction", function() {
      it("", function() {
        expect(one.rco(one)).toBeNear(one);          //  1
        expect(one.rco(i)).toBeNear(zero);           //  2
        expect(one.rco(j)).toBeNear(zero);           //  3
        expect(one.rco(k)).toBeNear(zero);           //  4
        expect(one.rco(ij)).toBeNear(zero);          //  5
        expect(one.rco(jk)).toBeNear(zero);          //  6
        expect(one.rco(ki)).toBeNear(zero);          //  7
        expect(one.rco(I)).toBeNear(zero);           //  8

        expect(i.rco(one)).toBeNear(i);              //  9
        expect(i.rco(i)).toBeNear(one);              // 10
        expect(i.rco(j)).toBeNear(zero);             // 11
        expect(i.rco(k)).toBeNear(zero);             // 12
        expect(i.rco(ij)).toBeNear(zero);            // 13
        expect(i.rco(jk)).toBeNear(zero);            // 14
        expect(i.rco(ki)).toBeNear(zero);            // 15
        expect(i.rco(I)).toBeNear(zero);             // 16

        expect(j.rco(one)).toBeNear(j);              // 17
        expect(j.rco(i)).toBeNear(zero);             // 18
        expect(j.rco(j)).toBeNear(one);              // 19
        expect(j.rco(k)).toBeNear(zero);             // 20
        expect(j.rco(ij)).toBeNear(zero);            // 21
        expect(j.rco(jk)).toBeNear(zero);            // 22
        expect(j.rco(ki)).toBeNear(zero);            // 23
        expect(j.rco(I)).toBeNear(zero);             // 24

        expect(k.rco(one)).toBeNear(k);              // 25
        expect(k.rco(i)).toBeNear(zero);             // 26
        expect(k.rco(j)).toBeNear(zero);             // 27
        expect(k.rco(k)).toBeNear(one);              // 28
        expect(k.rco(ij)).toBeNear(zero);            // 29
        expect(k.rco(jk)).toBeNear(zero);            // 30
        expect(k.rco(ki)).toBeNear(zero);            // 31
        expect(k.rco(I)).toBeNear(zero);             // 32

        expect(ij.rco(one)).toBeNear(ij);            // 33
        expect(ij.rco(i)).toBeNear(zero.sub(j));     // 34
        expect(ij.rco(j)).toBeNear(i);               // 35
        expect(ij.rco(k)).toBeNear(zero);            // 36
        expect(ij.rco(ij)).toBeNear(zero.sub(one));  // 37
        expect(ij.rco(jk)).toBeNear(zero);           // 38
        expect(ij.rco(ki)).toBeNear(zero);           // 39
        expect(ij.rco(I)).toBeNear(zero);            // 40

        expect(jk.rco(one)).toBeNear(jk);            // 41
        expect(jk.rco(i)).toBeNear(zero);            // 42
        expect(jk.rco(j)).toBeNear(zero.sub(k));     // 43
        expect(jk.rco(k)).toBeNear(j);               // 44
        expect(jk.rco(ij)).toBeNear(zero);           // 45
        expect(jk.rco(jk)).toBeNear(zero.sub(one));  // 46
        expect(jk.rco(ki)).toBeNear(zero);           // 47
        expect(jk.rco(I)).toBeNear(zero);            // 48

        expect(ki.rco(one)).toBeNear(ki);            // 49
        expect(ki.rco(i)).toBeNear(k);               // 50
        expect(ki.rco(j)).toBeNear(zero);            // 51
        expect(ki.rco(k)).toBeNear(zero.sub(i));     // 52
        expect(ki.rco(ij)).toBeNear(zero);           // 53
        expect(ki.rco(jk)).toBeNear(zero);           // 54
        expect(ki.rco(ki)).toBeNear(zero.sub(one));  // 55
        expect(ki.rco(I)).toBeNear(zero);            // 56

        expect(I.rco(one)).toBeNear(I);              // 57
        expect(I.rco(i)).toBeNear(jk);               // 58
        expect(I.rco(j)).toBeNear(ki);               // 59
        expect(I.rco(k)).toBeNear(ij);               // 60
        expect(I.rco(ij)).toBeNear(zero.sub(k));     // 61
        expect(I.rco(jk)).toBeNear(zero.sub(i));     // 62
        expect(I.rco(ki)).toBeNear(zero.sub(j));     // 63
        expect(I.rco(I)).toBeNear(zero.sub(one));    // 64
      });
    });
    describe("Operator Overloading", function(){
      var x = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      var y = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      it("+", function() {
        var e = x.add(y);
        var a = x.__add__(y);
        var b = y.__radd__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("-", function() {
        var e = x.sub(y);
        var a = x.__sub__(y);
        var b = y.__rsub__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      describe("*", function(){
        it("Euclidean3 * Euclidean3", function() {
          var e = x.mul(y);
          var a = x.__mul__(y);
          var b = y.__rmul__(x);
          expect(e.w).toBe(a.w);
          expect(e.x).toBe(a.x);
          expect(e.y).toBe(a.y);
          expect(e.z).toBe(a.z);
          expect(e.xy).toBe(a.xy);
          expect(e.yz).toBe(a.yz);
          expect(e.zx).toBe(a.zx);
          expect(e.xyz).toBe(a.xyz);
          expect(e.w).toBe(b.w);
          expect(e.x).toBe(b.x);
          expect(e.y).toBe(b.y);
          expect(e.z).toBe(b.z);
          expect(e.xy).toBe(b.xy);
          expect(e.yz).toBe(b.yz);
          expect(e.zx).toBe(b.zx);
          expect(e.xyz).toBe(b.xyz);
        });
      });
      it("/", function() {
        var e = x.div(y);
        var a = x.__div__(y);
        var b = y.__rdiv__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("^", function() {
        var e = x.ext(y);
        var a = x.__wedge__(y);
        var b = y.__rwedge__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("<<", function() {
        var e = x.lco(y);
        var a = x.__lshift__(y);
        var b = y.__rlshift__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it(">>", function() {
        var e = x.rco(y);
        var a = x.__rshift__(y);
        var b = y.__rrshift__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("Unary +", function() {
        var e = zero.add(x);
        var a = x.__pos__();
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
      });
      it("Unary -", function() {
        var e = zero.sub(x);
        var a = x.__neg__();
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
      });
    });
    describe("norm", function() {
      it("returns a number", function() {
        expect(typeof zero.norm()).toBe('object');
      });
    });
    describe("quad", function() {
      it("returns a number", function() {
        expect(typeof zero.quad()).toBe('object');
      });
    });
  });
});

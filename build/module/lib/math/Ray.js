import { Vector3 } from './Vector3';
/**
 * scratch variables.
 */
var v1 = new Vector3();
var v = new Vector3();
var segCenter = new Vector3();
var segDir = new Vector3();
var diff = new Vector3();
var edge1 = new Vector3();
var edge2 = new Vector3();
var normal = new Vector3();
var Ray = (function () {
    function Ray(origin, direction) {
        this.origin = (origin !== undefined) ? origin : new Vector3();
        this.direction = (direction !== undefined) ? direction : new Vector3();
    }
    Ray.prototype.set = function (origin, direction) {
        this.origin.copy(origin);
        this.direction.copy(direction);
        return this;
    };
    Ray.prototype.clone = function () {
        return new Ray().copy(this);
    };
    Ray.prototype.copy = function (ray) {
        this.origin.copy(ray.origin);
        this.direction.copy(ray.direction);
        return this;
    };
    Ray.prototype.at = function (t, optionalTarget) {
        var result = optionalTarget || new Vector3();
        // DGH scale or mulByScalar?
        return result.copy(this.direction).scale(t).add(this.origin);
    };
    Ray.prototype.lookAt = function (v) {
        this.direction.copy(v).sub(this.origin).normalize();
        return this;
    };
    Ray.prototype.recast = function (t) {
        this.origin.copy(this.at(t, v1));
        return this;
    };
    Ray.prototype.closestPointToPoint = function (point, optionalTarget) {
        var result = optionalTarget || new Vector3();
        result.sub2(point, this.origin);
        var directionDistance = result.dot(this.direction);
        if (directionDistance < 0) {
            return result.copy(this.origin);
        }
        return result.copy(this.direction).scale(directionDistance).add(this.origin);
    };
    Ray.prototype.distanceToPoint = function (point) {
        return Math.sqrt(this.distanceSqToPoint(point));
    };
    Ray.prototype.distanceSqToPoint = function (point) {
        var directionDistance = v1.sub2(point, this.origin).dot(this.direction);
        // point behind the ray
        if (directionDistance < 0) {
            return this.origin.quadranceTo(point);
        }
        v1.copy(this.direction).scale(directionDistance).add(this.origin);
        return v1.quadranceTo(point);
    };
    Ray.prototype.distanceSqToSegment = function (v0, v1, optionalPointOnRay, optionalPointOnSegment) {
        // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
        // It returns the min distance between the ray and the segment
        // defined by v0 and v1
        // It can also set two optional targets :
        // - The closest point on the ray
        // - The closest point on the segment
        segCenter.copy(v0).add(v1).scale(0.5);
        segDir.copy(v1).sub(v0).normalize();
        diff.copy(this.origin).sub(segCenter);
        var segExtent = v0.distanceTo(v1) * 0.5;
        var a01 = -this.direction.dot(segDir);
        var b0 = diff.dot(this.direction);
        var b1 = -diff.dot(segDir);
        var c = diff.squaredNorm();
        var det = Math.abs(1 - a01 * a01);
        var s0, s1, sqrDist, extDet;
        if (det > 0) {
            // The ray and segment are not parallel.
            s0 = a01 * b1 - b0;
            s1 = a01 * b0 - b1;
            extDet = segExtent * det;
            if (s0 >= 0) {
                if (s1 >= -extDet) {
                    if (s1 <= extDet) {
                        // region 0
                        // Minimum at interior points of ray and segment.
                        var invDet = 1 / det;
                        s0 *= invDet;
                        s1 *= invDet;
                        sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
                    }
                    else {
                        // region 1
                        s1 = segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                }
                else {
                    // region 5
                    s1 = -segExtent;
                    s0 = Math.max(0, -(a01 * s1 + b0));
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
            }
            else {
                if (s1 <= -extDet) {
                    // region 4
                    s0 = Math.max(0, -(-a01 * segExtent + b0));
                    s1 = (s0 > 0) ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
                else if (s1 <= extDet) {
                    // region 3
                    s0 = 0;
                    s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = s1 * (s1 + 2 * b1) + c;
                }
                else {
                    // region 2
                    s0 = Math.max(0, -(a01 * segExtent + b0));
                    s1 = (s0 > 0) ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
            }
        }
        else {
            // Ray and segment are parallel.
            s1 = (a01 > 0) ? -segExtent : segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        }
        if (optionalPointOnRay) {
            optionalPointOnRay.copy(this.direction).scale(s0).add(this.origin);
        }
        if (optionalPointOnSegment) {
            optionalPointOnSegment.copy(segDir).scale(s1).add(segCenter);
        }
        return sqrDist;
    };
    Ray.prototype.intersectSphere = function (sphere, optionalTarget) {
        v1.sub2(sphere.center, this.origin);
        var tca = v1.dot(this.direction);
        var d2 = v1.dot(v1) - tca * tca;
        var radius2 = sphere.radius * sphere.radius;
        if (d2 > radius2)
            return null;
        var thc = Math.sqrt(radius2 - d2);
        // t0 = first intersect point - entrance on front of sphere
        var t0 = tca - thc;
        // t1 = second intersect point - exit point on back of sphere
        var t1 = tca + thc;
        // test to see if both t0 and t1 are behind the ray - if so, return null
        if (t0 < 0 && t1 < 0)
            return null;
        // test to see if t0 is behind the ray:
        // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
        // in order to always return an intersect point that is in front of the ray.
        if (t0 < 0)
            return this.at(t1, optionalTarget);
        // else t0 is in front of the ray, so return the first collision point scaled by t0
        return this.at(t0, optionalTarget);
    };
    Ray.prototype.intersectsSphere = function (sphere) {
        return this.distanceToPoint(sphere.center) <= sphere.radius;
    };
    Ray.prototype.distanceToPlane = function (plane) {
        var denominator = plane.normal.dot(this.direction);
        if (denominator === 0) {
            // line is coplanar, return origin
            if (plane.distanceToPoint(this.origin) === 0) {
                return 0;
            }
            // Null is preferable to undefined since undefined means.... it is undefined
            return null;
        }
        var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
        // Return if the ray never intersects the plane
        return t >= 0 ? t : null;
    };
    Ray.prototype.intersectPlane = function (plane, optionalTarget) {
        var t = this.distanceToPlane(plane);
        if (t === null) {
            return null;
        }
        return this.at(t, optionalTarget);
    };
    Ray.prototype.intersectsPlane = function (plane) {
        // check if the ray lies on the plane first
        var distToPoint = plane.distanceToPoint(this.origin);
        if (distToPoint === 0) {
            return true;
        }
        var denominator = plane.normal.dot(this.direction);
        if (denominator * distToPoint < 0) {
            return true;
        }
        // ray origin is behind the plane (and is pointing behind it)
        return false;
    };
    Ray.prototype.intersectBox = function (box, optionalTarget) {
        var tmin, tmax, tymin, tymax, tzmin, tzmax;
        var invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
        var origin = this.origin;
        if (invdirx >= 0) {
            tmin = (box.min.x - origin.x) * invdirx;
            tmax = (box.max.x - origin.x) * invdirx;
        }
        else {
            tmin = (box.max.x - origin.x) * invdirx;
            tmax = (box.min.x - origin.x) * invdirx;
        }
        if (invdiry >= 0) {
            tymin = (box.min.y - origin.y) * invdiry;
            tymax = (box.max.y - origin.y) * invdiry;
        }
        else {
            tymin = (box.max.y - origin.y) * invdiry;
            tymax = (box.min.y - origin.y) * invdiry;
        }
        if ((tmin > tymax) || (tymin > tmax))
            return null;
        // These lines also handle the case where tmin or tmax is NaN
        // (result of 0 * Infinity). x !== x returns true if x is NaN
        if (tymin > tmin || tmin !== tmin)
            tmin = tymin;
        if (tymax < tmax || tmax !== tmax)
            tmax = tymax;
        if (invdirz >= 0) {
            tzmin = (box.min.z - origin.z) * invdirz;
            tzmax = (box.max.z - origin.z) * invdirz;
        }
        else {
            tzmin = (box.max.z - origin.z) * invdirz;
            tzmax = (box.min.z - origin.z) * invdirz;
        }
        if ((tmin > tzmax) || (tzmin > tmax))
            return null;
        if (tzmin > tmin || tmin !== tmin)
            tmin = tzmin;
        if (tzmax < tmax || tmax !== tmax)
            tmax = tzmax;
        // return point closest to the ray (positive side)
        if (tmax < 0)
            return null;
        return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
    };
    Ray.prototype.intersectsBox = function (box) {
        return this.intersectBox(box, v) !== null;
    };
    Ray.prototype.intersectTriangle = function (a, b, c, backfaceCulling, optionalTarget) {
        // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
        edge1.sub2(b, a);
        edge2.sub2(c, a);
        normal.cross2(edge1, edge2);
        // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
        //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
        //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
        var DdN = this.direction.dot(normal);
        var sign;
        if (DdN > 0) {
            if (backfaceCulling)
                return null;
            sign = 1;
        }
        else if (DdN < 0) {
            sign = -1;
            DdN = -DdN;
        }
        else {
            return null;
        }
        diff.sub2(this.origin, a);
        var DdQxE2 = sign * this.direction.dot(edge2.cross2(diff, edge2));
        // b1 < 0, no intersection
        if (DdQxE2 < 0) {
            return null;
        }
        var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));
        // b2 < 0, no intersection
        if (DdE1xQ < 0) {
            return null;
        }
        // b1+b2 > 1, no intersection
        if (DdQxE2 + DdE1xQ > DdN) {
            return null;
        }
        // Line intersects triangle, check if ray does.
        var QdN = -sign * diff.dot(normal);
        // t < 0, no intersection
        if (QdN < 0) {
            return null;
        }
        // Ray intersects triangle.
        return this.at(QdN / DdN, optionalTarget);
    };
    Ray.prototype.applyMatrix4 = function (matrix4) {
        this.direction.add(this.origin).applyMatrix4(matrix4);
        this.origin.applyMatrix4(matrix4);
        this.direction.sub(this.origin);
        this.direction.normalize();
        return this;
    };
    Ray.prototype.equals = function (ray) {
        return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
    };
    return Ray;
}());
export { Ray };

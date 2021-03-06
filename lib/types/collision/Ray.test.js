import { Vec3 } from '../math/Vec3';
import { Box } from '../shapes/Box';
import { Ray } from './Ray';
import { RaycastResult } from './RaycastResult';
import { Body } from '../objects/Body';
import { Sphere } from '../shapes/Sphere';
import { Plane } from '../shapes/Plane';
import { Quaternion } from '../math/Quaternion';
describe('Ray', function () {
    var createPolyhedron = function (size) {
        if (size === void 0) { size = 0.5; }
        var box = new Box(new Vec3(size, size, size));
        box.updateConvexPolyhedronRepresentation();
        return box.convexPolyhedronRepresentation;
    };
    it('should construct', function () {
        var r = new Ray(new Vec3(), new Vec3(1, 0, 0));
        expect(r).not.toBeUndefined();
    });
    it('should intersectBody', function () {
        var r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0));
        r.skipBackfaces = true;
        var shape = createPolyhedron(0.5);
        var body = new Body({ mass: 1 });
        body.addShape(shape);
        var result = new RaycastResult();
        r.intersectBody(body, result);
        expect(result.hasHit).toBeTruthy();
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
        result.reset();
        body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI);
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
        result.reset();
        r.to.set(0, 0, -5);
        r.from.set(0, 0, 5);
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 0.5))).toBeTruthy();
        result.reset();
        r = new Ray(new Vec3(5, 1, 0), new Vec3(-5, 1, 0));
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(false);
    });
    it('should intersectBodies', function () {
        var r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0));
        r.skipBackfaces = true;
        var shape = createPolyhedron(0.5);
        var body1 = new Body({ mass: 1 });
        body1.addShape(shape);
        var body2 = new Body({ mass: 1 });
        body2.addShape(shape);
        body2.position.x = -2;
        var result = new RaycastResult();
        r.intersectBodies([body1, body2], result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
    });
    it('should box', function () {
        var r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0));
        r.skipBackfaces = true;
        var shape = new Box(new Vec3(0.5, 0.5, 0.5));
        var body = new Body({ mass: 1 });
        body.addShape(shape);
        var result = new RaycastResult();
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
        result.reset();
        body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2);
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
        result.reset();
        body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI);
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
        result.reset();
        body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), 3 * Math.PI / 2);
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBeTruthy();
    });
    it('should sphere', function () {
        var r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0));
        r.skipBackfaces = true;
        var shape = new Sphere(1);
        var body = new Body({ mass: 1 });
        body.addShape(shape);
        var result = new RaycastResult();
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(1, 0, 0))).toBeTruthy();
        result.reset();
        body.position.set(1, 0, 0);
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(2, 0, 0))).toBeTruthy();
        result.reset();
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(2, 0, 0))).toBeTruthy();
        result.reset();
        var shape2 = new Sphere(1);
        var body2 = new Body({ mass: 1 });
        body2.addShape(shape2, new Vec3(1, 0, 0));
        r.intersectBody(body2, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(2, 0, 0))).toBeTruthy();
    });
    it('should plane', function () {
        var r = new Ray(new Vec3(0, 0, 5), new Vec3(0, 0, -5));
        r.skipBackfaces = true;
        var shape = new Plane();
        var body = new Body({ mass: 1 });
        body.addShape(shape);
        var result = new RaycastResult();
        r.intersectBody(body, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 0)));
        expect(result.distance).toEqual(5);
        result.reset();
        var body2 = new Body({ mass: 1 });
        body2.addShape(shape, new Vec3(0, 0, 1), new Quaternion());
        r.intersectBody(body2, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 1)));
        result.reset();
        var body3 = new Body({ mass: 1 });
        var quat = new Quaternion();
        quat.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2);
        body3.addShape(shape, new Vec3(), quat);
        r.intersectBody(body3, result);
        expect(result.hasHit).toEqual(false);
        result.reset();
        var body4 = new Body({ mass: 1 });
        body4.addShape(shape);
        r = new Ray(new Vec3(1, 1, 5), new Vec3(1, 1, -5));
        r.intersectBody(body4, result);
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld).toEqual(new Vec3(1, 1, 0));
        expect(result.distance).toEqual(5);
        result = new RaycastResult();
        r.from.set(0, 1, 1);
        r.to.set(0, -1, -1);
        body.position.set(0, 0, 0);
        r.intersectBody(body, result);
        var distance1 = result.distance;
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 0)));
        result = new RaycastResult();
        r.from.set(0, 1 - 5, 1);
        r.to.set(0, -1 - 5, -1);
        body.position.set(0, 0, 0);
        r.intersectBody(body, result);
        var distance2 = result.distance;
        expect(result.hasHit).toEqual(true);
        expect(result.hitPointWorld.almostEquals(new Vec3(0, -5, 0)));
        expect(distance1).toEqual(distance2);
    });
});

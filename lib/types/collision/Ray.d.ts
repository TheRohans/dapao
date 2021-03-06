import { Vec3 } from '../math/Vec3';
import { RaycastResult } from './RaycastResult';
import { Quaternion } from '../math/Quaternion';
import { Shape } from '../shapes/Shape';
import { AABB } from './AABB';
import { Box } from '../shapes/Box';
import { Plane } from '../shapes/Plane';
import { Sphere } from '../shapes/Sphere';
import { ConvexPolyhedron } from '../shapes/ConvexPolyhedron';
import { Body } from '../objects/Body';
import { World } from '../world/World';
export declare class Ray {
    static CLOSEST: number;
    static ANY: number;
    static ALL: number;
    from: Vec3;
    to: Vec3;
    precision: number;
    _direction: Vec3;
    checkCollisionResponse: boolean;
    skipBackfaces: boolean;
    collisionFilterMask: number;
    collisionFilterGroup: number;
    mode: number;
    result: RaycastResult;
    hasHit: boolean;
    callback: Function;
    constructor(from?: Vec3, to?: Vec3);
    private tmpAABB;
    private tmpArray;
    intersectWorld(world: World, options: any): boolean;
    private v1;
    private v2;
    static pointInTriangle(p: Vec3, a: Vec3, b: Vec3, c: Vec3): boolean;
    private intersectBody_xi;
    private intersectBody_qi;
    intersectBody(body: Body, result?: RaycastResult): void;
    intersectBodies(bodies: Body[], result?: RaycastResult): void;
    private updateDirection;
    intersectShape(shape: Shape, quat: Quaternion, position: Vec3, body: Body): void;
    vector: Vec3;
    normal: Vec3;
    intersectPoint: Vec3;
    a: Vec3;
    b: Vec3;
    c: Vec3;
    d: Vec3;
    tmpRaycastResult: RaycastResult;
    intersectBox(shape: Box, quat: Quaternion, position: Vec3, body: Body, reportedShape: Shape): void;
    intersectPlane(shape: Plane, quat: Quaternion, position: Vec3, body: Body, reportedShape: Shape): void;
    getAABB(result: AABB): void;
    private Ray_intersectSphere_intersectionPoint;
    private Ray_intersectSphere_normal;
    intersectSphere(shape: Sphere, quat: Quaternion, position: Vec3, body: Body, reportedShape: Shape): void;
    private intersectConvex_normal;
    private intersectConvex_minDistNormal;
    private intersectConvex_minDistIntersect;
    private intersectConvex_vector;
    intersectConvex(shape: ConvexPolyhedron, quat: Quaternion, position: Vec3, body: Body, reportedShape: Shape, options?: any): void;
    reportIntersection(normal: Vec3, hitPointWorld: Vec3, shape: Shape, body: Body, hitFaceIndex: number): void;
    v0: Vec3;
    intersect: Vec3;
    distanceFromIntersection(from: Vec3, direction: Vec3, position: Vec3): number;
}
